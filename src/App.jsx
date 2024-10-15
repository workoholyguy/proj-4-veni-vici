import { useState, useEffect } from "react";
import "./App.css";
import MainDisplay from "./components/MainDisplay";
import BanList from "./components/BanList";

const ACCESS_KEY = import.meta.env.VITE_DOG_API_ACCESS_KEY;

function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [banList, setBanList] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [history, setHistory] = useState([]);

  // Fetch all breeds once on component mount
  useEffect(() => {
    fetchBreeds();
  }, []);

  // Function to fetch all breeds
  const fetchBreeds = async () => {
    try {
      const response = await fetch(`https://api.thedogapi.com/v1/breeds`, {
        headers: {
          "x-api-key": ACCESS_KEY,
        },
      });
      const data = await response.json();
      setBreeds(data);
      console.log("Fetched Breeds:", data);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  // Fetch a random dog image along with breed information
  const fetchData = async (retryCount = 0) => {
    try {
      // Pick a random breed to use in the request
      if (breeds.length === 0) {
        console.log("No breeds available to fetch.");
        return;
      }

      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

      // Skip if the breed is in the ban list and retry up to 5 times
      if (banList.includes(randomBreed.name)) {
        if (retryCount < 5) {
          console.log(
            `Breed '${randomBreed.name}' is banned. Retrying (${
              retryCount + 1
            })...`
          );
          fetchData(retryCount + 1);
        } else {
          console.log("Maximum retries reached. No suitable dog found.");
        }
        return;
      }

      // Fetch image using the breed ID
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?limit=1&breed_ids=${randomBreed.id}&has_breeds=1`,
        {
          headers: {
            "x-api-key": ACCESS_KEY,
          },
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.length > 0) {
        const newItem = {
          ...data[0],
          breedInfo: randomBreed,
        };
        setCurrentItem(newItem);
        setHistory((prevHistory) => [...prevHistory, newItem]);
      } else {
        console.log("No data available from the API.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to add an attribute to the ban list
  const addToBanList = (attribute) => {
    if (attribute && !banList.includes(attribute)) {
      setBanList((prev) => [...prev, attribute]);
    }
  };

  return (
    <div className="app">
      <div className="side-content-left">
        <BanList banList={banList} />
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
        <h2>History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.breedInfo ? item.breedInfo.name : "Unknown Breed"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
