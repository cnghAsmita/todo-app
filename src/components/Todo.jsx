import {useState,} from 'react';


function Todo(){
   const [inputTask, setInputTask] = useState('');
   const [allTask, setAllTask] = useState([]);
   const [indexEditStatus, setIndexEditStatus] = useState({});
   const [updateInputValue, setUpdateInputValue] = useState('');




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


   const onEdit = (position) =>{
       setIndexEditStatus({[position]: true});
       setUpdateInputValue(allTask[position]);
   }




   const onUpdateInputChange = (event) => {
       console.log("update input ", event.target.value);
       setUpdateInputValue(event.target.value);
   }


   const onUpdateBtn = (event, position) =>{
       event.preventDefault();
       allTask[position] = updateInputValue;
       setAllTask([...allTask]);


       // reset update input element value
       setUpdateInputValue('');
       setIndexEditStatus({});
   }




//     {1: true, 2: false, 3: true}


   console.log("my all task", allTask);
   console.log("edit status", indexEditStatus);


   return (
       <>
           <h2>Todo App</h2>


           <form onSubmit={onAdd}>
               <input placeholder="Add todo here" onChange={onInputChange} value={inputTask} />
               <button type="submit">Add</button>
           </form>


           <hr />
           {
               (allTask.length !== 0)? <h4> Your tasks : </h4> : <h4> No task. Please add some.</h4>
           }


           <ul>
           {
               allTask.map((task, index)=>{
                   return (
                   <li>
                       {
                           indexEditStatus?.[index] ?
                           <>
                               <form onSubmit={(event)=>onUpdateBtn(event, index)}>
                                   <input value={updateInputValue} onChange={onUpdateInputChange}/>
                                   <button>Update</button>
                               </form>
                               &nbsp; &nbsp;
                           </>
                           :
                           <>
                               {task}
                               &nbsp; &nbsp;
                               <button onClick={()=>onEdit(index)}>Edit</button>
                           </>
                       }
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



