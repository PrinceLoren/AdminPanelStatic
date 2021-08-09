import React from 'react'

const ConfirmModal = ({ target, method }) => {
	return (
		<div
			className='modal fade'
			id={target}
			tabIndex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='exampleModalLabel'>
							Save changes
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Закрыть'
						></button>
					</div>
					<div className='modal-body'>Are you sure?</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							data-bs-dismiss='modal'
						>
							close
						</button>
						<button
							type='button'
							className='btn btn-primary'
							data-bs-dismiss='modal'
							onClick={() => method()}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
