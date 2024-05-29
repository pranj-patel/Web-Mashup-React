import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to VisitBites!</h1>
        <h3>Explore interesting places and learn more about them.</h3>
        <button onClick={() => loginWithRedirect("/home")} className="">
          Get Started
        </button>
      </div>
      <div className="app-description">
        <h3>About VisitBites</h3>
        <p>
          Welcome to <strong>VisitBites</strong>, your ultimate travel companion! VisitBites is designed to help you explore interesting places around the world and learn more about them through comprehensive details, stunning photos, and engaging videos.
        </p>
        <p>
          <strong>Functionality:</strong> Discover places, view photos, watch videos, and find top tourist spots and restaurants in the selected area.
        </p>
        <p>
          <strong>Web APIs Used:</strong> We use Flickr for photos, Geoapify for geographical data, Wikipedia for descriptions, and YouTube for videos. No user authentication is required to access these functionalities.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
