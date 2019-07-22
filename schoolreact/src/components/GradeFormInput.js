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
width : 99.5%;
border: 2px solid ${oc.gray[8]};
line-height: 4rem;
background: white;
font-color: black;
}
`;


Box.defaultProps = {
    bg: "white",
    fc: "black"
}


const Name = styled.Input`
text-align: center;
display:inline-block;
width: 24%;
font-size:1.5rem;
`;

const Credit = styled.Input`
text-align: center;
display:inline-block;
width: 24%;
font-size:1.5rem;
`; 

const Type = styled.Input`
text-align: center;
display:inline-block;
width: 25%;
font-size:1.5rem;
`;

const Grade= styled.Input`
text-align: center;
display:inline-block;
width: 25%;
font-size:1.5rem;
`;

const GradeBox = ({name, credit, type, grade}) => (
    <Wrapper>
        <Box>
            <Name>{name}</Name><Credit>{credit}</Credit>  
            <Type>{type}</Type> <Grade>{grade}</Grade>
        </Box>
        <button onClick = {this.handle}
    </Wrapper>
);



class GradeForm extends Component{

    static defaultProps = {
        FormId: 0,
        name: '',
        credit: '',
        type: '',
        grade: '',
    } 

    componentDidMount(){
        console.log(this.props.FormId);
    }

    render(){
        const {name, credit, type, grade} = this.props;

        return(
            <GradeBox name = {name} credit ={credit} type = {type} grade = {grade}/>
        )
    }
}

export default GradeForm;