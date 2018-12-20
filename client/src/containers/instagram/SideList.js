import React from 'react'
import { Header, Input, Icon} from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import NewItemForm from './NewItemForm'
import ItemList from './ItemList'

const ModalStyles = {
  content : {
    top                   : '10%',
    left                  : '10%',
    right                 : 'auto',
    width                 : '30%',
    bottom                : 'auto'
  }
}

export default class SideList  extends React.Component {
  state = {
    openModal: false
  }

  closeModal = () => {
    this.setState({openModal: false})
  }


  render () {
    const { items, setItem, deleteInstagramItem } = this.props
    console.log(items)
    return (
      <div>
        <Header as='h2'>List of Instagram Profiles</Header>
        <Input fluid placeholder='Search...' />
        <Icon name='plus square' onClick={() => this.setState({openModal: true})} />
        <Modal
          isOpen={this.state.openModal}
          style={ModalStyles}
          contentLabel='New Link'
          onRequestClose={this.closeModal}
        >
          <NewItemForm submit={this.props.createInstagramItem} closeModal={this.closeModal} />
        </Modal>
        <ItemList items={items} setItem={setItem} deleteInstagramItem={deleteInstagramItem} />
      </div>
    )
  }
}
