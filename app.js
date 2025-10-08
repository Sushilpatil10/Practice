const express =require('express')
const app = express()
const path =require("path")
const methodOverride =require("method-override")
require('dotenv').config()
const {connectDb} =require('./Database')
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))


app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

//models  

const User  =require("./models/register")

app.get("/",(req,res)=>{
   res.send("The Home Page of My Website")
})

app.get("/register",(req,res)=>{
    res.render("register");
})

app.get("/show_users",async(req,res)=>{

     try{
        const  users = await User.find({})
          res.render("show_user",{users})
     }
     catch(err){
        console.log("error in show_users route");
        res.send("error in show_users route")
     }
})

app.get("/update/:id",async(req,res)=>{
    const {id} =req.params
    try{
            const user =await User.findById(id);
            res.render("update",{user})
    }
    catch(err)
    {
        console.log(err);
    }
   
})



app.post("/register",async(req,res)=>{

     console.log("Form data received:", req.body);

    try{
         const {name ,email,phone_no,birth_date,password} =req.body

       

            const newuser = new User({
            name,
            email,
            phone_no,
            birth_date
            })


          await newuser.save()
          console.log("new user created successfully")

          // passing the array of all users
        //   const  users = await User.find({})
        //   res.render("show_user",{users})
        res.redirect("show_users")
           
    }
    catch(err){
            console.log("something went wrong" ,err);
            res.send(err)
    }
  
})





app.delete("/delete/:id",async(req,res)=>{
    const {id} =req.params ;
    try{
          const user =await User.findByIdAndDelete(id)
          console.log("the user has been deleted",user)
          res.redirect("/show_users")
    }
    catch(err)
    {
        console.log("Something error occured to delete the user ",err)
    }
})

app.put("/update/:id",async(req,res)=>{
    
    const {id} =req.params;
    const {change} =req.body

    try{
         const updated_user = await User.findByIdAndUpdate(id ,{...change})
         console.log("user updated successfully")
         res.redirect("/show_users")
    }
    catch(err)
    {
        console.log(err);
        // res.send(err);
    }
})

app.listen(PORT ,()=>{
    console.log(`App is Listing on PORT No : ${PORT}`);
    
})