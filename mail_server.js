// const SMTPServer = require("smtp-server").SMTPServer;

// const options = {
//   secure: true,
//   key: fs.readFileSync("private.key"),
//   cert: fs.readFilesync("server.crt"),
// };

// const server = new SMTPServer(options);

// server.listen(465);
const senderInfo = require("./config/senderinfo.json");
const nodemailer = require("nodemailer");
console.log(process.env)

// async..await is not allowed in global scope, must use a wrapper
function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  const params = {
    toEmail: "xpfjrnseks1@naver.com",
    subject: "타이틀 테스트",
    text: "와우",
  };

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: senderInfo.user, // generated ethereal user
      pass: senderInfo.pass, // generated ethereal password
    },
  });

  const mailOptions = {
    from: senderInfo.user,
    to: params.toEmail,
    subject: params.subject,
    text: params.text,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  // console.log("Message sent: %s", info.messageId);
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main();
