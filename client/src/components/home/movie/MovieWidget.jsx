import React from "react";

const MovieWidget = ({ genres }) => {
  return (
    <>
      <div class="widget-1 widget-banner">
        <div class="widget-1-body">
          <a href="#0">
            <img
              src="/assets/images/movie/sonic3.jpg"
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
              {genres.map((item) => (
                <div>
                  <input type="checkbox" name={item.name} id={item.id} />
                  <label for="genre1">{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div class="widget-1 widget-banner">
        <div class="widget-1-body">
          <a href="#0">
            <img
              src="/assets/images/banner/banner13.jpg"
              alt="banner"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default MovieWidget;
