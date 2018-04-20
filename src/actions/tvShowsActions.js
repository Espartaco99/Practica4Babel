import * as types from '../types/tvShows'
import { tvShowsURL } from '../utils'

export function loadtvShowsSuccess(tvShows, page){
    return { type: types.LOAD_TVSHOWS_SUCCESS, tvShows, page }
}

export function loadtvShowsFailure(){
    return { type: types.LOAD_TVSHOWS_FAILURE }
}

export function loadtvShows(page = 1, endpoint = 'popular'){
    return dispatch => {
        fetch(tvShowsURL[endpoint](page))
        .then(response => response.json())
        .then(json => json.results)
        .then(tvShows => dispatch(loadtvShowsSuccess(tvShows, page)))
        .catch(error => {
            dispatch(loadtvShowsFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function removeTvShowSuccess(id){
    return { type: types.REMOVE_TVSHOWS_SUCCESS, id}
}
