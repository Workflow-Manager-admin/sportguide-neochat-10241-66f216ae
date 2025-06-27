# Sports TV Guide Chatbot React Frontend

This project is a modern, responsive React application for the Sports TV Guide chatbot. It enables users to chat with a sports guide assistant, view TV sports schedules, and experience a mobile-friendly, accessible interface. This frontend is designed to eventually integrate sports TV scheduling data from Gracenote APIs alongside knowledge graph features powered by Neo4j.

---

## Project Overview

The Sports TV Guide chatbot is a single-page React app that helps users find TV listings for sports events and get conversational answers about matches, schedules, and more. It features a real-time, interactive chat window and a structured TV guide display, with a UI styled for clarity, brand consistency, and usability.

---

## Key Features

- **Chatbot Interface**:  
  A dynamic chat experience simulating a sports assistant. Supports real-time message streaming, "bot is typing" feedback, and robust input handling.

- **TV Guide Panel**:  
  See current sports TV schedules in a readable table, with sport icons, match details, league, time, and broadcaster. Data is currently stubbed; API/data integration ready.

- **Modern Design & Branding**:  
  Utilizes custom CSS variables and theming. Brand palette includes Primary (`#1e3a8a`), Secondary (`#10b981`), Accent (`#f59e42`). Gradient and soft backgrounds are used for clarity and visual appeal.

- **Responsive & Accessible**:  
  Mobile-first, adaptable layout. Keyboard navigation support in the sidebar, clear ARIA roles, and visually hidden hints improve accessibility for all users.

- **Theme Switching**:  
  Users can toggle between light and dark mode; theme adapts all main UI regions and satisfies color contrast guidelines.

- **Extensible Architecture**:  
  The code is modular with distinct components: `Header`, `Sidebar`, `ChatWindow`, `TVGuide`. Business logic and fetching methods are designed for future API replacement.

---

## Setup & Running Locally

### Prerequisites

- Node.js (v16 or newer recommended)
- npm

### Installing Dependencies

1. Change directory to the frontend:
   ```
   cd web_frontend_workspace/web_frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```

### Running the App

Start the development server:
```
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### Running Tests

This project uses Jest and React Testing Library, with custom tests for both the chat and TV guide UI:
```
npm test
```
Run in watch mode for interactive development. Coverage includes main user-facing components and simulated API logic.

### Build for Production

Create an optimized production build:
```
npm run build
```
The build will be output to a `build` folder, ready for deployment.

---

## Usage Guidelines

- **Chatting**:  
  Type questions about sports, matches, or schedules; the bot answers with streamed, natural-sounding replies.
  Example prompts:
  - "Who is playing in the NBA tonight?"
  - "Show me the football schedule"
  - "When is the next Wimbledon match?"

- **TV Guide**:  
  The right-side guide panel updates (with mocked data) as if from a live sports feed.

- **Theming & Navigation**:  
  - Use the top-right button to toggle dark/light mode.
  - Navigate sections via sidebar using mouse or keyboard arrows/enter.

**Note:** All data responses are currently mocked for frontend prototyping. Integration logic is stubbed for easy API wiring.

---

## Customization & Extending Functionality

### Brand Colors & Theming

All primary colors and variables are set in `src/App.css`. Example:
```css
:root {
  --primary: #1e3a8a;
  --secondary: #10b981;
  --accent: #f59e42;
}
```
Switch to dark mode by toggling the button; see `[data-theme="dark"]` overrides in CSS.

### Component Structure

- `src/App.js` – App layout/composition, theme state
- `src/components/ChatWindow.js` – Main chat logic, bot streaming, message UI
- `src/components/Sidebar.js` – Navigation (keyboard accessible)
- `src/components/Header.js` – Logo, app name, ARIA banner
- `src/components/TVGuide.js` – TV schedule table and stubs for API data

### API Integration

- **ChatBot API**:  
  Replace the `fetchChatbotResponse` async function in `ChatWindow.js` with a real HTTP call for backend integration (e.g., FastAPI, Neo4j).
- **TV Guide Data**:  
  Replace the `fetchTVGuideData` function in `TVGuide.js` with logic to fetch from Gracenote API (or your chosen TV listings provider).

Both functions are fully asynchronous and handle loading/errors.

---

## Testing & Quality

- Out-of-the-box tests for UI rendering, message handling, error logic in chat/guide (`.test.js` files).
- Add new tests as needed following the patterns in `ChatWindow.test.js` and `TVGuide.test.js`.
- ESLint config for fast feedback on JS style (`eslint.config.mjs`).

---

## Accessibility & Responsive Design

- Full keyboard navigation for sidebar, inputs, and theme switching
- Color contrast and font sizes suitable for extended reading
- Responsive layout down to mobile width
- ARIA labels, roles, and visually hidden descriptions for assistive technologies

---

## Future Enhancements

- Live API integration for both chat and TV guide
- User sign-in/auth and personal reminders/favorites
- More advanced conversation/intent handling and analytics
- User settings, preferences, and notifications
- Internationalization/multi-language support

---

## Contact & Learn More

For more information or to suggest improvements, open an issue or contribute via pull request.

To learn React fundamentals, visit the [React documentation](https://reactjs.org/).
