import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Card, Icon, Grid, Divider, Item} from 'semantic-ui-react'

import VoteButtons from './VoteButtons'

const PostCard = ({
  id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  deleted,
  commentCount
}) => (
  <Card as={Link} to={'/' + category + '/' + id}>
    <Card.Content header={title}/>
    <Card.Content description={body}/>
    <Card.Content extra>
      <Item>
        <Icon color='teal' name='user'></Icon>
        {author}
      </Item>
      <Item>
        <Icon color='teal' name='clock'></Icon>
        {moment(timestamp).fromNow()}
      </Item>
      <Divider/>
      <Grid columns={3}>
        <Grid.Column>
          <Icon color='teal' name='tags'></Icon>
          {category}
        </Grid.Column>
        <Grid.Column>
          <Icon color='teal' name='comments'></Icon>
          {commentCount}
        </Grid.Column>
        <Grid.Column>
          <VoteButtons voteScore={voteScore}/>
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
)

export default PostCard