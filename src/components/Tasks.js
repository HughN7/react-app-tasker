import { useState } from "react"
import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {

    return (
        <> 
            {tasks.map((task, index)=> (//Creating a list with map
                <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle}/>
                )
            )}
        </>
    )
}

export default Tasks