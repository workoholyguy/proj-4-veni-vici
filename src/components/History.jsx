import React from "react";

const History = ({ history }) => {
  if (!history || history.length === 0) {
    return <p>No items viewed so far.</p>;
  }

  return (
    <div className="history-list">
      <h2>Who have we seen so far?</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <img
              src={item.url}
              alt={item.breeds?.[0]?.name || "Unknown"}
              className="history-thumbnail"
            />
            <p>{item.breeds?.[0]?.name || "Unknown Breed"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
