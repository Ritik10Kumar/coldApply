const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Load .env variables

// === CONFIGURATION ===
const senderEmail = process.env.EMAIL;
const senderPassword = process.env.EMAIL_PASSWORD;
const resumePath = path.join(__dirname, 'Ritik_Kumar.pdf');
const logFilePath = path.join(__dirname, 'email_status.txt');

const subject = 'Applying for Node.js Developer';
const message = `Hello
I'm writing to express my interest in the Node JS Developer role with 3.5 years of experience in Node.js, MongoDB, PostgreSQL, JavaScript, and System Design. I’ve contributed to building scalable, high-performance applications in agile teams.

I've attached my resume for your review and would appreciate the opportunity to discuss how I can add value to your team.

Looking forward to hearing from you.

Best regards,
Ritik Kumar`;

const recipientEmails = [
  'recruitment@mtap.in',
  'career@appinventiv.com',
  'hr@delemontstudio.com',
  'hr@technodeviser.com',
  'hr@weevolve.ai',
  'hr@zentosys.ai'
];

// === FUNCTION TO SEND EMAIL ===
async function sendEmail(to) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  const mailOptions = {
    from: `"Ritik Kumar" <${senderEmail}>`,
    to,
    subject,
    text: message,
    attachments: [
      {
        filename: 'Ritik_Kumar.pdf',
        path: resumePath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Sent to ${to}`);
    await logStatus(to, 'Pass');
  } catch (error) {
    console.error(`❌ Failed to send to ${to}:`, error.message);
    await logStatus(to, 'Fail');
  }
}

// === FUNCTION TO LOG STATUS ===
function logStatus(email, status) {
  const now = new Date();
  const timestamp = now.toISOString().split('.')[0]; // Removes milliseconds and Z
  const log = `${timestamp} - ${email} - ${status}\n`;
  return fs.promises.appendFile(logFilePath, log);
}

// === MAIN FUNCTION TO LOOP THROUGH EMAILS ===
async function sendEmailsOneByOne(emails) {
  for (const email of emails) {
    await sendEmail(email);
  }
}

sendEmailsOneByOne(recipientEmails);







// const nodemailer = require('nodemailer');
// const path = require('path');
// require('dotenv').config(); // Load .env variables

// // === CONFIGURATION ===

// const senderEmail = process.env.EMAIL;
// const senderPassword = process.env.EMAIL_PASSWORD;
// const resumePath = path.join(__dirname, 'Ritik_Kumar.pdf'); // Replace with your resume file name

// const subject = 'Applying for Node.js Developer';
// const message = `Hello
// I'm writing to express my interest in the Node JS Developer role with 3.5 years of experience in Node.js, MongoDB, PostgreSQL, JavaScript, and System Design. I’ve contributed to building scalable, high-performance applications in agile teams.

// I've attached my resume for your review and would appreciate the opportunity to discuss how I can add value to your team.

// Looking forward to hearing from you.

// Best regards,
// Ritik Kumar`;

// // === ALL RECIPIENTS IN ONE EMAIL ===
// const recipientEmails = [
//   'recruitment@mtap.in',
//   'career@appinventiv.com',
//   'hr@delemontstudio.com',
//   'hr@technodeviser.com',
//   'hr@weevolve.ai',
//   'hr@zentosys.ai'
// ]; // You can add more emails

// // === FUNCTION TO SEND EMAIL ===
// async function sendResume(recipients) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: senderEmail,
//         pass: senderPassword,
//       },
//     });

//     const mailOptions = {
//       from: `"Ritik Kumar" <${senderEmail}>`,
//       to: recipients.join(','),
//       subject,
//       text: message,
//       attachments: [
//         {
//           filename: 'Ritik_Kumar.pdf',
//           path: resumePath,
//         },
//       ],
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✅ Email sent to: ${recipients.join(', ')}`);
//     console.log('📬 Response:', info.response);
//   } catch (error) {
//     console.error('❌ Error sending email:', error);
//   }
// }

// // === SEND TO ALL ===
// sendResume(recipientEmails);
