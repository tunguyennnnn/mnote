import './uploader/Upload.scss'
import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { ImageEditor } from './uploader'

const TypeToComponent = {
	'image': ImageEditor
}

export default class MediaUploader extends React.Component {
	state = {
		file: null,
		fileType: null
	}

	onDrop = async ([file]) => {
		try {
			console.log(file)
			const [type, extension] = file.type.split('/')
			if (type !== 'image' && type !== 'video') return
			// this.setState({ file, fileType: type })
			const bodyFormData = new FormData()
			bodyFormData.set('file', file)
			const response = await axios({
				method: 'POST',
				url: 'http://localhost:4001/upload',
				data: bodyFormData,
				config: { headers: { 'Content-Type': 'multipart/form-data' }}
			})
			console.log(response)
		} catch (e) {
			console.log(e)
		}
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