import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store';
import { Router } from './router/router';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router></Router>
      </Provider>
    </div>
  );
}

export default App;
