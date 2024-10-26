import React from 'react'
export default function TaskList({
  tasks,
  removeTaskFromList,
  editTask,
  editId,
  handleTabKey,
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.name} <button onClick={() => editTask(task)}>Edit Task</button>
          <button
            onClick={() => removeTaskFromList(task.id)}
            disabled={editId !== null && editId !== task.id}
          >
            Remove task
          </button>
        </li>
      ))}
    </ul>
  )
}
