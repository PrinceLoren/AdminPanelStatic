import React from 'react'

const ConfirmModal = ({ target, method, text }) => {
	const { title, body, btn1, btn2 } = text
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
							{title}
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Закрыть'
						></button>
					</div>
					<div className='modal-body'>{body}</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-secondary'
							data-bs-dismiss='modal'
						>
							{btn1}
						</button>
						<button
							type='button'
							className='btn btn-primary'
							data-bs-dismiss='modal'
							onClick={() => method()}
						>
							{btn2}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
