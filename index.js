const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const path = require ('path');
const chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

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

// create route
app.post('/chats',(req,res)=>{
    let {from, To , Message} = req.body;
    let newChats = new chat({
        from : from,
        To : To,
        Message : Message,
        created_at : new Date() 
    });
   newChats.save().then((res)=>{
    console.log("chat was saved");
   }).catch(err => {console.log(err)});

    res.redirect("/chats");
})

//Edit route
app.get('/chats/:id/edit',async(req,res)=>{
    let {id} = req.params;
    let chats = await chat.findById(id);
    res.render("edit.ejs",{ chats });
})

//Update Route
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {Message : newMsg} = req.body;
    let uchat = await chat.findByIdAndUpdate(id,{Message : newMsg},{runValidators : true, new : true});
    console.log(uchat);
    res.redirect("/chats");
})

//Destroy Route
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let dchat = await chat.findByIdAndDelete(id);
    console.log(dchat);
    res.redirect("/chats");
})

// new chats route
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
})

app.get("/",(req,res) => {
    res.send("Root is working");
});

app.listen (8080,()=>{
    console.log("Server is listening on port 8080");
})