import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Comment, Divider} from 'semantic-ui-react'

import ActionButtons from './ActionButtons'
import VoteButtons from './VoteButtons'

import {voteOnComment} from '../actions'

class CommentItem extends Component {
    handleVoteOnComment = (voteType) => {
        const {id} = this.props.comment
        this
            .props
            .voteOnComment(id, voteType)
    }
    render() {
        const {id, timestamp, body, author, voteScore} = this.props.comment
        return (
            <Comment >
                <Comment.Content>
                    <Comment.Author>{author}</Comment.Author>
                    <Comment.Metadata>
                        <div>{moment(timestamp).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>{body}</p>
                    </Comment.Text>
                    <Comment.Actions>
                        <Comment.Action><ActionButtons/></Comment.Action>
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
        voteOnComment: (id, type) => dispatch(voteOnComment(id, type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)