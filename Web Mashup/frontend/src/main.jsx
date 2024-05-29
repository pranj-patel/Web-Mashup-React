import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Main App component
import { Provider } from "react-redux"; // Redux Provider to connect the app with Redux store
import { BrowserRouter, Route, Routes } from "react-router-dom"; // React Router for routing
import "./index.css"; // Global CSS
import { store } from "./redux/store.js"; // Redux store
import Home from "./pages/home/index.jsx"; // Home page component
import Place from "./pages/place/Place.jsx"; // Place page component
import LandingPage from "./pages/LandingPage.jsx"; // Landing page component
import { Auth0Provider } from "@auth0/auth0-react"; // Auth0 Provider for authentication

// Rendering the root of the React application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Auth0Provider for handling authentication */}
    <Auth0Provider
      domain="dev-4fwrvp05o2tzcykb.us.auth0.com"
      clientId="0CoEicXXK18SHV6zzGZDQWKvkd2mYMmM"
      authorizationParams={{
        redirect_uri: "http://localhost:5000/home", // Redirect URI after authentication
      }}
    >
      {/* Redux Provider to make the Redux store available to all components */}
      <Provider store={store}>
        {/* BrowserRouter for handling routing */}
        <BrowserRouter>
          <Routes>
            {/* Main App component containing nested routes */}
            <Route path="/" element={<App />}>
              {/* Default route to the landing page */}
              <Route index element={<LandingPage />} />
              {/* Route to the home page */}
              <Route path="home" element={<Home />} />
              {/* Route to the place page with a dynamic parameter for the place name */}
              <Route path="place/:name" element={<Place />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
