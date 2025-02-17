# nodets_authentication_jwt

**Now we all have huge feelings about Node.js Typescript support. Yeah, it's been improving quickly since it was released.
With new features and procedures, i could enhance a last project that i've been building using OOP with node.js, it enhanced
the performance, readability and code scalability.**


# project features

**{**

User Authentication: The project includes a JWT-based authentication system, allowing users to register, log in, and maintain sessions securely.

Protected Routes: Certain routes are protected and only accessible to authenticated users via JWT tokens,the server sends the token to the client using cookies.

**library:** jsonwebtoken.

 **./routes:** this file contains the mainly API REST classes of this project, such as Routes and Middleware class.
 
**}**

   **{**

Login System: Users can log in using their credentials, receiving a JWT token upon successful authentication.

Middleware for Authentication: Custom middleware is used to verify JWT tokens and ensure that only authenticated users can access protected resources.

Error Handling: Comprehensive error handling for various situations, such as invalid credentials or token expiration.

  **}**

**IMPORTANT DIRECTORIES:  [**

'./routes': api routes directory,

'./connection': database controller and connection directory (for now),

'./client': client directory with static resources

**]**

**client directory isn't here cause this repository goal is to show the server logic.**

