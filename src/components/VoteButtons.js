import React from 'react'
import {Icon} from 'semantic-ui-react'

const VOTE_TYPE_UP = 'upVote'
const VOTE_TYPE_DOWN = 'downVote'

export default function VoteButtons({
    voteScore = 0,
    onVote
}) {
    return (
        <span>
            <Icon
                name='thumbs down'
                color='teal'
                title='Down Vote'
                link
                onClick={(event) => {
                onVote
                    ? onVote()(VOTE_TYPE_DOWN)
                    : ''
            }}></Icon>
            {voteScore}
            <Icon
                name='thumbs up'
                color='teal'
                title='Up Vote'
                link
                onClick={(event) => {
                onVote
                    ? onVote()(VOTE_TYPE_UP)
                    : ''
            }}></Icon>
        </span>
    );
}