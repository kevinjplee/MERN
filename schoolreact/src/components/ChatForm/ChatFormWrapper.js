import React from 'react';
import styled from 'styled-components';

const Positioner = styled.div`
position:absolute;

right:3%;
bottom:3%;
`;

const Box = styled.div`
height:100%;
width:300px;
display:flex;
flex-direction: column;
border: 4px solid black;
border-radius: 5px;
`;

const Contents = styled.div`
flex:1;
`;
const ChatFormWrapper = ({children}) => (
    <Positioner>
        <Box>
            <Contents>
            {children}
            </Contents>
        </Box>
    </Positioner>
); 

export default ChatFormWrapper;