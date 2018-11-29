import React from 'react'
import {Cropper} from 'react-image-cropper'

export default class ImageEditor extends React.Component {
	onChange = (change) => {
		console.log(change)
	}

	render () {
		const { file } = this.props
		console.log(file)
		return (
			<div>
				<Cropper
					ref={ ref => { this.cropper = ref }}
					src={URL.createObjectURL(file)}
					fixedRatio={false}
					onChange={this.onChange}
				/>
			</div>
		)
	}
}