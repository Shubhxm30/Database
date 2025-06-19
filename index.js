const express = require ('express');
const app = express();
const mongoose = require ('mongoose');
const path = require ('path');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

main().then((res)=>{console.log("connection succesful")})
.catch(err=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/WhatsApp");
}

app.get("/",(req,res) => {
    res.send("Root is working");
});

app.listen (8080,()=>{
    console.log("Server is listening on port 8080");
})