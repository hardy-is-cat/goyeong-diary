import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "pretendard";
    src: url("/fonts/PretendardVariable.ttf") format("ttf");
  }

  body {
    background-color: #efefef;
  }

  html, body, input, button, textarea {
    font-family: "pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  html main {
    padding: 20px 30px;
  }

  * {
    box-sizing: border-box;
  }
  
  input, button, textarea {
    appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    display: block;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #999;
    font-size: 14px;
    background-color: #fff;
  }
  
  input::placeholder {
    font-size: 14px;
  }

  h1, h2, h3 {
    font-weight: 700;
  }

  p {
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 4px;
    background: url('data:image/svg+xml;charset=UTF-8,<svg fill="%23666" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
    background-size: 16px 16px;
    font-size: 14px;
  }
  
  /* @supports (-webkit-backdrop-filter: none) {
  select {
    padding: 10px;
    color: #000;
  }
} */

  select:focus {
    box-shadow: 0 0 5px #AD58E1;
  }

  .a11y-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0);
  }
`;

export default GlobalStyle;
