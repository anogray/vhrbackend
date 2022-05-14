import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./config.js";
import employeeRoute from "./routes/employeeRoute.js";
import cors from "cors";
import path from 'path';
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
app.use(morgan('tiny'));


mongoose.connect(config.MONGODB_URL ,
{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{

if(err) return console.error(err);

console.log("Connected to MongoDb");
});

const PORT = process.env.PORT || 3002;

app.get("/",(req,res)=>{
    return res.send("server accessible");
})


//Posts Routes
app.use("/api/employees",employeeRoute);



app.listen(PORT, ()=> console.log(`Server is running up at ${PORT}`));
