import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import DiceComponent from './components/DiceComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <DiceComponent />
      </div>
    </Router>
  );
}

export default App;
