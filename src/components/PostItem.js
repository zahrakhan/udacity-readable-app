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
import ActionsOnPost from './ActionsOnPost'
import Comments from './Comments'

class PostItem extends Component {
    componentDidMount = () => {
        this
            .props
            .getPost(this.props.match.params.postId)
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
                deleted = true
            }
        } = this.props

        return (
            <div>
                <Message color="red" hidden={!deleted}>Opps, couldn't find the post</Message>
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
                                                    <ActionsOnPost postId={id}/>
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
        post: posts.items[ownProps.match.params.postId] || {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => dispatch(fetchPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)