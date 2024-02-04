import styled, { keyframes } from "styled-components";

const animationSMain = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const SMain = styled.main<{ $rainbow_animation: boolean; }>`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid transparent;
  background: ${ props => props.$rainbow_animation ? "linear-gradient(to left, #00C853, #B2FF59)" : "#000" };
  background-size: 600% 600%;
  animation: ${animationSMain} 6s linear infinite;
  transition: 1s;
`;
