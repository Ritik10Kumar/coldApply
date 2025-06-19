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
I'm writing to express my interest in the Node JS Developer role with 3.5 years of experience in Node.js, Express.js, MongoDB, PostgreSQL, JavaScript, and System Design. I've contributed to building scalable, high-performance applications in agile teams.

I am immediately available to join and excited about the opportunity to contribute to your team.

I've attached my resume for your review and would appreciate the opportunity to discuss how I can add value to your team.

Looking forward to hearing from you.

Best regards,
Ritik Kumar
ritik10kumar@gmail.com | 8193045571`;

const recipientEmails = [
  // 'career@authenticode.in',                 //7347456069
  // 'khushboo.chandwani@innvonix.com',
  // 'hr@limitlessmobil.com',
  // 'hr@aziles.com',                          //011-39217888
  // 'nidhi.patel@esparkbizmail.com',
  // 'radhika.n@mishainfotech.com',            //8748809846
  'pragati.mishra@uffizio.com',
  // 'hr@ripenapps.com',                       //965-381-1015
  // 'connect@innovaesi.com',                  //18001027233
  // 'pallavichauhan@luminoguru.com',
  // 'rubal.c@brilworks.com',
  // 'plexigenius@gmail.com',
  // 'allanchi.chaturvedi@tcs.com',
  // 'shreya.gupta@nisvan.co.in',
  // 'career@rwebsys.com',
  // 'india@pmsconsulting.in',      //9910263764
  // 'shubhangi@samvidsearch.com',
  // 'prerna.sinha@epicip.com',
  // 'Prerna.sinha@epicip.com',
  // 'Neha.m@thinkbridge.in',
  // 'neha.m@thinkbridge.in', 
  // 'info@startelelogic.com',
  // 'poorva.bhatt@yash.com',
  // 'hr@technithunder.com',
  // 'careers@techygeekhub.com',
  // 'hr@thinkwik.com',                //9888318989
  // 'careers@algoworks.com',
  // 'niha@recru.in', 
  // 'hr@samosys.com',
  // 'rohit@eminenceinfotech.com',    // 7566514634
  // 'contactus@aieze.in',
  // 'anirban.das@ansyst.in',         //9811145524
  // 'Vaidehi@nexlance.co.in',
  // 'Shrikantpandey781@gmail.com',
  // 'janhavi.vyas@hiteshi.com',
  // 'hr@truefirms.co',
  // 'gunveen.sharma@thewitslab.com',
  // 'ritika.singh1@genpact.com',
  // 'vartika@infowindtech.com',
  // 'deepti.singhal@quanteon.in',
  // 'srikumaran@vikgol.com',
  // 'hrops@ldttechnology.com',
  // 'divya.pawar@dcsplus.net',
  // 'haritaa.menon@thoughtworks.com',
  // 'hr@ankyahnexus.com',
  // 'careers@shopalyst.com',
  // 'careers@consiliuminc.com',
  // 'talent.acquisition@delhivery.com',
  // 'simarpreet.kaur@thewitslab.com',
  // 'princy1.jain@ril.com',
  // 'vallabh.garg@ril.com',
  // 'business@recrivio.com',
  // 'hemanth@sunrisesys.com',
  // 'hr@weare86.com',
  // 'Yasha.s@sarv.com',
  // 'tanvi.saxena@delphic.in',
  // 'hr@kiwitech.com',
  // 'careers@codeaegis.com',
  // 'soumyarab.dutta@collegedunia.com',
  // 'jobs@getnaukri.co.in',
  // 'ishika.bansal@cashkaro.com',
  // 'shreya.tameta@gmail.com',
  // 'simran.kaur@zemosolabs.com',
  // 'jobs@delisystechnologies.com',
  // 'business@neogencode.com',    //9205543611   shivank bhardwaj
  // 'info@themarcomavenue.com',    //9650967733 , 8448890347 , 8448890344
  // 'career@blueberryeservices.in',
  // 'kajal.bhardwaj@cozzera.in',
  // 'gagan.shrivastava@techstalwarts.com',
  // 'ankitadwivedi@mactosys.com',
  // 'tanshu.mactosys@gmail.com',
  // 'apply@gmware.com',          //80500-30000
  // 'hr.prachishah@gmail.com',   //6268890878
  // 'career@codeverseit.in',
  // 'careers@vayuz.com',
  // 'jobs@nineleaps.com',
  // 'nabamita.chakraborty@hiremore.in',
  // 'contact@tychotechnologies.in',
  // 'santanu_chakraborty@epam.com',
  // 'aravind@codeupglobal.com', // sent personally email 05052025   //7418815440
  // 'dayakar.maisa@jobifynn.com',
  // 'hr@redhibiscusinfo.com',
  // 'hr@guenstiger.in',
  // 'contact@vega6.com',
  // 'info@magadh.tech',
  // 'careers@gomassive.org',
  // 'taindia@gohiretech.com',
  // 'careers@batterysmart.in',
  // 'abhishek.sharma@bellurbis.com',
  // 'jobs@manektech.com',
  // 'hr@appsinvo.com',
  // 'careers@alahlymomkn.com',
  // 'hr@vikgol.com',
  // 'pooja.dikshit@bridginggaps.co.in',
  // 'devika@ielektron.com',
  // 'anusha@ielektron.com',
  // 'kanchan.tigga@thewitslab.com',
  // 'Hi@HRYaar.com',
  // 'magnifyhrsolution@gmail.com',
  // 'info.winzons@gmail.com',
  // 'shankary.a@bridge-global.com',
  // 'dharinees@orionesolutions.com',
  // 'hr@terbaiks.com',
  // 'mahima@codobux.com',
  // 'careers@cashkaro.com',
  // 'recruitment@mtap.in',
  // 'hr@delemontstudio.com',
  // 'hr@technodeviser.com',
  // 'hr@weevolve.ai',
  // 'hr@zentosys.ai',
  // 'hr@cyberpoint.co',
  
  // 'hr@mrproptek.com',             // mail received
  // 'Akanksha.mittal@chicmicstudios.in',   // mail received
  // 'jocelwettstein3@gmail.com',    //mail received
  // 'helenalin9063@gmail.com',
  // 'hr@fiellements.com', // received mail
  // 'karan.trehan@esmagico.in',
  // 'manali@uplers.com', //position close
  // 'bhanu@queuebuster.co', //waste
  // 'hrroshanijha@gmail.com', // waste 
  // 'Apply@mounttalent.com', // waste
  // hr@primathon.in               //interview done
  // career@sparxitsolutions.com   //interview done
  // 'lockheedmartinrecruiteragency@gmail.com', // waste 
  // 'contact@avinya-labs.com',  // not working 
  // 'career@appinventiv.com', // no vacancy here right now get  reply (29/04/2025)
  // 'hr@unicoconnect.com', // no suitable profile

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





