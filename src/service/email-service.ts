import nodemailer from "nodemailer";
export class MailService {
  static transporter = nodemailer.createTransport({
    host: "mail.mailtest.radixweb.net",
    port: 465,
    secure: true,
    auth: {
      user: "testdotnet@mailtest.radixweb.net",
      pass: "Radix@web#8"
    }
  });
  static async sendEmail(email: string, html: string) {
    var mailOptions = {
      from: "testdotnet@mailtest.radixweb.net",
      to: email,
      subject: 'Link',
      text: "Hello ,",
      html: html

    };
    await new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error);
        }
        else {
          resolve(null);
        }
      })
    }
    ).catch((error) => { throw new Error(error); });
  }
}