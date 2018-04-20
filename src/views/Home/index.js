import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Movie from '../../components/Movie'
import TvShow from '../../components/tvShow'

import * as moviesActions from '../../actions/moviesActions'
import * as tvShowsActions from '../../actions/tvShowsActions'

class Home extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            movies: [],
            tvShows: [],
            type: '',
        }
    }

    componentDidMount(){
        
        const { moviesActions, tvShowsActions } = this.props
        const random = Math.random()
 
        let dataType;
        if(random <= 0.5){
            moviesActions.loadMovies();
            dataType = 'movie';
        }
        else{
            tvShowsActions.loadtvShows();
            dataType = 'tvShow';
        }
        this.setState({
            type: dataType
        })

    }

    componentWillReceiveProps(nextProps) {

        
        this.setState({
            movies: nextProps.movies,
            tvShows: nextProps.tvShows,
        })
    }

    showData(){
        const { movies, tvShows, type } = this.state
        const random = Math.floor(Math.random() * (20 - 0)) + 0;
        if (type === 'movie'){
            return (
                <Movie
                    {...movies[random]}
                />
            )
        }
        if (type === 'tvShow'){
            return (
                <TvShow
                    {...tvShows[random]}
                />
            )
        }
       
    }

    render () {
        const { type } = this.state
        return (
            <section className="container main home">
                <header className="row">
                    <div className="col-12">
                        {type === 'movie' ? <h1>Random Movie</h1> : <h1>Random TV Show</h1>}
                    </div>
                </header>
                <div className="row movie-list-wrapper">
                    {this.showData()}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        movies: state.movies,
        tvShows: state.tvShows,
    }
}

function mapDispatchToProps(dispatch){
    return {
        moviesActions: bindActionCreators(moviesActions, dispatch),
        tvShowsActions: bindActionCreators(tvShowsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

