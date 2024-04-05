import React from "react";

function SkeletonLoader() {
  return (
    <div>
      <div className="product skeleton-loading">
        <div className="skeleton-img"></div>
        <div className="product-info">
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
