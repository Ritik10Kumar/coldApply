const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Load .env variables

// === CONFIGURATION ===
const senderEmail = process.env.EMAIL;
const senderPassword = process.env.EMAIL_PASSWORD;
const resumePath = path.join(__dirname, 'RitikKumar.pdf');
const logFilePath = path.join(__dirname, 'email_status.txt');

const subject = 'Applying for Node.js Developer';
const message = `Hello
I am writing to express my interest in the Node.js Developer role. I have 3.5 years of experience working with Node.js, MongoDB, PostgreSQL, JavaScript, Kafka and System Design. During this time, I have contributed to the development of scalable, high-performance applications within agile teams.

My current CTC is ₹9 LPA, and I am seeking a CTC of ₹13 LPA. I am currently based in Gurgaon and available to join immediately.

I have attached my resume for your review. I would appreciate the opportunity to discuss how my experience and skills can contribute to your team.

Looking forward to hearing from you.

Best regards,
Ritik Kumar
ritik10kumar@gmail.com | 8193045571`;

const recipientEmails = [
  'hiring@akamai.com',
  'hr@codetribesolutions.com',
  'techeruditehr@getMaxListeners.com',   // 7383590522
  'nidhi@nomadcredit.com',
  'hiring.wamasoftware@gmail.com',
  'connect@innovaesi.com',     //1800-102-7233
  'career@worldwebtechnology.com',
  'hr@aipxperts.com',    //9099985430
  'maheshwari.pandya@aipxperts.com',
  'support@maxifysolution.com',
  'hr@thinkwik.com',    //9888318989
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
        filename: 'RitikKumar.pdf',
        path: resumePath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Sent to ${to}`);
    await logStatus(to, 'Pass', info.response, info.messageId, subject);
    // await logStatus(to, 'Pass');
  } catch (error) {
    console.error(`❌ Failed to send to ${to}:`, error.message);
    await logStatus(to, 'Fail', error.message, '', subject);
    // await logStatus(to, 'Fail');
  }
}

// === FUNCTION TO LOG STATUS ===
function logStatus(email, status, response = '', messageId = '', subject = '') {
  const now = new Date();
  const timestamp = now.toISOString().split('.')[0];
  const log = `${timestamp} - ${email} - ${status} - Response: ${response} - Message-ID: ${messageId} - Subject: ${subject}\n`;
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
