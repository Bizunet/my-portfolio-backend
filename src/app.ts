import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import projectsRouter from "./routes/projects";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/projects", projectsRouter);

app.post("/api/contact", async (req, res) => {
  const { name, email, message, service } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required.",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: service
        ? `Portfolio inquiry: ${service} - ${name}`
        : `Portfolio inquiry from ${name}`,
      text: [
        "New portfolio message",
        "",
        `Sender Name: ${name}`,
        `Sender Email: ${email}`,
        `Service Needed: ${service || "Not specified"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2 style="margin-bottom: 12px; color: #111;">New portfolio message</h2>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> ${email}</p>
          <p><strong>Service Needed:</strong> ${service || "Not specified"}</p>
          <div style="margin-top: 18px; border-top: 1px solid #ddd; padding-top: 12px;">
            <strong>Message:</strong>
            <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Email send failed:", error);
    res
      .status(500)
      .json({ error: "Failed to send the message. Please try again later." });
  }
});

export default app;
