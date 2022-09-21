import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
 
  const submitHandler = (e) => {
    if(e.key === 'Enter'){
      navigate('/searched/' + input)
    }
  };

  return (
    <FormStyle onSubmit={submitHandler} onKeyDown={submitHandler}>
      <FaSearch/>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </FormStyle>
  );
}

const FormStyle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    width: 50%;
    border: none;
    border-radius: 1rem;
    outline: none;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 5000;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export default Search;
