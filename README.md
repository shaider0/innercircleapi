# Description

InnerCircle is a basic social media application which allows users to connect with friends, create posts with images, and message with friends.

# Main Technologies Used

##### Client Application
- React for building UI components
- Redux for managing application state
- Axios for http requests to API
- Bootstrap and custom CSS for styling
- Font Awesome for icons
- Moment for displaying time

##### API
- Node.js as server runtime
- Express as web application framework
- MongoDB database
- AWS S3 for photo storage
- bcrypt for securely hashing passwords

# Main Application Features

##### Authentication
- Sign up with username, email, and password
- Sign in required to access the app
- Change password
- Sign out

##### Feed
- View posts created by you and your confirmed friends
- Each post displays
  - the profile image of the poster
  - the poster’s username
  - the date of the post
  - the content of the post
  - the uploaded photo (if applicable)
  - a pop-up menu which allows user to update or delete the post (only if the logged in user is the creator of the post)
- Buttons
  - New Post – links to a form where user can create a new post and attach a photo
  - Filters – toggles a filter menu which allows users to filter posts by a specific username

##### Messaging
- View messages sent to you by your friends
- Compose a new message and send it to a friend

##### Friends
- Send a friend request to a friend by searching for his or her username
- Accept or reject an incoming friend request
- View pending friend requests you’ve sent, and cancel them if needed
- View list of friends and remove a friend if needed

##### Settings
- Upload a profile picture
- Change your password

##### Design and UX
- Responsive UI which scales properly on smaller screen-sizes, including mobile devices
- Custom logo design
