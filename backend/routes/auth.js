const express = require("express");
const userModel = require("../models/UserDetailes");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const SECRET_TOKEN="rudrasingh@123"

//create a user using POST "./api/auth" does'nt require auth

router.post(
  "/signup",
  [
    body("name", "enter your name which length is more than 3").isLength({
      min: 3,
    }),
    body("email","Enter a Valid Email").isEmail(),
    body("password", "make your password maore than 8 character").isLength({
      min: 8,
    }),
  ],

  async (req, res) => {
    let success=false;
      // if there are error return bad request
      const result = validationResult(req);
      if (!result.isEmpty()) {
          return res.status(400).json({success,errors: result.array() });
        }

        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
          
            return res.status(400).json({success, error: "eamil already has been taken" });
        }
        
        // use salt for password protection
        
        const salt = bcrypt.genSaltSync(10);
        securePass = await bcrypt.hash(req.body.password, salt);
        
        // get data and save it in db
        
        user=await userModel
        .create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
        })
        .catch((err) => console.log(err));
      
      // get id from data base and send it to jwt token

    const data = {
      user: {
        id:user.id,
      }
    };
    
    // use jwt token for generate token 
    
    const authToken = jwt.sign(data,SECRET_TOKEN);
    success=true
    res.json({success,authToken});
   console.log(data.user);
}
);

// login system

router.post(
    "/login",
    [
      body("email","Enter a Valid Email").isEmail(),
      body("password", "make your password maore than 8 character").isLength({
        min: 8,
      }),
    ],
    async (req, res) => {
      let success=false;
        // if there are error return bad request
        
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
          }
   // mking login system
   const {email,password} = req.body;
   try {
   let userLogin=await userModel.findOne({email})
   if(!userLogin){
   return res.status(400).json({success,error:"please login with corect details"})
   }
   const passwordCompare= await bcrypt.compare(password,userLogin.password)
   if(!passwordCompare){
    
   return res.status(400).json({success,error:"please login with correct details"})
   }

  const data = {
    user: {
      id:userLogin.id,
    }
  };
   
   // use jwt token for generate token 
   
   const authToken = jwt.sign(data,SECRET_TOKEN);
   success=true
   res.json({success,authToken});
   }
   catch(err){
   console.error(err.message);
   res.status(500).send('internal server error')

}
    });

    // get data from user
    router.post(
      "/getuser",
      fetchuser,
      async (req, res) => {
try{
 const userId=req.user.id
const user = await userModel.findById(userId)
res.send(user)

} catch(err){
  console.error(err.message);
  res.status(500).send('internal server error')

}
      })
module.exports = router;
