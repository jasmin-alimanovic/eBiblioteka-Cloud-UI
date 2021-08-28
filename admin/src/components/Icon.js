import React from "react";

function Icon({ src, alt, ...rest }) {
  return (
    <img
      style={{ maxWidth: "50px", maxHeight: "50px" }}
      src={src}
      {...rest}
      alt={alt}
    />
  );
}

export default Icon;
