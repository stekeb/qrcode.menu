import { React, useState } from "react";
import Menulist from "./Menulist";

function Menueditor({
  menuData,
  userId,
  createItemHandler,
  deleteHandler,
  moveUpHandler,
  moveDownHandler,
}) {
  const [toBeTranslated, setToBeTranslated] = useState(true);
  const [className, setClassName] = useState("");
  const [en, setEn] = useState("");
  const [price, setPrice] = useState(0);
  const [menuNumber, setMenuNumber] = useState("");
  const { fr, es, it, de } = "";
  const userID = userId;

  let menuItemsList;

  if (menuData.length > 0) {
    const sortedMenuItems = menuData.sort(
      (a, b) => Number(a.sortNo) - Number(b.sortNo)
    );
    menuItemsList = sortedMenuItems.map((item) => (
      <Menulist
        key={item.id}
        item={item}
        deleteHandler={deleteHandler}
        moveUpHandler={moveUpHandler}
        moveDownHandler={moveDownHandler}
      />
    ));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await createItemHandler(
      toBeTranslated,
      className,
      en,
      de,
      fr,
      es,
      it,
      price,
      menuNumber,
      userID
    );
  };

  return (
    <div className="menueditor">
      <div>This is the Menueditor</div>
      <div className="menuitemlist">{menuItemsList}</div>
      <div className="editorbar">
        This is the editorbar
        <div>
          <form className="menuitemform" onSubmit={submitHandler}>
            <label
              htmlFor="menunumberfield"
              className="menufieldheader"
            ></label>
            <input
              className="menufield"
              id="menunumberfield"
              onChange={(e) => {
                setMenuNumber(e.target.value);
              }}
              value={menuNumber}
              type="text"
              placeholder="Menu number"
            />

            <label htmlFor="menuitemname" className="menufieldheader"></label>
            <input
              className="menufield"
              id="menuitemname"
              onChange={(e) => {
                setEn(e.target.value);
              }}
              value={en}
              type="text"
              placeholder="Item Name"
            />

            <label htmlFor="menuprice" className="menufieldheader"></label>
            <input
              className="menufield"
              id="menuprice"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
              type="text"
              placeholder="Preis"
            />
            <label htmlFor="classname">Choose a Style:</label>

            <select
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
              }}
              name="classname"
              id="classname"
            >
              <option value="ItemName">Item Name</option>
              <option value="Description">Description</option>
              <option value="Category">Category</option>
              <option value="HeadLineSmall">Small Headline</option>
              <option value="HeadLineBig">Big Headline</option>
            </select>

            <button className="formbutton" type="submmit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Menueditor;
