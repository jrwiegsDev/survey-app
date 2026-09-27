# Full-Stack Survey & Polling Application

> **Status: Archived (September 2026).** The live site and API are no longer online, and this repository is no longer maintained. It's kept public as a record of my early work.

A polling application built with the MERN stack (MongoDB, Express, React, Node.js), and one of my earliest full-stack projects from September 2025. Users could vote on a set of polls and see the results update without a page refresh.

## Features

- **Full-Stack Architecture:** A React front end that talks to a Node.js/Express API.
- **Persistent Data:** Polls and vote counts were stored in MongoDB Atlas.
- **Instant Results:** After a vote, the API returned the updated polls and the UI re-rendered right away.
- **Vote Once Logic:** The browser's `localStorage` kept track of which polls you had already voted on.
- **Session Reset:** A "Reset My Votes" button cleared that record for easy testing and re-voting.
- **Dynamic UI:** Poll questions and results were fetched from the API and rendered as reusable React components.

## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Hosting:** Render (static site + web service)

## What I'd do differently

My focus is now backend engineering, and looking back, the API was the thinnest part of this project:

1. **Enforce "one vote" on the server.** The only protection against repeat voting lived in the browser's `localStorage`, which any user could clear (the app even had a button for it) or skip entirely by calling `POST /api/polls/vote` directly.
2. **Validate input.** The vote endpoint didn't check that `pollId` and `optionId` existed, and it returned `200` even when nothing was updated.
3. **Use a relational database.** Polls, options, and votes are naturally relational. In PostgreSQL, a `votes` table with foreign keys and a unique constraint would handle both integrity and "one vote per person."
4. **Operational basics.** Read the port from `process.env.PORT` instead of hard-coding it, lock CORS to the front end's origin, and add a health check, tests, and CI.
