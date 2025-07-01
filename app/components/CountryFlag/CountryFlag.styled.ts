import styled from "styled-components/native";

export const CountryFlagContainer = styled.View<{size: number}>`
  width: ${({ size }: {size: number}) => size}px;
  height: ${({ size }: {size: number}) => size}px;
  border-radius: 20px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
`;