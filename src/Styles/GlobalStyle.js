import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  font-weight: 100;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  overflow: auto;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  
}
a{
  color: inherit;
    cursor:pointer;
  text-decoration: none !important;
}
`;

export default GlobalStyle;
