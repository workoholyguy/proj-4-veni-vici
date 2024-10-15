import React from "react";

const MainDisplay = ({ item, onBan }) => {
  if (!item) {
    return (
      <div className="main-display">Click "Discover!" to see a new dog!</div>
    );
  }

  const { url, breedInfo } = item;

  return (
    <div className="main-display">
      <img
        src={url}
        alt={breedInfo ? breedInfo.name : "Dog Image"}
        className="dog-image"
        width={"380px"}
      />

      {breedInfo ? (
        <div className="breed-info">
          <h2>Breed: {breedInfo.name}</h2>
          <p>
            <strong>Temperament:</strong> {breedInfo.temperament}
          </p>
          <p>
            <strong>Origin:</strong> {breedInfo.origin}
          </p>

          {/* Button to add breed to ban list */}
          <button onClick={() => onBan(breedInfo.name)} className="ban-button">
            Ban {breedInfo.name}
          </button>
        </div>
      ) : (
        <p>Unknown Breed</p>
      )}
    </div>
  );
};

export default MainDisplay;
