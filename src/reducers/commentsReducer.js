import * as types from '../types/comments'
import initialState from './initialState'

export default function commentsReducer(state = initialState.comments, action){
    switch(action.type){
        case types.LOAD_COMMENTS_SUCCESS:
            return action.comments
        case types.NEW_COMMENT_SUCCESS:
            return [
                ...state, 
                action.comments,
            ]
        case types.DELETE_COMMENT_SUCCESS:
            //console.log('estado',state)
            console.log('action', action)
            const index = state.findIndex(comment => comment.id === action.id);
            state.splice(index, 1);
            return [  
                ...state
            ];
        default:
            return state
  }
}
