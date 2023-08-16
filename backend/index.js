const mongoConnection = require('./db')
const express = require('express')
const cors = require('cors')
const app =express()
const port=process.env.PORT || 5000

mongoConnection();


app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/',(req,res)=>{
//     res.send("hello bro")
// })
app.listen(port,()=>{
    console.log(`your app is running on port ${port}`)
})