import { useState } from 'react'
import NavButton from './NavButton'

const App: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl py-1">Flower Sprints</h1>
      <div className="py-10">
        <TaskIcon isDone={false} />
        <TaskIcon isDone={false} />
        <TaskIcon isDone={false} />
        <TaskIcon isDone={false} />
        <TaskIcon isDone={false} />
      </div>
      <p>0 / 5 tasks</p>
      <p>1.5 tasks per day</p>
      <p>4 days remaining</p>
      <nav className="fixed bottom-0 inset-x-0 bg-gray-300 flex justify-between uppercase">
        <NavButton name="home" link="/" />
        <NavButton name="settings" link="/sprints/new" />
      </nav>
    </div>
  )
}

type TaskIconProps = {
  isDone: boolean
}

const TaskIcon: React.FC<TaskIconProps> = ({ isDone }) => {
  const [value, setValue] = useState(isDone)

  const handleClickTaskIcon = () => {
    setValue(!value)
  }

  let classNames = ['material-icons', 'md-48', 'md-dark']
  if (value) {
    classNames.push('md-inactive')
  }

  return (
    <span className={classNames.join(' ')} onClick={handleClickTaskIcon}>
      filter_vintage
    </span>
  )
}

export default App
