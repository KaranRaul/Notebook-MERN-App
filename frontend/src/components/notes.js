import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getAllNotes } = context;
    useEffect(() => {
        if (localStorage.getItem('token'))
            getAllNotes();
        else {
            navigate("/");
        }
    }, [1000])
    return (
        <>
            <AddNote />
            <div className='row my-3'>
                <h1>Your Notes</h1>
                {
                    notes.length === 0 && <Alert messege="NO NOTE AVAILABLE" />
                }
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
