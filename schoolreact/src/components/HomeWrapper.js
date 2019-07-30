import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography'

const Background = styled.div`
background-color:#f9f9f9;
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
width: 1000px;
`;

const Contents = styled.div`
background: white;
padding: 2rem;
height: auto;
`;

const HomeWrapper = ({label, children}) => (
    <Background>
    <Positioner>
        <Box>
        <Typography component = "h1" variant = "h5" align = "center" gutterBottom>학점 관리</Typography>
            <Contents>
                {children}
            </Contents>
        </Box>
    </Positioner>
    </Background>
);

export default HomeWrapper;