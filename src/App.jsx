import { useState } from "react";
import "./App.css";
import MainDisplay from "./components/MainDisplay";
import BanList from "./components/BanList";
import History from "./components/History";

const ACCESS_KEY = import.meta.env.VITE_DOG_API_ACCESS_KEY;

function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  // Fetch a random dog image
  const fetchData = async (retryCount = 0) => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1`,
        {
          headers: {
            "x-api-key": ACCESS_KEY, // Use the API key as a header for better security
          },
        }
      );

      const data = await response.json();

      // Check if data was received
      if (!data || data.length === 0) {
        console.log("No data received from the API.");
        return;
      }

      // Log the full API response for debugging
      console.log("API Response:", data);

      // Extract breed information if available
      const catData = data[0];
      if (catData.breeds && catData.breeds.length > 0) {
        console.log("Breed Data:", catData.breeds[0]);
      } else {
        console.log("No breed data available for this image.");
      }

      // Extract the breed name to filter using the ban list
      const breedName =
        catData.breeds && catData.breeds.length > 0
          ? catData.breeds[0].name
          : null;

      // Skip if the breed is in the ban list, retry up to 5 times
      if (breedName && banList.includes(breedName)) {
        if (retryCount < 5) {
          console.log(
            `Breed '${breedName}' is banned. Retrying (${retryCount + 1})...`
          );
          fetchData(retryCount + 1); // Fetch new data if the breed is banned
        } else {
          console.log("Maximum retries reached. No suitable cat found.");
        }
      } else {
        setCurrentItem(catData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Add an attribute to the ban list
  const addToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList((prev) => [...prev, attribute]);
    }
  };

  return (
    <div className="app">
      <div className="side-content-left">
        <History history={history} />
      </div>
      <div className="main-content">
        <h1>Veni Vici!</h1>
        <p>Discover dogs from around the world!</p>
        <MainDisplay item={currentItem} onBan={addToBanList} />
        <button onClick={fetchData} className="discover-button">
          Discover!
        </button>
      </div>
      <div className="side-content-right">
        <BanList banList={banList} />
      </div>
    </div>
  );
}

export default App;
