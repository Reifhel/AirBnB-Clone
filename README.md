# AirBnB Clone

This repository contains a simplified clone of the AirBnB web application. It is a full-stack approach to building a web-based rental platform, including object management, storage, and web interface.

# Description

The AirBnB Clone is a project designed to replicate the core features of AirBnB's platform, including user management, property listings, and a simple web interface. The system is built using MERN (Mongo, Express, ReactJs and NodeJs) stack

# Project Structure

```bash
AirBnB-Clone/             # Entry point of the command interpreter
├── back-end/               # Backend source code (Node.js, Express.js)
│   ├── config
|   |   └── db.js           # Make the connections with MongoDb with moongose
│   ├── domains             # All the API Routes (Bookings, places, users)
|   |   └── ...
│   ├── routes
|   |   └── index.js        # Router for all domains
│   ├── utils               # All the utils functions (JWT...)
|   |   └── ...
│   ├── index.js            # main file to run
│   ├── server.js           # all the configs of express app
│   └── ...
├── front-end/              # Front-End source code (React)
│   ├── dist                # Build files
|   |   └── ...
│   ├── src
│   |    ├── components     # Components of react
│   |    |   └── ...
│   |    ├── contexts       # contexts of react (User)
│   |    |   └── ...
│   |    ├── pages          # All the pages components for router
│   |    |   └── ...
|   │    ├── App.jsx        # The app of react
|   │    ├── dummy-perks.jsx        # a dummy file with a sample of perks
|   │    ├── index.css        # main CSS file with tailwindCSS config
|   |    └── ...
│   └── ...
```

# Installation

### Backend Setup

1. Navigate to the back-end directory:

```bash
cd back-end
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file and add your MongoDB and AWS connection string:

```env
MONGO_URL = your_mongodb_connection_string
JWT_SECRET_KEY= your_JWT_SECRET_KEY_string
S3_ACESS_KEY=your_AWS_S3_ACESS_KEY_string
S3_SECRET_KEY=your_AWS_S3_SECRET_KEY_string
BUCKET=your_bucket_name_string
```

3. Start the backend server:

```
npm start
or
npm run dev
```

### Frontend Setup

1. Navigate to the front-end directory:

```
cd front-end
```

2. Install dependencies:

```
npm install
```

3. Start the frontend development server:

```
npm run dev
```

# Usage

Once both the backend and frontend servers are running:

Open your browser and navigate to http://localhost:5173 to access the application.

You can register a new account, browse property listings, and make bookings.
