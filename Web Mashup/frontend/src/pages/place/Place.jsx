import axios from "axios";
import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Loader from "../../components/Loader";

const Place = () => {
  // Extracting the 'name' parameter from the URL
  const { name } = useParams();

  // State to handle loading state
  const [isLoading, setLoading] = useState(false);

  // State to store video details
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // State to store the description
  const [desc, setDesc] = useState(null);

  // State to store photos
  const [photos, setPhotos] = useState([]);

  // Function to fetch place details from various APIs
  const getDetails = async () => {
    setLoading(true); // Set loading to true before API calls

    // Array of URLs to fetch data from Wikipedia, Flickr, and YouTube APIs
    const urls = [
      `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${name}&srlimit=1&srsort=relevance&utf8=&origin=*`,
      `/api/flicker?method=flickr.photos.search&tags=${name}&accuracy=16&per_page=5&extras=description,date_taken,views,url_s,url_b,url_q,url_t,url_m,url_n,url_z,url_c,url_l,url_o&sort=interestingness-asc&format=json&nojsoncallback=1`,
      `/api/yt?part=snippet&q=${name}&type=video&maxResults=1`,
    ];

    // Fetching data from all URLs concurrently
    const res = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      })
    );

    // Setting the fetched photos
    setPhotos(res[1]?.photos?.photo);

    // Sanitizing and setting the fetched description
    const desc2 = res[0]?.query?.search[0]?.snippet;
    const cleanHtmlString = DOMPurify.sanitize(desc2);
    setDesc(cleanHtmlString);

    // Setting the fetched video details
    const videoId1 = res[2]?.items[0]?.id?.videoId;
    setVideoId(videoId1);
    setVideoTitle(res[2]?.items[0]?.snippet?.title);
    const videoEmbedUrl = `https://www.youtube.com/embed/${videoId1}`;
    setVideoLink(videoEmbedUrl);

    setLoading(false); // Set loading to false after API calls
  };

  // Effect to fetch details when the component mounts
  useEffect(() => {
    getDetails();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="place-details">
      <div className="heading2">{name}</div>
      <div className="place-container">
        {photos &&
          photos.map((p, index) => {
            if (p) {
              return <img key={index} className="placeImg" src={p?.url_c} alt="" />;
            }
            return null; // Return null if photo is not available
          })}
      </div>
      <div className="description" dangerouslySetInnerHTML={{ __html: desc }} />
      <div className="">
        <iframe
          width="560"
          height="315"
          className="ytVideo"
          src={videoLink}
          frameBorder="0"
          allowFullScreen
          title={videoTitle}
        ></iframe>
      </div>
    </div>
  );
};

export default Place;
