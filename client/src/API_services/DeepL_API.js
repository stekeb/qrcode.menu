require("dotenv").config();
const DEEPL_URL = process.env.REACT_APP_DEEPL_URL;
const DEEPL_KEY = process.env.REACT_APP_DEEPL_KEY;

export async function getTranslation(en, targetLang) {
  return await fetch(
    `${DEEPL_URL}${DEEPL_KEY}&text=${en}&target_lang=${targetLang}&source_lang=EN`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {},
      body: {},
    }
  ).then((response) => response.json());
}
