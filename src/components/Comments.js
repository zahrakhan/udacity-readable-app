import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Comment, Segment, Divider} from 'semantic-ui-react'

import CommentItem from './CommentItem'
import CommentForm from './CommentForm'
import {fetchAllComments} from '../actions'

class Comments extends Component {
    constructor(props) {
        super(props)
        this
            .props
            .getComments(props.parentId)
    }
    componentWillReceiveProps(newProps) {
        if (newProps.parentId !== this.props.parentId)
            this.props.getComments(newProps.parentId)
    }
    render() {
        const {comments, parentId} = this.props
        return (
            <Segment basic>
                <Comment.Group size='small'>
                    <Divider horizontal>COMMENTS</Divider>
                    {comments.items && Object
                        .keys(comments.items)
                        .map(comment_id => <CommentItem key={comment_id} commentId={comment_id}/>)}
                    <CommentForm parentId={parentId} />
                </Comment.Group>
            </Segment>
        )
    }
}

function mapStateToProps({comments}) {
    return {
        comments,
        error: comments.error || false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (parentId) => dispatch(fetchAllComments(parentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)