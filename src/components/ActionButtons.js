import React, {Component} from 'react'
import {Icon, Confirm} from 'semantic-ui-react'

export default class ActionButtons extends Component {
    state = {
        confirmationAlert: false
    }
    confirmDelete = () => this.setState({confirmationAlert: true})

    handleConfirm = () => this.setState({
        confirmationAlert: false
    }, () => this.props.onDelete())
    handleCancel = () => this.setState({confirmationAlert: false})

    handleEdit = () => this.props.onEdit()

    render() {
        return (
            <span>
                <Icon name='edit' color='teal' title='Edit' link onClick={this.handleEdit}></Icon>
                <Icon
                    name='trash'
                    color='teal'
                    title='Delete'
                    link
                    onClick={(event) => {
                    this.confirmDelete()
                }}></Icon>
                <Confirm
                    content='Are you sure you want to delete it?'
                    open={this.state.confirmationAlert}
                    cancelButton='Never mind'
                    confirmButton="Let's do it"
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}/>
            </span>
        )
    }
}