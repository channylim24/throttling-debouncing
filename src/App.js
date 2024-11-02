import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ThrottledComponent from './ThrottledComponent';
import { NonThrottledComponent } from './ThrottledComponent';
import DebouncedInput from './DebouncedInput';
import { NonDebouncedInput } from './DebouncedInput';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/throttled">Throttled Component</Link></li>
          <li><Link to="/non-throttled">Non-Throttled Component</Link></li>
          <li><Link to="/debounced">Debounced Input</Link></li>
          <li><Link to="/non-debounced">Non-Debounced Input</Link></li>
        </ul>
      </nav>
      <div className="App">
        <Routes>
          <Route path="/throttled" element={<ThrottledComponent />} />
          <Route path="/non-throttled" element={<NonThrottledComponent />} />
          <Route path="/debounced" element={<DebouncedInput />} />
          <Route path="/non-debounced" element={<NonDebouncedInput />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
