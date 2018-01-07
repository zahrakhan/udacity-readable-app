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

const ITEM_TYPE = {
    POST: 'post',
    COMMENT: 'comment'
}
class PostDetail extends Component {
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
    editItem = (type, id) => {
        this.redirectTo(this.getEditPath())
    }
    deleteItem = (type, id) => {
        this.setState({
            isDeleting: true
        }, () => {
            this
                .props
                .deletePost(id)
        })
    }
    voteOnItem = (itemType, id) => {
        return (voteType) => {
            if (itemType === ITEM_TYPE.POST)
                this.props.voteOnPost(id, voteType)
        }
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
                                                <VoteButtons
                                                    voteScore={voteScore}
                                                    onVote={() => this.voteOnItem(ITEM_TYPE.POST, id)}/>
                                                <ActionButtons
                                                    onEdit={() => this.editItem(ITEM_TYPE.POST, id)}
                                                    onDelete={() => this.deleteItem(ITEM_TYPE.POST, id)}/>
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
        voteOnPost: (id, type) => dispatch(voteOnPost(id, type)),
        deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)