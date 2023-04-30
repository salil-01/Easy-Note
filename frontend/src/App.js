import './App.css';
import { AllRoutes } from './pages/MainRoutes';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <AllRoutes/>
    </div>
  );
}

export default App;
