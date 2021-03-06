import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';


const Positioner = styled.div`
position : absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const Box = styled.div`
width: 500px;
`;

const Contents = styled.div`
background: white;
padding: 5rem;
height: auto;
`;

const Label = styled.div`
text-align:center;
font-size: 1.5rem;
color: ${oc.gray[7]};
`;

const Wrapper = ({label, children}) => (
    <Positioner>
        <Label>{label}</Label>
        <Box>
            <Contents>
                {children}
            </Contents>
        </Box>
    </Positioner>
);

export default Wrapper;