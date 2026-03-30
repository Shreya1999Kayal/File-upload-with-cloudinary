require("dotenv").config()

const mongoose = require("mongoose")
const Mongo_URl = process.env.Mongo_URl


const databaseConnection = async () => {
    try {
        const connected = await mongoose.connect(Mongo_URl)
        if (connected) {
            console.log("Database is successfully connected.")
        }
        else {
            console.log("Database is not successfully connected.")
        }

    }

    catch(err){
        console.log(err)
    }
    
}

module.exports = databaseConnection