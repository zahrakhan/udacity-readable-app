import React from 'react'
import {Segment, Message} from 'semantic-ui-react'
export const NoMatchFound = () => (
    <Segment>
        <Message color="red">Opps, could not find what you are looking for!</Message>
    </Segment>
)