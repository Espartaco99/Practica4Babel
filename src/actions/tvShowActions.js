import * as types from '../types/tvShow'


export function loadtvShowSuccess(tvShow){
    return { type: types.LOAD_TVSHOW_SUCCESS, tvShow }
}

export function loadtvShowFailure(){
    return { type: types.LOAD_TVSHOW_FAILURE }
}

export function loadSimilarTvShowsSuccess(tvShows){
    return { type: types.LOAD_SIMILAR_TVSHOWS_SUCCESS, tvShows }
}

export function loadSimilarTvShowsFailure(){
    return { type: types.LOAD_SIMILAR_TVSHOWS_FAILURE }
}

export function loadRecommendedTvShowsSuccess(tvShows){
    return { type: types.LOAD_RECOMMENDED_TVSHOWS_SUCCESS, tvShows }
}

export function loadRecommendedTvShowsFailure(){
    return { type: types.LOAD_RECOMMENDED_TVSHOWS_FAILURE }
}


export function loadtvShow(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(tvShow => dispatch(loadtvShowSuccess(tvShow)))
        .catch(error => {
            dispatch(loadtvShowFailure())
            alert('We could not load the page at this time.')
        })
    }
}

export function loadSimilarTvShows(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(json => json.results)
        .then(tvShows => dispatch(loadSimilarTvShowsSuccess(tvShows)))
        .catch(error => {
            dispatch(loadSimilarTvShowsFailure())
            alert('We could not load the similar tv shows at this time.')
        })
    }
}

export function loadRecommendedTvShows(id){
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        .then(response => response.json())
        .then(json => json.results)
        .then(tvShows => dispatch(loadRecommendedTvShowsSuccess(tvShows)))
        .catch(error => {
            dispatch(loadRecommendedTvShowsFailure())
            alert('We could not load the recommended tv shows at this time.')
        })
    }
}



