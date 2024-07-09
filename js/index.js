let btn = document.getElementById("submit");
let nameInput = document.getElementById("site-name");
let urlInput = document.getElementById("url-name");

let bookmarks;
let temp;
if (localStorage.getItem("bookmark")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmark"));
  display(bookmarks);
} else {
  bookmarks = [];
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (btn.innerHTML == "submit") {
    let bookmark = {
      name: nameInput.value,
      url: urlInput.value,
    };
    bookmarks.push(bookmark);
  } else {
    let bookmark = {
      name: nameInput.value,
      url: urlInput.value,
    };
    bookmarks.splice(temp, 1, bookmark);

    btn.innerHTML = "submit";
    btn.style.backgroundColor = "#b4ac4a";
    console.log("update");
  }

  localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  display(bookmarks);
  console.log(urlInput.value);
  clearItem();
});

function display(anyArr) {
  let cartona = "";
  for (let i = 0; i < anyArr.length; i++) {
    cartona += ` 
    <tr>
            <td>${anyArr[i].name}</td>
            <td>
              <button class="btn visit-btn" onClick=(visitItem(${i}))>
                <i class="fas fa-eye"></i> Visit
              </button>
            </td>
            <td>
              <button class="btn update-btn" onClick=(updateItem(${i}))>
                <i class="fas fa-pen"></i> Update
              </button>
            </td>
            <td>
              <button class="btn delete-btn" onClick=(deleteItem(${i}))>
                <i class="fas fa-trash-can"></i> Delete
              </button>
            </td>
             </tr>
            `;
  }
  document.getElementById("tbody").innerHTML = cartona;
}
function deleteItem(i) {
  bookmarks.splice(i, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  display(bookmarks);
}
function updateItem(i) {
  btn.innerHTML = "Update";
  nameInput.value = bookmarks[i].name;
  urlInput.value = bookmarks[i].url;
  btn.style.backgroundColor = "blue";
  temp = i;
}

function clearItem() {
  nameInput.value = "";
  urlInput.value = "";
}

function visitItem(i) {
  window.open(`https://${bookmarks[i].url}.com`);
}

function searchItem(e) {
  let value = e.target.value;
  let wantedBook = [];

  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name.includes(value)) {
      wantedBook.push(bookmarks[i]);
    }
    console.log(wantedBook);
    display(wantedBook);
  }
}
