import nodemailer from 'nodemailer'
import config from '../config';

const emailSender = async (
    to: string,
    subject: string,
    html: string

) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: config.mailSender.email,
            pass: config.mailSender.app_password,
        },
    });

    await transporter.sendMail({
        from: '"Amar Bazar Online Shope" <mdroman45678910@gmail.email>',
        to,
        subject,
        html
    });
}

export default emailSender