
let input = document.querySelector("input");
let addBtn = document.querySelector(".plus");
let tasks_content = document.querySelector(".tasks-content");
let no_task_message = document.querySelector(".no-tasks-message");
let total_tasks = document.querySelector(".count-tasks span");
let completed_tasks = document.querySelector(".completed-task span");
let arr = [];
// focus on input when load
window.onload = function () {
    input.focus();
};
//check repeated task

// add tasks
if (localStorage.length != 0) {
    no_task_message.remove()
    for (let i = 0; i < localStorage.length; i++) {

        let main_span = document.createElement("span");

        main_span.className = "task-box";
        let key = localStorage.key(i);
        let text = document.createTextNode(localStorage.getItem(key));
        arr.push(localStorage.getItem(key))
        // console.log(arr)
        main_span.appendChild(text);

        // create span for delete
        let deletespan = document.createElement("span");
        deletespan.className = "delete";
        let deleteText = document.createTextNode("Delete");
        deletespan.appendChild(deleteText);

        //    add delete to main span
        main_span.appendChild(deletespan);
        //    add main span to tasks content
        tasks_content.appendChild(main_span);
        calculateAllTasks();
        input.value = "";
        input.focus();

    }
}
else {
    no_task_message.innerHTML = 'No tasks to show';
}
function addTask() {
    if (input.value === "") {
        Swal.fire({
            icon: "warning",
            title: "Empty Is Not Allowed!",
            text: "Enter A Valid Task ",
        });
    } else {
        //check repeated value with set length
        let flag = true;

        if (arr.length != 0) {
            for (let i = 0; i < arr.length; i++) {
                if (input.value == arr[i]) {
                    Swal.fire("Repeated Task!");
                    flag = false;
                    break;
                }
            }
        }

        if (flag == true) {
            arr.push(input.value);

            localStorage.setItem(`task number ${arr.length}`, input.value)
            no_task_message.remove();
            // create span for task name
            let main_span = document.createElement("span");

            main_span.className = "task-box";
            let text = document.createTextNode(input.value);
            innertextofspan = text;

            main_span.appendChild(text);

            // create span for delete
            let deletespan = document.createElement("span");
            deletespan.className = "delete";
            let deleteText = document.createTextNode("Delete");
            deletespan.appendChild(deleteText);

            //    add delete to main span
            main_span.appendChild(deletespan);
            //    add main span to tasks content
            tasks_content.appendChild(main_span);

            calculateAllTasks();
            input.value = "";
            input.focus();
        }
    }
}
addBtn.addEventListener("click", function () {
    addTask()
});

// delete task
document.addEventListener("click", function (e) {
    if (e.target.className == "delete") {

        // Get the task nam to be removed
        let removedValue = e.target.parentNode.innerText.split("Delete")[0].trim();

        // Update the arr array by filtering out the removed task
        arr = arr.filter((i) => i !== removedValue);

        // Find the key in localStorage and remove it
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (localStorage.getItem(key) === removedValue) {
                localStorage.removeItem(key); // Remove the item by its key
                break; // Exit the loop once the item is found and removed
            }
        }
        e.target.parentNode.remove()
    }

    if (e.target.classList.contains("task-box")) {
        e.target.classList.toggle("finished");
    }
    if (document.querySelectorAll(".task-box").length == 0) {
        tasks_content.appendChild(no_task_message);
    }
    // Remove the task from the DOM


    // Check if no tasks are left, then show the "no tasks" message
    if (document.querySelectorAll(".task-box").length === 0) {
        tasks_content.appendChild(no_task_message);
    }

    // Refocus on the input field
    input.focus();

    // Update the tasks count
    calculateAllTasks();
});

// clear all tasks
document.getElementById("clear").onclick = function () {
    let tasksContent = document.querySelectorAll(".task-box");
    tasksContent = Array.from(tasksContent);
    for (let i = 0; i < tasksContent.length; i++) {
        tasksContent[i].remove();
    }
    arr = [];
    localStorage.clear()
    input.focus()
    tasks_content.appendChild(no_task_message);
};
// finish all tasks
document.getElementById("finish").onclick = function () {
    let tasksContent = document.querySelectorAll(".task-box");
    tasksContent = Array.from(tasksContent);
    for (let i = 0; i < tasksContent.length; i++) {
        tasksContent[i].classList.add("finished");
    }
};
// calculate total tasks
function calculateAllTasks() {
    total_tasks.innerHTML = document.querySelectorAll(".task-box").length;
    completed_tasks.innerHTML = document.querySelectorAll(".finished").length;
}

