import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Ankit from './components/Ankit.jsx';
import Nitya from './components/Nitya.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/ankit-certificate",
        element: <Ankit />
      },
      {
        path: "/nityanand-certificate",
        element: <Nitya />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
