import React from "react";
import './AddNote.css';
import {useActions} from '../hooks/UseActions';

interface AddNoteProps {
    previousNoteId: string | null;
    forceVisible?: boolean;
}

const AddNote: React.FC<AddNoteProps> = ({forceVisible, previousNoteId}) => {
    const {insertNoteAfter} = useActions();

    return (
        <div className={`add-note ${forceVisible && 'force-visible'}`}>
            <div className="add-buttons">
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={() => insertNoteAfter(previousNoteId)}
                >
                    <span className="icon is-small"><i className="fas fa-plus"/></span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddNote;
