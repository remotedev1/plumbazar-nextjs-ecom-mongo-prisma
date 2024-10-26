import nodemailer from "nodemailer";

export const SendResetPasswordEmail = async (email, token) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net", // GoDaddy SMTP server
      port: 587, // Use 587 for TLS
      secure: false, // Use true for SSL (port 465)
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
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
    <p>Best regards,<br />plumbazar</p> `,
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
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net", // GoDaddy SMTP server
      port: 587, // Use 587 for TLS
      secure: false, // Use true for SSL (port 465)
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Plumbazar 📧 <${process.env.NODEMAILER_EMAIL}>`,
      to: email,
      subject: "verify account",
      html: ` <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Hello,</p>
      <p>Please click the following link to verify your email:</p>
      <p><a href="${confirmLink}" style="color: #1a73e8;">Verify Email</a></p>
      <p>If you didn’t request this verification, you can safely ignore this email.</p>
      <p>Best regards,<br>plumbazar</p>
    </div>`,
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
      host: "smtpout.secureserver.net", // GoDaddy SMTP server
      port: 587, // Use 587 for TLS
      secure: false, // Use true for SSL (port 465)
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "New Rfq request",
      html: ` <p>Hello,</p>
    <p>You have received a new RFQ request:</p>
    <p>Best regards,<br />plumbazar</p> `,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email Sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const SendAdminOrderNotification = async (email, createdOrder) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net", // GoDaddy SMTP server
      port: 587, // Use 587 for TLS
      secure: false, // Use true for SSL (port 465)
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "New Rfq request",
      html: ` <p>Hello,</p>
    <p>You have received a new order request:</p>
    <p>id:${createdOrder.id}</p>
    <p>Total:${createdOrder.total}</p>
    <p>Address:${createdOrder.address}</p>
    <p>Best regards,<br />plumbazar</p> `,
    };

    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
