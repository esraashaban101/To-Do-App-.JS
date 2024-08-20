let input = document.querySelector('input');
let addBtn = document.querySelector('.plus');
let tasks_content = document.querySelector('.tasks-content');
let no_task_message = document.querySelector('.no-tasks-message');
let total_tasks = document.querySelector('.count-tasks span');
let completed_tasks = document.querySelector('.completed-task span');
let arr = [];
// focus on input when load
window.onload = function()
{
    input.focus()
}
//check repeated task

// add tasks


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
 
      //check repeated value with set length
      let flag = true;
      
        if(arr.length != 0) 
         {
        for(let i=0 ; i<arr.length ;i++)
        {
         
            if(input.value == arr[i])
            {
                Swal.fire("Repeated Task!");
                flag=false
                 break;  
           }
      
          }
          }
          
       if(flag==true)
       {
        
         arr.push(input.value)
         
        no_task_message.remove();
        // create span for task name
        let main_span = document.createElement('span');
        
         main_span.className ='task-box';
        let text = document.createTextNode(input.value);
        innertextofspan=text;
        
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
      input.value="";
      input.focus()
        }
        
    }
    
})

  
   
// delet task
document.addEventListener('click',function(e)
{
   if(e.target.className =='delete')
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
   
    
}
document.getElementById('finish').onclick=function()
{
    
    
    let tasksContent = document.querySelectorAll('.task-box');
    tasksContent=Array.from(tasksContent)
     for(let i=0 ;i<tasksContent.length;i++)
     {
        tasksContent[i].classList.add('finished');
        
     }
     
    
}
// calculate total tasks
function calculateAllTasks()
{
    total_tasks.innerHTML = document.querySelectorAll('.task-box').length;
    completed_tasks.innerHTML = document.querySelectorAll('.finished').length;
   
}