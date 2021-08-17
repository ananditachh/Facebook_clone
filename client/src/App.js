
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Register from './components/auth/Register'

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path = '/' component={Register}></Route>


      
    </div>
    </Router>
  );
}

export default App;
