import React, {Fragment, useEffect} from 'react';
import './NotesList.css';
import {useTypedSelector} from '../hooks/UseTypedSelector';
import NotesListItem from './NotesListItem';
import AddNote from './AddNote';
import {useActions} from '../hooks/UseActions';

const NotesList: React.FC = () => {
    const notes = useTypedSelector(({notes: {order, data}}) => order.map((id) => data[id]));
    const {fetchNotes} = useActions();

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const renderedNotes = notes.map((note) => (
        <Fragment key={note.id}>
            <NotesListItem note={note}/>
            <AddNote previousNoteId={note.id}/>
        </Fragment>
    ));

    return (
        <div className="note-list">
            <AddNote forceVisible={notes.length === 0} previousNoteId={null}/>
            {renderedNotes}
        </div>
    );
};

export default NotesList;
