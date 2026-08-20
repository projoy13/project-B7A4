import express, { type Application } from 'express'
import { notFound } from './middleware/notfound';
import { globalErrorHandler } from './middleware/global-error';
const app:Application=express();
// const app=express()


app.get("/",(req,res)=>{
    res.send('server is running')
})
app.use(globalErrorHandler)
app.use(notFound)
export default app;