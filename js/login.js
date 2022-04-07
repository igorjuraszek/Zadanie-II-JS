const credentialsForm = document.getElementById('login')

const usersFromLocalStorage = JSON.parse(window.localStorage.getItem('usersDatabase'))

function isUserExist(username) {
for (const user of usersFromLocalStorage) {
      if (user.username === username) {
        return true
      }
  }
  return false
}

function isPasswordCorrect(username, password) {
  if (usersFromLocalStorage.find(user => user.username === username).password === password) {
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
      //console.log("Dane poprawne")
      localStorage.setItem('currentUser', formUsername)
      window.location.href = 'index.html'

    } else {
      console.log("Hasło niepoprawne")
    }
  } else {
    console.log("Podany użytkownik nie istnieje")
  }

}

credentialsForm.addEventListener('submit', checkCredentials)
