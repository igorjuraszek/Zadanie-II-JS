const registerForm = document.getElementById('register')

const checkRegisterCredentials = event => {
	event.preventDefault()

  const formUsername = document.getElementById('username').value
  const formPassword = document.getElementById('password').value
  const formRepeatedPassword = document.getElementById('repeat-password').value
  const formEmail = document.getElementById('password').value

  console.log(formUsername)
  console.log(formPassword)
  console.log(formRepeatedPassword)
  console.log(formEmail)

  if (formPassword !== formRepeatedPassword){
    console.log("Hasła nie są takie same")
  }

}

registerForm.addEventListener('submit', checkRegisterCredentials)
