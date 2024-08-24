import {createRoot} from 'react-dom/client'
import {store} from "./store";
import {Provider} from "react-redux";
import App from "./App";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//       <BrowserRouter basename={import.meta.env.BASE_URL}>
//           <App />
//       </BrowserRouter>
//   </StrictMode>,
// )
