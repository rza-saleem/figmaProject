let addTaskBtn = document.getElementById("add-new-task");
let modalForm = document.getElementById("taskForm");
let summaryInput = document.getElementById("summary");
let dueDateInput = document.getElementById("dueDate");
let descriptionInput = document.getElementById("description");
let ul = document.getElementById("incompleteTasks");
let completedTasksList = document.getElementById("completedTasks");
let modalSubmitBtn = document.getElementById('modalSubmit');
let reminderbtn = document.getElementById('reminder');

// Click the New Task
addTaskBtn.addEventListener("click", function() {
  summaryInput.value = "";
  dueDateInput.value = "";
});

// Fill Task Form & Click to Save and Show in inComplete Section
modalSubmitBtn.addEventListener("click", function () {
  if (summary === "" || dueDate === "") {
    alert("Must Add New Task...");
    return;
  }

  let li = document.createElement("li");
  li.className = "list-group-item p-0 mb-2";
  li.innerHTML =    `   <div class="col-sm-12 d-flex align-items-center h-20">
                            <input type="checkbox" name="" class="form-check-input me-3 mb-1 checkboxInput unCheckBox">
                            <span class="taskName">${summaryInput.value}</span>
                        </div>
                        <div class="col-sm-12 ml-2">
                            <span class="time">${dueDateInput.value}</span>
                        </div>
                    `;

  ul.appendChild(li);
  savetoLocalStorage();
});
       
// inComplete Task Click Check Convert into Complete Section
ul.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkboxInput")) {
    if (e.target.checked) {
        let taskElement = e.target.closest("li");
        let taskName = taskElement.querySelector(".taskName").innerText;
        let taskDueDate = taskElement.querySelector(".time").innerText;
    
        ul.removeChild(taskElement);
    
        // New Task Create in Complete Section
        let check_li = document.createElement("li");
        check_li.className = "list-group-item p-0 mb-3";
        check_li.innerHTML =  ` <div class="col-sm-12 d-flex align-items-center h-20">
                                    <input type="checkbox" name="" class="form-check-input me-3 mb-1 checkboxInput checkBox" checked>
                                    <span class="taskName">${taskName}</span>
                                  </div>
                                `;
        completedTasksList.appendChild(check_li);
        savetoLocalStorage();
    }
  }
});

function removeReminder(){
  reminderbtn.style.display = "none";
  let marginLeft = document.querySelectorAll('.ml-2');
  marginLeft.forEach((item)=>{
    item.style.marginLeft = "10%";
  })
}

// Function Save Tasks to Local Storage
function savetoLocalStorage() {
  // Save UnChecked(InComplete) Tasks
  let incompleteTasks_Arr = [];
  ul.querySelectorAll("li").forEach((element) => {
      let summaryTxt = element.querySelector(".taskName").innerText;
      let dateTimeTxt = element.querySelector(".time").innerText;
      incompleteTasks_Arr.push({ 
        Summary: summaryTxt, 
        dateTime: dateTimeTxt, 
      });
  });
  localStorage.setItem('InComplete_Tasks', JSON.stringify(incompleteTasks_Arr));

  // Save Checked(Completed) Tasks
  let completeTasks_Arr = [];
  completedTasksList.querySelectorAll("li").forEach((element) => {
      let summaryTxt = element.querySelector(".taskName").innerText;
      completeTasks_Arr.push({ 
        Summary: summaryTxt, 
      });
  });
  localStorage.setItem('Complete_Tasks', JSON.stringify(completeTasks_Arr));
}
// Function Load Tasks to Local Storage
function loadtoLocalStorage() {
  // Load InCompletedTask After Refresh
  let inComplete = JSON.parse(localStorage.getItem('InComplete_Tasks'));
  inComplete.forEach((objValue) => {
      let li = document.createElement("li");
      li.className = "list-group-item p-0 mb-2";
      li.innerHTML = `<div class="col-sm-12 d-flex align-items-center h-20">
                          <input type="checkbox" name="" class="form-check-input me-3 mb-1 checkboxInput unCheckBox">
                          <span class="taskName">${objValue.Summary}</span>
                      </div>
                      <div class="col-sm-12 ml-2">
                          <span class="time">${objValue.dateTime}</span>
                      </div>`;
      ul.appendChild(li);
  });

  // Load InCompletedTask After Refresh
  let Complete = JSON.parse(localStorage.getItem('Complete_Tasks'));

  Complete.forEach((value) => {
      let li = document.createElement("li");
      li.className = "list-group-item p-0 mb-3";
      li.innerHTML = `<div class="col-sm-12 d-flex align-items-center h-20">
                          <input type="checkbox" name="" class="form-check-input me-3 mb-1 checkboxInput checkBox" checked>
                          <span class="taskName">${value.Summary}</span>
                      </div>`;
      completedTasksList.appendChild(li);
  });
}

window.addEventListener('load', loadtoLocalStorage);