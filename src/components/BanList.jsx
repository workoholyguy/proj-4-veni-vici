import React from "react";

const BanList = ({ banList }) => {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      {banList.length > 0 ? (
        <ul>
          {banList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No banned items.</p>
      )}
    </div>
  );
};

export default BanList;
