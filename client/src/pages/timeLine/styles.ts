import styled from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      main: string;
      sub: string;
    };
  }
}

export const logoContent = styled.img`
  border-radius: 30px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;