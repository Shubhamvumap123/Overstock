
const app = require('./index');

const connect = require("./config/db");

app.listen(4000, async()=>{
    try{
        await connect();
        console.log("Listening on ports 4000.......")

    }catch(err){
        console.log("Something went to server folder please check that ")
    }
})