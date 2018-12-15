import React from 'react'
import isUrl from 'is-url'
import axios from 'axios'

export default class SitePreviewer extends React.Component {
   state = {
    fetchResult: null
  }

  fetchPreview = async () => {
    try {
      const response = await axios.get('/api/Preview', {
        params: {
          url: 'https://www.instagram.com/explore/locations/578043681/'
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
    console.log(image, title, type)
    return (
      <div class='preview-url-container'>
        <div>
          {image}
        </div>
        <div>
          {title}
          -
          {type}
        </div>
      </div>
    )
  }
}