import React, { useState } from "react"

import styled, { keyframes, css } from "styled-components"

type PropsTypeForm = {
  typeForm: "login" | "register"
  buttonForm: () => void
}

type PropsTypeChildrenForm = {
  children: React.ReactNode
}

const Form = (
  { children, 
    typeForm, 
    buttonForm 
  }: PropsTypeForm & PropsTypeChildrenForm
): JSX.Element => {

  return (
    <SForm
      onSubmit={buttonForm} 
      className={`position-form ${typeForm === "register" ? "left" : "right"}`}
    >
        {children}
    </SForm>
  )
}

const Content = (
  { children }: PropsTypeChildrenForm
): JSX.Element => {
  const [toggle, setToggle] = useState<boolean>(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <SContent>
      <SHeader $toggle={toggle}>
        <div>
          <button onClick={handleToggle} >{toggle ? "Login" : "Register"}</button>
        </div>
      </SHeader>
      <SMain $toggle={toggle}>
        {children}
      </SMain>
    </SContent>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SErrorMessageForm = styled.h2<{ $isVisible: boolean }>`
  opacity: 0;
  animation: ${({ $isVisible }) => $isVisible && css`${fadeIn} 0.5s forwards`};
  margin-bottom: 1rem;
`

const SButtonForm = styled.button<{ $isLoading: boolean }>`
  margin-top: 1rem;
  height: 3rem;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #00C853, #B2FF59);
  font-size: medium;
  color: #000000;
  font-weight: bold;
  cursor: pointer;
  background-size: 1px 200px;
  transition: background 0.3s ease;

  &:disabled {
    cursor: not-allowed;
    background: linear-gradient(to left, #d3d3d3, #d3d3d3);
  }

  &:hover {
    background: linear-gradient(to left, #00C853, #B2FF59);
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      &:before {
        content: "";
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 0.15em solid currentColor;
        border-top: 0.15em solid transparent;
        border-radius: 50%;
        animation: ${loadingAnimation} 0.6s linear infinite;
        margin-right: 0.5em;
      }
  `}
`

const SInputForm = styled.input<{ $hasError: boolean; $hasComplete: boolean }>`
  height: 3rem;
  padding: 0.7rem;
  border-width: 0.175rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  font-size: medium;
  transition: border-color 1s;
  border-color: ${({ $hasError, $hasComplete }) => {
    if ($hasError) {
      return "#FF0000"
    } if ($hasComplete) {
      return "#1E90FF"
    } else {
      return "#00C853"
    }
  }};
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-width: 0.3rem;
  }

  &::placeholder {
    font-style: italic;
  }
`

const SContent = styled.section`
  display: flex;
  flex-direction: column;
  height: 99%;
  width: 99%;
  background-color: white;
`

const SForm = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 2rem;

  h2 {
    text-align: center;
    transition: text 1s;
    font-size: 1.2rem;
    color: #ff0000;
    background-color: #ffd7d7;
    border-radius: 1rem;
  }

  div {
    height: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    span {
      color: #ff0000;
      background-color: #ffd7d7;
      text-align: center;
      border-radius: 1rem;
    }
  }
`

const SMain = styled.main<{ $toggle: boolean }>`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  .position-form {
    position: absolute;
    padding: 10%;
    transition: all 0.3s;
  }

  .left {
    left: ${props => (props.$toggle ? "0%" : "100%")};
  }

  .right {
    left: ${props => (!props.$toggle ? "0%" : "-100%")};
  }
`

const SHeader = styled.header<{$toggle: boolean}>`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 200px;
    height: 3rem;
    border: 0.150rem solid #00C853;
  }

  button {
    transition: all 0.3s;
    height: 100%;
    width: 50%;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    color: #000000;
    letter-spacing: 2px;
    background: linear-gradient(to left, #00C853, #B2FF59);
    transform: ${props => (props.$toggle ? "translateX(100px)" : "translateX(0px)")};

  &:hover {
      box-shadow: -10px 0px 10px 2.5px #B2FF59, 10px 0px 10px 5px #00C853;
    }
  }
`

export const C = {
  Content,
  Form
}

export const S = {
  SErrorMessageForm,
  SButtonForm,
  SInputForm
}