const listViewButton = document.querySelector(".list-view-button");
const gridViewButton = document.querySelector(".grid-view-button");
const list = document.querySelector(".list-view-filter");
const spinner = document.getElementById("spinner");
const form = document.getElementById("search-form");
let users = [];

if (listViewButton) {
  listViewButton.onclick = function () {
    list.classList.remove("grid-view-filter");
    list.classList.add("list-view-filter");
    gridViewButton.classList.remove("active");
    listViewButton.classList.add("active");
  };
}
if (gridViewButton) {
  gridViewButton.onclick = function () {
    list.classList.remove("list-view-filter");
    list.classList.add("grid-view-filter");
    gridViewButton.classList.add("active");
    listViewButton.classList.remove("active");
  };
}

//Fetch Users Data
function fetchAllUsers() {
  spinner.removeAttribute("hidden");
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      users = [...data];
      spinner.setAttribute("hidden", "");
      let listBody = document.querySelector(".list");
      for (let i = 0; i < Object.keys(users).length; i++) {
        let listData = "";
        listData += `<li class="user-data">
      <div class="user-content">
          <p class="user-name"><b>Names:</b> ${users[i].name}</p>
          <p class="user-email"><b>Email:</b> ${users[i].email}</p>
          </div>
          <div class="view-user-details" onclick='fetchUserPost(${users[i].id})'>Get User’s Posts</div>
        </li>`;
        listBody.innerHTML += listData;
      }
    })
    .catch((error) => console.error(error));
}

//Go to User Post List
function fetchUserPost(id) {
  const user = users.find((data) => data.id == id);
  window.location.replace(`./user/user-details.html?userId=${user.id}`);
  localStorage.setItem("user", user.name);
}

function searchSubmit() {
  var input, filter, ul, li, div, p1, p2,counter=0,notFound;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("list-users");
  li = document.getElementsByTagName("li");
  for (let i = 0; i < li.length; i++) {
    div = li[i].getElementsByTagName("div")[0];
    p1 = div.getElementsByTagName("p")[0];
    p2 = div.getElementsByTagName("p")[1];
    if (
      p1.innerHTML.toUpperCase().indexOf(filter) > -1 ||
      p2.innerHTML.toUpperCase().indexOf(filter) > -1
    ) {
      li[i].style.display = "";
    } else {
      li[i].style = "display:none !important";
      ++counter;
    }
  }

  notFound = document.querySelector(".not-found-search");
  if(counter == li.length){
    let noResult = "";
    noResult += `
  <div >
      <h2 class="no-result">No Result Found For User!</h2>
      </div>`;
      notFound.innerHTML = noResult
  }else{
    notFound.innerHTML = ""
  }
}

fetchAllUsers();
