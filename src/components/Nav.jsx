import React from 'react'
import styled from 'styled-components'

export default function Nav() {
return (
    <StyledDiv>
<div>Logo</div>
<div>About</div>
<div>Contact</div>
<div>Login</div>
    </StyledDiv>
  );
}
const StyledDiv = styled.div`
background-color: darkcyan;
width: 100%;
height: 70px;
display: flex;
align-items: center;
justify-content: space-evenly;

`;
