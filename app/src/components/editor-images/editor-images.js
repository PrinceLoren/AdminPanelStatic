import axios from 'axios'
import React from 'react'

export default class EditorImages {
	constructor(
		element,
		virtualElement,
		...[isLoading, isLoaded, showNotifications]
	) {
		this.element = element
		this.virtualElement = virtualElement

		this.element.addEventListener('click', () => this.onClick())
		this.imgUpLoader = document.querySelector('#img-upload')
		this.isLoading = isLoading
		this.isLoaded = isLoaded
		this.showNotifications = showNotifications
	}

	onClick() {
		this.imgUpLoader.click()
		this.imgUpLoader.addEventListener('change', () => {
			if (this.imgUpLoader.files && this.imgUpLoader.files[0]) {
				let formData = new FormData()

				formData.append('image', this.imgUpLoader.files[0])
				this.isLoading()
				axios
					.post('./api/uploadImage.php', formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					})
					.then(res => {
						this.virtualElement.src =
							this.element.src = `./assets/img/${res.data.src}`
					})
					.catch(() => this.showNotifications('Saving error', 'danger'))
					.finally(() => {
						this.imgUpLoader.value = ''
						this.isLoaded()
					})
			}
		})
	}
}
