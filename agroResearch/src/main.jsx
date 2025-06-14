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
import Pdf from './components/Pdf.jsx';
import NewPdf from './components/NewPdf.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "ankit-certificate",
        element: <Ankit />
      },
      {
        path: "nityanand-certificate",
        element: <Nitya />
      },
      {
        path: "ankit",
        element: <NewPdf />
      },
      {
        path: "nityanand",
        element: <Pdf />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
