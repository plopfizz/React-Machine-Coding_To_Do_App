import React, {useState, useRef} from 'react'
import {taskData} from '../data/data'
import TaskList from './TaskList'

let randomId = 5
export default function TodoApp() {
  const inputRef = useRef(null)
  const [task, setTask] = useState(taskData)
  const [newTaskName, setNewTaskName] = useState('')
  const [editTask, setEditTask] = useState(false)
  const [editId, setEditId] = useState(null)
  const addTaskIntoTaskList = () => {
    if (newTaskName != '') {
      if (editTask) {
        const tasks = task.map((task) => {
          if (task.id === editId) {
            return {name: newTaskName, id: editId}
          } else return task
        })
        setTask(tasks)
        setEditId(null)
        setEditTask(false)
        setNewTaskName('')
      } else {
        const newTask = {name: newTaskName, id: ++randomId}
        const tasks = [...task, newTask]
        setTask(tasks)
        setNewTaskName('')
      }
    } else {
      alert('please enter a valid task')
    }
  }

  const removeTaskFromList = (index) => {
    if (editId === index) {
      setNewTaskName('')
      setEditTask(false)
      setEditId(null)
    }
    setTask(task.filter((tasks) => tasks.id != index))
  }
  const editTaskFromList = (taskToBeEditted) => {
    setEditTask(true)
    setNewTaskName(taskToBeEditted.name)
    setEditId(taskToBeEditted.id)
    inputRef.current.focus()
  }
  return (
    <>
      <h1>Todo App</h1>
      <form class="todo-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          ref={inputRef}
          id="todoApp"
          name="todoApp"
          value={newTaskName}
          placeholder="enter the task"
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button onClick={addTaskIntoTaskList}>
          {' '}
          {editTask ? 'edit Task' : 'Add Task'}
        </button>
      </form>
      <TaskList
        tasks={task}
        removeTaskFromList={removeTaskFromList}
        editTask={editTaskFromList}
        editId={editId}
      />
    </>
  )
}
