import React from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
  render () {
    return (
      <div>
        <div class='navigation-container'>
          <p class='about-me'>My mission in life is to encourage others to share knowlege and personal experiences.</p>
          <div class='navigation-mynote'>
            <p><Link target='_blank' to='/mynotes'>Click here</Link> if you want to see my notes and contribute</p>
          </div>
        </div>
      </div>
    )
  }
}
