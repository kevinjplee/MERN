import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Background = styled.div`
background-color : #f9f9f9;
width:100%;
height:100%;
`;

const Positioner = styled.div`
position : absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const Box = styled.div`
width: 800px;
border: 2px solid gray;
`;

const Contents = styled.div`
background: white;
padding: 2rem;
height: auto;
`;

const Label = styled.div`
position : absolute;
top: -10%;

font-size: 1.5rem;
color: ${oc.gray[8]};
`;

const HomeWrapper = ({label, children}) => (
    <Background>
    <Positioner>
        <Label>{label}</Label>
        <Box>
            <Contents>
                {children}
            </Contents>
        </Box>
    </Positioner>
    </Background>
);

export default HomeWrapper;