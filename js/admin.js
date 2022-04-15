const allPosts = JSON.parse(window.localStorage.getItem("allPosts"));
const allUsers = JSON.parse(window.localStorage.getItem("usersDatabase"));

function updateLocalStorage() {
    const usersToLocalStorage = JSON.stringify(allUsers);
    const postsToLocalStorage = JSON.stringify(allPosts);
    
    localStorage.setItem("usersDatabase", usersToLocalStorage);
    localStorage.setItem("allPosts", postsToLocalStorage);

}

const userIdToObject = id => {
    return allUsers.find((user) => {
        return user.id == id;
      });
}

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


const deletePost = postId => {
    allPosts.forEach(post => {
        if (post.id === postId){
            post.isDeleted = true
        }
    })
    updateLocalStorage()
    let userToShow = userIdToObject(post.ownerId)
    showUserDetails(userToShow)
}

const undeletePost = postId => {
    allPosts.forEach(post => {
        if (post.id == postId){
            post.isDeleted = false
        }
    })
    updateLocalStorage()
    let userToShow = userIdToObject(post.ownerId)
    showUserDetails(userToShow)
}

const deleteAllPostsByUser = userId => {
    allPosts.forEach(post => {
        
        if (post.ownerId == userId){
            post.isDeleted = true
        }
    })
    updateLocalStorage()

    let userToShow = userIdToObject(userId)
    showUserDetails(userToShow)

}


const deleteUser = userAsObject => {
    
    deleteAllPostsByUser(userAsObject.id)

    allUsers.forEach(user => {
        if (user.username == userAsObject.username) {
            user.isDeleted = true
        }
    })
    updateLocalStorage()
    showUserDetails(userAsObject.username)

}


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

const eventToUsername = event => {
    showUserDetails(event.target.id);
}


function showUserDetails(username) {

  const userAsObject = allUsers.find((user) => {
    return user.username === username;
  });
  console.log(event.target.value);
  console.log(userAsObject);


  const postsCreatedByUser = allPosts.filter((post) => {
    return post.ownerId == userAsObject.id
  });
  const postsLikedByUser = allPosts.filter((post) => {
    return post.likedByUserIds.includes(userAsObject.id);
  });
  const postsDislikedByUser = allPosts.filter((post) => {
    return post.dislikedByUserIds.includes(userAsObject.id);
  });

  function showPost(post) {
    const deleteButton = `<button id="delete-${post.id}"> usuń post </button>`
    const undeleteButton = `<button id="undelete-${post.id}"> przywróć post </button>`
    return `
    <div id="${post.id}">
    <p>${post.isDeleted? `[deleted] ${post.title}` : post.title}</p>
    <p>${post.body}</p>
    <p>Liked by: ${post.likedByUserIds.length} users, Dislike by: ${post.dislikedByUserIds.length} users</p>
    ${post.isDeleted? undeleteButton : deleteButton}
    </div>
    `;
  }

  const userDetails = `
  <div id="user-information">
  <p>ID: ${userAsObject.id}</p>
  <p>USERNAME: ${userAsObject.username}</p>
  <p>EMAIL: ${userAsObject.email}</p>
  <p>ILOŚĆ UTWORZONYCH POSTÓW: ${postsCreatedByUser.length}</p>
  <p>ILOŚĆ LAJKOWANYCH POSTÓW: ${postsLikedByUser.length}</p>
  <p>ILOŚĆ DISLAJKOWANYCH POSTÓW: ${postsDislikedByUser.length}</p>
  ${userAsObject.isDeleted? `<p>UŻYTKOWNIK USUNIĘTY</p>` : `<button id="deleteuser-${userAsObject.id}"> USUŃ UŻYTKOWNIKA </button>`}
  </div>
  <div id="posts">
  <p>POSTY UŻYTKOWNIKA:</p>
  ${postsCreatedByUser.map(showPost).join("")}
  </div>
  `;
  document.querySelector(".user-details").innerHTML = userDetails;


}

document.querySelectorAll('button')
document.querySelector('.user-details').addEventListener('click', (event) => {
    const buttonId = event.target.id;
      const btnType = buttonId.split("-")[0];
      const id = parseInt(buttonId.split("-")[1]);
    
    
    
      console.log(buttonId);
      console.log(btnType);
      console.log(id);
        const userToDelete = userIdToObject(id)
        console.log(userToDelete)
        
      if (btnType === "deleteuser") {
        deleteUser(userToDelete)
      }
    
    })

document
  .querySelector("#list-of-users")
  .addEventListener("click", eventToUsername);
