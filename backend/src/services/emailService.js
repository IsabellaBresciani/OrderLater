const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    sendEmail = async (email) => {
        try {
            const { to, subject, body } = email;
            await this.transporter.sendMail({
                to,
                subject,
                html: body,
            });
            return { success: true };
        } catch (error) {
            console.error('Error enviando email:', error);
            return { success: false, error };
        }
    };
}

module.exports = new EmailService();