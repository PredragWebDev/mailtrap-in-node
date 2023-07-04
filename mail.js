const nodemailer = require('nodemailer');

class Mail {
  constructor(user, apiKey) {
    this.apiKey = apiKey;
    this.user = user
    this.transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: this.user,
            pass: this.apiKey
        }
    });
  }

  async send(sender, recipient, subject, text, html, attachments) {

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
      let response = await this.transport.sendMail(email);

      return response.data;
    } catch (err) {
      console.error("error>>>",err);
      throw err;
    }
  }
}

module.exports = Mail;
