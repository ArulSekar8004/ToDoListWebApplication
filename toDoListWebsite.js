//for CSS Container
let box = document.querySelector(".box");

box.onmousemove = (e) => {
  let x = e.pageX - box.offsetLeft;
  let y = e.pageY - box.offsetTop;

  box.style.setProperty("--x", x + "px");
  box.style.setProperty("--y", y + "px");
};

// for the todoList Logic

let toDoListContentBox = document.querySelector(".toDoListContentBox");
let getInput = document.querySelector(".getInput");
let btn1 = document.querySelector(".btn1");

const getValueFromTheLocalStorage = () => {
  return JSON.parse(localStorage.getItem("toDoListItem"));
};

const restoringTheDataAfterRemovingDataFromTheLocalStorage = (
  renewDataAfterRemovingFromTheLocalStorage
) => {
  return localStorage.setItem(
    "toDoListItem",
    JSON.stringify(renewDataAfterRemovingFromTheLocalStorage)
  );
};

const addToDoDynamicElement = (element) => {
  let toDoListItemBox = document.createElement("div");
  let toDoListContentBox = document.querySelector(".toDoListContentBox");
  toDoListItemBox.classList.add("toDoListItemBox");
  toDoListItemBox.innerHTML = `<li>${element}</li><button class="deleteBtn">Delete</button>`;
  toDoListContentBox.append(toDoListItemBox);
};

let toDoListItem = getValueFromTheLocalStorage() || [];

const storeValueIntoTheLocalStorage = (e) => {
  e.preventDefault();
  let itemValue = getInput.value.trim();
  if (!toDoListItem.includes(itemValue) && itemValue !== "") {
    toDoListItem.push(itemValue);
    toDoListItem = [...new Set(toDoListItem)];
    console.log(toDoListItem);
    localStorage.setItem("toDoListItem", JSON.stringify(toDoListItem));
    addToDoDynamicElement(itemValue);
  }
  getInput.value = "";
};
const showToDoList = () => {
  console.log(toDoListItem);
  toDoListItem.forEach((element) => {
    addToDoDynamicElement(element);
  });
};

showToDoList();
const removeDataFromTheLocalStorage = (e) => {
  console.log(e.target.previousElementSibling);
  let removingElement = e.target;
  let parentElem = removingElement.parentElement;
  console.log(removingElement);
  toDoListItem = toDoListItem.filter(
    (curElem) =>
      curElem.toLowerCase() !==
      removingElement.previousElementSibling.innerText.toLowerCase()
  );
  console.log(toDoListItem);
  restoringTheDataAfterRemovingDataFromTheLocalStorage(toDoListItem);
  parentElem.remove();
};
toDoListContentBox.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("deleteBtn")) {
    removeDataFromTheLocalStorage(e);
  }
});
btn1.addEventListener("click", (e) => {
  storeValueIntoTheLocalStorage(e);
});
