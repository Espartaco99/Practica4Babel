import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as commentsActions from '../../actions/commentsActions'
import FormComment from '../../components/FormComment/component'


class Comments extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            comments: [],
            tvShowID: props.tvShowID,
        }
    }

    componentDidMount(){
        const { commentsActions } = this.props
        commentsActions.loadComments();
    }

    componentWillReceiveProps(nextProps) {
        console.log('Props Nuevos', nextProps);
        
         this.setState({
            comments: nextProps.comments
        }) 
    }

    borrar(id){
        console.log('Id comentario', id);
        const {commentsActions} = this.props
        commentsActions.deleteComment(id);
    }

    filtrarPorId(){
        const {comments, tvShowID} = this.state
        return comments.filter(comment => comment.tvShowID === tvShowID)
    }


    render () {
        const {tvShowID} = this.state;
        const comments = this.filtrarPorId()
        return (
            <section className="container">
                {comments.length ? <div>
                    <h2>Comentarios</h2>
                    {comments.map((comment, i) => {
                        return (
                            <div key={i} className="row mt-4">
                                <div className="col-11 flex">
                                    <span className="col-3"><label className="negrita">Username: </label><label id="username">{comment.username}</label></span>
                                    <span className="col-9"><label className="negrita">Contenido: </label><label id="contenido">{comment.contenido}</label></span>
                                </div>
                                <button className="fa fa-trash puntero col-1" onClick={() => this.borrar(comment.id)} title="Eliminar">DEL</button>
                            </div> )}
                        )
                    }
                </div>: ''}
                <FormComment tvShowID={tvShowID}/>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        comments: state.comments,
    }
}

function mapDispatchToProps(dispatch){
    return {
        commentsActions: bindActionCreators(commentsActions, dispatch),       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)

