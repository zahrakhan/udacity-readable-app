import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {fetchPost, voteOnPost, deletePost} from '../actions'
import ActionButtons from './ActionButtons'
import VoteButtons from './VoteButtons'

class ActionsOnPost extends Component {
    componentDidMount = () => {
        this
            .props
            .getPost(this.props.postId)
    }
    handleEditPost = () => {
        this.redirectTo(this.getEditPath())
    }
    handleDeletePost = () => {
        const {id} = this.props.post
        if (id) {
            this
                .props
                .deletePost(id)
            this.redirectTo()
        }
    }
    handleVoteOnPost = (voteType) => {
        const {id} = this.props.post
        this
            .props
            .votePost(id, voteType)
    }
    redirectTo = (path = '/', delay = 0) => {
        setTimeout(function () {
            this
                .props
                .history
                .push(path)
        }.bind(this), delay);
    }
    getEditPath = () => {
        const {category, id} = this.props.post
        return `/${category}/${id}/edit`
    }
    render() {
        const {voteScore} = this.props.post
        return (
            <span>
                <VoteButtons voteScore={voteScore} onVote={this.handleVoteOnPost}/>
                <ActionButtons onEdit={this.handleEditPost} onDelete={this.handleDeletePost}/>
            </span>
        )
    }
}

function mapStateToProps({
    posts
}, ownProps) {
    return {
        post: posts.items[ownProps.postId] || {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => dispatch(fetchPost(id)),
        votePost: (id, type) => dispatch(voteOnPost(id, type)),
        deletePost: (id) => dispatch(deletePost(id))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActionsOnPost))