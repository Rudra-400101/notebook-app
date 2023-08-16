import noteContext from "../context/notes/notecontext";
import React, { useContext, useRef,useState,useEffect } from "react";
import NoteItem from "./noteitem";
import AddNote from "./addnote";
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
const navigate=useNavigate()
  const host = "http://localhost:5000";
  const context = useContext(noteContext);
  const [newNotes, setNotes,getNote] = context;
  const ref=useRef(null);
  useEffect(()=>{
        if(localStorage.getItem('token')){
        getNote()
      
        }else{
navigate("/login")
props.showAlert("please firstly login with your email and password or create new","warning")
        }
        // eslint-disable-next-line
      },[]);

  const [note, setNote] = useState({ "etitle": "","etag":"", "edescription": "" });
  const handleClick = () => {
    editNote(note.id,note.etitle,note.etag,note.edescription);
    ref.current.click();
  };
  const onchange = (e) => {
    setNote({...note,[e.target.name]: e.target.value });
  };

  const updateBtn=(currentNote)=>{
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,etag:currentNote.tag,edescription:currentNote.description})
  }


  // add notes------------------------------------------
  const addNote =async (title,tag, description) => {
    // fetch api
    const response= await fetch(
      `${host}/api/notes/addnote`,
      {
        method:"POST",
        headers: {
          "content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        body:JSON.stringify({title,tag,description})
      });
      const json= await response.json()
      setNotes(newNotes.concat(json))
props.showAlert("your notes are added","success")

  };

  //delete note-------------------------------------------
  const deleteNote = async (id) => {
    // api call
   await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),

        },
      });
 const note=newNotes.filter((note)=>{
return note._id!==id
 })
    setNotes(note)
props.showAlert("your notes are deleted","success")

  };

  //edit note---------------------------------------------------------
  const editNote = async (id,title,tag,description) => {

    //fetch api
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),

        },
        body:JSON.stringify({title,tag,description})
      });
      const json=await response.json();
      console.log(json)

    //logic for edit-------------

    let upNote=JSON.parse(JSON.stringify(newNotes))
    for (let i = 0; i < upNote.length; i++) {
      const element = upNote[i];
      if (element._id === id) {
        upNote[i].title = title;
        upNote[i].tag = tag;
        upNote[i].description = description;
        break;
      }
    }
   setNotes(upNote)
   props.showAlert("your notes are updated","success")

  };

  
  return (
    <>
      <AddNote addNote={addNote} />
      
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form >
        <div className="my-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={note.etitle}
            placeholder="Here Write Your Title"
            onChange={onchange}
          />
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            value={note.etag}
            placeholder="Here Write Your Title"
            onChange={onchange}
          />
          <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            description
          </label>
          <textarea
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            rows={7}
            placeholder="write notes here"
            onChange={onchange}
            minLength={5} required

          />
        </div>
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" disabled={note.etitle.length<=2 || note.edescription.length<=4} onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-4">
     {newNotes.length >=1 ?  <h3>Your Notes</h3> : ""}
      
        {newNotes.map((notes, index) => {
          return <NoteItem notes={notes} key={index} updateBtn={updateBtn} deleteNote={deleteNote} editNote={editNote}/>;
        })}
      </div>
    </>
  );
}
