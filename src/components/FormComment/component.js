import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as commentsActions from '../../actions/commentsActions'

class Comment extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            username: '',
            contenido: '',
            tvShowID: props.tvShowID,
        }
    }

    changeUsername = e => {
        
        this.setState({username : e.target.value})
    }

    changeContenido = e => {
        
        this.setState({contenido : e.target.value})
    }

    enviar(e){
        const {commentsActions} = this.props
        e.preventDefault();
        commentsActions.newComment({...this.state})
    }

    render() {
        const { username, contenido } = this.state
        return (
            <div>
                <h2>Introduzca un comentario</h2>
                <form className="row" onSubmit={(e) => this.enviar(e)}>
                    <label htmlFor="username" className="col-2">Usuario:</label>
                    <input type="text" name="username" id="username" className="col-4" placeholder="Escribe tu nombre de usuario" onChange={this.changeUsername}/>
                    <label htmlFor="comment" className="col-2">Comentario:</label>
                    <textarea name="comment" id="comment" className="col-4" placeholder="Introduce el comentario" onChange={this.changeContenido} ></textarea>
                    <div>
                        <button type="reset" className="btn btn-secondary">Borrar</button>
                        <button type="submit" value='Submit' className="btn btn-secondary">Publicar</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {}
}

function mapDispatchToProps(dispatch){
    return {
        commentsActions: bindActionCreators(commentsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)