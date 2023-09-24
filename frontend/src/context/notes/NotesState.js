import React from "react";
import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    const getAllNotes = async () => {
        const url = host + "/api/notes/fetchallnotes";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify()
        });

        const json = await response.json();
        console.log(json);
        setNotes(json);

    }


    //add a note
    const addNote = async (adNote) => {
        const url = host + "/api/notes/addnotes";
        const response = await fetch("http://localhost:5000/api/notes/addnotes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify(adNote)
        });
        getAllNotes();

    }

    //delete note
    const deleteNote = async (id) => {
        console.log(id);
        // const nn = notes.filter((note) => {
        //     if (note._id !== id)
        //         return true;
        // })

        // setNotes(nn);
        const url = host + "/api/notes/deletenote/" + id;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify()
        });
        getAllNotes();
        const json = await response.json();
        console.log(json);



    }

    //edit note
    const editNote = async (id, note) => {
        const url = host + "/api/notes/updatenote/" + id;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify(note)
        });
        console.log(note);
        const json = await response.json();
        getAllNotes();
    }

    const [token, setToken] = useState(localStorage.getItem('token'));





    return (
        <noteContext.Provider value={{ token, setToken, getAllNotes, notes, setNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </noteContext.Provider >
    )
}

export default NoteState;