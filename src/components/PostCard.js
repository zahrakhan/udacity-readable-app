import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Card, Icon, Grid, Divider, Item} from 'semantic-ui-react'

import ActionsOnPost from './ActionsOnPost'

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
  <Card color='teal'>
    <Card.Content header={title} as={Link} to={'/' + category + '/' + id}/>
    <Card.Content description={body}/>
    <Card.Content extra>
      <Item>
        <Icon color='teal' name='user'></Icon>
        {author}
      </Item>
      <Item>
        <Icon color='teal' name='calendar'></Icon>
        {moment(timestamp).fromNow()}
      </Item>
      <Divider/>
      <Grid columns={3}>
        <Grid.Column width={5}>
          <Icon color='teal' name='tags'></Icon>
          {category}
        </Grid.Column>
        <Grid.Column width={4}>
          <Icon color='teal' name='comments'></Icon>
          {commentCount}
        </Grid.Column>
        <Grid.Column width={7}>
          <ActionsOnPost postId={id}/>
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
)

export default PostCard