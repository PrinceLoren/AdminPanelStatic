import React, { Component } from 'react'

export default class EditorMeta extends Component {
	constructor(props) {
		super(props)
		this.state = {
			meta: {
				title: '',
				keywords: '',
				description: '',
			},
		}
	}

	componentDidMount() {
		this.getMeta(this.props.virtualDom)
	}

	componentDidUpdate(prevProps) {
		if (this.props.virtualDom !== prevProps.virtualDom) {
			this.getMeta(this.props.virtualDom)
		}
	}

	getMeta(virtualDom) {
		this.title =
			virtualDom.head.querySelector('title') ||
			virtualDom.head.appendChild(virtualDom.createElement('title'))

		this.keywords = virtualDom.head.querySelector('meta[name="keywords"]')
		if (!this.keywords) {
			this.keywords = virtualDom.head.appendChild(
				virtualDom.createElement('meta')
			)
			this.keywords.setAttribute('name', 'keywords')
			this.keywords.setAttribute('content', '')
		}

		this.description = virtualDom.head.querySelector('meta[name="description"]')
		if (!this.description) {
			this.description = virtualDom.head.appendChild(
				virtualDom.createElement('meta')
			)
			this.description.setAttribute('name', 'description')
			this.description.setAttribute('content', '')
		}

		this.setState({
			meta: {
				title: this.title.innerHTML,
				keywords: this.keywords.getAttribute('content'),
				description: this.description.getAttribute('content'),
			},
		})
	}

	applyMeta() {
		this.title.innerHTML = this.state.meta.title
		this.keywords.setAttribute('content', this.state.meta.keywords)
		this.description.setAttribute('content', this.state.meta.description)
	}

	onValueChange(e) {
		if (e.target.getAttribute('data-title')) {
			e.persist()
			this.setState(({ meta }) => {
				const newMeta = {
					...meta,
					title: e.target.value,
				}

				return {
					meta: newMeta,
				}
			})
		} else if (e.target.getAttribute('data-key')) {
			e.persist()
			this.setState(({ meta }) => {
				const newMeta = {
					...meta,
					keywords: e.target.value,
				}

				return {
					meta: newMeta,
				}
			})
		} else {
			e.persist()
			this.setState(({ meta }) => {
				const newMeta = {
					...meta,
					description: e.target.value,
				}

				return {
					meta: newMeta,
				}
			})
		}
	}

	render() {
		const { target } = this.props
		const { title, keywords, description } = this.state.meta
		return (
			<>
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
									Editor META
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Закрыть'
								></button>
							</div>
							<div className='modal-body'>
								<form>
									<div className='form-group mb-3'>
										<input
											data-title
											type='text'
											className='form-control'
											id='exampleFormControlInput1'
											placeholder='Title'
											value={title}
											onChange={e => {
												this.onValueChange(e)
											}}
										/>
									</div>
									<div className='form-group mb-3'>
										<textarea
											data-key
											className='form-control'
											id='exampleFormControlTextarea1'
											rows='5'
											placeholder='Keywords'
											value={keywords}
											onChange={e => {
												this.onValueChange(e)
											}}
										></textarea>
									</div>
									<div className='form-group mb-3'>
										<textarea
											data-descr
											className='form-control'
											id='exampleFormControlTextarea1'
											rows='5'
											placeholder='Description'
											value={description}
											onChange={e => {
												this.onValueChange(e)
											}}
										></textarea>
									</div>
								</form>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-primary'
									data-bs-dismiss='modal'
									onClick={() => {
										this.applyMeta()
									}}
								>
									Apply
								</button>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}
