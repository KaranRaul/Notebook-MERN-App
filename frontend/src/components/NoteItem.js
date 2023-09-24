import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import EditNote from './EditNote';

const NoteItem = (props) => {
  const { note } = props;
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;

  const [bool, setBool] = useState(false);

  const handleClick = () => {
    console.log(note._id);
    setBool(true);
  }

  return (
    <div className='col-md-3' >
      {/* style={{ "width": "45rem" }} */}

      <div className="card my-3">


        <div className="card-body">
          {bool && <EditNote id={note._id} />}
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div onClick={() => { deleteNote(note._id) }}>
            <i className="fa-solid fa-trash mx-3" ></i>
          </div>
          <div onClick={handleClick}>
            <i className="fa-regular fa-pen-to-square mx-3" ></i>
          </div>
        </div>
      </div>
    </div >
  )
}

export default NoteItem
