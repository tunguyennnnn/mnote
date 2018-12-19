import './site-preview.scss'
import React from 'react'
import axios from 'axios'
import { Comment } from 'semantic-ui-react'

export default class SitePreviewer extends React.Component {
   state = {
    fetchResult: null
  }

  fetchPreview = async () => {
    const { url } = this.props
    try {
      const response = await axios.get('/api/Preview', {
        params: {
          url
        }
      })
      const { data } = response
      this.setState({
        fetchResult: data
      })
    } catch (e) {

    }
  }

  componentDidMount () {
    this.fetchPreview()
  }

  render () {
    const { fetchResult} = this.state
    if (!fetchResult) return <div>loading...</div>
    const { image, title, type } = fetchResult
    return (
      <div class='preview-url-container'>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={image} />
            <Comment.Content>
              <Comment.Author as='label'>{type}</Comment.Author>
              <Comment.Text>{title}</Comment.Text>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </div>
    )
  }
}