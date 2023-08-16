const jwt = require("jsonwebtoken")
const SECRET_TOKEN="rudrasingh@123"

const fetchuser= (req,res,next)=>{
// get user from the jwt token and add id to req object
const token = req.header('auth-token');
if(!token){
    res.send(401).send({error:"please authenticat using a valid token"})
}
try{
    const data = jwt.verify(token,SECRET_TOKEN)
    req.user=data.user
        next()

}catch(error){
    res.status(401).send({error:"please authenticat using a valid token"})

}
}

module.exports = fetchuser;