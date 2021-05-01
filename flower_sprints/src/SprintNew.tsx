import React, { useState } from 'react'
import NavButton from './NavButton'

const SprintNew: React.FC = () => {
  const [taskCount, setTaskCount] = useState(0)
  const [deadline, setDeadline] = useState('')

  const handleChangeTaskCount = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement
    setTaskCount(parseInt(target.value))
  }

  const handleChangeDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl py-1">Settings Plan</h1>
      <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-5"
            htmlFor="username"
          >
            How many?
            <select
              className="form-select mt-1 block w-full"
              id="taskCount"
              value={taskCount}
              onChange={handleChangeTaskCount}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>
          <label
            className="block text-gray-700 text-sm font-bold mb-5"
            htmlFor="username"
          >
            Deadline?
            <input
              type="date"
              className="form-select mt-1 block w-full"
              value={deadline}
              onChange={handleChangeDeadline}
            />
          </label>
          <button className="rounded font-bold bg-gray-200 py-2 px-4 ">
            save
          </button>
        </div>
      </form>
      <nav className="fixed bottom-0 inset-x-0 bg-gray-300 flex justify-between uppercase">
        <NavButton name="home" link="/" />
        <NavButton name="settings" link="/sprints/new" />
      </nav>
    </div>
  )
}

export default SprintNew
