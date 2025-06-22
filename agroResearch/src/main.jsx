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
import SquareStartScreen from './components/SquareStartScreen.jsx';
import { store } from './store.js'
import { Provider } from 'react-redux';
import SquareQuiz from './components/SquareQuiz.jsx';
import SquareSummary from './components/SquareSummary.jsx';



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
      },
      {
        path: "Squares-trainer",
        element: <SquareStartScreen />
      },
      {
        path: "Squares-quiz",
        element: <SquareQuiz />
      },
      {
        path: "Squares-quiz/quiz-summary",
        element: <SquareSummary />
      },
      {
        path: "Cubes-trainer",
        element: <SquareStartScreen />
      },
      {
        path: "Cubes-quiz",
        element: <SquareQuiz />
      },
      {
        path: "Cubes-quiz/quiz-summary",
        element: <SquareSummary />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,

)
