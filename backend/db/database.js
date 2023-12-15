const mongoose = require("mongoose")

const connectToMongo = ()=> {
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true}).then((data)=>{
        console.log("Mongodb connect to server");
    })
}

module.exports = connectToMongo;