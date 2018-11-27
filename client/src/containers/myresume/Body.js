import React from 'react'
import { Grid } from 'semantic-ui-react'

import { Card } from '../../components'

export default class Body extends React.Component {
  render () {
    return (
      <div class='mypage-body-container'>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Card type='Work Experience' title='Software Developer at iGotcha Media'
                description={[
                  'Developing & maintaining media player on different TV devices and OS platforms (Window, Samsung Tizen, BrightSign)',
                  'Maining multiple CMS for media content deployment and scheduling',
                  'Developing & maintaing an internal document system',
                  'Developing an R&D chatbot application'
                ]}
                technologies='NodeJs, ReactJs, ElectronJS, Ruby on Rails, PostgresQL, GraphQL'
                time='Summer 2015 & Summer 2016'
              />
              <Card type='Work Experience' title='Software Developer Intern at Hitachi Id Systems'
                description={['Developing and maintaining a CMS for managing products, use cases, and test automation']}
                technologies='Ruby on Rails, JavaScript, JQuery, MySQL'
                time='Summer 2015 & Summer 2016'
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <Card type='Skill I am Learning' title='Microservices'
                description={[
                  'Docker and Docker Compose for development',
                  'Microservice design patterns',
                  'Kubernetes'
                ]}
              />
              <Card type='Skill I am Learning' title='GoLang'
                description={[
                  'Basic http server as microservice',
                  'On-the-fly processing uploading media content (images and videos)'
                ]}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Card type='Side Project' title='oowrite | An application for spreading knowledge'
                description={[
                  'Wysiwyg editor with code and math support',
                  'Allowing collaborative writing',
                  'Allowing to share and updating articles'
                ]}
                technologies='NodeJs, ReactJs, PostgresQL, Google Cloud, Firebase functions'
                link='https://github.com/tunguyennnnn/oowrite'
                time='current'
              />
              <Card type='Side Project' title='Toy tools'
                description={[
                  'A tool to share notes',
                  'A tool to analyzing integram profiles',
                  'A tool for processing videos and images on-the-fly'
                ]}
                technologies='NodeJs, ReactJs, PostgresQL, Google Cloud, GoLang, Python'
                time='current'
                link='https://github.com/tunguyennnnn/vserver'
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Card type='Side Project' title='Lex | An application to search inside videos'
                description={[
                  'Allow to search videos by typing in keywords',
                  'Allow to search time stamps of content occured in videos'
                ]}
                technologies='NodeJs, Python, ReactJs, Mongodb, Watson Speech to Text'
                time='2017'
                link='https://github.com/tunguyennnnn/LEX'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
