/* Create Event Listener */
const taskList = document.getElementById('taskList');


eventListeners();

function eventListeners(){
    document.querySelector("ul").addEventListener('click',makeCheked);
    document.getElementById('form').addEventListener('submit',newTask);
    taskList.addEventListener('click',removeTask);
    
    // Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

function removeTask(e){
    if(e.target.classList.contains('remove')){
        console.log('Remove');
        e.target.parentElement.remove();
        removeTaskLocalStorage(e.target.parentElement.textContent);
    }
}


function newTask(e){
    //Get Text from form
    e.preventDefault();
    let subject = document.getElementById("subject").value;
    let task = document.getElementById("task").value;
    let content;
    let ul = document.getElementById("ul");
    //we have required, but for some reasone make it better to check 
    let i = 0;
    if(task == ""){
        alert("Task is epmty.Can`t append list");
    }else{
        let Li,Span;

        if(subject == ""){
            content = task;
        }else{
           
            content = subject + " -- " + task;
        }

        Span = CreateElement("span","remove","x");
        Li = CreateElement("li","li",content);
        Li.id +=i;
        console.log(Li);

        Li.appendChild(Span);
        ul.appendChild(Li);
        console.log(Li.className);
        addTaskLocalStorage(task,subject,Li);
    }
    console.log(subject + " " + task);
    this.reset();
}


/* MAKE CHECK */
function makeCheked(e){
    e.preventDefault();
    const new_className = "checked";
    if(e.target.classList.contains("li") ){
        e.target.classList.toggle(new_className);
    }
    setClassLS(e.target);

}


/* LOCAL STORAGE */
function getTasksFromLocalStorage() {
    let tasks;
    const tasksLS = localStorage.getItem('tasks');
    // Get the values, if null is returned then we create an empty array
    if(tasksLS === null) {
         tasks = [];
    } else {
         tasks = JSON.parse( tasksLS ); 
    }
    return tasks;
}


function localStorageOnLoad(){
    let tasks = getTasksFromLocalStorage();
    let ul = document.getElementById("ul");
    console.log(tasks);
    tasks.forEach(function(task) {
        // Create the remove button
        console.log(task);
        let Li,Span,special_class = "li";
        
        Span = CreateElement("span","remove","x");
        Li = CreateElement("li",task.classList,task.content);

        Li.appendChild(Span);

        // Add to the list
        ul.appendChild(Li);
   });
}

/* ADD */
function addTaskLocalStorage(task,topic,e) {
    let tasks = getTasksFromLocalStorage();
    
    //Combine
    let content;

    if(topic == ""){
        content = task;
    }else{
       
        content = topic + " -- " + task;
    }

    let obj = {
        content: content,
        className: e.className,
    }
    
    if(topic == ""){
         console.log(content);
         content = task;
    }
    // Add the Task into the array
    tasks.push(obj);
    


    // Convert Task array into String
    localStorage.setItem('tasks', JSON.stringify(tasks) );
}



/* REMOVE */
function removeTaskLocalStorage(task) {
    // get tasks from storage
    let tasks = getTasksFromLocalStorage();

    //Substring X
    let deleteX = task.substring( 0, task.length -1 );
    
    // Loop Throught  the tasks and remove the task that's equal
    tasks = tasks.filter(function( obj ) {
        console.log(obj.content + "!=="+ deleteX)
        return obj.content !== deleteX;
    });


    // Save the data convert to JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function setClassLS(task){
    let tasks = getTasksFromLocalStorage();
    let obj = {
        content: task.textContent,
        className: task.className,
    }

    //Substring the X
    obj.content = obj.content.substring(0,obj.content.length -1);
    tasks.forEach(taskLS => {
        
        if(taskLS.content === obj.content){
            taskLS.classList = obj.className;
        }
    });
    
    // Save the data convert to JSON
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


/* СREATE FASTER */
function CreateElement(element,className,text){
    let el = document.createElement(element);
    el.classList = className;
    el.textContent = text;
    return el;
}


