import React from 'react';
import styled from 'styled-components';

const Positioner = styled.div`
position:absolute;

right:0;
`;

const Box = styled.div`
min-height:99.5vh;
width:300px;
display:flex;
flex-direction: column;
border: 2px solid gray;
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