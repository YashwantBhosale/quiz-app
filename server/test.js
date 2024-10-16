const {sendEmail} = require('./lib/sendEmail');

const content = 'Hello, this is a test email';
const subject = 'Test email';

try{
    sendEmail('yashwantbhosale07@gmail.com', subject, content);
    console.log('Email sent successfully');
}catch(e) {
    console.log(e);
}
    