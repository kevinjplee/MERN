import React from 'react';
import Button from '@material-ui/core/Button'
import {styled } from '@material-ui/styles';

const SubmitButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    color: 'white',
    padding: '0 30px',
    height: 48,
    cursor: 'pointer',
    fontSize: '1.25rem',
    marginTop: '20px'
})
/*const Label = styled.div`

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
*/
const Submit = ({children, ...rest}) => (
    <SubmitButton {...rest}>
        {children}
    </SubmitButton>
);

export default Submit;