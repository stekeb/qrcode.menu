import { React } from "react";

function Menulist({ item, deleteHandler, moveDownHandler, moveUpHandler }) {
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

      <div className="menuitemcontainer">
        <div className={item.className}>{item.en}</div>
        <div className="price">{item.price}</div>
      </div>
      <button className="delete" onClick={() => deleteHandler(item.id)}>
        &#128465;
      </button>
    </div>
  );
}

export default Menulist;
