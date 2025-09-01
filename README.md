# Full-Stack Survey & Polling Application

A real-time polling application built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to vote on various topics and see the results update instantly without a page refresh.

## Features

- **Full-Stack Architecture:** A React front-end that communicates with a Node.js/Express backend API.
- **Persistent Data:** Polls and vote counts are permanently stored in a MongoDB Atlas database.
- **Real-Time Updates:** The UI instantly reflects new votes as they are cast.
- **Vote Once Logic:** Uses the browser's `localStorage` to prevent users from voting more than once per poll in a single session.
- **Session Reset:** Includes a "Reset My Votes" button to clear the session's voting record from `localStorage` for easy testing and re-voting.
- **Dynamic UI:** All poll questions and results are fetched from the backend API and rendered as reusable React components.

## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Other:** CORS, Git/GitHub