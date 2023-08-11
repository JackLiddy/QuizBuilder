import React, {useState, useMemo, useEffect, setState, useRef} from 'react'
import {AgGridReact} from 'ag-grid-react'
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import './QuestionsGrid.css' // For custom styling
import '/Users/jackliddy/Downloads/React Quiz copy/node_modules/ag-grid-community/styles/ag-grid.css'
import '/Users/jackliddy/Downloads/React Quiz copy/node_modules/ag-grid-community/styles/ag-theme-alpine.css'
import ControlPanel from './ControlPanel.js'
import './style.css'

const QuestionsGrid = () => {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const columns = [
    // { headerName: 'ID', field: 'id' },
    {headerName: 'Question', field: 'question', rowDrag: true},
    {headerName: 'Answer 1', field: 'answer1'},
    {headerName: 'Answer 2', field: 'answer2'},
    {headerName: 'Answer 3', field: 'answer3'},
    {headerName: 'Answer 4', field: 'answer4'},

  ]

  const gridOptions = {
    rowDragManaged: true,
    animateRows: true,
    alwaysShowHorizontalScroll: true,
    rowSelection: 'single',
    autoSizeAllColumns: true,
  }

  const onGridReady = params => {
    // Load hardcoded questions
    // const hardcodedQuestions = [
    //   {
    //     id: 1,
    //     question: 'What is React?',
    //     answer1: 'A framework for building UIs',
    //     answer2: 'A library for building UIs',
    //     answer3: 'A library for building APIs',
    //     answer4: 'A framework for building APIs',
    //     correct1: true,
    //     correct2: false,
    //     correct3: false,
    //     correct4: false,
    //   },
    //   {
    //     id: 2,
    //     question: 'What is Angular?',
    //     answer1: 'A framework for building UIs',
    //     answer2: 'A library for building UIs',
    //     answer3: 'A library for building APIs',
    //     answer4: 'A framework for building APIs',
    //     correct1: true,
    //     correct2: false,
    //     correct3: false,
    //     correct4: false,
    //   },
    //   {
    //     id: 3,
    //     question: 'What is Vue?',
    //     answer1: 'A framework for building UIs',
    //     answer2: 'A library for building UIs',
    //     answer3: 'A library for building APIs',
    //     answer4: 'A framework for building APIs',
    //     correct1: true,
    //     correct2: false,
    //     correct3: false,
    //     correct4: false,
    //   },
    // ];
    const hardcodedQuestions = [
      {
        id: 1,
        question: 'What is the capital of France?',
        answer1: 'Paris',
        answer2: 'New York',
        answer3: 'London',
        answer4: 'Berlin',
        correct1: true,
        correct2: false,
        correct3: false,
        correct4: false,
      },
      {
        id: 2,
        question: 'What is Angular?',
        answer1: 'A framework for building UIs',
        answer2: 'A library for building UIs',
        answer3: 'A library for building APIs',
        answer4: 'A framework for building APIs',
        correct1: true,
        correct2: false,
        correct3: false,
        correct4: false,
      },
      {
        id: 3,
        question: 'What is 5 + 5',
        answer1: '3',
        answer2: '2',
        answer3: '1',
        answer4: '10',
        correct1: false,
        correct2: false,
        correct3: false,
        correct4: true,
      },
    ];


    setQuestions(hardcodedQuestions)
    params.api.sizeColumnsToFit()
  }

  const onSelectionChanged = params => {
    console.log(params)
    const selectedRows = params.api.getSelectedRows()
    setSelectedQuestion(selectedRows[0])
  }

  const createQuestion = newQuestion => {
    // Add the new question to the local state
    setQuestions(prevQuestions => [...prevQuestions, newQuestion])

    // Optionally, send the new question to the server
    // You can use fetch, axios, or another method to send the data
    // fetch('/api/questions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newQuestion),
    // });
  }

  const updateQuestion = updatedQuestion => {
    // Update the question in the local state
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === updatedQuestion.id ? updatedQuestion : q,
      ),
    )

    // Optionally, send the updated question to the server
    // You can use fetch, axios, or another method to send the data
    // fetch('/api/questions', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedQuestion),
    // });
  }

  const deleteQuestion = id => {
    // Remove the question from the local state
    setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id))

    // Optionally, send a request to the server to delete the question
    // You can use fetch, axios, or another method to send the request
    // fetch(`/api/questions/${id}`, { method: 'DELETE' });
  }

  let gridApi

  return (
    // <div style={{ display: 'flex', width: '100%' }}>
    <div className="app-container">
      <div className="ag-theme-alpine" style={{height: '80%', width: '70%'}}>
        <AgGridReact
          columnDefs={columns}
          rowData={questions}
          onGridReady={params => {
            gridApi = params.api
            onGridReady(params)
          }}
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
          gridOptions={gridOptions}
        />
      </div>
      <ControlPanel
        selectedQuestion={selectedQuestion}
        createQuestion={createQuestion}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
        questions={questions}
      />
    </div>
  )
}

export default QuestionsGrid
