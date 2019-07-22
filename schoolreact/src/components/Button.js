import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';

const Label = styled.div`

width: 100%;
margin-top: 1rem;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
margin-bottom :1rem;

background: ${oc.cyan[7]};

letter-spacing: 6px;
font-size: 1.25rem;
color: white;
text-align: center;
font-weight: 500;

cursor: pointer;
user-select: none;
transition: .2s all;

&:hover {
    background: ${oc.cyan[5]};
}

&:active{
    background: ${oc.cyan[8]};
}

`;

Label.defaultProps = {
    theme: {
        main: "white"
    }
}

const Button = ({children, onClick}) => (
    <Label onClick = {onClick}>
        {children}
    </Label>
);

export default Button;