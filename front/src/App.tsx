import { useState, useEffect } from 'react'
import NavButton from './NavButton'
import TaskIcon from './TaskIcon'
import axios from 'axios'

interface Sprint {
  id: number
  deadline: Date
  created_at: Date
  updated_at: Date
  tasks: Task[]
}

interface Task {
  id: number
  sprint_id: number
  done: boolean
  created_at: Date
  updated_at: Date
}

const App: React.FC = () => {
  const [sprint, setSprint] = useState<Sprint>()
  const [doneTaskCount, setDoneTaskCount] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const apiURL = 'http://localhost:8081'
  const apiPutURL = 'http://localhost:8081/sprints/123/tasks/234/'

  const fetchData = async () => {
    const result = await axios.get(apiURL)

    const newSprint: Sprint = result.data
    setSprint(newSprint)
    setDoneTaskCount(newSprint.tasks.filter((task) => task.done).length)
  }

  const handleClickTaskIcon = (index: number) => {
    if (!sprint) return

    axios.put(apiPutURL, null).then(() => {})
    const newSprint: Sprint = sprint
    newSprint.tasks[index].done = !newSprint.tasks[index].done
    setSprint(newSprint)
    setDoneTaskCount(newSprint.tasks.filter((task) => task.done).length)
  }

  const remainingDays = (): number => {
    if (!sprint) return 0

    const today = new Date()
    const deadline = new Date(sprint.deadline)
    const days = deadline
      ? Math.round(
          (deadline.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24)
        )
      : 0

    return days
  }

  const taskCountPerDay = (): number => {
    if (!sprint) return 0

    const remainingTaskCount = sprint.tasks.length - doneTaskCount
    return Math.round((remainingTaskCount / remainingDays()) * 10) / 10
  }

  return sprint ? (
    <div className="text-center">
      <h1 className="text-4xl mb-10">Flower Sprints</h1>
      <div>
        <div className="pb-10">
          {sprint.tasks.map((task: { done: boolean }, index) => (
            <TaskIcon
              key={index}
              isDone={task.done}
              onClick={() => handleClickTaskIcon(index)}
            />
          ))}
        </div>
        <p>
          {doneTaskCount} / {sprint.tasks.length} tasks
        </p>
        <p>{taskCountPerDay()} tasks per day</p>
        <p>{remainingDays()} days remaining</p>
        <nav className="fixed bottom-0 inset-x-0 bg-gray-300 flex justify-between uppercase">
          <NavButton name="home" link="/" />
        </nav>
      </div>
    </div>
  ) : (
    <div className="text-center">
      <h1 className="text-4xl mb-10">Flower Sprints</h1>
      <div>Please register new sprint.</div>
      <nav className="fixed bottom-0 inset-x-0 bg-gray-300 flex justify-between uppercase">
        <NavButton name="home" link="/" />
        <NavButton name="settings" link="/sprints/new" />
      </nav>
    </div>
  )
}

export default App
