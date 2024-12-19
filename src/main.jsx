import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home';
import './styles/index.css';
import { Provider } from 'react-redux'
import store from './app/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <Home />
      <ToastContainer />
    </StrictMode>,
  </Provider>
)
