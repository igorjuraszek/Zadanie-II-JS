const form = document.getElementById('data')

const allPosts = [
	{
		id: 1,
		title: "Tytuł testowy 1",
		body: "Zawartość testowa 1",
		likesCount: 0,
		isDeleted: false,
	},
	{
		id: 2,
		title: "Tytuł testowy 2",
		body: "Zawartość testowa 2",
		likesCount: 0,
		isDeleted: false,
	},
	{
		id: 3,
		title: "Tytuł testowy 3",
		body: "Zawartość testowa 3",
		likesCount: 0,
		isDeleted: false,
	}
]

async function fetchPosts() {
	const url = 'https://jsonplaceholder.typicode.com/posts?userId=1'
	const response = await fetch(url)
	const arrayOfObjects = await response.json()
	arrayOfObjects.forEach((importedPost) => {
		postToImport = {
			id: allPosts.length + 1,
			title: importedPost.title,
			body: importedPost.body,
			likesCount: 0,
			isDeleted: false,

		}
			allPosts.push(postToImport)
			show()
	});

	}

fetchPosts()

const addPost = event => {
	event.preventDefault()

	const inputTitle = document.getElementById('input-title')
	const inputBody = document.getElementById('input-body')

	const post = {
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


function show() {
	const html = allPosts.filter(function(post){
		return post.isDeleted == false
	})
		.reverse().map(
			post =>
					`
		      <div id=${post.id}>
		        <p>${post.title}.</p>
						<p>${post.body}.</p>
		        <p>Liczba lajków:${post.likesCount}</p>
		        <p>
		          <button id="like-${post.id} "> +5 </button>
		          <button id="dislike-${post.id}"> -10 </button>
							<button id="delete-${post.id}"> delete </button>
		        </p>



		      </div>`
		)
		.join('')

	document.querySelector('#postsContainer').innerHTML = html
	const postCount = allPosts.filter(function(post){
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