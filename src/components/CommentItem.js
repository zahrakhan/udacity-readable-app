import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Comment, Divider} from 'semantic-ui-react'

import ActionButtons from './ActionButtons'
import VoteButtons from './VoteButtons'

import {voteOnComment, deleteComment} from '../actions'

class CommentItem extends Component {
    handleVoteOnComment = (voteType) => {
        this
            .props
            .voteOnComment(this.props.comment.id, voteType)
    }
    handleDeleteComment = () => {
        this
            .props
            .deleteComment(this.props.comment.id)
    }
    render() {
        const {id, timestamp, body, author, voteScore} = this.props.comment
        return (
            <Comment>
                <Comment.Content>
                    <Comment.Author>{author}</Comment.Author>
                    <Comment.Metadata>
                        <div>{moment(timestamp).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>{body}</p>
                    </Comment.Text>
                    <Comment.Actions>
                        <Comment.Action><ActionButtons onDelete={this.handleDeleteComment}/></Comment.Action>
                        <Comment.Action><VoteButtons voteScore={voteScore} onVote={this.handleVoteOnComment}/></Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
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