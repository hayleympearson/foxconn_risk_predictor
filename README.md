The front-end of this web application is built on the React Framework. At the highest level exists the App component. First, App renders the static text "Foxconn Risk Predictor" to serve as title of the page. Second, App renders the static text "Enter your information below:" to serve as directions for any user visiting the page. Third, App renders three Select components, passing props to each describing the information that a user should be given the choice between selecting. Finally, App renders a LoadingButton component. When this button is pressed, a GET request is sent to the back-end with all of the information that the user has identified via their select choices about themselves in the Select components. After a timeout of 1000ms, the response (or lack thereof) is sent back to the App component from LoadingButton. Once this response is received, if it is valid, App decides which text to render based on the classification of risk for the user regarding accidents and mental illness.  

The backend of the application is coded in python and uses the Flask microframework. When the application server recieves a request, it uses a naive bayes classifier to report back to the user their risk classification for (1) their suicide risk probability and (2) their accident risk classification. A naive bayes classifier uses the "naive" assumption that all factors (e.g. age, gender, etc) are independent of each other. In other words, it assumes the employee's age is completely independent from their gender and where they work, and so on. To read more about Naive Bayes classifiers, click [here](https://blog.sicara.com/naive-bayes-classifier-sklearn-python-example-tips-42d100429e44). The application computes the likelihood of suicide and classifies it into low, moderate, and high risk, and then computes the most likely classification for accident risk (low, moderate, or high) and sends a response back to the user over the network. 

Our website is cloud-native, completely hosted on the AWS public cloud using Elastic Beanstalk to launch the backend server, and S3 to host the static frontend files. This website is publicly available to anyone who visits the link. 

Limitations of this project include the following, which definitely open up the potential for improvement in a following undertaking:
- all fields must be filled out in order to submit a request
- not all Foxconn factories are listed as choices (due to the lack of data mentioned below)
- decisions are made based on a very small set of data (https://docs.google.com/spreadsheets/d/1sP8kPeVWWiTosYN5_VaNdnJweF02rveQJ47A21830wQ/edit?usp=sharing)

Articles that were used for data collection can be found in the 'articles' folder.


------------------------------------------------------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
