import React from 'react'

const ChooseModal = ({ target, data, redirect }) => {
	const list = data.map(item => {
		if (item.time) {
			return (
				<li key={item.file} className='restore__li'>
					<button
						className='btn btn-primary btn__restore'
						onClick={e => redirect(e, item.file)}
						data-bs-dismiss='modal'
					>
						Reserv copy from {item.time}
					</button>
				</li>
			)
		} else {
			return (
				<li key={item}>
					<a href='#' onClick={e => redirect(e, item)}>
						{item}
					</a>
				</li>
			)
		}
	})

	let msg

	if (data.length < 1) {
		msg = <div>Copy Not Found</div>
	}

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
							Restore
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Закрыть'
						></button>
					</div>
					<div className='modal-body'>
						{msg}
						{list}
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-primary'
							data-bs-dismiss='modal'
						>
							close
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChooseModal
