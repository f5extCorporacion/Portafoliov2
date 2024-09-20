import nodemailer from "nodemailer";

// Configure the Nodemailer transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Your SMTP provider
  port: 587, // Use 465 for secure, 587 for non-secure
  secure: false, // Set to true if using port 465
  auth: {
    user: "1107050440f@gmail.com", // Your email
    pass: "mlycaomevnfnanbp", // Your email app password (ensure this is safe)
  },
});

export const sendMail = async (mailOptions) => {
  const { from, to, subject, text, html } = mailOptions;

  try {
    // Send the email
    const result = await transporter.sendMail({
      from, // Sender's email
      to, // Recipient(s)
      subject, // Subject of the email
      text, // Plain text version of the email content
      html, // HTML version of the email content
    });

    return result; // Return the result for handling in the calling function
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error; // Re-throw the error for the calling function to catch
  }
};
