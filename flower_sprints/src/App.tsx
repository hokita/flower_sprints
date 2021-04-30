import React, { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
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
        <NavButton name="home" />
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

type NavButtonProps = {
  name: string
}

const NavButton: React.FC<NavButtonProps> = ({ name }) => {
  const handleClickButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  }

  return (
    <a
      href="/#"
      className="w-full block py-5 px-3 text-center"
      onClick={(e) => handleClickButton}
    >
      {name}
    </a>
  )
}

export default App
