# Discord Authentication with Express

This project demonstrates how to implement Discord OAuth2 authentication in an Express app with session handling and MySQL integration.

## Features

- **Discord Login**: Users can log in using their Discord account.
- **User Session**: After logging in, user data is stored in a session.
- **MySQL Database**: User information is saved in a MySQL database for persistence.
- **Logout Endpoint**: Users can log out, destroying their session and clearing cookies.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 14.x)
- MySQL (for the database)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/aliyahsdevelopment/discord-authentication-example.git
   cd discord-authentication-example
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure your environment**:

   Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Replace the placeholders in `.env` with your actual values:
   - `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, and `DISCORD_REDIRECT_URI` are obtained from the [Discord Developer Portal](https://discord.com/developers/applications).
   - `SESSION_SECRET` should be a random string for session security.
   - MySQL database credentials should be configured in the `.env` file.

4. **Set up MySQL**:

   Create a MySQL database and table to store user information. You can run the following SQL query:

   ```sql
   CREATE DATABASE your_database_name;

   USE your_database_name;

   CREATE TABLE users (
       discord_id VARCHAR(255) PRIMARY KEY,
       username VARCHAR(255),
       avatar VARCHAR(255)
   );
   ```

5. **Run the application**:

   Start the server:

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:3000`.

## Endpoints

### 1. `/login`

Redirects the user to Discord's OAuth2 authentication page.

### 2. `/auth/callback`

Handles the callback after Discord authentication. Users are redirected back to the frontend (configured to `http://localhost:5173` in this example).

### 3. `/logout`

Logs the user out by destroying their session and clearing the session cookie.

### 4. `/user`

Returns the currently authenticated user's data (if logged in). Returns a 401 status if not authenticated.

## Frontend Integration

You can integrate this backend with your frontend (for example, a Vue.js app) by making requests to the `/user` endpoint to check if a user is logged in and display their data. The `/logout` endpoint can be called when the user logs out.

### Example:

```javascript
// Call /logout endpoint
axios.get('http://localhost:3000/logout', { withCredentials: true })
    .then(response => {
        console.log('Logged out successfully');
        window.location.href = '/';  // Redirect to the homepage or login page
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to fork this project and submit pull requests. Contributions are welcome!
