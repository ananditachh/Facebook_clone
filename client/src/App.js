
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
import Register from './components/auth/Register';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Route exact path = '/' component={Register}></Route>      
    </div>
    </Router>
    </Provider>
  );
}

export default App;
