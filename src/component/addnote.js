import React, { useState } from "react";

export default function AddNote(props) {

  const [note, setNote] = useState({ "title": "","tag":"", "description": "" });
 

  const handleClick = (e) => {
    e.preventDefault();
    props.addNote(note.title,note.tag,note.description);
setNote({ "title": "","tag":"", "description": "" })
  };
  
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="my-3">
        <h2>Add Notes</h2>
      </div>
      <form onSubmit={handleClick}>
        <div className="my-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            placeholder="Here Write Your Title"
            onChange={onchange}
          />
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            placeholder="Here Write Your Title"
            onChange={onchange}
          />
          <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={7}
            value={note.description}
            placeholder="write notes here"
            onChange={onchange}
          />
        </div>
       
        <button disabled={note.title.length<=2 || note.description.length<=4} type="submit" className="btn btn-primary" >
          Add Note
        </button>
        </div>
      </form>
    </>
  );
}
