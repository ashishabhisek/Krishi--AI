const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

const sendVerificationEmail = async (email, verificationLink) => {
  const html = `
    <h2>Verify Your KrishiAI Account</h2>
    <p>Click the link below to verify your email:</p>
    <a href="${verificationLink}">Verify Email</a>
    <p>This link expires in 24 hours.</p>
  `;
  return sendEmail(email, 'Verify Your KrishiAI Account', html);
};

const sendQueryResponseEmail = async (email, farmerName, queryTitle, response) => {
  const html = `
    <h2>Your Query Response - KrishiAI</h2>
    <p>Dear ${farmerName},</p>
    <p>Your query "<strong>${queryTitle}</strong>" has been answered:</p>
    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
      <p>${response}</p>
    </div>
    <p>Login to your account to view more details.</p>
  `;
  return sendEmail(email, `Query Response: ${queryTitle}`, html);
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendQueryResponseEmail,
};
