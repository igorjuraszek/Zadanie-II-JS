const allPosts = [
  {
    id: 1,
    ownerId: 1,
    title: "Tytuł testowy 1",
    body: "Zawartość testowa 1",
    likesCount: 0,
    isDeleted: false,
    likedByUserIds: [],
    dislikedByUserIds: [],
  },
  {
    id: 2,
    ownerId: 1,
    title: "Tytuł testowy 2",
    body: "Zawartość testowa 2",
    likesCount: 0,
    isDeleted: false,
    likedByUserIds: [],
    dislikedByUserIds: [],
  },
  {
    id: 3,
    ownerId: 1,
    title: "Tytuł testowy 3",
    body: "Zawartość testowa 3",
    likesCount: 0,
    isDeleted: false,
    likedByUserIds: [],
    dislikedByUserIds: [],
  },
];

async function fetchPosts() {
  const url = "https://jsonplaceholder.typicode.com/posts?userId=1";
  const response = await fetch(url);
  const arrayOfObjects = await response.json();
  arrayOfObjects.forEach((importedPost) => {
    postToImport = {
      id: allPosts.length + 1,
      ownerId: 1,
      title: importedPost.title,
      body: importedPost.body,
      likesCount: 0,
      isDeleted: false,
      likedByUserIds: [],
      dislikedByUserIds: [],
    };
    allPosts.push(postToImport);
  });
  const postsToLocalStorage = JSON.stringify(allPosts);
  if (!localStorage.getItem("allPosts")) {
    localStorage.setItem("allPosts", postsToLocalStorage);
  }
}

fetchPosts();

const usersDatabase = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@admin.com",
    isDeleted: false,
    isAdmin: true,
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    email: "user@user.com",
    isDeleted: false,
    isAdmin: false,
  },
];

if (!window.localStorage.getItem("usersDatabase")) {
  const usersToLocalStorage = JSON.stringify(usersDatabase);
  localStorage.setItem("usersDatabase", usersToLocalStorage);
}
