const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const path = require ('path');
const chat = require('./models/chat.js');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

main().then((res)=>{console.log("connection succesful")})
.catch(err=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

//Index route
app.get('/chats',async(req,res)=>{
    let chats = await chat.find();
    res.render("index.ejs", {chats} );
})

app.get("/",(req,res) => {
    res.send("Root is working");
});

app.listen (8080,()=>{
    console.log("Server is listening on port 8080");
})