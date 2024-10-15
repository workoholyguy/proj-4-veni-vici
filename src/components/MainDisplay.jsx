import React from "react";

const MainDisplay = ({ item, onBan }) => {
  if (!item) return <div>Click "Discover" to start exploring!</div>;

  const breedInfo =
    item.breeds && item.breeds.length > 0 ? item.breeds[0] : null;
  const breedName = breedInfo
    ? breedInfo.name
    : "Breed information not available";
  const origin = breedInfo
    ? breedInfo.origin
    : "Origin information not available";

  return (
    <div className="main-display">
      <h2>{breedName}</h2>
      <div className="attributes">
        {breedInfo && (
          <>
            <button onClick={() => onBan(breedName)} className="ban-button">
              Ban {breedName}
            </button>
            {origin && (
              <button onClick={() => onBan(origin)} className="ban-button">
                Ban {origin}
              </button>
            )}
          </>
        )}
      </div>
      <img src={item.url} alt={breedName} className="item-image" />
    </div>
  );
};

export default MainDisplay;
