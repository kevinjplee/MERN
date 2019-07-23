import React,{Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
margin-bottom: 1.5rem;
& + & {
    margin-top : 1.5rem;
    margin-bottom: 1.5rem;
}
`;

const Box = styled.div`
display:flex;
border: 2px solid ${oc.gray[8]};
line-height: 3rem;
background: white;
font-color: black;
}
`;

const Name = styled.div`
text-align: center;
flex:1;
font-size:1.5rem;
`;

const Credit = styled.div`
text-align: center;
flex:1;
font-size:1.5rem;
`; 

const Type = styled.div`
text-align: center;
flex:1;
font-size:1.5rem;
`;

const Grade= styled.div`
text-align: center;
flex : 1;
font-size:1.5rem;
`;

const GradeBox = ({name, credit, type, grade}) => (
    <Wrapper>
        <Box>
            <Name>{name}</Name><Credit>{credit}</Credit>  
            <Type>{type}</Type> <Grade>{grade}</Grade>
        </Box>
    </Wrapper>
);



class GradeForm extends Component{

    static defaultProps = {
        _id: 0,
        name: '',
        credit: '',
        type: '',
        grade: '',
    } 

    render(){
        const {name, credit, type, grade} = this.props;

        return(
            <GradeBox name = {name} credit ={credit} type = {type} grade = {grade}/>
        )
    }
}

export default GradeForm;