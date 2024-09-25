import React, { useState } from "react";
import "./InfoPopup.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const InfoPopup: React.FC = () => {
  return (
    <>
      <span className="nav-text">GitHub source code:</span>
      <ReactTooltip id="my-tooltip" />
      <div
        className="info-container"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Portfolio project with React, TypeScript and Redux Toolkit for fetch requests and state management. Movies are pulled through API requests to themoviedb.org. Other things used are react-loading-skeleton package and react-router library."
      >
        <span className="info-icon">
          <img
            src="https://wikis.tid.es/gvp-public/images/thumb/9/9f/Infobox_info_icon_white.svg.png/600px-Infobox_info_icon_white.svg.png"
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
        </span>
      </div>
      <ReactTooltip />
    </>
  );
};

export default InfoPopup;
