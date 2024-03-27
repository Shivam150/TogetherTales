# togetherTales
togetherTales is a web application project developed using Node.js, Express.js, MongoDB with Mongoose, and the EJS view engine. The purpose of this project is to create a blog application and learn how to use the EJS view engine to render web pages dynamically.

# Features
Blog Creation: Registered users can create and publish their blogs on the platform.
User Authentication: User authentication is implemented to ensure that only registered users can create and manage their blogs.
EJS View Engine: Utilizes the EJS (Embedded JavaScript) view engine to dynamically render HTML pages based on data from the server.
MongoDB Database: Uses MongoDB with Mongoose for storing blog posts and user information.
# Technologies Used
Node.js: Server-side JavaScript runtime for building scalable network applications.
Express.js: Web application framework for Node.js, providing a robust set of features for building APIs and handling HTTP requests.
MongoDB: NoSQL database for storing blog posts and user data, providing flexibility and scalability.
Mongoose: MongoDB object modeling tool for Node.js, providing a schema-based solution for data modeling and interaction with MongoDB.
EJS (Embedded JavaScript): View engine for Node.js and Express.js, allowing for the dynamic rendering of HTML pages based on server-side data.
# Getting Started
To run the togetherTales project locally, follow these steps:

# Clone the repository:
git clone https://github.com/your-username/togetherTales.git
# Navigate to the project directory:
cd togetherTales
# Install dependencies:
npm install /n
# Set up environment variables:
Create a .env file in the root directory and add the following variables:
PORT=3000 /n
MONGODB_URI=your_mongodb_connection_uri /n
JWT_SECRET=your_jwt_secret_key /n
Replace your_mongodb_connection_uri with your MongoDB connection URI and your_jwt_secret_key with a secret key for JWT token generation.

# Start the server:
npm start /n
Access the application in your web browser at http://localhost:3000.

Usage
Register a new user account on the platform.
Log in with your registered credentials.
Create and publish your blog posts.
View and manage your published blogs.
Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes. 
Make sure to follow the contribution guidelines and adhere to the code of conduct.
