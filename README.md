# VPS Controller & Personal Assistant Bot

This project provides a web interface to interact with a VPS, offering functionalities such as chat-based assistance and VPS control actions.

## Features

- **Chat Interface:** Send messages to the backend, which can be processed by an AI model.
- **Task Management:** Track the status of tasks initiated from the frontend.
- **VPS Controls:** Start, stop, and restart the VPS directly from the web interface.
- **Real-time Updates:** Utilizes WebSockets for real-time communication between the frontend and backend.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** (Placeholder - FastAPI in Python)
- **Real-time Communication:** WebSockets

## Setup Instructions

1.  **Clone the Repository:**

    ```bash
    git clone [repository-url]
    cd [repository-directory]
    ```

2.  **Open `index.html` in your browser.**

    The frontend is designed to connect to a backend server running on `ws://localhost:8000/ws` and `http://localhost:8000`.


## Project Structure

-   `index.html`: Main HTML file for the web interface.
-   `style.css`: CSS file for styling the web interface.
-   `script.js`: JavaScript file for handling frontend logic, WebSocket communication, and API calls.

## Backend Setup (Placeholder)

This project assumes a backend server is running and accessible at `http://localhost:8000` and `ws://localhost:8000/ws`.  A FastAPI backend is recommended, following the architecture described by the file structure in the prompt.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
