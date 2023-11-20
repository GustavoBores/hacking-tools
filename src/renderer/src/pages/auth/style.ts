import styled, { keyframes } from "styled-components";

const rainbowAnimation = keyframes`
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

export const SMain = styled.main<{ $animation_rgb: boolean; }>`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid transparent;
  background-size: 600% 600%;
  animation: ${rainbowAnimation} 6s linear infinite;
  transition: all 1s;

  background: ${ 
    props => props.$animation_rgb ? "linear-gradient(90deg, violet, indigo, blue, green, yellow, orange, red)" : "#000" 
  };
`;
