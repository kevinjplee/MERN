import React,{Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
margin-bottom: 1.5rem;
& + & {
    margin-top : 1rem;
    margin-bottom: 1rem;
}
`;

const Box = styled.button`
display: flex;
width : 100%;
border: 2px solid ${oc.gray[8]};
line-height: 3rem;
background: white;

&:active{
    background: ${oc.gray[8]};
    color: white;
}
`;

const Delete = styled.div`
font-size: 2rem;
position:absolute;
color: ${oc.red[6]};
font-weight: 600;
opacity: 0; 
${Box}:hover &{
    opacity:1;
}
cursor: pointer;
`;


const Name = styled.div`
text-align: center;
flex: 1;
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
flex:1;
font-size:1.5rem;
`;

const GradeBox = ({name, credit, type, grade, onClick, onRemove}) => (

    
        <Box onClick = {onClick}>
            <Delete onClick = {onRemove}>&times;</Delete>
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
             <GradeBox onRemove = {this.handleRemove} onClick = {this.handleClick} name = {name} credit ={credit} type = {type} grade = {grade}/>
            </Wrapper>
        )
    }
}

export default GradeFormButton;