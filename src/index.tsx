import "bootstrap/dist/css/bootstrap.min.css";

import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ProvidersTree } from "./hooks/useData";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename="/">
    <ProvidersTree>
      <App />
    </ProvidersTree>
  </BrowserRouter>
);
