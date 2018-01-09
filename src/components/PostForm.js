import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    Message,
    Header,
    Item,
    Form,
    Button,
    Segment
} from 'semantic-ui-react'
import {startCase} from 'lodash'

import {fetchPost, savePost, addPost} from '../actions'

const FORM_MODE_TYPE = {
    ADD: 'new',
    EDIT: 'edit'
}

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditMode: false,
            saving: false,
            post: {
                id: '',
                title: '',
                author: '',
                body: '',
                category: '',
                deleted: false
            }
        }
    }
    componentDidMount = () => {
        const {
            match: {
                params: {
                    postId
                }
            },
            getPost
        } = this.props.match.params
        this.setFormMode()
        if (postId)
            getPost(postId)
    }
    componentWillReceiveProps = (newProps) => {
        const {post} = newProps
        if (post !== this.props.post && post.id) {
            this.setState({post})
        }
        if (this.state.saving)
            this.redirectTo(this.getPostViewPath(), 500)
    }
    setFormMode = () => {
        const {
            match: {
                params: {
                    mode
                }
            }
        } = this.props
        this.setState({
            isEditMode: mode && mode === FORM_MODE_TYPE.EDIT
        })
    }

    handleChange = (e, {name, value}) => this.setState((prevState) => ({
        post: {
            ...prevState.post,
            [name]: value
        }
    }))
    handleCancel = () => {
        const redirectionPath = this.state.isEditMode
            ? this.getPostViewPath()
            : ''
        this.redirectTo(redirectionPath)
    }

    handleSubmit = () => {
        const {post, isEditMode} = this.state
        const {addPost, updatePost} = this.props
        this.setState({
            saving: true
        }, () => {
            isEditMode
                ? updatePost(post)
                : addPost(post)
        })
    }
    redirectTo = (path = '/', delay = 100) => {
        setTimeout(function () {
            this
                .props
                .history
                .push(path)
        }.bind(this), delay);
    }
    getPostViewPath = () => {
        const {
            post: {
                category,
                id
            },
            isEditMode
        } = this.state;

        return `/${category}${isEditMode
            ? ''
            : `/posts`}/${id}`;
    }

    render() {
        const {post, isEditMode} = this.state
        const {categories, error} = this.props

        const header_message = `${isEditMode
            ? `Update`
            : `Add new`} Post`

        return (
            <Segment>
                <Message color="red" hidden={!post.deleted}>Opps, couldn't find the post</Message>
                <Message color="red" hidden={!error}>{error}</Message>
                <Item>
                    <Header as='h1'>{header_message}</Header>
                    <Item.Content>
                        <Form>
                            <Form.Input
                                name='title'
                                label='Title'
                                value={post.title}
                                onChange={this.handleChange}/>
                            <Form.TextArea
                                name='body'
                                label='Message'
                                value={post.body}
                                onChange={this.handleChange}/>
                            <Form.Input
                                name='author'
                                label='Author'
                                value={post.author}
                                onChange={this.handleChange}
                                disabled={isEditMode}/>
                            <Form.Select
                                name='category'
                                label='Category'
                                value={post.category}
                                options={categories}
                                placeholder='Category'
                                onChange={this.handleChange}
                                disabled={isEditMode}/>

                            <Button color='teal' onClick={() => this.handleSubmit()}>Submit</Button>
                            <Button onClick={() => this.handleCancel()}>Cancel</Button>
                        </Form>
                    </Item.Content>
                </Item>
            </Segment>
        )
    }
}

function mapStateToProps({
    posts,
    categories
}, ownProps) {
    return {
        post: posts.items[ownProps.match.params.postId] || {},
        error: posts.error || false,
        categories: categories.map(category => {
            const {name} = category
            return {
                key: name,
                value: name,
                text: startCase(name)
            }
        })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost: (id) => dispatch(fetchPost(id)),
        updatePost: (post) => dispatch(savePost(post)),
        addPost: (post) => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)