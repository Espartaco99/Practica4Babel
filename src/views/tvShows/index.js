import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import TvShow from '../../components/tvShow'

import * as tvShowsActions from '../../actions/tvShowsActions'

class tvShows extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            tvShows: [],
            page: 1,
            loadingtvShows: false,
            nowViewing: 'popular',
            sortBy: 'title-asc',
            viewingThisYearOnly: false
        }
    }

    componentDidMount(){
        const { tvShows, nowViewing, page } = this.state
        const { tvShowsActions } = this.props

        tvShowsActions.loadtvShows(page, nowViewing)

        window.addEventListener("scroll", this.infiniteScroller, false);
    }

    infiniteScroller =  e => {
        const { tvShowsActions } = this.props
        const { page, nowViewing } = this.state
        const scrollTop = window.scrollY
        const trackLength = document.querySelector('body').scrollHeight - window.innerHeight
        const pctScrolled = Math.floor(scrollTop/trackLength * 100)
        if(pctScrolled > 95 && !this.state.loadingtvShows) {
            tvShowsActions.loadtvShows(page, nowViewing)
            this.setState({
                loadingtvShows: true
            })
        }
    }

    componentWillUnmount() {
        // you need to unbind the same listener that was binded.
        window.removeEventListener('scroll', this.infiniteScroller, false);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.tvShows.length > this.state.tvShows.length) {
            this.setState({
                loadingtvShows: false,
                page: this.state.page + 1,
                tvShows: nextProps.tvShows
            })
        }
        else {
            this.setState({
                tvShows: nextProps.tvShows,
                loadingtvShows: false
            })
        }
    }

    onViewingChange = e => {
        const nowViewing = e.target.value
        const { tvShowsActions } = this.props
        tvShowsActions.loadtvShows(1, nowViewing)
        this.setState({
            page: 2,
            loadingtvShows: true,
            nowViewing
        })
    }

    onSortChange = e => {
        this.setState({sortBy: e.target.value})
    }

    sorttvShows = tvShows => {
        const { sortBy } = this.state
        const sorting = sortBy.split('-')

        return _.orderBy(tvShows, sorting[0], sorting[1])
    }

    onToggleViewingThisYearOnly = e => {
        this.setState({viewingThisYearOnly: !this.state.viewingThisYearOnly})
    }

    filtertvShows = tvShows => {
        return tvShows.filter(tvShow => {

            return tvShow.first_air_date.includes('2018')
        })
    }

    preparetvShows = tvShows => {
        const { viewingThisYearOnly } = this.state

        let filteredtvShows = viewingThisYearOnly ? this.filtertvShows(tvShows) : tvShows

        return this.sorttvShows(filteredtvShows)
    }

    removeShow = id => {
        const { tvShows } = this.state;
        const { tvShowsActions } = this.props
        tvShowsActions.removeTvShowSuccess(id);
    }

    render() {
        const { tvShows, nowViewing, sortBy, viewingThisYearOnly } = this.state

        return (
            <section className="container main tvShows">
                <header className="row">
                    <div className="col-12">
                        <h1>{tvShows.length > 0 ? 'tvShows' : 'Loading...'}</h1>
                    </div>
                </header>
                <aside className="row">
                    <div className="form-group">
                        <label>Now viewing:</label>
                        <select className="form-control" onChange={this.onViewingChange} defaultValue={nowViewing}>
                            <option value="popular">Popular</option>
                            <option value="topRated">Top Rated</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Sort by:</label>
                        <select className="form-control" onChange={this.onSortChange} defaultValue={sortBy}>
                            <option value="title-asc">Title (Asc)</option>
                            <option value="title-desc">Title (Desc)</option>
                            <option value="popularity-asc">Less Popular</option>
                            <option value="popularity-desc">More Popular</option>
                            <option value="vote_average-asc">Worst</option>
                            <option value="vote_average-desc">Best</option>
                            <option value="first_air_date-asc">Oldest</option>
                            <option value="first_air_date-desc">Newest</option>
                        </select>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" onChange={this.onToggleViewingThisYearOnly} type="checkbox" checked={viewingThisYearOnly} />
                            View this year only
                        </label>
                    </div>
                </aside>
                <div className="row tvShow-list-wrapper">
                    {this.preparetvShows(tvShows).map((tvShow, i) => {
                        return (
                            <TvShow
                                key={i}
                                remove={this.removeShow}
                                {...tvShow}
                            />
                        )
                    })}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){

    return {
        tvShows: state.tvShows
    }
}

function mapDispatchToProps(dispatch){
    return {
        tvShowsActions: bindActionCreators(tvShowsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(tvShows)

