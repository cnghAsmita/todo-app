import {useState,} from 'react';


function Todo(){
   const [inputTask, setInputTask] = useState('');
   const [allTask, setAllTask] = useState([]);




   const onInputChange = (event) => {
       console.log("event", event.target.value)
       setInputTask(event.target.value);
   }


   const onAdd = (event) =>{
       event.preventDefault();
       setAllTask(prevState=>([inputTask, ...prevState]));
       // reset input value
       setInputTask('');
   }


   const onDelete = (position) =>{
       console.log("deleting position", position);
       allTask.splice(position, 1);
       setAllTask([...allTask]);
   }


   console.log("my all task", allTask);


   return (
       <>
           <h2>Todo App</h2>


           <form onSubmit={onAdd}>
               <input placeholder="Add todo here" onChange={onInputChange} value={inputTask} />
               <button type="submit">Add</button>
           </form>


           <hr />
           <h4> Your tasks : </h4>
           <ul>
           {
               allTask.map((task, index)=>{
                   return (
                   <li>
                       {task}
                       &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                       <button>Edit</button>
                       &nbsp; &nbsp;
                       <button onClick={()=>onDelete(index)}>Delete</button>
                   </li>
                   )
               })
           }
           </ul>
       </>
   );
}


export default Todo;



