import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findUserMobile } from "../API_services/API_Database";
import MobileMenuList from "../components/MobileMenuList";

function MobileMenu(props) {
  const { userName } = useParams();

  const [generalData, setgeneralData] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    findUserMobile(userName).then((generalData) => setgeneralData(generalData));
  }, [userName]);

  function languageChanger(lang) {
    setLanguage(lang);
  }

  const menuData = generalData.Menuitems;

  let mobilMenuItemsList;
  let menuNo = 1;

  if (menuData !== undefined && menuData.length > 0) {
    const sortedMenuItems = menuData.sort(
      (a, b) => Number(a.sortNo) - Number(b.sortNo)
    );
    mobilMenuItemsList = sortedMenuItems.map((item) => (
      <MobileMenuList
        key={item.id}
        item={item}
        language={language}
        menuNo={item.className === "ItemName" ? menuNo++ : null}
      />
    ));
  }

  return (
    <div>
      <div className="languageselector">
        <div className="languagebutton" onClick={() => languageChanger("en")}>
          EN
        </div>

        <div className="languagebutton" onClick={() => languageChanger("de")}>
          DE
        </div>

        <div className="languagebutton" onClick={() => languageChanger("es")}>
          ES
        </div>

        <div className="languagebutton" onClick={() => languageChanger("it")}>
          IT
        </div>

        <div className="languagebutton" onClick={() => languageChanger("fr")}>
          FR
        </div>
      </div>

      <div>{mobilMenuItemsList}</div>
    </div>
  );
}

export default MobileMenu;
