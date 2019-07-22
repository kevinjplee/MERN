import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
& + & {
    margin-top : 1.5rem;
}
`;

const Label = styled.div`
font-size: 1rem;
color: ${oc.gray[6]};
margin-bottom : 0.25rem;
`;

const Select = styled.select`
width : 95%;
border: 1px solid ${oc.gray[3]};
outline: none;
border-radius: 0px;
line-height: 2.5rem;
font-size: 1.2rem;
padding-left: 0.5rem;
padding-right: 0.5rem;

option {
    color : ${oc.gray[8]};
    background: white;
    display: flex;
    white-space:pre;
    min-height: 30px;
    font-size:1.2rem;
}
`;

const DropDownInput = ({label, value, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Select value = {value}>

        </Select>
    </Wrapper>
);

export default DropDownInput;