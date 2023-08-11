import React, { useState, useEffect } from "react";
import "./style.css";

import { embedJsonInTextFile } from "./utils.js";

const ControlPanel = ({
    selectedQuestion,
    updateQuestion,
    createQuestion,
    deleteQuestion,
    questions,
}) => {
    const [questionText, setQuestionText] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");

    const [correct1, setCorrect1] = useState(false);
    const [correct2, setCorrect2] = useState(false);
    const [correct3, setCorrect3] = useState(false);
    const [correct4, setCorrect4] = useState(false);

    useEffect(() => {
        if (selectedQuestion) {
            // Update the text fields when a question is selected
            setQuestionText(selectedQuestion.question);
            setAnswer1(selectedQuestion.answer1);
            setAnswer2(selectedQuestion.answer2);
            setAnswer3(selectedQuestion.answer3);
            setAnswer4(selectedQuestion.answer4);

            setCorrect1(selectedQuestion.correct1);
            setCorrect2(selectedQuestion.correct2);
            setCorrect3(selectedQuestion.correct3);
            setCorrect4(selectedQuestion.correct4);
        }
    }, [selectedQuestion]);

    const saveChanges = () => {
        const updatedQuestion = {
            ...selectedQuestion,
            question: questionText,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            correct1: correct1,
            correct2: correct2,
            correct3: correct3,
            correct4: correct4,
        };
        updateQuestion(updatedQuestion);
    };

    const createNewQuestion = () => {
        const newQuestion = {
            id: Date.now(), // You can generate an ID as needed
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            correct1: false,
            correct2: false,
            correct3: false,
            correct4: false,
        };
        createQuestion(newQuestion);

        // Optionally, clear the text fields
        // setQuestionText('');
        // setAnswer1('');
        // setAnswer2('');
        // setAnswer3('');
        // setAnswer4('');
    };

    const handleDelete = () => {
        if (selectedQuestion) {
            deleteQuestion(selectedQuestion.id);

            // Optionally, clear the text fields and checkboxes
            setQuestionText("");
            setAnswer1("");
            setAnswer2("");
            setAnswer3("");
            setAnswer4("");
            setCorrect1(false);
            setCorrect2(false);
            setCorrect3(false);
            setCorrect4(false);
        }
    };

    const exportToJson = () => {
        const dataStr = JSON.stringify(questions);
        const dataUri =
            "data:application/json;charset=utf-8," +
            encodeURIComponent(dataStr);

        const exportFileDefaultName = "questions.json";

        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
    };

    const exportApp = () => {
        const dataStr = JSON.stringify(questions);
        const embeddedAppText = embedJsonInTextFile(dataStr);
        const filename = "notebookEmbed.txt";

        var blob = new Blob([embeddedAppText], {
            type: "text/plain;charset=utf-8",
        });

        // Create an anchor element to trigger the download
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;

        // Append the anchor to the document and click it to start the download
        document.body.appendChild(a);
        a.click();

        // Clean up by removing the anchor element
        document.body.removeChild(a);
    };

    // TODO: Refactor so the %%HTML magic is removed from first line on preview
    const previewApp = () => {
        const dataStr = JSON.stringify(questions);
        const embeddedAppHTML = embedJsonInTextFile(dataStr);

        const newTab = window.open("", "_blank");
        newTab.document.write(embeddedAppHTML);
        newTab.document.close();
    };

    return (
        <div className="control-panel-container">
            {/* <div> */}
            <h2>Control Panel</h2>
            <p>Click on a question to edit it.</p>
            <div className="input-container">
              <label>Question:</label>
              <input
                  type="text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
              />

              <hr></hr>

              <label>Answer 1:</label>
              <input
                  type="text"
                  value={answer1}
                  onChange={(e) => setAnswer1(e.target.value)}
              />
              <div>
                  <label>Correct:</label>
                  <input
                      type="checkbox"
                      checked={correct1}
                      onChange={(e) => setCorrect1(e.target.checked)}
                  />
                  <hr></hr>
              </div>

              <label>Answer 2:</label>
              <input
                  type="text"
                  value={answer2}
                  onChange={(e) => setAnswer2(e.target.value)}
              />
              <div>
                  <label>Correct:</label>
                  <input
                      type="checkbox"
                      checked={correct2}
                      onChange={(e) => setCorrect2(e.target.checked)}
                  />
                  <hr></hr>
              </div>
              <label>Answer 3:</label>
              <input
                  type="text"
                  value={answer3}
                  onChange={(e) => setAnswer3(e.target.value)}
              />
              <div>
                  <label>Correct:</label>
                  <input
                      type="checkbox"
                      checked={correct3}
                      onChange={(e) => setCorrect3(e.target.checked)}
                  />
                  <hr></hr>
              </div>

              <label>Answer 4:</label>
              <input
                  type="text"
                  value={answer4}
                  onChange={(e) => setAnswer4(e.target.value)}
              />
              <div>
                  <label>Correct:</label>
                  <input
                      type="checkbox"
                      checked={correct4}
                      onChange={(e) => setCorrect4(e.target.checked)}
                  />
                  <hr></hr>
              </div>
            </div>
            <div className="button-container">
              <button onClick={saveChanges}>Save Changes</button>
              <button onClick={createNewQuestion}>Create New Question</button>
              <button onClick={handleDelete}>Delete Question</button>
              <button onClick={exportToJson}>Export to JSON</button>
              <button onClick={exportApp}>Embed within Python Notebook</button>
              <button onClick={previewApp}>Preview Quiz</button>
              <button onClick={console.log()}>Export to QuizDown Markup </button>
            </div>
        </div>
    );
};

export default ControlPanel;
