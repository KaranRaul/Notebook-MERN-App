import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote, getAllNotes } = context;
    const [note, setNote,] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();

        addNote(note);
        getAllNotes();
        setNote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-4">
                <h1>Add A Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"> Title </label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} aria-describedby="emailHelp" minLength={5} required />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" name="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required />
                    </div>

                    <button type="submit" disabled={note.title.length <= 5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
