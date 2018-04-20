import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TvShow from '../../components/tvShow'
import Comments from '../../views/Comments'

import * as tvShowActions from '../../actions/tvShowActions'

class tvShow extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            tvShow: {},
            recommendedTvShows: [],
            similarTvShows: [],
            similarVisible: false,
            recommendedVisible: false,
            commentsVisible: false,
        }
    }

    componentDidMount(){
        const { tvShowActions, match } = this.props
        tvShowActions.loadtvShow(match.params.id)
        tvShowActions.loadSimilarTvShows(match.params.id);
        tvShowActions.loadRecommendedTvShows(match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            tvShow: nextProps.tvShow, 
            recommendedTvShows: nextProps.recommendedTvShows, 
            similarTvShows: nextProps.similarTvShows
        })
    }

    toggle(name, element){
        element = !element;
        this.setState({[name]: element});
    }

    render() {
        const { tvShow, recommendedTvShows, similarTvShows, similarVisible, recommendedVisible, commentsVisible } = this.state
        return (
            <main>
                <section className="container main tvShow" style={{backgroundImage: tvShow.id ? `url(https://image.tmdb.org/t/p/w342/${tvShow.backdrop_path})` : ''}}>
                    <div className="overlay"></div>
                    <header className="row">
                        <div className="col-12">
                            <h1 style={{color: 'white'}}>{tvShow.id ? tvShow.name : 'Loading...'}</h1>
                        </div>
                    </header>
                    <article className="row tvShow-item">
                        <footer className="col-md-4 offset-md-1 my-4 tvShow-poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w342/${tvShow.poster_path})`}}>

                        </footer>
                        <div className="col-md-6 my-4">
                            <header className="w-100">
                                <h1>{tvShow.name}</h1>
                            </header>
                            <p className="d-block">{tvShow.overview}</p>
                            
                        </div>
                    </article>
                    <div className="flex">
                        <button onClick={() => this.toggle('similarVisible',similarVisible)}>Show me similar shows</button>
                        <button onClick={() => this.toggle('recommendedVisible',recommendedVisible)}>Show me recommended shows</button>
                        <button onClick={() => this.toggle('commentsVisible',commentsVisible)}>Show me comment section</button>
                    </div>
                </section>
                
                <div className="row tvShow-list-wrapper">
                {similarVisible ? <h1 className="col-12">Peliculas Similares</h1> : ''}
                    {similarVisible ? 
                    similarTvShows.map((tvShow, i) => {
                        return (
                            <TvShow
                                key={i}
                                remove={this.removeShow}
                                {...tvShow}
                            />
                        )
                    }): ''}
                </div>
                <div className="row tvShow-list-wrapper">
                {recommendedVisible ? <h1 className="col-12">Peliculas Recomendadas</h1> : ''}
                    {recommendedVisible ? recommendedTvShows.map((tvShow, i) => {
                        return (
                            <TvShow
                                key={i}
                                remove={this.removeShow}
                                {...tvShow}
                            />
                        )
                    }): ''}
                </div>
                {commentsVisible ? <Comments tvShowID={this.props.match.params.id}/> : ''}
            </main>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        tvShow: state.tvShow.tvShow,
        recommendedTvShows: state.tvShow.recommendedTvShows,
        similarTvShows: state.tvShow.similarTvShows
    }
}

function mapDispatchToProps(dispatch){
    return {
        tvShowActions: bindActionCreators(tvShowActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(tvShow)

