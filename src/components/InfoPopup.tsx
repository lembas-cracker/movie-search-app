import React, { useState } from "react";
import "./InfoPopup.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const InfoPopup: React.FC = () => {
  return (
    <>
      <ReactTooltip id="my-tooltip" />
      <div
        className="info-container nav-item"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Portfolio project with React, TypeScript and Redux Toolkit for fetch requests and state management. Movies are pulled through API requests to themoviedb.org. Other things used are react-loading-skeleton package and react-router library."
      >
        <span className="info">
          <img
            src="https://img.icons8.com/m_outlined/512/FFFFFF/info.png"
            alt=""
            style={{ width: "20px", height: "20px" }}
            className="info-icon"
          />
        </span>
        <span className="nav-text">About this project</span>
      </div>
      <ReactTooltip />
    </>
  );
};

export default InfoPopup;
