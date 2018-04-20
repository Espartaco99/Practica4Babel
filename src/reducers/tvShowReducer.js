import * as types from '../types/tvShow'
import initialState from './initialState'

export default function tvShowReducer(state = initialState.tvShow, action){
    switch(action.type){
        case types.LOAD_TVSHOW_SUCCESS:
            return {tvShow: action.tvShow, recommendedTvShows: [], similarTvShows: []}
        case types.LOAD_SIMILAR_TVSHOWS_SUCCESS:
            return {tvShow: state.tvShow, similarTvShows: action.tvShows, recommendedTvShows: []}
        case types.LOAD_RECOMMENDED_TVSHOWS_SUCCESS:
            return {tvShow: state.tvShow, recommendedTvShows: action.tvShows, similarTvShows: state.similarTvShows}
        default:
            return state
  }
}
