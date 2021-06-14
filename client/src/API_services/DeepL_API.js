require("dotenv").config();
const DEEPL_URL = process.env.REACT_APP_DEEPL_URL;
const DEEPL_KEY = process.env.REACT_APP_DEEPL_KEY;

export async function getTranslation(en, targetLang) {
  console.log(DEEPL_URL);
  return await fetch(
    `${DEEPL_URL}${DEEPL_KEY}&text=${en}&target_lang=${targetLang}&source_lang=EN`,
    {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        //"Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {},
    }
  ).then((response) => response.json());
}
