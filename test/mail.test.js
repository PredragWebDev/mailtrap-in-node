const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const Mail = require('../mail');
chai.use(chaiAsPromised);
const { expect } = chai;

describe('Mail', () => {
  let mail;
  let mock;

  beforeEach(() => {
    mail = new Mail('a811c109d5e6f03bffc927e0497db3ee');
    mock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should send email', async () => {
    let email = {
      from: { name: 'Sender', email: 'test@gmail.com' },
      to: { name: 'Recipient', email: 'leobrown0921@gmail.com' },
      subject: 'Test',
      text: 'This is a test email',
      html: '<p>This is a test email</p>',
      attachments: [{ filename: 'test.txt', path: './test.txt' }],
    };

    mock.onPost('/inbox/2302991/messages').reply(200, { success: true });

    let result = await mail.send(email.from, email.to, email.subject, email.text, email.html, email.attachments);
    expect(result.success).to.be.true;
  });
});
