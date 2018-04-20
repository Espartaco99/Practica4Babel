import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import movies from './moviesReducer'
import movie from './movieReducer'
import tvShows from './tvShowsReducer'
import tvShow from './tvShowReducer'
import comments from './commentsReducer'

const rootReducer = combineReducers({
    movies, 
    movie,
    tvShow,
    tvShows,
    comments,
    router: routerReducer
})

export default rootReducer
