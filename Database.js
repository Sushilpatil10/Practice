const mongoose =require('mongoose');
require('dotenv').config()


   const connectDb =async()=>{
     try{
        //  await mongoose.connect('mongodb://localhost:27017/onemorepush')
           mongoose.connect(process.env.Mongo_url)
         console.log("database has been connected")
        }
        catch(err){
            console.log("Connection failed :" ,err);
        }

        
   }

   connectDb();



// const connectDb = async()=>{

//     await mongoose.connect('mongodb://localhost:27017/onemorepush')
// }

// for then and catch
// connectDb()
// .then(()=>{
//     console.log("MogoDB has been Connected")
// })
// .catch((err)=>{
//     console.log(err);
// })

module.exports ={connectDb};