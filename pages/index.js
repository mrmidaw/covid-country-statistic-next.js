import { Countries } from "../components/Countries";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Roboto', sans-serif;
  }

  h2 {
    margin: 0 0 10px;
  }
`;

export default function Home() {

  return (
    <div>
      <GlobalStyle />
      <Countries />
    </div>
  );
};