"use strict";

let toDoArray = [];

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

    saveToDoItem();
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
  toDoNewForm.setAttribute("draggable", "true");
  toDoNewForm.appendChild(toDoNewInput);
  toDoNewForm.appendChild(toDoNewDiv);
  toDoNewForm.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
  toDoNewForm.addEventListener("dragstart", () => {
    toDoNewForm.classList.add("drag");

    toDoOutput.childNodes.forEach((toDoForm) => {
      if (toDoForm !== toDoNewForm) {
        toDoForm.classList.add("hint");
      }
    });
  });
  toDoNewForm.addEventListener("dragend", () => {
    toDoNewForm.classList.remove("drag");

    toDoOutput.childNodes.forEach((toDoForm) => {
      if (toDoForm !== toDoNewForm) {
        toDoForm.classList.remove("hint");
      }
    });
  });
  toDoNewForm.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  toDoNewForm.addEventListener("drop", () => {
    const dragItem = document.querySelector(".drag");

    let dragPos = 0,
      dropPos = 0;

    toDoOutput.childNodes.forEach((toDoForm) => {
      if (toDoForm === dragItem) {
        dragPos = toDoForm.id;
      } else if (toDoForm === toDoNewForm) {
        dropPos = toDoForm.id;
      }
    });

    if (dragPos < dropPos) {
      toDoOutput.insertBefore(dragItem, toDoNewForm.nextSibling);
    } else {
      toDoOutput.insertBefore(dragItem, toDoNewForm);
    }

    const dragItemSlice = toDoArray.splice(dragItem.id, 1);

    toDoArray.splice(toDoNewForm.id, 0, dragItemSlice[0]);

    sortToDoItemID();

    saveToDoItem();
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

    if (!toDoNewEditBtn.classList[1]) {
      toDoNewCompleteBtn.classList.toggle("complete");

      if (toDoNewInput.getAttribute("disabled") === "disabled") {
        toDoNewForm.setAttribute("draggable", "false");
        toDoNewInput.removeAttribute("disabled", "disabled");
        toDoNewInput.focus();
      } else {
        toDoNewForm.setAttribute("draggable", "true");
        toDoNewInput.setAttribute("disabled", "disabled");

        toDoArray[toDoNewForm.id].text = toDoNewInput.value;

        saveToDoItem();
      }
    }
  });

  toDoNewCompleteBtn.className = "toDo__output__item__btn-complete";
  toDoNewCompleteBtn.innerHTML = "<i class='fas fa-check-square'></i>";
  toDoNewCompleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!toDoNewCompleteBtn.classList[1]) {
      toDoNewInput.classList.toggle("complete");
      toDoNewEditBtn.classList.toggle("complete");

      if (toDoArray[toDoNewForm.id].check === 0) {
        toDoArray[toDoNewForm.id].check = 1;
      } else {
        toDoArray[toDoNewForm.id].check = 0;
      }

      saveToDoItem();
    }
  });

  toDoNewRemoveBtn.className = "toDo__output__item__btn-remove";
  toDoNewRemoveBtn.innerHTML = "<i class='fas fa-minus-square'></i>";
  toDoNewRemoveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toDoOutput.childNodes.forEach((toDoForm) => {
      if (toDoForm.id === toDoNewForm.id) {
        toDoNewForm.remove();

        toDoArray.splice(toDoNewForm.id, 1);

        sortToDoItemID();

        saveToDoItem();
      }
    });
  });

  if (check === 1) {
    toDoNewInput.classList.add("complete");
    toDoNewEditBtn.classList.add("complete");
  }
}

function saveToDoItem() {
  localStorage.setItem("toDoItem", JSON.stringify(toDoArray));
}

function sortToDoItemID() {
  const toDoForm = document.querySelectorAll(".toDo__output__container");

  for (let i = 0, max = toDoArray.length; i < max; i++) {
    toDoForm[i].id = i;
    toDoArray[i].id = i;
  }
}
