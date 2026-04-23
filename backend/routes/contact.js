const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!process.env.CONTACT_RECEIVER_EMAIL) {
      console.error("Missing CONTACT_RECEIVER_EMAIL in environment.");
      return res.status(500).json({ message: "Server email configuration is missing." });
    }

    const response = await resend.emails.send({
      from: "Travelo <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `Travelo Contact: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    console.log("RESEND RESPONSE:", response);

    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("CONTACT ROUTE ERROR:", error);
    return res.status(500).json({
      message: error?.message || "Failed to send message.",
    });
  }
});

module.exports = router;