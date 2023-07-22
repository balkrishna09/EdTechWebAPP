const nodemailer = require("nodemailer");

const mailSender = async(email, title, body) =>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from:"Balkrishna StudyNotion",
            to:`${email}`, // list of receivers
            subject: `${title} - Balkrishna`,
            text: `Hello,\n\n ${body}\n\nThank You!`
        })
        
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = mailSender;