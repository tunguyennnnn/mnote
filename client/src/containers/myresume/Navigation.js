import React from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
  render () {
    return (
      <div>
        <div class='navigation-container'>
          <div class='about-me'>
            My mission in life is to encourage others to share knowlege and personal experiences.
            <br />
          </div>
          <div class='navigation-mynote'>

            <Link target='_blank' to='/mynotes'>Click here</Link> if you want to see my notes and contribute
          </div>
        </div>
      </div>
    )
  }
}
