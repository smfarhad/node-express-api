require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());
const userRouter = require("./api/users/user.router");


app.use("/api/tst",(req,res)=>{
    res.json({
    success:1,
    message:"This is res apis working"
    });
});
app.use("/api/users",userRouter);
app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running",process.env.APP_PORT);
});