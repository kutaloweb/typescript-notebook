import React from "react";
import './ActionBar.css';
import {useActions} from '../hooks/UseActions';

interface ActionBarProps {
    id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const {moveNote, deleteNote} = useActions();

    return (
        <div className="action-bar">
            <button
                className="button is-primary is-small"
                onClick={() => moveNote(id, 'up')}
            >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={() => moveNote(id, 'down')}
            >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={() => deleteNote(id)}
            >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
            </button>
        </div>
    );
};

export default ActionBar;
