import { useState, useEffect } from 'react'
import NavButton from './NavButton'
import TaskIcon from './TaskIcon'
import axios from 'axios'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ done: boolean }[]>([])
  const [taskCount, setTaskCount] = useState(0)
  const [doneTaskCount, setDoneTaskCount] = useState(0)
  const [deadline, setDeadline] = useState<Date>()

  useEffect(() => {
    fetchData()
  }, [])

  const apiURL = 'http://localhost:8081'

  const fetchData = async () => {
    const result = await axios.get(apiURL)

    const newTasks: { done: boolean }[] = result.data.tasks
    setDeadline(new Date(result.data.deadline))
    setDoneTaskCount(newTasks.filter((task) => task.done).length)
    setTasks(newTasks)
    setTaskCount(newTasks.length)
  }

  const handleClickTaskIcon = (index: number) => {
    const newTasks: { done: boolean }[] = [...tasks]
    newTasks[index].done = !newTasks[index].done
    setTasks(newTasks)
    setDoneTaskCount(newTasks.filter((task) => task.done).length)
  }

  const remainingDays = (): number => {
    const today = new Date()
    const days = deadline
      ? Math.round(
          (deadline.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24)
        )
      : 0

    return days
  }

  const taskCountPerDay = (): number => {
    const remainingTaskCount = taskCount - doneTaskCount
    return Math.round((remainingTaskCount / remainingDays()) * 10) / 10
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl mb-10">Flower Sprints</h1>
      <div>
        <div className="pb-10">
          {tasks.map((task: { done: boolean }, index) => (
            <TaskIcon
              key={index}
              isDone={task.done}
              onClick={() => handleClickTaskIcon(index)}
            />
          ))}
        </div>
        <p>
          {doneTaskCount} / {taskCount} tasks
        </p>
        <p>{taskCountPerDay()} tasks per day</p>
        <p>{remainingDays()} days remaining</p>
        <nav className="fixed bottom-0 inset-x-0 bg-gray-300 flex justify-between uppercase">
          <NavButton name="home" link="/" />
          <NavButton name="settings" link="/sprints/new" />
        </nav>
      </div>
    </div>
  )
}

export default App
