"use strict";

window.addEventListener("load", () => {
  const loadToDoItem = localStorage.getItem("toDoItem");

  if (loadToDoItem) {
    toDoArray = JSON.parse(loadToDoItem);
    toDoArray.forEach((toDoItem) => {
      addToDoItem(toDoItem.id, toDoItem.text, toDoItem.check);
    });
  }
});

const toDoInputBtn = document.querySelector(".toDo__input__btn");

let toDoArray = [];

toDoInputBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const toDoInputItem = document.querySelector(".toDo__input__item");

  if (toDoInputItem.value) {
    const toDoObj = {
      id: toDoArray.length,
      text: toDoInputItem.value,
      check: 0,
    };

    addToDoItem(toDoObj.id, toDoObj.text, toDoObj.check);

    toDoInputItem.value = "";
    toDoInputItem.focus();

    toDoArray.push(toDoObj);
    localStorage.setItem("toDoItem", JSON.stringify(toDoArray));
  }
});

function addToDoItem(id, text, check) {
  const toDoOutput = document.querySelector(".toDo__output"),
    toDoNewForm = document.createElement("form"),
    toDoNewInput = document.createElement("input"),
    toDoNewDiv = document.createElement("div"),
    toDoNewEditBtn = document.createElement("button"),
    toDoNewCompleteBtn = document.createElement("button"),
    toDoNewRemoveBtn = document.createElement("button");

  toDoOutput.appendChild(toDoNewForm);

  toDoNewForm.className = "toDo__output__container";
  toDoNewForm.id = id;
  toDoNewForm.appendChild(toDoNewInput);
  toDoNewForm.appendChild(toDoNewDiv);
  toDoNewForm.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  toDoNewInput.className = "toDo__output__item";
  toDoNewInput.setAttribute("type", "text");
  toDoNewInput.setAttribute("disabled", "disabled");
  toDoNewInput.value = text;

  toDoNewDiv.className = "toDo__output__item__btn";
  toDoNewDiv.appendChild(toDoNewEditBtn);
  toDoNewDiv.appendChild(toDoNewCompleteBtn);
  toDoNewDiv.appendChild(toDoNewRemoveBtn);

  toDoNewEditBtn.className = "toDo__output__item__btn-edit";
  toDoNewEditBtn.innerHTML = "<i class='fas fa-pen-square'></i>";
  toDoNewEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (toDoNewEditBtn.classList[1] === undefined) {
      toDoNewCompleteBtn.classList.toggle("complete");

      if (toDoNewInput.getAttribute("disabled") === "disabled") {
        toDoNewInput.removeAttribute("disabled", "disabled");
        toDoNewInput.focus();
      } else {
        const toDoFormId =
          e.target.parentElement.parentElement.parentElement.id;

        toDoNewInput.setAttribute("disabled", "disabled");

        toDoArray[toDoFormId].text = toDoNewInput.value;

        localStorage.setItem("toDoItem", JSON.stringify(toDoArray));
      }
    }
  });

  toDoNewCompleteBtn.className = "toDo__output__item__btn-complete";
  toDoNewCompleteBtn.innerHTML = "<i class='fas fa-check-square'></i>";
  toDoNewCompleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (toDoNewCompleteBtn.classList[1] === undefined) {
      toDoNewInput.classList.toggle("complete");
      toDoNewEditBtn.classList.toggle("complete");

      const toDoFormId = e.target.parentElement.parentElement.parentElement.id;

      if (toDoArray[toDoFormId].check === 0) {
        toDoArray[toDoFormId].check = 1;
      } else {
        toDoArray[toDoFormId].check = 0;
      }

      localStorage.setItem("toDoItem", JSON.stringify(toDoArray));
    }
  });

  toDoNewRemoveBtn.className = "toDo__output__item__btn-remove";
  toDoNewRemoveBtn.innerHTML = "<i class='fas fa-minus-square'></i>";
  toDoNewRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    for (let i = 0; i < toDoArray.length; i++) {
      const toDoFormId = e.target.parentElement.parentElement.parentElement.id;

      if (parseInt(toDoFormId) === i) {
        toDoNewForm.remove();

        const toDoForm = document.querySelectorAll(".toDo__output__container");

        toDoArray.splice(i, 1);

        for (let j = 0; j < toDoArray.length; j++) {
          toDoArray[j].id = j;
          toDoForm[j].id = j;
        }

        localStorage.setItem("toDoItem", JSON.stringify(toDoArray));
      }
    }
  });

  if (check === 1) {
    toDoNewInput.classList.add("complete");
    toDoNewEditBtn.classList.add("complete");
  }
}
