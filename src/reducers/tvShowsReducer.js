import * as types from '../types/tvShows'
import initialState from './initialState'

export default function tvShowsReducer(state = initialState.tvShows, action){
    switch(action.type){
        case types.LOAD_TVSHOWS_SUCCESS:
            if(action.page === 1) {
                return action.tvShows
            }
            else {
                return [
                    ...state,
                    ...action.tvShows,
                ]
            }
        case types.REMOVE_TVSHOWS_SUCCESS: 
            const index = state.findIndex(show => show.id === action.id);
            state.splice(index, 1);
            return [  
                ...state
            ];

        
        default:
        return state
  }
}
