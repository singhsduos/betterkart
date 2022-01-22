const nodeMailer = require("nodemailer");


const sendMail = async (options) => {
    const transporter = nodeMailer.createTransport({
         // SMTP = Simple Mail Transfer Protocol
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);

}


module.exports = sendMail;