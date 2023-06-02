// selecting ele

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const items = document.querySelectorAll("li");
const filter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function addAndStoreItem(e) {
  e.preventDefault();
  const inputValue = itemInput.value;

  if (inputValue == "") {
    alert("please add item");
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(inputValue)) {
      alert("That already exists");
      return;
    }
  }

  addItemToDOM(inputValue);
  addItemToStorage(inputValue);
  checkUI();
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  li.appendChild(createButton("remove-item btn-link text-red"));

  itemList.appendChild(li);
  itemInput.value = "";
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function displayItems() {
  const items = getItemFromStorage();

  items.forEach((ele) => {
    addItemToDOM(ele);
    checkUI();
  });
}

function createButton(classes) {
  const button = document.createElement("button");
  button.classList = classes;
  button.appendChild(createIcon("fa-solid fa-xmark"));
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.classList = classes;
  return icon;
}

function onClickLi(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    const item = e.target.parentElement.parentElement;
    removeItem(item);
    checkUI();
  } else {
    setEditMode(e.target);
  }
}

function setEditMode(ele) {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  ele.classList.add("edit-mode");
  formBtn.innerHTML = '<i class = "fa-solid fa-pen"</li> Update item';
  formBtn.style.backgroundColor = "blue";
  itemInput.value = ele.textContent;
}

function removeItem(item) {
  item.remove();
  removeItemFromStorage(item.textContent);
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  newItemsFromStorage = itemsFromStorage.filter((ele) => ele != item);
  localStorage.setItem("items", JSON.stringify(newItemsFromStorage));
}

function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem("items");

  checkUI();

  // localStorage.clear();
}

function checkUI() {
  itemInput.value = "";
  const items = document.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";

    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }
  isEditMode = false;

  formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function filterItems(e) {
  const items = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  console.log(text);
  items.forEach((ele) => {
    const itemName = ele.firstChild.textContent.toLowerCase();
    console.log(itemName);

    if (itemName.indexOf(text) != -1) {
      ele.style.display = "flex";
    } else {
      ele.style.display = "none";
    }
  });
}

function init() {
  itemForm.addEventListener("submit", addAndStoreItem);
  itemList.addEventListener("click", onClickLi);
  filter.addEventListener("input", filterItems);
  clearBtn.addEventListener("click", clearItems);

  document.addEventListener("DOMContentLoaded", displayItems);
}

init();

// document.querySelectorAll("i").forEach((i) => {
//   i.addEventListener("click", (e) => {
//     e.target.parentElement.parentElement.remove();
//   });
// });

// filter.addEventListener("input", filterItems);

// let itemsFromStorage;

// if (localStorage.getItem("items") === null) {
//   itemsFromStorage = [];
// } else {
//   itemsFromStorage = JSON.parse(localStorage.getItem("items"));
// }

// itemsFromStorage.push("ok", "i");

// localStorage.setItem("items", JSON.stringify(itemsFromStorage));
