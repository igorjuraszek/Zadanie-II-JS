const form = document.getElementById('data')
window.onload = function () {
	if (!window.localStorage.getItem('currentUser')) {
		window.location.href = 'start.html'
	}
}

function logout() {
	window.localStorage.removeItem('currentUser')
	window.location.href = 'start.html'
}

const allPosts = [
	{
		id: 1,
		ownerId: 1,
		title: 'Tytuł testowy 1',
		body: 'Zawartość testowa 1',
		likesCount: 0,
		isDeleted: false,
	},
	{
		id: 2,
		ownerId: 1,
		title: 'Tytuł testowy 2',
		body: 'Zawartość testowa 2',
		likesCount: 0,
		isDeleted: false,
	},
	{
		id: 3,
		ownerId: 1,
		title: 'Tytuł testowy 3',
		body: 'Zawartość testowa 3',
		likesCount: 0,
		isDeleted: false,
	},
]

async function fetchPosts() {
	const url = 'https://jsonplaceholder.typicode.com/posts?userId=1'
	const response = await fetch(url)
	const arrayOfObjects = await response.json()
	arrayOfObjects.forEach(importedPost => {
		postToImport = {
			id: allPosts.length + 1,
			ownerId: 1,
			title: importedPost.title,
			body: importedPost.body,
			likesCount: 0,
			isDeleted: false,
		}
		allPosts.push(postToImport)
		show()
	})
}

fetchPosts()

const addPost = event => {
	event.preventDefault()

	const inputTitle = document.getElementById('input-title')
	const inputBody = document.getElementById('input-body')

	const post = {
		ownerId: loggedAs.id,
		id: allPosts.length + 1,
		title: inputTitle.value,
		body: inputBody.value,
		likesCount: 0,
		isDeleted: false,
	}

	if (post.title !== '' && post.body !== '') {
		allPosts.push(post)
	}
	show()
}

form.addEventListener('submit', addPost)

const showButtons = (post, canUserLikePost) => {
	if (canUserLikePost) {
		return `
      <button id="like-${post.id}"> +5 </button>
      <button id="dislike-${post.id}"> -10 </button>
    `
	} else {
		return `
     <button id="delete-${post.id}"> delete </button>
     `
	}
}

const createPost = (post, canUserLikePost) => {
	return `
    <div id=${post.id}>
      <p>${post.ownerId}.</p>
      <p>${post.title}.</p>
      <p>${post.body}.</p>
      <p>Liczba lajków:${post.likesCount}</p>
      <p>
         
${showButtons(post, canUserLikePost)}
    </p>
    </div>`
}

function show() {
	const html = allPosts
		.filter(function (post) {
			return post.isDeleted == false
		})
		.reverse()
		.map(post => {
			const canUserLikePost = loggedAs.id !== post.ownerId

			return createPost(post, canUserLikePost)
		})
		.join('')

	document.querySelector('#postsContainer').innerHTML = html
	const postCount = allPosts.filter(function (post) {
		return post.isDeleted == false
	}).length
	document.querySelector('#numberPost').textContent = `Liczba postów: ${postCount}`
}

document.querySelector('#postsContainer').addEventListener('click', event => {
	console.log(event)
	const id = event.target.id
	const btnType = id.split('-')[0]
	const postId = parseInt(id.split('-')[1])
	console.log(btnType, postId, id)
	if (btnType === 'like') {
		allPosts[postId - 1].likesCount = allPosts[postId - 1].likesCount + 5
		show()
	}
	if (btnType === 'dislike') {
		allPosts[postId - 1].likesCount = allPosts[postId - 1].likesCount - 10
		show()
	}
	if (btnType === 'delete') {
		allPosts[postId - 1].isDeleted = true
		show()
	}
})

const userFromLocalStorage = window.localStorage.getItem('currentUser')
const loggedAs = JSON.parse(userFromLocalStorage)
const displayedUsername = loggedAs.username

document.querySelector('#logged-as').textContent = `Zalogowano jako: ${displayedUsername}`
