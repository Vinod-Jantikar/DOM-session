import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/products' element={<ProtectedRoute>
                <Products />
              </ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </AuthProvider>

    </div>
  );
}

export default App;
