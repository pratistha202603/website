import dotenv from "dotenv/config"
import app from "./app.js"
import connectDB from "./db/index.js"
import nodemailer from "nodemailer"

const port = process.env.PORT || 3000;


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example App is Listening on port ${port}`);
            
        });
    })
    .catch((err) => {
        console.log(`MomgoDB Connection Error ${err}`);
        process.exit()    
    })      
