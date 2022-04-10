const allPosts = JSON.parse(window.localStorage.getItem("allPosts"));
const allUsers = JSON.parse(window.localStorage.getItem("usersDatabase"));

let searchInput = "";
const userSearchMenu = document.querySelector(".search-usernames");
const userSearchInnput = document.querySelector("#search-user");
const userDetailsContainer = document.querySelector(".user-details");

const form = document.getElementById("data");
window.onload = function () {
  if (!window.localStorage.getItem("currentUser")) {
    window.location.href = "start.html";
  }
};

function logout() {
  window.localStorage.removeItem("currentUser");
  window.location.href = "start.html";
}

const searchUser = (event) => {
  searchInput = event.target.value;
  showUsers();
};

document.querySelector("#search-user").addEventListener("keyup", searchUser);

function showUsers() {
  const containOfListOfUsers = allUsers
    .filter((user) => {
      return user.username.includes(searchInput);
    })
    .map((user) => {
      return `<li id="${user.username}">${user.username}</li>`;
    })
    .join("");
  document.querySelector("#list-of-users").innerHTML = containOfListOfUsers;
}

showUsers();

function showUserDetails(event) {
  const username = event.target.id;
  const userAsObject = allUsers.find((user) => {
    return user.username === username;
  });

  const postsCreatedByUser = allPosts.filter((post) => {
    return post.ownerId === userAsObject.id;
  });
  const postsLikedByUser = allPosts.filter((post) => {
    return post.likedByUserIds.includes(userAsObject.id);
  });
  const postsDislikedByUser = allPosts.filter((post) => {
    return post.dislikedByUserIds.includes(userAsObject.id);
  });

  function showPost(post) {
    return `
    <p>${post.title}</p>
    <p>${post.bodu}</p>
    <p>Liked by: ${post.likedByUserIds.length} users, Dislike by: ${post.dislikedByUserIds.length} users</p>
    `;
  }

  const userDetails = `
  <p>ID: ${userAsObject.id}</p>
  <p>USERNAME: ${userAsObject.username}</p>
  <p>EMAIL: ${userAsObject.email}</p>
  <p>ILOŚĆ UTWORZONYCH POSTÓW: ${postsCreatedByUser.length}</p>
  <p>ILOŚĆ LAJKOWANYCH POSTÓW: ${postsLikedByUser.length}</p>
  <p>ILOŚĆ DISLAJKOWANYCH POSTÓW: ${postsDislikedByUser.length}</p>
  <p>POSTY UŻYTKOWNIKA:</p>
  ${postsCreatedByUser.map(showPost).join("")}
  `;
  document.querySelector(".user-details").innerHTML = userDetails;
}

document
  .querySelector("#list-of-users")
  .addEventListener("click", showUserDetails);
