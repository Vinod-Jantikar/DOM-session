import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter >
      </AuthProvider>
    </div>
  );
}

export default App;
