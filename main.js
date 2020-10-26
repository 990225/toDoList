"use strict";

const toDoInputBtn = document.querySelector(".toDo__input__btn");

toDoInputBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const toDoInputItem = document.querySelector(".toDo__input__item"),
    toDoOutput = document.querySelector(".toDo__output"),
    toDoNewForm = document.createElement("form"),
    toDoNewInput = document.createElement("input"),
    toDoNewDiv = document.createElement("div"),
    toDoNewEditBtn = document.createElement("button"),
    toDoNewCompleteBtn = document.createElement("button"),
    toDoNewRemoveBtn = document.createElement("button");

  if (toDoInputItem.value) {
    toDoOutput.appendChild(toDoNewForm);

    toDoNewForm.className = "toDo__output__container";
    toDoNewForm.appendChild(toDoNewInput);
    toDoNewForm.appendChild(toDoNewDiv);

    toDoNewInput.className = "toDo__output__item";
    toDoNewInput.setAttribute("type", "text");
    toDoNewInput.setAttribute("disabled", "disabled");
    toDoNewInput.value = toDoInputItem.value;

    toDoInputItem.value = "";
    toDoInputItem.focus();

    toDoNewDiv.className = "toDo__output__item__btn";
    toDoNewDiv.appendChild(toDoNewEditBtn);
    toDoNewDiv.appendChild(toDoNewCompleteBtn);
    toDoNewDiv.appendChild(toDoNewRemoveBtn);

    toDoNewEditBtn.className = "toDo__output__item__btn-edit";
    toDoNewEditBtn.innerHTML = "<i class='fas fa-pen-square'></i>";

    toDoNewCompleteBtn.className = "toDo__output__item__btn-complete";
    toDoNewCompleteBtn.innerHTML = "<i class='fas fa-check-square'></i>";
    toDoNewCompleteBtn.addEventListener("click", (e) => {
      e.preventDefault();

      toDoNewInput.classList.toggle("complete");
      toDoNewEditBtn.classList.toggle("complete");
    });

    toDoNewRemoveBtn.className = "toDo__output__item__btn-remove";
    toDoNewRemoveBtn.innerHTML = "<i class='fas fa-minus-square'></i>";
    toDoNewRemoveBtn.addEventListener("click", (e) => {
      e.preventDefault();

      toDoNewForm.remove();
    });
  }
});
