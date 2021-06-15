require("dotenv").config();
const QRCODE_URL = process.env.REACT_APP_QRCODE_URL;
const QRCODE_KEY = process.env.REACT_APP_QRCODE_KEY;
const MENU_URL = process.env.REACT_APP_MENU_URL;

export function getQrCodeGet(
  foregroundColor,
  backgroundColor,
  markerLeftInnerColor,
  markerLeftOuterColor,
  markerRightInnerColor,
  markerRightOuterColor,
  markerBottomInnerColor,
  markerBottomOuterColor,
  markerLeftTemplate,
  markerRightTemplate,
  markerBottomTemplate,
  frameColor,
  frameText,
  frameTextColor,
  frameName,
  userNameVar
) {
  return fetch(
    `${QRCODE_URL}${QRCODE_KEY}&foreground_color=${
      "%23" + foregroundColor.substring(1)
    }&background_color=${
      "%23" + backgroundColor.substring(1)
    }&marker_left_inner_color=${
      "%23" + markerLeftInnerColor.substring(1)
    }&marker_left_outer_color=${
      "%23" + markerLeftOuterColor.substring(1)
    }&marker_right_inner_color=${
      "%23" + markerRightInnerColor.substring(1)
    }&marker_right_outer_color=${
      "%23" + markerRightOuterColor.substring(1)
    }&marker_bottom_inner_color=${
      "%23" + markerBottomInnerColor.substring(1)
    }&marker_bottom_outer_color=${
      "%23" + markerBottomOuterColor.substring(1)
    }&marker_left_template=${markerLeftTemplate}&marker_right_template=${markerRightTemplate}&marker_bottom_template=${markerBottomTemplate}&frame_color=${
      "%23" + frameColor.substring(1)
    }&frame_text=${frameText}&frame_text_color=${
      "%23" + frameTextColor.substring(1)
    }&frame_name=${frameName}&download=1&qr_code_text=${MENU_URL}menu/${userNameVar}`
  )
    .then((response) => response.body)
    .then((rb) => {
      const reader = rb.getReader();

      return new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }

              controller.enqueue(value);

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
