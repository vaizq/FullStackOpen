import { useState } from 'react'


let Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

let StatisticLine = ({text, value}) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
)

let Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (good - bad) / total
  const positive = 100 * good / total
  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  else {
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="avg" value={avg} />
            <StatisticLine text="positive" value={positive + '%'} />
          </tbody>
        </table>
      </>
    )
  }
}


let App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let a = (() => 1)()

  console.log(a)

  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text={"good"}/> 
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}/> 
      <Button handleClick={() => setBad(bad + 1)} text={"bad"}/> 
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
      </>
  )
}


export default App