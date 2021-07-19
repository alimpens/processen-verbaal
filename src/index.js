import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerHeightObserver } from 'element-height-observer'

// render micro frontend function
window.renderApp = () => {
  const container = document.getElementById('micro-frontend')
  if (container) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      container
    );
  }
};

// Mount to root if it is not a micro frontend
if (!document.getElementById('micro-frontend')) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// setup app to work well in iframe
window.addEventListener('load', function () {
  // add class to body if document is in iframe to remove scrollbar in css
  if (window.top!==window.self) { document.body.className += " framed"}

  const root = document.getElementById('root')

  // send height to iframe onload
  let message = 'documentHeight:'+root.scrollHeight
  window.parent.postMessage(message,'*');

  // send height to iframe when height of root changes
  registerHeightObserver(root, { direction: 'vertical' }, function () {
    let message = 'documentHeight:'+root.scrollHeight
    window.parent.postMessage(message,'*');
  })
});
