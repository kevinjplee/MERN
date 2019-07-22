import React,{Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
& + & {
    margin-top : 1rem;
    margin-bottom: 1rem;
}
`;

const Box = styled.button`
width : 100%;
border: 2px solid ${oc.gray[8]};
line-height: 4rem;
background: ${props => props.bg};
font-color: ${props => props.fc};
&:hover{
    background: ${oc.gray[4]};
}
&:active{
    background: ${oc.gray[8]};
    font-color: white;
}
`;

const Button = styled.button`
width:10%;
border:2px solid black;
line-height: 2rem;
background:white;
font-color: solid red;
`;


Box.defaultProps = {
    bg: "white",
    fc: "black"
}


const Name = styled.div`
text-align: center;
display:inline-block;
width: 24%;
font-size:1.5rem;
`;

const Credit = styled.div`
text-align: center;
display:inline-block;
width: 24%;
font-size:1.5rem;
`; 

const Type = styled.div`
text-align: center;
display:inline-block;
width: 25%;
font-size:1.5rem;
`;

const Grade= styled.div`
text-align: center;
display:inline-block;
width: 25%;
font-size:1.5rem;
`;

const GradeBox = ({name, credit, type, grade, onClick}) => (
        <Box onClick = {onClick}>
            <Name>{name}</Name><Credit>{credit}</Credit>  
            <Type>{type}</Type> <Grade>{grade}</Grade>
        </Box>
        
);



class GradeFormButton extends Component{

    handleClick = (event) => {
        this.props.onCreate(this.props.info.FormId);
    }

    handleRemove = () =>{
        this.props.onRemove(this.props.FormId);
    }

    static defaultProps = {
        FormId: 0,
        info:{
            name: '',
            credit: '',
            type: '',
            grade: '',
        }
    } 

    componentDidMount(){
        console.log(this.props.FormId);
    }

    render(){
        const {name, credit, type, grade} = this.props.info;

        return(
            <Wrapper>
             <GradeBox onClick = {this.handleClick} name = {name} credit ={credit} type = {type} grade = {grade}/>
             <Button onClick= {this.handleRemove}>삭제</Button>
            </Wrapper>
        )
    }
}

export default GradeFormButton;