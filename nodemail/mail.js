const nodemailer = require('nodemailer')

var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
console.log(formatted)


const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
	user : 'xxxxxxxxxxxx',
	pass : 'xxxxxxxxxxx'
    }
});

console.log("dinesh is a good boy");

let mailOptions = {
	from : "Dinesh Adhithya",
	to : "dinesh10c04@gmail.com",
	subject : "MacBook Login Alert",
	text : "Logged in to MacBook at " + formatted,
};

transporter.sendMail(mailOptions, (err, infor)=>{
	if (error) {
            console.log(error);
        }
	
	console.log("Super")
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
})
