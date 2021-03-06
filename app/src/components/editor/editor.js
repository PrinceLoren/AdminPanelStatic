import '../../helpers/iframeLoader.js'
import axios from 'axios'
import React, { Component } from 'react'
import DOMHelper from '../../helpers/dom-helper.js'
import EditorText from '../editor-text/editor-text.js'
import Spinner from '../spinner/spinner.js'
import ConfirmModal from '../confirm-modal/confirm-modal.js'
import Panel from '../panel/panel.js'
import ChooseModal from '../choose-modal/choose-modal.js'
import UIkit from 'uikit'
import EditorMeta from '../editor-meta/editor-meta.js'
import EditorImages from '../editor-images/editor-images'
import Login from '../login/login'

export default class Editor extends Component {
	constructor() {
		super()
		this.currentPage = 'index.html'
		this.state = {
			pageList: [],
			newPageName: '',
			loading: true,
			backupsList: [],
			auth: false,
			loginError: false,
			loginLengthError: false,
		}
		this.isLoading = this.isLoading.bind(this)
		this.isLoaded = this.isLoaded.bind(this)
		this.save = this.save.bind(this)
		this.restoreBackup = this.restoreBackup.bind(this)
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
	}

	componentDidMount() {
		this.checkAuth()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.auth !== prevState.auth) {
			this.init(this.currentPage)
		}
	}

	checkAuth() {
		axios.get('./api/checkAuth.php').then(res => {
			this.setState({
				auth: res.data.auth,
			})
		})
	}

	login(pass) {
		if (pass.length > 5) {
			axios.post('./api/login.php', { password: pass }).then(res => {
				this.setState({
					auth: res.data.auth,
					loginError: !res.data.auth,
					loginLengthError: false,
				})
			})
		} else {
			this.setState({
				loginError: false,
				loginLengthError: true,
			})
		}
	}

	logout() {
		axios.get('./api/logout.php').then(() => {
			window.location.replace('/')
		})
	}

	init(page) {
		if (this.state.auth) {
			this.iframe = document.querySelector('iframe')
			this.open(page, this.isLoaded)
			this.loadPageList()
			this.loadBackupsList()
		}
	}

	open(page, cb) {
		this.currentPage = page

		axios
			.get(`../${page}?rnd=${Math.random()}`)
			.then(res => DOMHelper.parseStrToDom(res.data))
			.then(DOMHelper.wrapTextNodes)
			.then(DOMHelper.wrapImages)
			.then(dom => {
				this.virtualDom = dom
				return dom
			})
			.then(DOMHelper.serializeDOMToString)
			.then(html => axios.post('./api/saveTempPage.php', { html }))
			.then(() => this.iframe.load('../temp.html'))
			.then(() => this.enableEditing())
			.then(() => this.injectStyles())
			.then(cb)

		this.loadBackupsList()
	}

	async save() {
		this.isLoading()
		const newDom = this.virtualDom.cloneNode(this.virtualDom)
		DOMHelper.unwrapTextNodes(newDom)
		DOMHelper.unwrapImages(newDom)
		const html = DOMHelper.serializeDOMToString(newDom)
		await axios
			.post('./api/savePage.php', { pageName: this.currentPage, html })
			.then(() => this.showNotifications('Successfully saved', 'success'))
			.catch(() => this.showNotifications('Saving error', 'danger'))
			.finally(this.isLoaded)

		this.loadBackupsList()
	}

	enableEditing() {
		this.iframe.contentDocument.body
			.querySelectorAll('text-editor')
			.forEach(elem => {
				const id = elem.getAttribute('nodeid')
				const virtualElement = this.virtualDom.body.querySelector(
					`[nodeid="${id}"]`
				)
				new EditorText(elem, virtualElement)
			})

		this.iframe.contentDocument.body
			.querySelectorAll('[editableimgid]')
			.forEach(elem => {
				const id = elem.getAttribute('editableimgid')
				const virtualElement = this.virtualDom.body.querySelector(
					`[editableimgid="${id}"]`
				)
				new EditorImages(
					elem,
					virtualElement,
					this.isLoading,
					this.isLoaded,
					this.showNotifications
				)
			})
	}

	injectStyles() {
		const style = this.iframe.contentDocument.createElement('style')
		style.innerHTML = `
		text-editor:hover {
			outline: 3px solid orange;
			outline-offset: 8px;
		}
		text-editor:focus {
			outline: 3px solid red;
			outline-offset: 8px;
		}
		[editableimgid]:hover {
			outline: 3px solid orange;
			outline-offset: 8px;
		}
		`
		this.iframe.contentDocument.head.appendChild(style)
	}

	showNotifications(message, status) {
		UIkit.notification({ message, status })
	}

	loadPageList() {
		axios.get('./api').then(res => this.setState({ pageList: res.data }))
	}

	loadBackupsList() {
		axios.get('./backups/backups.json').then(res =>
			this.setState({
				backupsList: res.data.filter(backup => {
					return backup.page === this.currentPage
				}),
			})
		)
	}

	restoreBackup(e, backup) {
		if (e) {
			e.preventDefault()
		}

		UIkit.modal
			.confirm('Do you really want to restore this page?', {
				labels: { ok: 'restore', cancel: 'Close' },
			})
			.then(() => {
				this.isLoading()
				return axios.post('./api/restoreBackup.php', {
					page: this.currentPage,
					file: backup,
				})
			})
			.then(() => {
				this.open(this.currentPage, this.isLoaded)
			})
	}

	isLoading() {
		this.setState({
			loading: true,
		})
	}

	isLoaded() {
		this.setState({
			loading: false,
		})
	}

	render() {
		const { loading, backupsList, auth, loginError, loginLengthError } =
			this.state

		let spinner

		loading ? (spinner = <Spinner active />) : (spinner = <Spinner />)

		if (!auth) {
			return (
				<Login
					login={this.login}
					lengthErr={loginLengthError}
					logErr={loginError}
				/>
			)
		}

		return (
			<>
				<iframe src={this.currentPage} frameBorder='0'></iframe>
				<input
					id='img-upload'
					type='file'
					accept='image/*'
					style={{ display: 'none' }}
				/>

				{spinner}

				<Panel />
				<ChooseModal
					target={'exampleModal2'}
					data={backupsList}
					redirect={this.restoreBackup}
				/>
				<ConfirmModal
					target={'exampleModal'}
					method={this.save}
					text={{
						title: 'Save changes',
						body: 'Are you sure?',
						btn1: 'Close',
						btn2: 'Save',
					}}
				/>

				<ConfirmModal
					target={'exampleModal4'}
					method={this.logout}
					text={{
						title: 'Exit',
						body: 'Are you sure?',
						btn1: 'Close',
						btn2: 'Exit',
					}}
				/>

				{this.virtualDom ? (
					<EditorMeta target={'exampleModal3'} virtualDom={this.virtualDom} />
				) : (
					false
				)}
			</>
		)
	}
}
