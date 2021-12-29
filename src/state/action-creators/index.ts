import {Dispatch} from 'redux';
import axios from 'axios';
import {ActionType} from '../action-types';
import {
    UpdateNoteAction,
    DeleteNoteAction,
    MoveNoteAction,
    InsertNoteAfterAction,
    Direction,
    Action,
} from '../actions';
import {Note} from '../note';
import {RootState} from '../reducers';

export const updateNote = (id: string, content: string): UpdateNoteAction => {
    return {
        type: ActionType.UPDATE_NOTE,
        payload: {
            id,
            content,
        },
    };
};

export const deleteNote = (id: string): DeleteNoteAction => {
    return {
        type: ActionType.DELETE_NOTE,
        payload: id,
    };
};

export const moveNote = (id: string, direction: Direction): MoveNoteAction => {
    return {
        type: ActionType.MOVE_NOTE,
        payload: {
            id,
            direction,
        },
    };
};

export const insertNoteAfter = (id: string | null): InsertNoteAfterAction => {
    return {
        type: ActionType.INSERT_NOTE_AFTER,
        payload: {
            id
        },
    };
};

export const fetchNotes = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({type: ActionType.FETCH_NOTES});
        try {
            const {data}: { data: Note[] } = await axios.get('/notes');
            dispatch({
                type: ActionType.FETCH_NOTES_COMPLETE,
                payload: data,
            });
        } catch (err) {
            let errorMessage = "Failed!";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            dispatch({
                type: ActionType.FETCH_NOTES_ERROR,
                payload: errorMessage,
            });
        }
    };
};

export const saveNotes = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
        const {
            notes: {data, order},
        } = getState();
        const notes = order.map((id) => data[id]);
        try {
            // await axios.post('/notes', {notes});
            console.log("await axios.post('/notes', {notes})", {notes})
        } catch (err) {
            let errorMessage = "Failed!";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            dispatch({
                type: ActionType.SAVE_NOTES_ERROR,
                payload: errorMessage,
            });
        }
    };
};
