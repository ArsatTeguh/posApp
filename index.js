import express from 'express'
import cors from 'cors'
import FileUpload from 'express-fileupload'
import Product from './src/router/productRoute.js';


const app = express();

app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.json())
app.use(FileUpload())
app.use('/', Product);
app.use(express.static("public"))


export default app