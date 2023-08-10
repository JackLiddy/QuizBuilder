import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import '/Users/jackliddy/Downloads/React Quiz copy/node_modules/ag-grid-community/styles/ag-grid.css';
import '/Users/jackliddy/Downloads/React Quiz copy/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

function QuestionsGrid_0() {
  const [rowData, setRowData] = useState([
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces' },
    { question: 'What is Angular?', answer: 'A JavaScript library for building user interfaces' },
    { question: 'What is Vue?', answer: 'A JavaScript library for building user interfaces' },
    { question: 'What is Ember?', answer: 'A JavaScript library for building user interfaces' },
    { question: 'What is Knockout?', answer: 'A JavaScript library for building user interfaces' },
    // More data here...
  ]);

  const onDragEnd = (event) => {
    // Implement logic to reorder the row data after a drag operation here...
  };

  const gridOptions = {
    rowDragManaged: true,
    animateRows: true,
    onRowDragEnd: onDragEnd,
  };

  const columnDefs = [
    { field: 'question', rowDrag: true, width: 300 },
    { field: 'answer', width: 600 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        gridOptions={gridOptions}
        columnDefs={columnDefs}
        rowData={rowData}
      />
    </div>
  );
}

export default QuestionsGrid_0;
