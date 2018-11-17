import axios from 'axios';

const URL = 'http://localhost:3000/contacts'

// Get Contact Information

let tbody = document.querySelector('#tbody')

window.onload = function() {
	axios.get(URL)
	.then(res => {
		res.data.forEach(contact => {
			createTDElement(contact, tbody)
		})
	})
	.catch()

}

// Receive a New Contact Request

let saveContact = document.querySelector('#saveContact')

	saveContact.addEventListener('click', function() {
		createNewContact()
	})

// Create New Contact Information

function createNewContact() {
	let nameField = document.querySelector('#nameField')
	let phoneField = document.querySelector('#phoneField')
	let emailField = document.querySelector('#emailField')
	console.log(nameField);
	console.log(phoneField);
	console.log(emailField);

	let contact = {
		name: nameField.value,
		phone: phoneField.value,
		email: emailField.value
	}

	axios.post(URL, contact)
		.then(res => {
			let tbody = document.querySelector('#tbody')
			createTDElement(res.data, tbody)

			nameField.value = '',
			phoneField.value = '',
			emailField.value = ''
		})
		.catch(err => console.log(err))
}


// Creating a TR Elemrnt and Appending to its parent Element

function createTDElement(contact, parentElement){
	const TR =  document.createElement('tr')

	const tdName = document.createElement('td')
	tdName.innerHTML = contact.name
	TR.appendChild(tdName)

	const tdPhone = document.createElement('td')
	tdPhone.innerHTML = contact.phone ? contact.phone : 'N/A'
	TR.appendChild(tdPhone)

	const tdEmail = document.createElement('td')
	tdEmail.innerHTML = contact.email ? contact.email : 'N/A'
	TR.appendChild(tdEmail)

	const tdAction = document.createElement('td')

		const tdEditBtn = document.createElement('button')
		tdEditBtn.className = 'btn btn-warning btn-sm'
		tdEditBtn.innerHTML = 'Edit'
		tdEditBtn.addEventListener('click', function() {
			
			let mainModal = $('#updateContactModal')
			mainModal.modal('toggle')

			let editName = document.querySelector('#edit-name')
			let editPhone = document.querySelector('#edit-phone')
			let editEmail = document.querySelector('#edit-email')

			editName.value = contact.name 
			editPhone.value = contact.phone ? contact.phone : ''
			editEmail.value = contact.email ? contact.email : ''

			let updateBtn = document.querySelector('#updateContact')
			updateBtn.addEventListener('click', function() {

				axios.put(`${URL}/${contact.id}`, {
					name: editName.value,
					phone: editPhone.value,
					email: editEmail.value
				})
				.then(res => {
					tdName.innerHTML = res.data.name
					tdPhone.innerHTML = res.data.phone
					tdEmail.innerHTML = res.data.email

					mainModal.modal('hide')
				})
				.catch(err => console.log(err))
			})
		})
		tdAction.appendChild(tdEditBtn)

		const tdDeleteBtn = document.createElement('button')
		tdDeleteBtn.className = 'btn btn-danger btn-sm mx-1'
		tdDeleteBtn.innerHTML = 'Delete'
		tdDeleteBtn.addEventListener('click', function() {

			axios.delete(`${URL}/${contact.id}`)
				.then(res => {
					parentElement.removeChild(TR)
				})
				.catch(err => console.log(err))
		})
		tdAction.appendChild(tdDeleteBtn)

	TR.appendChild(tdAction)


	parentElement.appendChild(TR)

}