import React, { useState,useEffect } from "react";
import NavBar from './NavBar';
import "../styles/Todo.css";
import { useLocation } from 'react-router-dom';

function Todo() {
  const { state } = useLocation();
  const { res } = state;
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [userFlag, setUserFlag]= useState(false);

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  useEffect(() => {   if(!userFlag){
    GetAllTaskByLoginId();
    setUserFlag(true);
  }  });
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  let obj = {}
      
  obj["loginId"] = null;
  obj["id"]=null;
  obj["value"]=null;
  obj["isCompleted"]=null;

  const GetAllTaskByLoginId=()=>{
 
    obj.loginId=res.uid;
    let raw = JSON.stringify(obj);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

let allTasks;
    fetch("http://localhost:8080/todos", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result); 

       allTasks=JSON.parse(result);
      console.log("alltask", allTasks);
      let taskslist=[];
      for(const element of allTasks){
        const taskDetails = {
          id: element.id,
          value: element.value,
          isCompleted: element.isCompleted,
          loginId: element.loginId
        };
        taskslist.push(taskDetails);
      
    }
    setTaskList(taskslist);
    })
    .catch(error => console.log('error', error));

    
  };

  
  const AddTask = () => {
    if (task !== "") {
      const taskDetails = {
        id: (Math.floor(Math.random() * 1000)).toString(),
        value: task,
        isCompleted: false,
        loginId: res.uid
      };

      
      obj=taskDetails;
      let raw = JSON.stringify(obj);
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://localhost:8080/createTodos", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result); })
      .catch(error => console.log('error', error));

      setTaskList([...tasklist, taskDetails]);
      
    }
    
  };

  const deletetask = (e, t) => {
    console.log(e,t);
    e.preventDefault();

    obj.id=t.id;
    console.log(obj.id);
    let raw = JSON.stringify(obj);
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://localhost:8080/deleteTodo", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result); })
    .catch(error => console.log('error', error));
    console.log(t);
    setTaskList(tasklist.filter((t1) => t1.id != t.id));
  };

  const taskCompleted = (e, id) => {
   
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id == id);

   
    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: !newTaskList[element].isCompleted,
    };
    obj=newTaskList[element];
    console.log(obj)
    let raw = JSON.stringify(obj);
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://localhost:8080/updateTodo", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result); })
    .catch(error => console.log('error', error));

    setTaskList(newTaskList);
  };

  return (
    <div className="MainApp">
    <header className="App-header">
    <NavBar></NavBar>
    <div className="todo">
      <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => handleChange(e)}
        placeholder="Enter the task..."
      />
      <button className="add-btn" onClick={AddTask}>
        Add
      </button>
      <br />
      {tasklist !== [] ? (
        <ul>
          {tasklist.map((t) => (
            <li className={t.isCompleted ? "crossText" : "listitem"}>
              {t.value}
              <button
                className="completed"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                {t.isCompleted ?  'Not Done' : 'Done' }
              </button>

              <button className="delete" onClick={(e) => deletetask(e, t)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
    </header>
    </div>
  
  );

}

export default Todo;