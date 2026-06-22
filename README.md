# Kanban - Responsive Project Management Board

A premium, minimalist, responsive, and feature-rich Kanban project management board built using React, TypeScript, Tailwind CSS, and Firestore. It operates local-first for offline guests and syncs automatically with Firestore for authenticated users.

## 📸 Screenshots

### Light Mode Workspace
![Light Mode Workspace](https://cdn.bkappi.com/ProjectsAssets/Kanban-v1/GithubReadmeAssets/HomePageWithExampleBoard.png)

### Dark Mode Workspace
![Dark Mode Workspace](https://cdn.bkappi.com/ProjectsAssets/Kanban-v1/GithubReadmeAssets/HomePageWithExampleBoardDarkTheme.png)

### Task Card Details (Light Mode)
![Card Modal Light Theme](https://cdn.bkappi.com/ProjectsAssets/Kanban-v1/GithubReadmeAssets/CardModalOpened.png)

### Task Card Details (Dark Mode)
![Card Modal Dark Theme](https://cdn.bkappi.com/ProjectsAssets/Kanban-v1/GithubReadmeAssets/CardModalOpenedDarkTheme.png)

---

## ✨ Features

- **Decoupled Static Landing Page**: Highly responsive landing page optimized for fast load times, system theme preferences, and multi-language switching.
- **Intuitive Drag & Drop**: Drag and drop cards and columns to reorganize tasks and customize workflows effortlessly.
- **Flexible Column Customization**: Create, rename, hide, show, reorder, and delete columns to match your workflow.
- **Detailed Task Cards**:
  - Titles & descriptions.
  - Subtask checklists with progress tracking.
  - Multi-tag management with tag search and board-wide tag filtering.
  - Detailed task notes.
  - Start dates and deadline tracking.
- **Collaboration & Board Sharing**:
  - Generate public view-only or public edit board links.
  - Control duplication access.
  - Add specific email collaborators as board editors.
- **Data Exporting**: Instantly export columns or entire boards to Excel or CSV formats.
- **System Theme Matching**: Seamlessly toggles between Light and Dark modes. Matches the browser preference on first load with a Dark mode fallback.
- **GDPR & LGPD Compliance**:
  - Detailed cookie consent banner and legal policies modal (Privacy, Terms of Use, Cookie Policy).
  - User data export option ("Export My Data").
  - Account deletion ("Delete My Account") which permanently wipes all user data and boards from servers.
- **Multi-language Support**: Fully localized in English, Portuguese (Brazil), Spanish, German, and French.

---

## 🛠️ Installation & Setup

### Prerequisites

Ensure you have **Node.js** (version 18+) and **npm** installed.

### 1. Clone the Repository
```bash
git clone https://github.com/BrunoKappi/Kanban.git
cd Kanban
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` or `.env.development` file in the root directory (refer to `.env.example` as a template). You will need to supply your Firebase web configuration:

```env
# CI Build options (optional)
CI=false
NODE_OPTIONS="--max_old_space_size=4096"

# Firebase connection configurations (JSON string format)
VITE_FIREBASE_CONFIG='{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_PROJECT_ID.firebaseapp.com",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_PROJECT_ID.appspot.com",
  "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
  "appId": "YOUR_APP_ID",
  "measurementId": "YOUR_MEASUREMENT_ID"
}'
```

> [!NOTE]
> Make sure to enable **Firestore Database**, **Authentication** (Google & Email/Password), and **Firebase Storage** in your Firebase console.

---

## 🚀 Running the Application

### Start Development Server
To launch the Vite development server locally:
```bash
npm run dev
```
Open your browser and visit:
- **Landing Page**: `http://localhost:5173/` (mapped to `/index.html`)
- **App Workspace**: `http://localhost:5173/app.html` (mapped to `/app.html`)

### Build for Production
To bundle the static landing page and the optimized React bundle:
```bash
npm run build
```
Vite will output the static assets to the `dist/` directory.
