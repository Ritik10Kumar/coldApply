const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config(); // Load .env variables

// === CONFIGURATION ===
// const senderEmail = 'ritik10kumar@gmail.com';         // Your email
// const senderPassword = 'ksfc nvvh uigb zrkh';  //my app password          // App password (not your main email password)

const senderEmail = process.env.EMAIL;
const senderPassword = process.env.EMAIL_PASSWORD;
const resumePath = path.join(__dirname, 'Ritik_Kumar.pdf'); // Replace with your resume file name

const subject = 'Applying for Node.js Developer';
const message = `Hello
I'm writing to express my interest in the Node JS Developer role with 3.5 years of experience in Node.js, MongoDB, PostgreSQL, JavaScript, and System Design. I’ve contributed to building scalable, high-performance applications in agile teams.

I've attached my resume for your review and would appreciate the opportunity to discuss how I can add value to your team.

Looking forward to hearing from you.

Best regards,
Ritik Kumar`;

// === ALL RECIPIENTS IN ONE EMAIL ===
const recipientEmails = [
  'bexaf60817@cotigz.com'
]; // You can add more emails

// === FUNCTION TO SEND EMAIL ===
async function sendResume(recipients) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const mailOptions = {
      from: `"Ritik Kumar" <${senderEmail}>`,
      to: recipients.join(','),
      subject,
      text: message,
      attachments: [
        {
          filename: 'Ritik_Kumar.pdf',
          path: resumePath,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to: ${recipients.join(', ')}`);
    console.log('📬 Response:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

// === SEND TO ALL ===
sendResume(recipientEmails);
