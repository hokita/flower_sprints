import { useState, useEffect } from 'react'
import Title from './Title'
import Nav from './Nav'
import NavButton from './NavButton'
import axios from 'axios'

const SprintNew: React.FC = () => {
  const [taskCount, setTaskCount] = useState(1)
  const [deadline, setDeadline] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSaved(false)
    }, 5000)
    return (): void => {
      clearTimeout(timer)
    }
  }, [saved])

  const apiURL = `http://${process.env.REACT_APP_API_DOMAIN}/sprints/`

  const handleChangeTaskCount = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement
    setTaskCount(parseInt(target.value))
  }

  const handleChangeDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // deadlineは指定日の9:00にする。（UTC時間に直すと0:00なので日付のみ送る）
    const params = JSON.stringify({ count: taskCount, deadline })
    axios.post(apiURL, params).then(() => {
      setSaved(true)
    })
    e.preventDefault()
  }

  const message = () =>
    saved ? <p className="text-gray-500">Saved Successful!</p> : <></>

  return (
    <div className="text-center">
      <Title>Settings Plan</Title>
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
            Next workday?
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
          {message()}
        </div>
      </form>
      <Nav>
        <NavButton name="home" link="/" />
        <NavButton name="settings" link="/sprints/new" />
      </Nav>
    </div>
  )
}

export default SprintNew
