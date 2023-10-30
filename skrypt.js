const todo = document.getElementsByClassName("todo");
const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTaskInput");
const newDateInput = document.getElementById("newDateInput");
const searchbar = document.getElementById("searchbar");

searchbar.addEventListener("input", () => {
    const searchTerm = searchbar.value.toLowerCase();
    filteredTasks(searchTerm);
});

function filteredTasks(searchTerm){
    const taskTextElements = document.querySelectorAll(".taskText");
    taskTextElements.forEach((element) => {
        const text = element.value.toLowerCase();
        if (text.includes(searchTerm) || searchTerm.length < 3) {
            element.parentElement.style.display = "block"; // Pokaż element
        } else {
            element.parentElement.style.display = "none"; // Ukryj element
        }
    });
}

function exampleTasks(){
    createTask("Zrobić TODO list na AI","2023-10-30", true);
    createTask("Nauczyć się na POI","2023-05-11");
    createTask("Posprzątać pokój","2020-12-15");
}

function createTask(newText, newDate){
    let task = document.createElement("div");
    task.className="task";

    let checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="checkbox";

    let taskText = document.createElement("input");
    taskText.className = "taskText";
    taskText.value = newText;
    taskText.type="text";

    let taskDate = document.createElement("input");
    taskDate.className = "taskDate";
    taskDate.type = "date";
    taskDate.value = newDate;

    let deleteButton = document.createElement("button");
    deleteButton.className="deleteButton";
    deleteButton.innerHTML="\u00d7";
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(task);
        save();
    });

    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(taskDate);
    task.appendChild(deleteButton);

    taskList.appendChild(task);
}

function addTask(){
    if(newTaskInput.value == '' || newDateInput == ''){
        alert("Wypełnij wszystkie pola!");
    }
    else{
        createTask(newTaskInput.value,newDateInput.value);
        save();
    }
    newTaskInput.value='';
}

function save(){
    const taskTexts = document.querySelectorAll(".taskText");
    const textValues = Array.from(taskTexts).map(input => input.value);
    localStorage.setItem("taskTexts", JSON.stringify(textValues));

    const taskDates = document.querySelectorAll(".taskDate");
    const dateValues = Array.from(taskDates).map(input => input.value);
    localStorage.setItem("taskDates", JSON.stringify(dateValues));
}

function read(){
    const savedTextValues = JSON.parse(localStorage.getItem("taskTexts"));
    const savedDateValues = JSON.parse(localStorage.getItem("taskDates"));
    const savedBoxValues = JSON.parse(localStorage.getItem("taskBoxes"));
    taskList.innerHTML = '';
    
    if (savedTextValues.length >0 && savedDateValues.length >0) {
        for(let i=0; i<savedTextValues.length; i++){
            createTask(savedTextValues[i],savedDateValues[i]);
        }
        save();
    } else {
        exampleTasks();
    }

    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            taskList.removeChild(button.parentElement);
            save();
        });
    });

    const TextInputs = document.querySelectorAll(".taskText, .taskDate");
    TextInputs.forEach(textInput => {
        textInput.addEventListener('blur', () => {
            save();
        });
    });

    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach(box => {
        box.addEventListener('change', () => {
            if(box.checked){
                box.parentElement.classList.add('completedTask');
            }
            else{
                box.parentElement.classList.remove('completedTask');
            }
            save();
        });
    });
}

//save();
read();