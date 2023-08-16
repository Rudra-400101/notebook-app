const express = require('express')
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const userNotes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


// get notes form user after login using api/notes/fetchnotes
router.get('/fetchnotes',fetchuser,async (req,res)=>{
   try {
    const notes= await userNotes.find({user:req.user.id})
    res.json(notes)
   } catch (error) {
    res.status(500).json({error:"internal server error"})
   }
})

// add notes form user using api/notes/addnote
router.post('/addnote',fetchuser,[
    body("title", "enter your title which length is more than 3 letter").isLength({
        min: 3,
      }),
      body("description","enter your description which length is more than 5 letter").isLength({min:5})
    ],async (req,res)=>{
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      try {
        const {title,description,tag}=req.body;
        const note =new userNotes({
            title,description,tag,user:req.user.id
        });
        const saveNotes=await note.save()
        res.json(saveNotes)
      } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})

      }
})

// update notes form user using api/notes/fetchnotes

router.put('/updatenote/:id',fetchuser,[
],async (req,res)=>{
  const result = validationResult(req);
  if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    try {
      let {title,description,tag}=req.body;
    const updateNote={}
      if(title){updateNote.title=title};
      if(description){updateNote.description=description};
      if(tag){updateNote.tag=tag};

      let note=await userNotes.findById(req.params.id)
      if(!note){return res.status(404).send("not found")};
      if(note.user.toString() !== req.user.id){return res.status(401).send("not Allowed")};

      //use new true for update
      note = await userNotes.findByIdAndUpdate(req.params.id,{$set:updateNote},{new:true});
      res.json({success:"your note has been updated",note:note})

    } catch (error) {
      res.status(500).json({error:"internal server error"})
    }

    
  })

  // delete notes form user using api/notes/fetchnotes

router.delete('/deletenote/:id',fetchuser,[
],async (req,res)=>{
  const result = validationResult(req);
  if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      // find the note to be delete 
    let note=await userNotes.findById(req.params.id)
    if(!note){return res.status(404).send("not found")};

    //allow user who own this note
    if(note.user.toString() !== req.user.id){return res.status(401).send("not Allowed")};

    note = await userNotes.findByIdAndDelete(req.params.id);
    res.json({success:"your note has been deleted", note:note})
    } catch (error) {
      res.status(500).json({error:"internal server error"})
      
    }

  })
module.exports = router