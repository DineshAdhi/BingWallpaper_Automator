var firebase = require('firebase')
var fs = require('fs')
var gcs = require('@google-cloud/storage')
var exec = require('child_process').exec;
var config = {
    // credentials
};
firebase.initializeApp(config);
var auth = firebase.auth();
var database = firebase.database();
auth.signInAnonymously();

const storage = gcs({
    projectId : 'face-detection-console',
    keyFilename : '~/.keys/service_account_key.json'
})

var bucket = storage.bucket("face-detection-console.appspot.com")
var file = bucket.file('images/screenshot.jpg')


auth.onAuthStateChanged((user) => {

    if(!user){
        console.log("Error user signing in");
        return;
    }

    database.ref('isOnline').set(1);

    database.ref('shut_down').on('value', (snapshot) => {
        if(snapshot.val() == 1) {
            console.log("Shut down command Initiated");
            var command = "osascript -e 'tell application \"System Events\" to shut down' "
            return exec(command, (err, stdout, stderr)=>{
                console.log(err)
                console.log(stdout)
                console.log(stderr)
                database.ref('shut_down').set(0);
            })
        }
    })

    database.ref('close_all').on('value', (snapshot) =>{
        if(snapshot.val() == 1){
            console.log("Close all command intiated");
            var command = 'open /Applications/Close_all.app/'
            exec(command, (err, stdout, stderr) =>{
                console.log(err)
                console.log(stdout)
                console.log(stderr)
                database.ref('close_all').set(0);          
            })
        }
    })

    database.ref('take_screenshot').on('value', (snapshot) =>{
        if(snapshot.val() == 1) {
            console.log("Screen shot command initiated");
            var command = 'screencapture ~/.bing/Total_Control/screenshot.jpg';
            exec(command, (err, stdout, stderr) => {

                fs.createReadStream('screenshot.jpg').pipe(file.createWriteStream()).on('err', (err)=>{
                    console.log(err)
                }).on('finish', ()=>{
                    console.log("Uploaded")
                    database.ref('screenshot_url').set("https://storage.googleapis.com/face-detection-console.appspot.com/screenshot.jpg")
                    database.ref('take_screenshot').set(0);
                })
            })
        }
    })

    database.ref('isOnline').onDisconnect().set(0);

})



