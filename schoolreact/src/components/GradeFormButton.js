import React,{Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { set } from 'mongoose';
import Axios from 'axios';

const Wrapper = styled.div`
margin-bottom: 1rem;
& + & {
    margin-top : 1rem;
    margin-bottom: 1rem;
}
`;

const Box = styled.div`
border-radius: 5px;
display: flex;
width : 100%;
border: 2px solid ${oc.gray[8]};
line-height: 3rem;
background: white;
`;

const Modify = styled.div`
font-size : 2rem;
position: absolute;
color: ${oc.violet[6]};
font-weight: 600;
opacity:0;
${Box}:hover &{
    opacity:1;
}
cursor:pointer;
right:5%
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

const IName = styled.input`
text-align:center;
flex: 1;
font-size:1.5rem;
min-width: 0;
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

const ICredit = styled.input`
text-align: center;
flex:1;
font-size:1.5rem;
min-width:0;
`; 

const Type = styled.div`
text-align: center;
flex:1;
font-size:1.5rem;
`;

const IType = styled.input`
text-align: center;
flex:1;
font-size:1.5rem;
min-width: 0;
`;

const Grade= styled.div`
text-align: center;
flex:1;
font-size:1.5rem;
`;

const IGrade= styled.input`
text-align: center;
flex:1;
font-size:1.5rem;
min-width: 0;
`;

class GradeFormButton extends Component{
   
    static defaultProps = {
        info:{
            _id: 0,
            name: '',
            credit: '',
            type: '',
            grade: '',
        }
    } 
    
    state= {
        isModify : false,
        _id:this.props.info._id,
        name:this.props.info.name,
        credit:this.props.info.credit,
        type:this.props.info.type,
        grade:this.props.info.grade
        
    }

    handleClick = (event) => {
        this.props.onCreate(this.props.info._id);
    }

    handleRemove = () =>{
        this.props.onRemove(this.props.info._id);
    }
    
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);
    }

    handleModify = (event) => {
        console.log(this.state.info);
        event.preventDefault();
        if(this.state.isModify){
            Axios.post('/modifygrade',this.state)
            .then(response =>{
                if(response.data.success){
                    console.log("modified");
                }
                else{
                    console.log("modify fail");
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
        this.setState(prevState => ({isModify:!prevState.isModify}))
        console.log(this.state.isModify);
    }

    componentDidMount(){
        console.log(this.state.isModify);
    }

    render(){
        const {isModify, _id, name, credit, type, grade} = this.state;

        return(
            <Wrapper>
                <Box>
                    <Delete onClick = {this.handleRemove}>&times;</Delete>
                    {this.state.isModify && <IName placeholder = {name} name = "name" onChange = {this.handleChange} value = {this.state.name}></IName>}
                    {!this.state.isModify && <Name>{name}</Name>}
                    {this.state.isModify && <ICredit placeholder = {credit} name = "credit" onChange = {this.handleChange} value = {this.state.credit}></ICredit>}
                    {!this.state.isModify &&<Credit>{credit}</Credit>}
                    {this.state.isModify && <IType placeholder = {type} name = "type" onChange = {this.handleChange} value = {this.state.type}></IType>}
                    {!this.state.isModify && <Type>{type}</Type> }
                    {this.state.isModify && <IGrade placeholder = {grade} name = "grade" onChange = {this.handleChange} value = {this.state.grade}></IGrade>}
                    {!this.state.isModify && <Grade>{grade}</Grade>}
                <Modify onClick = {this.handleModify}>&#x2710;</Modify>
                </Box>
            </Wrapper>
        )
    }
}

export default GradeFormButton;