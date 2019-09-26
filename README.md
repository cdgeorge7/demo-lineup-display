This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App to Demo the Lineup Display Application (LDA)
The LDA is a tool for sharing fantasy football lineups.  The actual application will poll a web service every 60 seconds to check if the lineup data has changed and make updates if it has.  The demo simulates this action over 400 minutes of NFL data pulled from the NFL's fantasy API on 9/22/2019.  The app is writen in ReactJS and a simple Python Flask API is used to serve the lineup data.

The static React app is served on Github Pages at https://cdgeorge7.github.io/demo-lineup-display and the API server is deployed to Elastic Beanstalk on AWS.
