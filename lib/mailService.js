import nodemailer from "nodemailer";

export const SendResetPasswordEmail = async (email, token) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Reset password",
      html: ` <p>Hello,</p>
    <p>Please click on the following link to Reset your password:</p>
    <p><a href=${resetLink}>Reset your Password</a></p>
    <p>If you didn't request this, you can safely ignore this email.</p>
    <p>Best regards,<br />Your Company</p> `,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email Sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const SendVerificationEmail = async (email, token) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "verify account",
      html: ` <p>Hello,</p>
    <p>Please click on the following link to verify your email:</p>
    <p><a href=${confirmLink}>Verify Email</a></p>
    <p>If you didn't request this verification, you can safely ignore this email.</p>
    <p>Best regards,<br />Your Company</p> `,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email Sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const SendRfqNotification = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "New Rfq request",
      html: ` <p>Hello,</p>
    <p>You have received a new RFQ request:</p>
    <p>Best regards,<br />Your Company</p> `,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email Sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
