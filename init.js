const mongoose = require('mongoose');
const chat = require('./models/chat.js');


main()
    .then((res) => {
        console.log("connection succesful")
    })
    .catch(err =>
        console.log(err)
    );

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

let allChats = [{
    from : "dev-team@org",
    To : "qa-team@org",	
    Message : "New build deployed, please test ASAP.",
    created_at : new Date()
},
{
    from : "git-bot",
    To : "admin@repo",
    Message : "Merge conflict in main branch.",
    created_at : new Date()
},
{
    from : "git-admin",
    To : "user@mobile",
    Message : "Your order #7890 has been shipped!",
    created_at : new Date()
},
{
    from : "shubham",
    To : "badu",
    Message : "This is your friend shubham hii !",
    created_at : new Date(),
}
];

chat.insertMany(allChats);