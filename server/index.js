const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/userDatabase", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("HomePage");
});

app.post("/login", (req, res) => {
  res.send("L");
});

app.post("/register", (req, res) => {
  console.log("Re");
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already Registered" });
      console.log("User exit")
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send("Error");
        } else {
          res.send({ message: "Done" });
        }
      });
    }
  });
});

app.post("/loginn", (req, res) => {
    const {username,password}=req.body;
    User.findOne({email:username},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Successfull",user:user})
            }
            else{
                res.send({message:"Password Wrong"})
            }
        }
        else{
            res.send({message:"user not found"})
        }
    })

})


app.listen(4000, () => {
  console.log("Server Started");
});
