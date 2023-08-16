import NoteContext from './notecontext'
import { useState } from 'react'

const NoteState=(props)=>{
    const host = "http://localhost:5000";
const notes =[]
    const [newNotes,setNotes]=useState(notes)
    
     //get note-----------------------------------
  const getNote =async () => {
    
    // fetch api
    const response = await fetch(
      `${host}/api/notes/fetchnotes`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),

        },
        body:JSON.stringify()
      });
      const json= await response.json();
    setNotes(json)
  };
    
return (
    <NoteContext.Provider value={[newNotes,setNotes,getNote]}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NoteState;
