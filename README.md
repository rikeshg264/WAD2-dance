# Local Dance organisation – Dance Class Booking System

A web application developed for a local dance organisation to manage dance courses and student registrations. This system supports different user roles (users and organisers) with custom dashboards and functionality.

## Technologies Used
- **Node.js** – JavaScript runtime for backend development  
- **Express** – Web application framework for routing and middleware  
- **Mustache** – Lightweight template engine for rendering dynamic views  
- **Gray-NEDB** – Embedded document database for storing user, course, and booking data  
- **JWT (jsonwebtoken)** – Secure token-based authentication system  
- **express-session** – Manages session storage for logged-in users  
- **Multer** – Middleware for handling image uploads  
- **Bootstrap 5** – Responsive UI framework for styling and layout  
- **dotenv** – Manages environment variables (e.g., JWT secret)

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/rikeshg264/WAD2-dance.git
   cd WAD2-dance
    ```
2. Install Dependencies
    ```bash
   npm install
    ```
3. Add Environment Variable Create a .env file in the root directory and add:
    ```bash
    ACCESS_TOKEN_SECRET=yourSecretKeyHere
    ```
4. Start the Server
    ```bash
   node index
    ```
5. Open your browser and visit:
    ```bash
   http://localhost:3000
    ```

## Live Site

You can access live web application:  https://localdance.onrender.com

Default Organiser:
Username- admin,  Password- admin

