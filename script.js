let input = document.querySelector('input');
let addBtn = document.querySelector('.plus');
let tasks_content = document.querySelector('.tasks-content');
let no_task_message = document.querySelector('.no-tasks-message');
let total_tasks = document.querySelector('.count-tasks span');
let completed_tasks = document.querySelector('.completed-task span');
let set = new Set();
// focus on input when load
window.onload = function()
{
    input.focus()
}
//check repeated task

// add tasks
let y=0
addBtn.addEventListener('click',function()
{
    if(input.value ==='')
    {
        Swal.fire({
            icon: "warning",
             title:"Empty Is Not Allowed!",
            text: "Enter A Valid Task ",
          
          });
    }
    else
    {
       
        
       set.add(input.value)
      //check repeated value with set length
         let x=set.size;
         if(x<=y)
        {
            Swal.fire("Repeated Task!");
        }
        
        else
        {
         y++;
        
        no_task_message.remove();
        
        // create span for task name
        let main_span = document.createElement('span');
         main_span.className ='task-box';
        let text = document.createTextNode(input.value);
        main_span.appendChild(text);
       
        // create span for delete 
        let deletespan= document.createElement('span');
        deletespan.className ='delete';
        let deleteText = document.createTextNode('Delete');
       deletespan.appendChild(deleteText);
      
    //    add delete to main span
       main_span.appendChild(deletespan)
    //    add main span to tasks content
      tasks_content.appendChild(main_span);
      calculateAllTasks();
      }
    
}

    //  clear the input
    input.value=""
     input.focus()

})

// delet task
document.addEventListener('click',function(e)
{
   if(e.target.className=='delete')
   {
      e.target.parentNode.remove();
    
     
   }
   
   if(e.target.classList.contains('task-box'))
   {
    e.target.classList.toggle('finished');
    
   }
   if(document.querySelectorAll('.task-box').length==0)
   {
    tasks_content.appendChild(no_task_message)
   }
   calculateAllTasks()
})

document.getElementById('clear').onclick=function()
{
    
    
    let tasksContent = document.querySelectorAll('.task-box');
    tasksContent=Array.from(tasksContent)
     for(let i=0 ;i<tasksContent.length;i++)
     {
        tasksContent[i].remove()
     }
     tasks_content.appendChild(no_task_message)
    //  console.log(set)
     set.clear();
     x=0,y=0;
    //  console.log(set)
    
}
document.getElementById('finish').onclick=function()
{
    
    
    let tasksContent = document.querySelectorAll('.task-box');
    tasksContent=Array.from(tasksContent)
     for(let i=0 ;i<tasksContent.length;i++)
     {
        tasksContent[i].classList.add('finished');
        set.clear();
        x=0,y=0;
     }
     
    
}
// calculate total tasks
function calculateAllTasks()
{
    total_tasks.innerHTML = document.querySelectorAll('.task-box').length;
    completed_tasks.innerHTML = document.querySelectorAll('.finished').length;
   
}