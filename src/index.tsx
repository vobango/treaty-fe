import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import {Server, Response, Model} from 'miragejs';
//
// new Server({
//   models: {
//     user: Model
//   },
//   routes() {
//     this.namespace = 'api';
//
//     this.post('/login7', (schema: any, request: any) => {
//       const {username, password} = JSON.parse(request.requestBody);
//
//       if (!username || !password) {
//         return new Response(500, {errors: ['Missing username or password']});
//       }
//
//       const user = schema.users.findBy({username});
//
//       if (!user) {
//         return new Response(500, {}, {errors: ['User not found']});
//       }
//     });
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
