import React from "react";

function MobileMenuList({ item, language, menuNo }) {
  return (
    <div className="mobilemenulist">
      {menuNo ? <div className="menunumber">{menuNo}</div> : null}

      <div className={item.className}>{item[language]}</div>

      {item.price ? <div className="price">{item.price}</div> : null}
    </div>
  );
}

export default MobileMenuList;
