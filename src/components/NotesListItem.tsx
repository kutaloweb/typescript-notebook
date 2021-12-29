import React from "react";
import './NotesListItem.css';
import {Note} from '../state';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';

interface NoteListItemProps {
    note: Note;
}

const NotesListItem: React.FC<NoteListItemProps> = ({note}) => {
    let child: JSX.Element;
    child = (
        <>
            <TextEditor note={note}/>
            <ActionBar id={note.id}/>
        </>
    );
    return <div className="note-list-item">{child}</div>;
};

export default NotesListItem;
