import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const History = ({ show, onClose }) => {
  const [notesList, setNotesList] = useState([]);
  const notes = useSelector((store) => store.notes);
  useEffect(() => {
    const parsedItems = notes.items
      .map((item) => {
        try {
          return JSON.parse(item);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          return null;
        }
      })
      .filter(Boolean);

    const contentStates = parsedItems
      .map((item) => {
        try {
          return convertFromRaw({
            blocks: item.blocks,
            entityMap: item.entityMap || {},
          });
        } catch (error) {
          console.error("Error converting to Draft.js ContentState:", error);
          return null;
        }
      })
      .filter(Boolean);

    setNotesList(contentStates);
  }, [notes]);

  const myStyleMap = {
    RED: {
      color: "red",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
    HIGHLIGHT: {
      backgroundColor: "yellow",
    },
  };

  return (
    <>
      <div className={`history-container-mobile ${show ? "show" : ""}`}>
        <div className="history-header">
          <h3>History</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {notesList.length > 0 &&
          notesList.map((contentState, index) => (
            <div className="history-list">
              <Editor
                key={index}
                editorState={EditorState.createWithContent(contentState)}
                customStyleMap={myStyleMap}
                readOnly={true}
                onChange={() => {}}
              />
            </div>
          ))}
      </div>
      <div className="history-container-web">
        <div className="history-header">
          <h3>History</h3>
        </div>

        {notesList.length > 0 &&
          notesList.map((contentState, index) => (
            <div className="history-list">
              <Editor
                key={index}
                editorState={EditorState.createWithContent(contentState)}
                customStyleMap={myStyleMap}
                readOnly={true}
                onChange={() => {}}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default History;
