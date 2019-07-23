import React from 'react';
import styled from 'styled-components';

const Positioner = styled.div`
position:absolute;

right:0%;
bottom:50%;
`;

const Box = styled.div`
height:50%;
width:250px;
display:flex;
flex-direction: column;
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