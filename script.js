// selecting ele

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(e) {
  e.preventDefault();
  const inputValue = itemInput.value;

  if (inputValue == "") {
    alert("please add item");
    return;
  }
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(inputValue));
  li.appendChild(createButton("remove-item btn-link text-red"));

  itemList.appendChild(li);
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

itemForm.addEventListener("submit", addItem);
