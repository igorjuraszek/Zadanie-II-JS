const credentialsForm = document.getElementById('login')

const usersDatabase = [
  {
    username: 'admin',
    password: 'admin123',
    email: 'admin@admin.com',
  },
  {
    username: 'user',
    password: 'user123',
    email: 'user@user.com',
  },
]

function isUserExist(username) {
for (const user of usersDatabase) {
      if (user.username === username) {
        return true
      }
  }
  return false
}

function isPasswordCorrect(username, password) {
  if (usersDatabase.find(user => user.username === username).password === password) {
    return true
  }
  return false
}


const checkCredentials = event => {
	event.preventDefault()

  const formUsername = document.getElementById('username').value
  const formPassword = document.getElementById('password').value
//  console.log(formUsername)
//  console.log(formPassword)
  if (isUserExist(formUsername)){
    if (isPasswordCorrect(formUsername, formPassword)){
      console.log("Dane poprawne")
    } else {
      console.log("Hasło niepoprawne")
    }
  } else {
    console.log("Podany użytkownik nie istnieje")
  }

}

credentialsForm.addEventListener('submit', checkCredentials)
