import './uploader/Upload.scss'
import React from 'react'
import Dropzone from 'react-dropzone'
import { Header } from 'semantic-ui-react'
import { ImageEditor } from './uploader'

const TypeToComponent = {
	'image': ImageEditor
}

export default class MediaUploader extends React.Component {
	state = {
		file: null,
		fileType: null
	}

	onDrop = ([file]) => {
		const [type, extension] = file.type.split('/')
		console.log(type)
		if (type !== 'image' && type !== 'video') return
		this.setState({ file, fileType: type })
	}

  render () {
		console.log(this.state)
		const { file, fileType } = this.state
		if (file && fileType && TypeToComponent[fileType]) {
			const Component = TypeToComponent[fileType]
			return (
				<div class='upload-container'>
					<Component file={file} />
				</div>
			)
		}
		return (
			<div class='upload-container'>
				<Dropzone 
					multiple={false}
					className='dropzone-container'
					maxSize={100 * 1024}
					onDrop={this.onDrop}
				>
					<p class='dropzone-header'>Drop your file here or click to upload</p>
				</Dropzone>
			</div>
		)
	}
}