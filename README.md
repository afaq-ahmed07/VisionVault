# VisionVault

## Overview

VisionVault is a web application designed to showcase your projects to others and enable them to contact you via email. The application features robust authentication using JWT and provides functionality to add, delete, save, like, and update project details.

## Features

- **Project Showcase**: Add, delete, save, like, and update project details.
- **Contact Form**: Allows visitors to send you an email regarding your projects.
- **Authentication**: Secure login and registration using JSON Web Tokens (JWT).
- **User Interface**: Built with EJS templates for dynamic content rendering.

## Requirements

- Node.js
- npm (Node Package Manager)
- MongoDB (for database storage)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/visionvault.git
    cd visionvault
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```sh
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_SERVICE=your_email_service_provider
    EMAIL_USER=your_email_username
    EMAIL_PASS=your_email_password
    ```

4. **Run the application:**

    ```sh
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

1. **Register an account:**

    - Visit `http://localhost:3000/signup` and create a new account.

2. **Log in:**

    - Log in to your account at `http://localhost:3000/signin`.

3. **Manage Projects:**

    - Add a new project using the "Add Project" button.
    - View your projects on the dashboard.
    - Update or delete projects as needed.
    - Like projects to show appreciation.

4. **Contact Form:**

    - Visitors can send you an email via the contact form on your profile page.

## Project Structure

- `index.js`: Main application entry point.
- `routes/`: Contains route definitions.
- `controllers/`: Contains route handler logic.
- `models/`: Contains Mongoose models for database schema.
- `views/`: Contains EJS templates for rendering web pages.
- `public/`: Contains static files (CSS, JavaScript, images).
- `middleware/`: Contains middleware functions for authentication and error handling.
