import produce from 'immer';
import {ActionType} from '../action-types';
import {Action} from '../actions';
import {Note} from '../note';
import {v4 as uuid} from 'uuid';

interface NotesState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Note;
    };
}

const initialState: NotesState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const reducer = produce((state: NotesState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.SAVE_NOTES_ERROR:
            state.error = action.payload;
            return state;
        case ActionType.FETCH_NOTES:
            state.loading = true;
            state.error = null;
            return state;
        case ActionType.FETCH_NOTES_COMPLETE:
            state.order = action.payload.map((note) => note.id);
            state.data = action.payload.reduce((acc, note) => {
                acc[note.id] = note;
                return acc;
            }, {} as NotesState['data']);
            return state;
        case ActionType.FETCH_NOTES_ERROR:
            state.loading = false;
            state.error = action.payload;
            return state;
        case ActionType.UPDATE_NOTE:
            const {id, content} = action.payload;
            state.data[id].content = content;
            return state;
        case ActionType.DELETE_NOTE:
            delete state.data[action.payload];
            state.order = state.order.filter((id) => id !== action.payload);
            return state;
        case ActionType.MOVE_NOTE:
            const {direction} = action.payload;
            const index = state.order.findIndex((id) => id === action.payload.id);
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state;
            }
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id;
            return state;
        case ActionType.INSERT_NOTE_AFTER:
            const note: Note = {
                content: '',
                id: uuid(),
            };
            state.data[note.id] = note;
            const foundIndex = state.order.findIndex((id) => id === action.payload.id);
            if (foundIndex < 0) {
                state.order.unshift(note.id);
            } else {
                state.order.splice(foundIndex + 1, 0, note.id);
            }
            return state;
        default:
            return state;
    }
});

export default reducer;
