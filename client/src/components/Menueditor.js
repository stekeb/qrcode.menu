import { React, useState } from "react";
import Menulist from "./Menulist";
import { getTranslation } from "../API_services/DeepL_API";

function Menueditor({
  menuData,
  userId,
  createItemHandler,
  deleteHandler,
  moveUpHandler,
  moveDownHandler,
}) {
  const [toBeTranslated, setToBeTranslated] = useState(true);
  const [className, setClassName] = useState("ItemName");
  const [en, setEn] = useState("");
  const [price, setPrice] = useState("");
  const userID = userId;

  const languageArr = ["DE", "FR", "ES", "IT"];
  const translationObj = {}; // this object will be filled by the for loop in the submit handler. after it is done, the translations in the object will be send to the DB, together with the user input from the form

  //this sorts the array according to a sortNo, which is automatically generated in the backend and ajusted, when entries are moved up and down in the list. the sorting is from small to high.

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

    for (let i = 0; i < languageArr.length; i++) {
      const translation = await getTranslation(en, languageArr[i]);
      let languageKey = languageArr[i].toLowerCase(); // this is necessary, as the API needs the languages in capital letters (like in the array), but the DB fields are in lower letters.
      translationObj[languageKey] = translation.translations[0].text; //adds a key value pair to the translationObj with which the createItemHandler is then called.
    }
    await createItemHandler(
      toBeTranslated,
      className,
      en,
      translationObj.de,
      translationObj.fr,
      translationObj.es,
      translationObj.it,
      price,
      userID
    );

    setEn("");
    setPrice("");
  };

  return (
    <div>
      <div className="menueditor">
        <div className="menuitemlist">{menuItemsList}</div>
      </div>

      <div>
        <form className="menuitemform" onSubmit={submitHandler}>
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
          {/* <div><input type="checkbox" id="scales" name="scales"
         checked></input> 
         
         <label for="scales">To be translated</label></div> */}

          {className === "ItemName" ? (
            <div>
              <label htmlFor="menuprice" className="menufieldheader"></label>
              <input
                className="menufield"
                id="menuprice"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
                type="text"
                placeholder="Price"
              />
            </div>
          ) : null}
          <label htmlFor="classnamedropdown">Choose a Style:</label>

          <select
            value={className}
            onChange={(e) => {
              setClassName(e.target.value);
            }}
            className="classnamedropdown"
            id="classnamedropdown"
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
  );
}

export default Menueditor;
