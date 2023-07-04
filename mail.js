const axios = require('axios');
const nodemailer = require('nodemailer');

class Mail {
  constructor(apiKey) {
    this.apiKey = apiKey;
    // this.user
    this.transport = nodemailer.createTransport({
        // host: "sandbox.smtp.mailtrap.io",
        host: "https://api.mailtrap.io/v1",
        port: 2525,
        auth: {
            user: "5e6c4dbede19bf",
            pass: this.apiKey
        }
    });
    // this.mailtrapAPI = axios.create({
    //   baseURL: 'https://api.mailtrap.io/v1',
    //   headers: { 'Api-Token': this.apiKey },
    // });
  }

  async send(sender, recipient, subject, text, html, attachments) {
    //  Prepare attachments if any
    let preparedAttachments = [];

    if (attachments) {
      attachments.forEach((attachment) => {
        preparedAttachments.push({
          filename: attachment.filename,
          path: attachment.path,
        });
      });
    }

    
    // Prepare the email
    let email = {
        from: sender,
        to: recipient,
        subject,
        text,
        html,
        attachments: preparedAttachments,
    };
    try {
        // Send the email
        //   let response = await this.mailtrapAPI.post('/inbox/2302991/messages', email);
        let response = await this.transport.sendMail(email);
        console.log("test okay?")

      return response.data;
    } catch (err) {
      console.error("error>>>",err);
      throw err;
    }
  }
}

module.exports = Mail;
