import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

const Home = () => {
  // Getting the selected area from the Redux store
  const area = useSelector((state) => state.area);

  // State to handle loading state
  const [loading, setLoading] = useState(false);

  // State to store restaurant names
  const [restaurantPlace, setRestaurant] = useState([]);

  // State to store top places data
  const [data, setData] = useState([]);

  // Function to fetch top details (places and restaurants) based on the selected area
  const getTopDetails = async () => {
    setLoading(true);

    // URLs to fetch top places and restaurants
    const urls = [
      `/api/topPlace?categories=tourism,heritage,religion&filter=place:${area?.placeId}&limit=20`,
      `/api/topPlace?categories=catering.restaurant&filter=place:${area?.placeId}&limit=20`,
    ];

    // Fetching data from the URLs
    const res = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      })
    );

    // Handling natural places data
    const natural = res[0]?.features;
    if (natural) {
      const naturalName = natural.map((n) => {
        console.log(n); // Debugging log to show natural place data
        return {
          name: n.properties.name,
          lat: n.properties.lat,
          lon: n.properties.lon,
        };
      });

      if (naturalName) {
        console.log("hii"); // Debugging log to indicate processing
        const linkArr = naturalName.map((n) => {
          // Constructing API URLs to fetch photos for each natural place
          return `/api/flicker?method=flickr.photos.search&tags=${n.name}&accuracy=16&per_page=5&extras=description,date_taken,views,url_s,url_b,url_q,url_t,url_m,url_n,url_z,url_c,url_l,url_o&sort=interestingness-asc&format=json&nojsoncallback=1`;
        });

        const res = await Promise.all(
          linkArr.map(async (n) => {
            const response = await fetch(n);
            const data = await response.json();
            return data;
          })
        );

        console.log(res); // Debugging log to show photo data

        // Combining place names with their respective images
        const data2 = naturalName.map((n, index) => {
          return {
            name: n.name,
            image: res[index]?.photos?.photo[0]?.url_c,
          };
        });

        console.log(data2); // Debugging log to show final combined data
        setData(data2);
      }
    }

    // Handling restaurant data
    const restaurant = res[1]?.features;
    if (restaurant) {
      const restaurantName = restaurant.map((n) => {
        return n.properties.name;
      });
      setRestaurant(restaurantName);
    }

    setLoading(false);
  };

  // Effect to fetch top details whenever the selected area changes
  useEffect(() => {
    getTopDetails();
  }, [area]);

  return loading ? (
    <Loader />
  ) : (
    <div className="home-page">
      <div className="Place-main-container">
        <h1 className="heading">Top Places</h1>
        <div className="place-container">
          {data ? (
            data.map((d, index) => {
              if (d.name && d.image) {
                return (
                  <Link key={index} to={`/place/${d.name}`} className="place-box">
                    <p className="place-name">{d.name}</p>
                    <div className="place-img-box">
                      <img className="placeImg" src={d.image} alt="" />
                    </div>
                  </Link>
                );
              }
              return null; // Return null if data is not complete
            })
          ) : (
            <div className="">No related data to this place</div>
          )}
        </div>
      </div>
      <div className="Place-main-container">
        <h1 className="heading">Top Restaurants</h1>
        <div className="place-container">
          {restaurantPlace.map((n, index) => {
            return (
              <div key={index} className="">
                <p className="restaurant-name">{n}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
