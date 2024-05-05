
// Retrieve tasks from local storage if available
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Populate the task list with saved tasks
const ul = document.getElementById('taskList');
savedTasks.forEach(task => {
    const li = createTaskItem(task);
    ul.appendChild(li);
});

// Function to create a task item with edit and delete buttons
function createTaskItem(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Add edit and delete buttons
    addEditButtonAndDeleteButton(li);

    return li;
}

// Function to add edit and delete buttons to a task item
function addEditButtonAndDeleteButton(li) {
    // Create edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = "✏️";
    editButton.className = "edit-button";

    // Add click event to handle editing the task
    editButton.onclick = function () {
        editTask(li);
    };

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "❌";
    deleteButton.className = "delete-button";

    // Add click event to handle deleting the task
    deleteButton.onclick = function () {
        ul.removeChild(li);
        saveTasks();
    };

    // Append edit and delete buttons to the list item
    li.appendChild(editButton);
    li.appendChild(deleteButton);
}

// Function to edit a task
function editTask(li) {

    // Update the task text if a new text was entered
    if (newTaskText !== null && newTaskText !== "") {
        li.childNodes[0].textContent = newTaskText;
        saveTasks(); // Save the updated task list to local storage
    }
}

// Function to add a new task
function addTask() {
    var input = document.getElementById("taskInput").value;

    if (input === '') {
        // Show warning message
        const alert = document.getElementById("alert");
        alert.textContent = "⚠️ Please enter a task!";
        alert.style.display = "block";

        // Hide the warning message after 2 seconds
        setTimeout(() => {
            alert.style.display = "none";
        }, 2000);
        return;
    }

    // Create a list item for the new task
    const li = createTaskItem(input);
    ul.appendChild(li);

    // Save tasks to local storage
    saveTasks();

    // Clear the input field
    document.getElementById("taskInput").value = '';
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    ul.querySelectorAll('li').forEach(li => {
        tasks.push(li.childNodes[0].textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding tasks when Enter key is pressed
document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// Function to show the edit prompt
function showEditPrompt(li) {
    const promptDiv = document.getElementById("promt_update");
    const inputField = document.getElementById("newTaskText");

    // Set the input field value to the current task text
    inputField.value = li.firstChild.textContent;

    // Set the current task list item being edited to a global variable
    currentEditItem = li;

    // Display the prompt div
    promptDiv.style.display = "block";
}

// Function to handle submitting the edit
function submitEdit() {
    const inputField = document.getElementById("newTaskText");
    const newTaskText = inputField.value.trim();

    if (newTaskText === "") {
        // Show an alert for empty input
        showAlert("⚠️ Please enter a new task!");
        return;
    }

    // Update the task text
    currentEditItem.firstChild.textContent = newTaskText;

    // Save the updated task list to local storage
    saveTasks();

    // Hide the prompt
    hideEditPrompt();
}

// Function to handle canceling the edit
function cancelEdit() {
    // Hide the prompt without making any changes
    hideEditPrompt();
}

// Function to hide the edit prompt
function hideEditPrompt() {
    document.getElementById("promt_update").style.display = "none";
}

// Function to edit a task (modified to use the new prompt)
function editTask(li) {
    // Show the edit prompt when the edit button is clicked
    showEditPrompt(li);
}

// Add `currentEditItem` variable to keep track of the current task being edited
let currentEditItem;