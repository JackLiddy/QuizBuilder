import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
// import './App.css'
import ravenPNG from './raven-head-smallest2.png';
import QuestionsGrid from './QuestionsGrid.js';


function App() {
  return (
    <div className="App">
      <QuestionsGrid />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
