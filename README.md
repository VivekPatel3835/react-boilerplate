# Chatty App

Many of the web applications that you use today have real-time functionality where the user does not have to reload the page in order to see updates. Major examples of these include Slack, Twitter and Facebook.

Chatty allows users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

Primarily a client-side SPA (single-page app) built with ReactJS
  * Contains a chat log displaying messages and notifications
  * Contains an input field to change your name and an input field to send a message
  * The client-side app communicates with a server via WebSockets for multi-user real-time updates
  * No persistent database is involved; the focus is on the client-side experience

## Final Product
!["Screenshot of the chat page"](https://github.com/VivekPatel3835/Chatty-App/blob/master/screenshots/chat-page.png?raw=true)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies in each folder (react_boilerplate and chatty_server) by running the following command in the project's root directory.
    - `npm install`
3. Open two terminal windows 
    - terminal 1: 
        - navigate to the `chatty_server` folder
        - run `npm start`
    - terminal 2: 
        - navigate to the `react-boilerplate` folder 
        - run `npm start`
    This start the web servers in each folder. The app will be served at <http://localhost:3000/>.
4. Go to <http://localhost:3000/> in your browser.


### Dependencies

* React
* Webpack
* babel-loader
* webpack-dev-server

## Authors

* **Vivek Patel** - *Initial work* - [Chatty App](https://github.com/VivekPatel3835/Chatty-App)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc