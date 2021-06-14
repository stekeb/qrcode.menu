import React from "react";

function MobileMenuList({ item, language, menuNo }) {
  return (
    <div>
      <div>{menuNo}</div>
      <div>{item[language]}</div>
    </div>
  );
}

export default MobileMenuList;
