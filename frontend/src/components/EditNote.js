import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import Alert from './Alert';

const EditNote = (props) => {
    const context = useContext(noteContext);
    const { editNote } = context;
    const { id } = props;

    const [note, setNote] = useState({ "title": "", "description": "", "tag": "DEF" });
    const handleClick = (e) => {

        // e.preventDefault();
        editNote(id, note);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-4">
                <h1>Edit A Note</h1>
                <form>
                    <div class="mb-3">
                        <label for="title" class="form-label"> Title </label>
                        <input type="text" class="form-control" id="title" name='title' onChange={onChange} aria-describedby="emailHelp" />

                    </div>
                    <div class="mb-3">
                        <label for="description" name="description" class="form-label">Description</label>
                        <input type="text" class="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={handleClick}>Edit Note</button>
                </form>
            </div >

        </div >
    )
}

export default EditNote
