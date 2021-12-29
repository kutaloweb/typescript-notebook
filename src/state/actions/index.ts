import {ActionType} from '../action-types';
import {Note} from '../note';

export type Direction = 'up' | 'down';

export interface MoveNoteAction {
    type: ActionType.MOVE_NOTE;
    payload: {
        id: string;
        direction: Direction;
    };
}

export interface DeleteNoteAction {
    type: ActionType.DELETE_NOTE;
    payload: string;
}

export interface InsertNoteAfterAction {
    type: ActionType.INSERT_NOTE_AFTER;
    payload: {
        id: string | null;
    };
}

export interface UpdateNoteAction {
    type: ActionType.UPDATE_NOTE;
    payload: {
        id: string;
        content: string;
    };
}

export interface FetchNotesAction {
    type: ActionType.FETCH_NOTES;
}

export interface FetchNotesCompleteAction {
    type: ActionType.FETCH_NOTES_COMPLETE;
    payload: Note[];
}

export interface FetchNotesErrorAction {
    type: ActionType.FETCH_NOTES_ERROR;
    payload: string;
}

export interface SaveNotesErrorAction {
    type: ActionType.SAVE_NOTES_ERROR;
    payload: string;
}

export type Action =
    | MoveNoteAction
    | DeleteNoteAction
    | InsertNoteAfterAction
    | UpdateNoteAction
    | FetchNotesAction
    | FetchNotesCompleteAction
    | FetchNotesErrorAction
    | SaveNotesErrorAction;
