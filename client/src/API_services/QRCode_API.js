const QRCODE_URL = process.env.REACT_APP_QRCODE_URL;
const QRCODE_KEY = process.env.REACT_APP_QRCODE_KEY;

export function getQrCodeGet() {
  return fetch(
    `${QRCODE_URL}${QRCODE_KEY}&foreground_color=%23000000&qr_code_text=http://www.qr-code-generator.com`
  )
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                // console.log('done', done);
                controller.close();
                return;
              }

              controller.enqueue(value);

              // console.log(done, value);
              push();
            });
          }

          push();
        },
      });
    })
    .then((stream) => {
      return new Response(stream, {
        headers: { "Content-Type": "text/html" },
      }).text();
    });
}

export async function getQrCodePost() {
  return await fetch(`${QRCODE_URL}${QRCODE_KEY}`, {
    method: "POST",
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "omit", // include, *same-origin, omit
    // headers: {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    body: JSON.stringify({
      frame_name: "bottom-frame",
      qr_code_text: "https://www.qr-code-generator.com/",
      image_format: "JPG",
      frame_color: "#ffffff",
      frame_text_color: "#ffffff",
      frame_icon_name: "mobile",
      frame_text: "Scan me",
      marker_left_template: "",
      marker_right_template: "version4",
      marker_bottom_template: "version4",
      download: 1,
    }),
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    // .then((svg) => {
    //   console.log(svg);
    // })
    .catch((error) => console.log(error));
}
