import React from 'react';
import {styled} from '@material-ui/styles';
import Button from '@material-ui/core/Button' 

const LButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    color: 'white',
    padding: '0 30px',
    height: 48,
    cursor: 'pointer',
    fontSize: '1.25rem',
    marginTop: '20px'
})


const LinkButton = ({children, destination, ...rest}) => (
    <LButton as ="a" href={destination} {...rest}>
       {children}
    </LButton>
);

export default LinkButton;