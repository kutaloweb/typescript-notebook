import {combineReducers} from 'redux';
import notesReducer from './notesReducer';

const reducers = combineReducers({
    notes: notesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
