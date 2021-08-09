import { StrictMode } from 'react'
import { render } from 'react-dom'
import './index.css'
import PTR from './PTR'
import App from './App'
import SprintNew from './SprintNew'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

render(
  <StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <PTR>
            <App />
          </PTR>
        </Route>
        <Route exact path="/sprints/new/">
          <SprintNew />
        </Route>
      </Switch>
    </Router>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
