import {Dispatch} from 'redux';
import {Action} from '../actions';
import {ActionType} from '../action-types';
import {saveNotes} from '../action-creators';
import {RootState} from '../reducers';

export const persistMiddleware = ({dispatch, getState}: {
    dispatch: Dispatch<Action>;
    getState: () => RootState;
}) => {
    let timer: any;

    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action);

            if (
                [
                    ActionType.MOVE_NOTE,
                    ActionType.UPDATE_NOTE,
                    ActionType.INSERT_NOTE_AFTER,
                    ActionType.DELETE_NOTE,
                ].includes(action.type)
            ) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    saveNotes()(dispatch, getState);
                }, 250);
            }
        };
    };
};
