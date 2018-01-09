import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    Segment,
    Item,
    Icon,
    Divider,
    Message,
    Grid,
    Header
} from 'semantic-ui-react'
import moment from 'moment'

import {fetchPost, voteOnPost, deletePost} from '../actions'
import ActionButtons from './ActionButtons'
import VoteButtons from './VoteButtons'
import Comments from './Comments'

class PostItem extends Component {
    state = {
        isDeleting: false
    }
    componentDidMount = () => {
        this
            .props
            .getPost(this.props.match.params.postId)
    }
    componentWillReceiveProps = (props) => {
        const isDeleted = this.state.isDeleting && !props.error
        if (isDeleted) {
            this.redirectTo()
        }
    }
    handleEditPost = () => {
        this.redirectTo(this.getEditPath())
    }
    handleDeletePost = () => {
        const {id} = this.props.post
        this.setState({
            isDeleting: true
        }, () => {
            this
                .props
                .deletePost(id)
        })
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
        return `${this.props.location.pathname}/edit`
    }
    render() {
        const {
            post: {
                id,
                title,
                author,
                body,
                category,
                timestamp,
                voteScore,
                deleted = true
            },
            error
        } = this.props
        const {isDeleting} = this.state

        return (
            <div>
                <Message color="red" hidden={!deleted || isDeleting}>Opps, couldn't find the post</Message>
                <Message color="red" hidden={!error}>{error}</Message>
                {!deleted && (
                    <span>
                        <Segment>
                            <Item>
                                <Item.Content>
                                    <Item.Header>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={10}>
                                                    <Header as='h1'>{title}</Header>
                                                </Grid.Column>
                                                <Grid.Column width={6} float='right' textAlign='right'>
                                                    <VoteButtons voteScore={voteScore} onVote={this.handleVoteOnPost}/>
                                                    <ActionButtons onEdit={this.handleEditPost} onDelete={this.handleDeletePost}/>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Item.Header>
                                    <Item.Meta>
                                        <Grid>
                                            <Icon color='teal' name='user' title='Author'></Icon>
                                            {author}
                                            <Icon color='teal' name='calendar' title='Created at'></Icon>
                                            {moment(timestamp).fromNow()}
                                            <Icon color='teal' name='tags'></Icon>
                                            {category}
                                        </Grid>
                                    </Item.Meta>
                                    <Divider/>
                                    <Item.Description>
                                        <br/> {body}
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Segment>
                        <Comments parentId={id}/>
                    </span>
                )}
            </div>
        )
    }
}

function mapStateToProps({
    posts
}, ownProps) {
    return {
        post: posts.items[ownProps.match.params.postId] || {},
        error: posts.error || false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => dispatch(fetchPost(id)),
        votePost: (id, type) => dispatch(voteOnPost(id, type)),
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)