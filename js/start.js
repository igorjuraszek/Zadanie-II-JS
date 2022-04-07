const usersDatabase = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@admin.com",
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    email: "user@user.com",
  },
];

if (!window.localStorage.getItem("usersDatabase")) {
  const usersToLocalStorage = JSON.stringify(usersDatabase);
  localStorage.setItem("usersDatabase", usersToLocalStorage);
}
