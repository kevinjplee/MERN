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
width:100%;
border: 2px solid ${oc.gray[8]};
line-height: 3rem;
background: white;
font-color: black;
`;

const Create = styled.div`
font-size: 2rem;
position:absolute;
color: ${oc.blue[6]};
font-weight: 600;
opacity: 0; 
${Box}:hover &{
    opacity:1;
}
cursor: pointer;
`;


const Name = styled.input`
text-align: center;
flex:auto;
font-size:1.5rem;
line-height: 3rem;
min-width:0;
`;

const Credit = styled.input`
text-align: center;
flex:auto;
font-size:1.5rem;
min-width:0;
`; 

const Type = styled.input`
text-align: center;
flex:auto;
font-size:1.5rem;
min-width:0;
`;

const Grade= styled.input`
text-align: center;
flex:auto;
font-size:1.5rem;
min-width:0;
`;

const GradeBox = ({name, credit, type, grade, onAddition, onChange}) => (
    <Wrapper>
        <Box>
            <Create onClick = {onAddition}>+</Create>
            <Name placeholder = {name} onChange = {onChange} name ="name"/><Credit placeholder = {credit} onChange = {onChange} name = "credit"/>
            <Type placeholder = {type} onChange = {onChange} name = "type"/><Grade placeholder = {grade} onChange = {onChange} name = "grade"/>
        </Box>
    </Wrapper>
);



class GradeFormInput extends Component{

    static defaultProps = {
        FormId: 0,
        name: '',
        credit: '',
        type: '',
        grade: ''
    } 

    state = {
        name: '',
        credit:'',
        type:'',
        grade:''
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddition = () =>{
        this.props.onAddition(this.state);
    }

    componentDidMount(){
        console.log(this.props.FormId);
    }

    render(){
        const {name, credit, type, grade} = this.props;

        return(
            <GradeBox onChange = {this.handleChange} onAddition = {this.handleAddition} name = {name} credit ={credit} type = {type} grade = {grade}/>
        )
    }
}

export default GradeFormInput;