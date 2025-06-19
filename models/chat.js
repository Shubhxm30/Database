const mongoose = require ('mongoose');

const chatSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    To : {
        type : String,
        required : true
    },
    Message : {
        type : String,
        maxLength : 50
    },
    created_at : {
        type : Date,
        required : true
    }
})

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;