# CollabCode

A real-time collaborative code editor built with React, TypeScript, and WebSocket.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the WebSocket server:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

   The backend will run on port 3001.

### Frontend Setup
1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on port 5173 (or the next available port).

### Usage
1. Open your browser and go to the frontend URL (usually http://localhost:5173)
2. The WebSocket connection status will be displayed in the top-right corner
3. Start typing in the code editor - changes will be synchronized in real-time
4. Open multiple browser tabs to test collaborative editing

## Features
- Real-time code synchronization via WebSocket
- Connection status indicator
- Automatic reconnection on connection loss
- Collaborative editing support
- Modern UI with NextUI components

## Troubleshooting
- **WebSocket Connection Error**: Make sure the backend server is running on port 3001
- **Port Already in Use**: Check if another process is using port 3001 or 5173
- **Connection Lost**: The app will automatically attempt to reconnect every 3 seconds
