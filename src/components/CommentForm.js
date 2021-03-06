import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Segment, Form, Button, Message} from 'semantic-ui-react'
import {trim} from 'lodash'

import {addComment, saveComment} from '../actions'

const newComment = {
    id: '',
    author: '',
    body: ''
}

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditMode: false,
            comment: newComment,
            validationError: ''
        }
    }
    componentDidMount() {
        const {commentId, parentId, comments} = this.props
        if (commentId) {
            this.setState({comment: comments.items[commentId], isEditMode: true})
        } else {
            this.setState({
                comment: {
                    ...newComment,
                    parentId: parentId
                },
                isEditMode: false
            });
        }
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.parentId !== this.state.comment.parentId)
            this.resetComment()
    }
    handleChange = (e, {name, value}) => this.setState((prevState) => ({
        comment: {
            ...prevState.comment,
            [name]: value
        }
    }))
    handleSubmit = (event) => {
        event.preventDefault()
        const {comment, isEditMode} = this.state
        const {updateComment, onEdit, addComment} = this.props
        if (this.isCommentDataValid()) {
            if (isEditMode) {
                updateComment(comment)
                onEdit()
            } else {
                addComment(comment)
            }
            this.resetComment()
        } else {
            this.setState({validationError: `All fields are required`})
        }
    }
    handleCancel = () => {
        this.state.isEditMode
            ? this
                .props
                .onEdit()
            : this.resetComment()
    }
    resetComment = () => {
        this.setState((prevState) => ({
            comment: {
                ...newComment,
                parentId: prevState.parentId
            },
            validationError: ''
        }))
    }
    isCommentDataValid = () => {
        const {author, body} = this.state.comment
        return trim(author) && trim(body)
    }
    render() {
        const {
            comment: {
                author,
                body
            },
            isEditMode,
            validationError
        } = this.state
        const {error} = this.props
        const button_message = `${isEditMode
            ? `Update`
            : `Add`} Comment`
        return (
            <Segment color='teal'>
                <Message color="red" hidden={!error}>{error}</Message>
                <Message color="red" hidden={!validationError}>{validationError}</Message>
                <Form reply>
                    <Form.Input
                        name='author'
                        value={author}
                        placeholder="Name"
                        onChange={this.handleChange}/>
                    <Form.TextArea
                        name='body'
                        value={body}
                        placeholder="Message"
                        onChange={this.handleChange}/>
                    <Button
                        content={button_message}
                        labelPosition='left'
                        icon='edit'
                        color='teal'
                        onClick={(event) => this.handleSubmit(event)}/>
                    <Button content='Cancel' onClick={() => this.handleCancel()}/>
                </Form>
            </Segment>
        )
    }
}

function mapStateToProps({
    comments
}, ownProps) {
    return {
        comments,
        comment: comments.items[ownProps.commentId] || {},
        error: comments.error || false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addComment: (comment) => dispatch(addComment(comment)),
        updateComment: (comment) => dispatch(saveComment(comment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)