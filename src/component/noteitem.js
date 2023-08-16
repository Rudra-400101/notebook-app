import React from 'react'

export default function noteitem(props) {
  return (
    <>
<div className="col-md-3">
     <div className="card">
  <div className="card-body">
    <h5 className="card-title">{props.notes.title}</h5>
    <p className="card-text">{props.notes.description}</p>
    <i className="fa-solid fa-trash-can" onClick={()=>{props.deleteNote(props.notes._id)}}></i>
    <i className="fa-solid fa-pen-to-square" onClick={()=>{props.updateBtn(props.notes)}}></i>
  </div>
</div>
</div>
    </>
  )
}
