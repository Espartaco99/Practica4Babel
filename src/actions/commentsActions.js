import * as types from '../types/comments'


export function loadCommentsSuccess(comments){
    return { type: types.LOAD_COMMENTS_SUCCESS, comments }
}

export function loadCommentsFailure(){
    return { type: types.LOAD_COMMENTS_FAILURE }
}

export function newCommentSuccess(comments){
    return { type: types.NEW_COMMENT_SUCCESS, comments }
}

export function newCommentFailure(){
    return { type: types.NEW_COMMENT_FAILURE }
}

export function deleteCommentSuccess(id){
    return { type: types.DELETE_COMMENT_SUCCESS, id }
}

export function deleteCommentFailure(){
    return { type: types.DELETE_COMMENT_FAILURE }
}

export function loadComments(){
    return dispatch => {
        fetch(`http://localhost:3010/comments`)
        .then(response => response.json())
        .then(comments => dispatch(loadCommentsSuccess(comments)))
        .catch(error => {
            dispatch(loadCommentsFailure())
            alert('Fallos de cargar comentarios.')
        })
    }
}

export function newComment(comment){
    return dispatch => {
        fetch(`http://localhost:3010/comments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...comment})
            }
        )
        .then(response => response.json())
        .then((c) =>dispatch(newCommentSuccess(c)))
        .catch(error => {
            dispatch(loadCommentsFailure())
            alert('Fallos al pasar el nuevo comentario.')
        })
    }
}
export function deleteComment(id){
    return dispatch => {
        fetch(`http://localhost:3010/comments/${id}`, {
            method: 'DELETE'
        })
        .then(() => dispatch(deleteCommentSuccess(id)))
        .catch(error => {
            dispatch(deleteCommentFailure())
            alert('Fallo al borrar un comentario.')
        })
    }
}



