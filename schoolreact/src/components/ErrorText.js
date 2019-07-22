import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';


const Wrapper = styled.div`
& + & {
    margin-top : 1.5rem;
    margin-bottom : 1rem;
}
`;

const Label = styled.div`
font-size: 0.9rem;
color : ${oc.red[6]};
`;


const ErrorText = ({children}) => (
<Wrapper>
    <Label>{children}</Label>
</Wrapper>
);

export default ErrorText;