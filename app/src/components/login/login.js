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
		const { login } = this.props
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
