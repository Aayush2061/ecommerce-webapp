import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRouter from './routes/authRoute.js'

//configure env
dotenv.config()

//database config
connectDB()

//rest object
const app = express()

//middlewares
app.use(express.json());
app.use(morgan('dev'))

app.use('/api/v1/auth',authRouter);

//rest api
app.get('/',(req,res)=>{
    res.send('Welcome to my ecommerce site!');
})

//PORT
const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT,()=>{
    console.log(`Listning on port ${PORT}!`.bgBlue.white)
})