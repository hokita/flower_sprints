import { useState, useEffect } from 'react'
import Title from './Title'
import Nav from './Nav'
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
  const [isAllDone, setIsAllDone] = useState(false)

  const apiURL = `http://${process.env.REACT_APP_API_DOMAIN}/`

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiURL)

      if (result.data) {
        const newSprint: Sprint = result.data
        setSprint(newSprint)
        setDoneTaskCount(newSprint.tasks.filter((task) => task.done).length)
      }
    }

    fetchData()
  }, [apiURL])

  useEffect(() => {
    sprint && setIsAllDone(sprint.tasks.every((task) => task.done))
  }, [sprint, doneTaskCount])

  const handleClickTaskIcon = (index: number) => {
    if (!sprint) return

    const newSprint: Sprint = sprint
    const newIsDone = !newSprint.tasks[index].done

    newSprint.tasks[index].done = newIsDone
    setSprint(newSprint)
    setDoneTaskCount(newSprint.tasks.filter((task) => task.done).length)

    const url = `${apiURL}sprints/${sprint.id}/tasks/${newSprint.tasks[index].id}/`
    axios.put(url, JSON.stringify({ done: newIsDone })).then(() => {})
  }

  const remainingDays = (): number => {
    if (!sprint) return 0

    const today = new Date()
    const deadline = new Date(sprint.deadline)
    const days = deadline
      ? Math.round(
          (deadline.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24) + 1
        )
      : 0

    return days
  }

  const taskCountPerDay = (): number => {
    if (!sprint) return 0

    const remainingTaskCount = sprint.tasks.length - doneTaskCount
    return Math.round((remainingTaskCount / remainingDays()) * 10) / 10
  }

  const compare = (a: Task, b: Task) => {
    // Use toUpperCase() to ignore character casing
    let comparison = 0
    if (a.id > b.id) {
      comparison = 1
    } else if (a.id < b.id) {
      comparison = -1
    }
    return comparison
  }

  const allDoneMessage = isAllDone ? (
    <p className="text-gray-500 text-2xl">Well Done!!</p>
  ) : (
    <></>
  )

  return sprint ? (
    <div className="text-center">
      <Title>Flower Sprints</Title>
      <div>
        <div className="pb-10">
          {sprint.tasks.sort(compare).map((task: Task, index) => (
            <TaskIcon
              key={task.id}
              isDone={task.done}
              onClick={() => handleClickTaskIcon(index)}
            />
          ))}
          {allDoneMessage}
        </div>
        <p>
          {doneTaskCount} / {sprint.tasks.length} tasks
        </p>
        <p>{taskCountPerDay()} tasks per day</p>
        <p>{remainingDays()} days remaining</p>
        <Nav>
          <NavButton name="home" link="/" />
        </Nav>
      </div>
    </div>
  ) : (
    <div className="text-center">
      <Title>Flower Sprints</Title>
      <div>Please register new sprint.</div>
      <Nav>
        <NavButton name="home" link="/" />
        <NavButton name="settings" link="/sprints/new" />
      </Nav>
    </div>
  )
}

export default App
