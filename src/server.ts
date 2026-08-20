import app from "./app";
import config from "./config";
const PORT=5000;

if(config.NODE_ENV !='production'){
  app.listen(PORT,()=>{
console.log(`server is running ${PORT}`)
})


} export default app
