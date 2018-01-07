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

import {fetchPost} from '../actions'
import ActionButtons from './ActionButtons'
import VoteButtons from './VoteButtons'

class PostDetail extends Component {
    componentDidMount = () => {
        this
            .props
            .getPost(this.props.match.params.postId)
    }
    editItem = (type, id) => {
        console.log('editItem', type, id);
    }
    deleteItem = (type, id) => {
        console.log('deleteItem', type, id);
    }
    voteOnItem = (type, id, voteType) => {
        console.log('voteOnItem', type, id, voteType);
    }
    voteOnItem = (itemType, id) => {
        return function vote(voteType) {
            console.log('voteOnItem', itemType, id, voteType);
        }
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
            }
        } = this.props
        return (
            <div>
                <Message color="red" hidden={!deleted}>No posts found</Message>
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
                                                <VoteButtons voteScore={voteScore} onVote={() => this.voteOnItem('post', id)}/>
                                                <ActionButtons
                                                    onEdit={() => this.editItem('post', id)}
                                                    onDelete={() => this.deleteItem('post', id)}/>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Item.Header>
                                <Item.Meta>
                                    <Grid>
                                        <Icon color='teal' name='user' title='Author'></Icon>
                                        {author}
                                        <Icon color='teal' name='clock' title='Last updated at'></Icon>
                                        {moment(timestamp).fromNow()}
                                        <Icon color='teal' name='tags'></Icon>
                                        {category}
                                    </Grid>
                                </Item.Meta>
                                <Divider/>
                                <Item.Description>{body}</Item.Description>
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
        post: posts.items[ownProps.match.params.postId] || {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => dispatch(fetchPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)