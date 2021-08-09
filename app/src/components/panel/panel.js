import React from 'react'

const Panel = () => {
	return (
		<div className='panel'>
			<button
				type='button'
				className='btn btn-primary me-md-2'
				data-bs-toggle='modal'
				data-bs-target='#exampleModal'
			>
				Save
			</button>
			<button
				type='button'
				className='btn btn-primary me-md-2'
				data-bs-toggle='modal'
				data-bs-target='#exampleModal3'
			>
				Edit META
			</button>

			<button
				type='button'
				className='btn btn-primary me-md-2'
				data-bs-toggle='modal'
				data-bs-target='#exampleModal2'
			>
				backup
			</button>
		</div>
	)
}

export default Panel
