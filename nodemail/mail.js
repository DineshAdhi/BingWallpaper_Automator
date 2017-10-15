const nodemailer = require('nodemailer')
var client = require('twilio')(
	"AC1ccf148e7ccc82129147b84249e29539",
	"6ef0a74e7bae4e9fed4887fc6d26c884"
)

var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
console.log(formatted)


const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
	user : 'dinesh10c04@gmail.com',
	pass : '3158233Dinesh'
    }
});

console.log("dinesh is a good boy");

let mailOptions = {
	from : "Dinesh Adhithya",
	to : "dinesh10c04@gmail.com",
	subject : "MacBook Login Alert",
	text : "Logged in to MacBook at " + formatted,
};

transporter.sendMail(mailOptions, (err, info)=>{
	if (err) {
            console.log(err);
        }
	
	console.log("Super")
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
})

client.messages.create ({
 from:+17865902350,
 to:'+919843789901',
 body : "You logged in to your MacBook Air on "  + formatted
})
.then((message) => console.log(message.sid))
.catch((err) => console.log(err));
