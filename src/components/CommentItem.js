import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Comment, Divider} from 'semantic-ui-react'

import ActionButtons from './ActionButtons'
import VoteButtons from './VoteButtons'
import CommentForm from './CommentForm'

import {voteOnComment, deleteComment} from '../actions'

class CommentItem extends Component {
    state = {
        isEditing: false
    }
    handleVoteOnComment = (voteType) => {
        this
            .props
            .voteOnComment(this.props.comment.id, voteType)
    }
    handleEditingComment = () => {
        this.setState({isEditing: true})
    }
    handleEditingFinished = () => {
        this.setState({isEditing: false})
    }
    handleDeleteComment = () => {
        this
            .props
            .deleteComment(this.props.comment.id)
    }
    render() {
        const {id, timestamp, body, author, voteScore} = this.props.comment
        const {isEditing} = this.state
        return (
            <Comment>
                {isEditing
                    ? (<CommentForm commentId={id} onEdit={this.handleEditingFinished}/>)
                    : (

                        <Comment.Content>
                            <Comment.Author>{author}</Comment.Author>
                            <Comment.Metadata>
                                <div>{moment(timestamp).fromNow()}</div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <p>{body}</p>
                            </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action><ActionButtons
                                    onEdit={this.handleEditingComment}
                                    onDelete={this.handleDeleteComment}/></Comment.Action>
                                <Comment.Action><VoteButtons voteScore={voteScore} onVote={this.handleVoteOnComment}/></Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    )}
                <Divider/>
            </Comment>
        )
    }
}

function mapStateToProps({
    comments
}, ownProps) {
    return {
        comment: comments.items[ownProps.commentId] || {},
        error: comments.error || false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteOnComment: (id, type) => dispatch(voteOnComment(id, type)),
        deleteComment: (id) => dispatch(deleteComment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)