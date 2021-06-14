import { React, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getQrCodeGet } from "../API_services/QRCode_API";

function Qrcodeeditor(props) {
  const [qrCodeReturn, setQrCodeReturn] = useState("empty");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [markerLeftInnerColor, setMarkerLeftInnerColor] = useState("#000000");
  const [markerLeftOuterColor, setMarkerLeftOuterColor] = useState("#000000");
  const [markerRightInnerColor, setMarkerRightInnerColor] = useState("#000000");
  const [markerRightOuterColor, setMarkerRightOuterColor] = useState("#000000");
  const [markerBottomInnerColor, setMarkerBottomInnerColor] =
    useState("#000000");
  const [markerBottomOuterColor, setMarkerBottomOuterColor] =
    useState("#000000");
  const [markerLeftTemplate, setMarkerLeftTemplate] = useState("version1");
  const [markerRightTemplate, setMarkerRightTemplate] = useState("version1");
  const [markerBottomTemplate, setMarkerBottomTemplate] = useState("version1");
  const [frameColor, setFrameColor] = useState("#000000");
  const [frameText, setFrameText] = useState("");
  const [frameTextColor, setframeTextColor] = useState("#FFFFFF");
  const [frameName, setFrameName] = useState("bottom-frame");

  async function QRCodeHandler(e) {
    e.preventDefault();
    const QRCode = await getQrCodeGet(
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
      frameName
    );

    let svg = QRCode.toString();
    let blob = new Blob([svg], { type: "image/svg+xml" });
    let url = URL.createObjectURL(blob);
    let image = document.createElement("img");

    image.src = url;
    image.addEventListener("load", () => URL.revokeObjectURL(url), {
      once: true,
    });
    // const svgString = encodeURIComponent(renderToStaticMarkup(QRCode));
    // const dataUri = `url("data:image/svg+xml,${svgString}")`;
    setQrCodeReturn(url);
  }

  return (
    <div>
      <img src={qrCodeReturn} className="qrcode" alt="logo" />
      <form className="menuitemform" onSubmit={QRCodeHandler}>
        <button className="formbutton" type="submmit">
          Save
        </button>
        <div className="colorpicker">
          <label htmlFor="foregroundcolor">Foreground color: </label>
          <input
            type="color"
            id="foregroundcolor"
            name="foregroundcolor"
            onChange={(e) => {
              setForegroundColor(e.target.value);
            }}
            value={foregroundColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="backgroundcolor">Background color: </label>
          <input
            type="color"
            id="backgroundcolor"
            name="backgroundcolor"
            onChange={(e) => {
              setBackgroundColor(e.target.value);
            }}
            value={backgroundColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="markerleftinnercolor">
            Inner color left marker:{" "}
          </label>
          <input
            type="color"
            id="markerleftinnercolor"
            name="setMarkerLeftInnerColor"
            onChange={(e) => {
              setMarkerLeftInnerColor(e.target.value);
            }}
            value={markerLeftInnerColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="markerleftoutercolor">
            Outer color left marker:{" "}
          </label>
          <input
            type="color"
            id="markerleftoutercolor"
            name="markerleftoutercolor"
            onChange={(e) => {
              setMarkerLeftOuterColor(e.target.value);
            }}
            value={markerLeftOuterColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="markerrightinnercolor">
            Inner color right marker:{" "}
          </label>
          <input
            type="color"
            id="markerrightinnercolor"
            name="markerrightinnercolor"
            onChange={(e) => {
              setMarkerRightInnerColor(e.target.value);
            }}
            value={markerRightInnerColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="markerrightoutercolor">
            Outer color right marker:{" "}
          </label>
          <input
            type="color"
            id="markerrightoutercolor"
            name="markerrightoutercolor"
            onChange={(e) => {
              setMarkerRightOuterColor(e.target.value);
            }}
            value={markerRightOuterColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="markerbottominnercolor">
            Inner color bottom marker:{" "}
          </label>
          <input
            type="color"
            id="markerbottominnercolor"
            name="markerbottominnercolor"
            onChange={(e) => {
              setMarkerBottomInnerColor(e.target.value);
            }}
            value={markerBottomInnerColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="markerbottomoutercolor">
            Outer color bottom marker:{" "}
          </label>
          <input
            type="color"
            id="markerbottomoutercolor"
            name="markerbottomoutercolor"
            onChange={(e) => {
              setMarkerBottomOuterColor(e.target.value);
            }}
            value={markerBottomOuterColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="framecolor">Frame color: </label>
          <input
            type="color"
            id="framecolor"
            name="framecolor"
            onChange={(e) => {
              setFrameColor(e.target.value);
            }}
            value={frameColor}
          ></input>
        </div>
        <div className="colorpicker">
          <label htmlFor="frametextcolor">Frame text color: </label>
          <input
            type="color"
            id="frametextcolor"
            name="frametextcolor"
            onChange={(e) => {
              setframeTextColor(e.target.value);
            }}
            value={frameTextColor}
          ></input>
        </div>
        <div className="frametextcontainer">
          <label htmlFor="frametext"></label>
          <input
            className="frametextfield"
            id="frametext"
            onChange={(e) => {
              setFrameText(e.target.value);
            }}
            value={frameText}
            type="text"
            placeholder="Enter your frame text"
          />
        </div>
        <div className="templatedropdown">
          <label htmlFor="framename">Set your frame style:</label>

          <select
            value={frameName}
            onChange={(e) => {
              setFrameName(e.target.value);
            }}
            name="framename"
            id="framename"
          >
            <option value="no-frame">No frame</option>
            <option value="bottom-frame">Bottom frame</option>
            <option value="bottom-tooltip">Bottom tooltip</option>
            <option value="top-header">Top header</option>
          </select>
        </div>
        <div className="templatedropdown">
          <label htmlFor="markerlefttemplate">Template left marker:</label>

          <select
            value={markerLeftTemplate}
            onChange={(e) => {
              setMarkerLeftTemplate(e.target.value);
            }}
            name="markerlefttemplate"
            id="markerlefttemplate"
          >
            <option value="version1">Version 1</option>
            <option value="version2">Version 2</option>
            <option value="version3">Version 3</option>
            <option value="version4">Version 4</option>
            <option value="version5">Version 5</option>
            <option value="version6">Version 6</option>
            <option value="version7">Version 7</option>
            <option value="version8">Version 8</option>
            <option value="version9">Version 9</option>
            <option value="version10">Version 10</option>
            <option value="version11">Version 11</option>
            <option value="version12">Version 12</option>
            <option value="version13">Version 13</option>
            <option value="version14">Version 14</option>
            <option value="version15">Version 15</option>
            <option value="version16">Version 16</option>
          </select>
        </div>

        <div className="templatedropdown">
          <label htmlFor="markerrighttemplate">Template right marker:</label>

          <select
            value={markerRightTemplate}
            onChange={(e) => {
              setMarkerRightTemplate(e.target.value);
            }}
            name="markerrighttemplate"
            id="markerrighttemplate"
          >
            <option value="version1">Version 1</option>
            <option value="version2">Version 2</option>
            <option value="version3">Version 3</option>
            <option value="version4">Version 4</option>
            <option value="version5">Version 5</option>
            <option value="version6">Version 6</option>
            <option value="version7">Version 7</option>
            <option value="version8">Version 8</option>
            <option value="version9">Version 9</option>
            <option value="version10">Version 10</option>
            <option value="version11">Version 11</option>
            <option value="version12">Version 12</option>
            <option value="version13">Version 13</option>
            <option value="version14">Version 14</option>
            <option value="version15">Version 15</option>
            <option value="version16">Version 16</option>
          </select>
        </div>

        <div className="templatedropdown">
          <label htmlFor="markerbottomtemplate">Template bottom marker:</label>

          <select
            value={markerBottomTemplate}
            onChange={(e) => {
              setMarkerBottomTemplate(e.target.value);
            }}
            name="markerbottomtemplate"
            id="markerbottomtemplate"
          >
            <option value="version1">Version 1</option>
            <option value="version2">Version 2</option>
            <option value="version3">Version 3</option>
            <option value="version4">Version 4</option>
            <option value="version5">Version 5</option>
            <option value="version6">Version 6</option>
            <option value="version7">Version 7</option>
            <option value="version8">Version 8</option>
            <option value="version9">Version 9</option>
            <option value="version10">Version 10</option>
            <option value="version11">Version 11</option>
            <option value="version12">Version 12</option>
            <option value="version13">Version 13</option>
            <option value="version14">Version 14</option>
            <option value="version15">Version 15</option>
            <option value="version16">Version 16</option>
          </select>
        </div>
      </form>

      <div></div>
    </div>
  );
}

export default Qrcodeeditor;
