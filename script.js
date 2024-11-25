document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("add-btn");
    const todoInput = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const dingSound = new Audio("ding-sound.mp3");

    let totalTasks = 0;
    let completedTasks = 0;

    const updateProgress = () => {
        const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
        progressBar.value = progress;
        progressText.textContent = `${progress}% Completed`;
    };

    addBtn.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText) {
            totalTasks++;
            
            const listItem = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const textNode = document.createElement("span");
            textNode.textContent = taskText;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";

            const checkboxContainer = document.createElement("div");
            checkboxContainer.className = "checkbox-container";
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(textNode);

            listItem.appendChild(checkboxContainer);
            listItem.appendChild(deleteBtn);
            todoList.appendChild(listItem);

            todoInput.value = "";

            // Event for checkbox toggle
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    listItem.classList.add("completed");
                    todoList.appendChild(listItem); // Move to bottom
                    completedTasks++;
                    dingSound.play(); // Play the sound
                } else {
                    listItem.classList.remove("completed");
                    completedTasks--;
                }
                updateProgress();
            });

            // Event for delete button
            deleteBtn.addEventListener("click", () => {
                if (checkbox.checked) {
                    completedTasks--;
                }
                totalTasks--;
                todoList.removeChild(listItem);
                updateProgress();
            });
        }
    });

    // Allow "Enter" key to add tasks
    todoInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addBtn.click();
        }
    });
});