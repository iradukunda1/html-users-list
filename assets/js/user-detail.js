let loader = document.getElementById("loader");
const backButton = document.querySelector(".back-button");
const userName = document.querySelector(".user-name");

const getUser = localStorage.getItem("user");
userName.innerHTML = getUser;

backButton.onclick = function () {
  window.location.replace("../index.html");
  localStorage.clear();
};

function fetchUserPost(id) {
  loader.removeAttribute("hidden");
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.json())
    .then((posts) => {
      loader.setAttribute("hidden", "");
      let listBody = document.querySelector(".post-list");
      for (let i = 0; i < Object.keys(posts).length; i++) {
        let listPost = "";
        listPost += `<li class="post-data">
      <div class="post-content">
          <h3 class="post-title">${posts[i].title}</h3>
          <p class="post-body">${posts[i].body}</p>
          </div>
        </li>`;
        listBody.innerHTML += listPost;
      }
    })
    .catch((error) => console.error(error));
}
const urlSearchParams = new URLSearchParams(window.location.search);
const userId = Object.fromEntries(urlSearchParams.entries()).userId;
fetchUserPost(userId);
