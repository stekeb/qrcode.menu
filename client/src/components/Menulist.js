import React from "react";

function Menulist({ item, deleteHandler, moveDownHandler, moveUpHandler }) {
  return (
    <div className="menulist">
      <div className="movercontainer">
        <button className="mover" onClick={() => moveUpHandler(item.id)}>
          u
        </button>
        <button className="mover" onClick={() => moveDownHandler(item.id)}>
          d
        </button>
      </div>
      <div className="menuitem">{item.menuNumber}</div>
      <div className="menuitem">{item.sortNo}</div>
      <div className="menuitem">{item.className}</div>
      <div className="menuitem">{item.en}</div>
      <div className="menuitem">{item.price}</div>
      <button className="delete" onClick={() => deleteHandler(item.id)}>
        d
      </button>
    </div>
  );
}

export default Menulist;
