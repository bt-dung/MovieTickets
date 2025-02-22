import React from "react";

const MovieWidget = () => {
  return (
    <>
      <div class="widget-1 widget-banner">
        <div class="widget-1-body">
          <a href="#0">
            <img
              src="../../../../assets/images/sidebar/banner/banner01.jpg"
              alt="banner"
            />
          </a>
        </div>
      </div>
      <div class="widget-1 widget-check">
        <div class="widget-1-body">
          <h6 class="subtitle">genre</h6>
          <div class="check-area">
            <div class="form-group">
              {/* call api genres firm here */}
              <input type="checkbox" name="genre" id="genre1" />
              <label for="genre1">thriller</label>
            </div>
          </div>
          <div class="add-check-area">
            <a href="#0">
              view more <i class="plus"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="widget-1 widget-banner">
        <div class="widget-1-body">
          <a href="#0">
            <img
              src="../../../../assets/images/sidebar/banner/banner02.jpg"
              alt="banner"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default MovieWidget;
