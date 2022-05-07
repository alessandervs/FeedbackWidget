import nodemailer from 'nodemailer'
import { MailAdapter, SendmailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4a038175d0cb3a",
      pass: "e0ffcb6ebf6d45"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendmailData) {
        await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Alessander Victor <sanderpant1@gmail.com>',
        subject: subject,
        html:body,
    })

    }

}