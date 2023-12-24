import {useState,} from 'react';
import './index.css'


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
       if(inputTask !== ''){
           setAllTask(prevState=>([inputTask, ...prevState]));
           // reset input value
           setInputTask('');
       }
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
       <div className="todo-modal">
           <h2 className="title-1">Todo App</h2>


           <form onSubmit={onAdd}>
               <input placeholder="Add todo here" onChange={onInputChange} value={inputTask}
                   className='input-box'
               />
               <button type="submit" className="btn">Add</button>
           </form>


           <hr />
           {
               (allTask.length !== 0)? <h4> Your tasks : </h4> : <h4> No task. Please add some.</h4>
           }


           <>
           {
               allTask.map((task, index)=>{
                   return (
                   <div className="task-div">
                       {
                           indexEditStatus?.[index] ?
                           <form onSubmit={(event)=>onUpdateBtn(event, index)} className="update-form">
                               <input value={updateInputValue} onChange={onUpdateInputChange} className='input-box' />
                               <button className="btn">Update</button>
                           </form>
                           :
                           <div className='task-with-edit-btn'>
                               <>{task}</>
                               <button onClick={()=>onEdit(index)} className="btn">Edit</button>
                           </div>
                       }
                       <button onClick={()=>onDelete(index)} className="btn btn-del">Delete</button>
                   </div>
                   )
               })
           }
           </>
       </div>
   );
}


export default Todo;



