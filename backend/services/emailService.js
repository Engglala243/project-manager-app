const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendWelcomeEmail(email) {
    try {
      const mailOptions = {
        from: `"${process.env.COMPANY_NAME || "FLIPR"}" <${
          process.env.SMTP_USER
        }>`,
        to: email,
        subject: "Welcome to Our Newsletter!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Our Newsletter!</h2>
            <p>Thank you for subscribing to our newsletter. You'll receive updates about our latest projects, news, and exclusive content.</p>
            <p>If you didn't subscribe to this newsletter, you can <a href="${
              process.env.FRONTEND_URL
            }/unsubscribe?email=${email}">unsubscribe here</a>.</p>
            <hr style="margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from ${
                process.env.COMPANY_NAME || "FLIPR"
              }.<br>
              If you have any questions, please contact us at ${
                process.env.CONTACT_EMAIL || process.env.SMTP_USER
              }.
            </p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to: ${email}`);
    } catch (error) {
      console.error("Error sending welcome email:", error);
      // Don't throw error to prevent subscription failure
    }
  }

  async sendContactNotification(contact) {
    try {
      const mailOptions = {
        from: `"${process.env.COMPANY_NAME || "FLIPR"}" <${
          process.env.SMTP_USER
        }>`,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: "New Contact Form Submission",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
              <p><strong>Name:</strong> ${contact.full_name}</p>
              <p><strong>Email:</strong> ${contact.email}</p>
              <p><strong>Phone:</strong> ${contact.phone}</p>
              <p><strong>City:</strong> ${contact.city}</p>
              <p><strong>Submitted At:</strong> ${new Date(
                contact.created_at
              ).toLocaleString()}</p>
            </div>
            <p>Please respond to this inquiry as soon as possible.</p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log("Contact notification email sent to admin");
    } catch (error) {
      console.error("Error sending contact notification:", error);
      // Don't throw error to prevent contact form submission failure
    }
  }

  async sendNewsletterEmail(subscribers, subject, content) {
    try {
      const emailPromises = subscribers.map((subscriber) => {
        const mailOptions = {
          from: `"${process.env.COMPANY_NAME || "FLIPR"}" <${
            process.env.SMTP_USER
          }>`,
          to: subscriber.email,
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              ${content}
              <hr style="margin: 20px 0;">
              <p style="color: #666; font-size: 12px;">
                You're receiving this email because you subscribed to our newsletter.<br>
                <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${subscriber.email}">Unsubscribe</a>
              </p>
            </div>
          `,
        };
        return this.transporter.sendMail(mailOptions);
      });

      await Promise.all(emailPromises);
      console.log(`Newsletter sent to ${subscribers.length} subscribers`);
      return true;
    } catch (error) {
      console.error("Error sending newsletter:", error);
      throw new Error("Failed to send newsletter");
    }
  }
}

module.exports = new EmailService();
