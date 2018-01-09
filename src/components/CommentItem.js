import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Comment, Divider} from 'semantic-ui-react'

import ActionButtons from './ActionButtons'
import VoteButtons from './VoteButtons'

class CommentItem extends Component {
    render() {
        const {id, timestamp, body, author, voteScore} = this.props.comment
        console.log('CommentItem render', this.props)
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
                        <Comment.Action><VoteButtons voteScore={voteScore}/></Comment.Action>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)