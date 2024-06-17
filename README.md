# Draft.js Editor in ReactJS

Created a rich text editor using Draft.js within a ReactJS application, with additional features for history view using react-redux-persist and responsive design.

## Features

- **Rich Text Editing:**
  - Formats text using markdown-like syntax (`#` for Heading 1, `*` for bold, `**` for red text color, `***` for underline).
  - Implemented a highlighted code block when typing ``` and space.

- **Persistence:**
  - Saves editor content to `localStorage` and updates state of react-redux-persist(for history) on clicking the "Save" button.
  - Restores saved content into the editor on page refresh.

- **History View:**
  - View previously saved editor content in a history panel.
  - Each saved item is displayed using Draft.js for rendering.

- **Responsive Design:**
  - Ensures the application layout adjusts gracefully across different screen sizes and devices.
