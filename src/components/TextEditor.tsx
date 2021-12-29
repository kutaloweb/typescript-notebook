import React, {useState, useEffect, useRef} from 'react';
import './TextEditor.css';
import MDEditor from '@uiw/react-md-editor';
import {Note} from '../state';
import {useActions} from '../hooks/UseActions';

interface TextEditorProps {
    note: Note;
}

const TextEditor: React.FC<TextEditorProps> = ({note}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const {updateNote} = useActions();

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            }
            setEditing(false);
        };
        document.addEventListener('click', listener, {capture: true});
        return () => {
            document.removeEventListener('click', listener, {capture: true});
        };
    }, []);

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>
                <MDEditor
                    value={note.content}
                    onChange={(userInput) => updateNote(note.id, userInput || '')}
                />
            </div>
        );
    }

    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={note.content || 'Click to edit'}/>
            </div>
        </div>
    );
};

export default TextEditor;
