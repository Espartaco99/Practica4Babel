import React from 'react'
import { Link } from 'react-router-dom'

const tvShow = ({poster_path, id, name, overview, remove}) => (
    <article 
        className="col-md-3 my-4 tvShow-item"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${poster_path})`}}
    >
        <div className="overlay">
            <header className="w-100 pt-3 px-3">
                <Link className="d-block" to={`/tvShows/${id}`}>{name}</Link>
            </header>
            <p>{overview}</p>
            <button onClick={() => remove(id)}>Don´t show it anymore</button>
        </div>
    </article>
)

export default tvShow