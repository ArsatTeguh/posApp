import express from 'express'
import cors from 'cors'
import FileUpload from 'express-fileupload'
import Product from './src/router/productRoute.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


const app = express();
app.use(cookieParser())
dotenv.config()
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(FileUpload())
app.use('/', Product);
app.use(express.static("public"))


export default app