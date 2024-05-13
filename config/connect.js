const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/visionvault")
.then(()=>{
    console.log("db connected successfully")
})
.catch(()=>{
    console.log("error appear")
})

