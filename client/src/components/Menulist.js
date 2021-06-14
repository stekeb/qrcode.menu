import { React } from "react";

function Menulist({
  item,
  deleteHandler,
  moveDownHandler,
  moveUpHandler,
  menuNoAdder,
}) {
  return (
    <div className="menulist">
      <div className="movercontainer">
        <button className="mover" onClick={() => moveUpHandler(item.id)}>
          &#8593;
        </button>
        <button className="mover" onClick={() => moveDownHandler(item.id)}>
          &#8595;
        </button>
      </div>
      {/* <div className={item.className}>{item.className ? "ItemName" : menuNoAdder()}</div> */}
      <div className={item.className}>{item.sortNo}</div>
      <div className={item.className}>{item.className}</div>
      <div className={item.className}>{item.en}</div>
      <div className={item.className}>{item.price}</div>
      <button className="delete" onClick={() => deleteHandler(item.id)}>
        &#128465;
      </button>
    </div>
  );
}

export default Menulist;
