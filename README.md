# Lim_Dept_Housing_RMS
Record Management System
Limpopo Housing - Record Management System 

This is a React-only demo frontend for the Limpopo Department of Housing record management system.
It includes:
- Public application form (clients can submit applications)
- Admin view (password: admin123) to review and delete applications
- LocalStorage persistence so data remains across browser sessions
- Ready to run with Create React App tooling

Files included:
- public/index.html
- src/index.js
- src/App.jsx
- src/index.css
- package.json

How to run locally
------------------
1. Install dependencies:
   npm install

2. Start the development server:
   npm start

3. Open http://localhost:3000 in your browser.

How to build for production
---------------------------
npm run build

Notes
-----
- This demo stores data in the browser's localStorage under the key 'applications'.
- For production usage, replace localStorage with a proper backend API and add authentication.
