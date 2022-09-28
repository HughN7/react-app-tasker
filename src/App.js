//Root app component https://www.linkedin.com/in/hieu-v-3414b2191/
import Header from "./components/Header"
import Tasks from "./components/Tasks";
import { About } from "./components/About";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AddTask from "./components/AddTask";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react"; //useEffect = deals with side effects. Used when you want something to happen when a web page loads

function App() {

  const name = 'Kenobi'; 
  const T = false; 

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]) //This is state, state is however immutable. useState returns two values, the state and the updater

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer )
    }

    getTasks()
  }, []) //dependency array. put something inside of array if you want that 'something' to change 


  //fetch/get tasks 
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    return data 
  }


  //fetch single task
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    return data 
  }

  //Add Task
  const addTask = async (task) =>{

    const response = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST', 
      headers: {
        "Content-type": "application/json"
      }, 
      body: JSON.stringify(task)
      
    })

    const data = await response.json()

    setTasks([...tasks, data ])

    /*
    const id = Math.floor(Math.random() * 10000) + 1 //Create a unique id

    const newTask = {id, ...task} //...task (copy the tasks and reminders etc. Add that to the object)
    setTasks([...tasks, newTask]) //...task (copy current tasks and add the new tasks)
    */
  }
  
  //Delete Task
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE',})


    setTasks(tasks.filter((task) => task.id !== id)) 
    //For each task, set it so that it shows all tasks except for the ones that match the id
    //This way it gets "deleted"
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const response = await fetch(`http://localhost:5000/tasks/${id}`, 
    {method: 'PUT', headers: {'Content-type': "application/json"}, body: JSON.stringify(updatedTask)})

    const data = await response.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder}: task))
  }
  
  //View
  return ( 
    <div className="container">
      <h1>Hello from React!</h1>
      General {name}! You are a bold one! {T ? "What's up!" : "What's down"}
      <Header title = "React Component 1" onAddTask={()=> setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>} {/*the && is a way to do iternary if else */} 
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : ("No tasks!")} 
      
      <Footer/>
    </div>

    //<div>Hello Again~</div> // This throws an error: You can only have 1 element in a return body
    //<Tasks tasks={tasks} onDelete={deleteTask}/> -> Think this as an entire function call. task, ondelete, etc. are parameters
  );
}

export default App;
