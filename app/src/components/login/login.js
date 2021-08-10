import React, { Component } from 'react'
export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pass: '',
		}
	}

	onPasswordChange(e) {
		this.setState({
			pass: e.target.value,
		})
	}

	render() {
		const { pass } = this.state
		const { login, lengthErr, logErr } = this.props
		let renderLogErr, renderLengthErr

		logErr
			? (renderLogErr = <span className='login-error'>Incorrect password</span>)
			: null

		lengthErr
			? (renderLengthErr = (
					<span className='login-error'>
						Password must be at least 5 symbol
					</span>
			  ))
			: null

		return (
			<div className='login-container'>
				<div className='login'>
					<p className='lead'>Authorization</p>
					<label htmlFor='inputPassword5' className='form-label'>
						Password
					</label>
					<input
						type='password'
						name=''
						id='inputPassword5'
						className='form-control'
						aria-describedby='passwordHelpBlock'
						value={pass}
						onChange={e => this.onPasswordChange(e)}
					/>
					{renderLogErr}
					{renderLengthErr}
					<div id='passwordHelpBlock' className='form-text'>
						Enter the administrator password
					</div>
					<div className='d-grid marb'>
						<button className='btn btn-primary' onClick={() => login(pass)}>
							Login
						</button>
					</div>
				</div>
			</div>
		)
	}
}
