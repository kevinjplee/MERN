import React from 'react';
import oc from 'open-color';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Label = styled.button`

width: 100%;
margin-top: 1rem;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
margin-bottom :1rem;

text-align: center;
background: ${oc.cyan[7]};

cursor: pointer;
user-select: none;
transition: .2s all;

&:hover {
    background: ${oc.cyan[5]};
}

&:active{
    background: ${oc.cyan[8]};
}

letter-spacing: 6px;
text-decoration:none;
font-size: 1.25rem;
color: white;
font-weight: 500;
display:block;

`;

const RedLink = styled(Link)`

    letter-spacing: 8px;
    text-decoration:none;
    font-size: 1.25rem;
    color: white;
    font-weight: 500;

`;

const LinkButton = ({children, destination, state}) => (
    <Label as ="a" href={destination}>
       {children}
    </Label>
);

export default LinkButton;