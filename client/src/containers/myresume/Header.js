import React from 'react'
import { Image, Grid, Header, Icon } from 'semantic-ui-react'

import { IconLink } from '../../components'

export default class extends React.Component {
  render () {
    return (
      <div class='mypage-header-container'>
        <Grid>
          <Grid.Column width={4} >
            <Image circular
              className="profile-image"
              src='https://media.licdn.com/dms/image/C4E03AQHzLuPCSQaV6Q/profile-displayphoto-shrink_200_200/0?e=1548892800&v=beta&t=nvleM8kiIAHAuj9Ru9-vyRgKA4FtfhIzmQW1WVOW-zs'
            />
          </Grid.Column>
          <Grid.Column width={12} className="myinfo-container">
            <div class='myname'>Tu Nguyen</div>
            <div class='myjob'>
              Software Developer at iGotcha Media (May, 2017 to Present)
            </div>
            <div class='education'>
              <span>Education</span>: Bachelor of Computer Engineering at Concordia University (GPA of 4/4.3)
            </div>
            <div class='technology-container'>
              <div class='technology-title'>Technologies:</div>
              <div class='technologies'>
                JavaScript - NodeJs, React, Express, ElectronJs, GraphQl
                <br />
                Ruby and Ruby on Rails
                <br />
                Python
                <br />
                Databases - PostgresQL, Mongodb
                <br />
                Learning: Golang, Docker and Microservices technologies
              </div>
            </div>
            <div class='socialnetworks'>
              <span class='technology-title'>
                Social Networks:
              </span>
              <IconLink name='github' link='https://github.com/tunguyennnnn' />
              <IconLink name='linkedin' link='https://www.linkedin.com/in/tu-nguyen-611a66a0' />
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
