const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const Mail = require('../mail');
require('dotenv').config();

const {USER, API_KEY, FROM, TO} = process.env

describe('Mail', () => {
  let mail;
  let mock;

  beforeEach(() => {
    mail = new Mail(USER, API_KEY);
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should send email', async () => {
    let email = {
      from: FROM ,
      to: TO ,
      subject: 'Test',
      text: 'This is a test email',
      html: '<p>This is a test email</p>',
      attachments: [{ filename: 'test.txt', path: './test.txt' }],
    };

    mock.onPost('/inbox/2302991/messages').reply(200, { success: true });

    let result = await mail.send(email.from, email.to, email.subject, email.text, email.html, email.attachments);
    console.log("result>>>", result);
  });
});
