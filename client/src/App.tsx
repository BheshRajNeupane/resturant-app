import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRouter } from "./routes/index.routes";


function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
