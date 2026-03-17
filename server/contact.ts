import type { Request, Response } from "express";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

export async function contactHandler(req: Request, res: Response) {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ??
    req.socket.remoteAddress ??
    "unknown";

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please wait before submitting again." });
  }

  const { name, email, package: pkg, garageSize, message } = req.body;

  if (!name || !email || !pkg || !garageSize || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { error } = await resend.batch.send([
      // Internal notification to the team
      {
        from: "Garage Rescue <sales@thegaragerescue.com>",
        to: [process.env.CONTACT_EMAIL!],
        replyTo: email,
        subject: `New Rescue Request from ${name} — ${pkg} Package`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Package:</strong> ${pkg}</p>
          <p><strong>Garage Size:</strong> ${garageSize}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      },
      // Confirmation email to the customer
      {
        from: "Garage Rescue <sales@thegaragerescue.com>",
        to: [email],
        subject: `We got your request, ${name}! 🚗`,
        html: `
          <h2>Thanks for reaching out, ${name}!</h2>
          <p>We've received your request for the <strong>${pkg}</strong> package for a <strong>${garageSize}</strong> garage.</p>
          <p>Our team will be in touch within 24 hours to confirm your booking.</p>
          <br />
          <p>In the meantime, feel free to call us:</p>
          <ul>
            <li>Brodie: <a href="tel:+16479149791">647-914-9791</a></li>
            <li>Isaac: <a href="tel:+16138895987">(613) 889-5987</a></li>
          </ul>
          <br />
          <p>— The Garage Rescue Team</p>
        `,
      },
    ]);

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
