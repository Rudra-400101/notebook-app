const mongoose=require('mongoose')
const url='mongodb://127.0.0.1:27017/notebook'

const mongoConnection=()=>{
    mongoose.connect(url).then(()=>{console.log('connection successful with mongoose')})
}
module.exports=mongoConnection;