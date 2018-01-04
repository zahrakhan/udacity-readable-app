import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {Card, Icon, Grid, Divider, Item} from 'semantic-ui-react'

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
          <Icon
            color='teal'
            flipped='horizontally'
            name='thumbs down'
            link
            onClick={(event) => {
            console.log('thumbs up');
            event.preventDefault();
          }}/> {voteScore}
          <Icon
            color='teal'
            name='thumbs up'
            link
            onClick={(event) => {
            console.log('thumbs up');
            event.preventDefault();
          }}/>
        </Grid.Column>
      </Grid>
    </Card.Content>
  </Card>
)

export default PostCard