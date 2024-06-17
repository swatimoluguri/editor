import React, { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/NotesSlice";

const MyEditor = () => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() => {
    const savedData = localStorage.getItem("editor-content");
    if (savedData) {
      const contentState = convertFromRaw(JSON.parse(savedData));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });
  const editor = useRef(null);
  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

  const handleSave = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    localStorage.setItem("editor-content", data);
    dispatch(addItem(data));
  };

  const isEmpty = !editorState.getCurrentContent().hasText();

  const handleBeforeInput = (input, editorState) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = currentContent.getBlockForKey(blockKey);
    const blockText = block.getText();
    const startOffset = selection.getStartOffset();

    if (input === " ") {
      let newEditorState;
      if (blockText.startsWith("#") && startOffset === 1) {
        newEditorState = applyBlockType(editorState, "header-one", 1);
      } else if (blockText.startsWith("*") && startOffset === 1) {
        newEditorState = RichUtils.toggleInlineStyle(editorState, "BOLD");
      } else if (blockText.startsWith("**") && startOffset === 2) {
        newEditorState = RichUtils.toggleInlineStyle(editorState, "RED");
      } else if (blockText.startsWith("***") && startOffset === 3) {
        newEditorState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
      } else if (blockText.startsWith("```") && startOffset === 3) {
        newEditorState = RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT");
      }

      if (newEditorState) {
        setEditorState(newEditorState);
        return "handled";
      }
    }

    return "not-handled";
  };
  const applyBlockType = (editorState, blockType, prefixLength) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, blockType);
    return removePrefix(newEditorState, prefixLength);
  };
  const removePrefix = (editorState, prefixLength) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const prefixSelection = selection.merge({
      anchorOffset: 0,
      focusOffset: prefixLength,
    });

    const modifiedContent = Modifier.removeRange(
      currentContent,
      prefixSelection,
      "forward"
    );
    const newEditorState = EditorState.push(
      editorState,
      modifiedContent,
      "remove-range"
    );
    return EditorState.forceSelection(
      newEditorState,
      modifiedContent.getSelectionAfter()
    );
  };

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

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
    <div className="editor-container" onClick={focusEditor}>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <hr />
      <div className="editor-wrapper">
        {isEmpty && (
          <div className="placeholder">Type your content here...</div>
        )}
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={handleChange}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={myStyleMap}
        />
      </div>
    </div>
  );
};

export default MyEditor;
