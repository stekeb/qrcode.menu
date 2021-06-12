require("dotenv").config();

export async function getTranslation() {
  return await fetch(`BLANK`, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      //"Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {},
  }).then((response) => response.json());
}

console.log(getTranslation());
