const registerForm = document.getElementById("register")

const checkRegisterCredentials = (event) => {
  event.preventDefault();

  const usersFromLocalStorage = JSON.parse(
    window.localStorage.getItem("usersDatabase")
  );

  const formUsername = document.getElementById("username").value;
  const formPassword = document.getElementById("password").value;
  const formRepeatedPassword = document.getElementById("repeat-password").value;
  const formEmail = document.getElementById("email").value;
  
  if (formPassword === formRepeatedPassword) {
    const newUser = {
      id: usersFromLocalStorage.length,
      username: formUsername,
      password: formPassword,
      email: formEmail,
    }
    
    if (!usersFromLocalStorage.find(user => user.username === formUsername)){
      usersFromLocalStorage.push(newUser);

      const newUsersToLocalStorage = JSON.stringify(usersFromLocalStorage);
      localStorage.setItem("usersDatabase", newUsersToLocalStorage);

      window.location.href = 'index.html'
    }
  }
};



registerForm.addEventListener("submit", checkRegisterCredentials);
