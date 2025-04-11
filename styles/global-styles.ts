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
    display: block;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #999;
    font-size: 14px;
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
    width: 100%;
    padding: 10px 4px;
    border: 1px solid #999;
    border-radius: 4px;
    font-size: 14px;
  }

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
