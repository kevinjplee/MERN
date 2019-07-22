import React, {Component} from 'react';
import {GradeForm, Button, HomeWrapper, GradeFormButton, GradeFormInput} from 'components'
import axios from 'axios'

class GradeFormList extends Component {

    
    SelectId = 0;
    state = {
        id: this.props.id,
        data:[]
    }

    handleCreate = (data) =>{
        this.SelectId = data;
        console.log(this.SelectId);
    }

    handleAddition = (data) =>{
        axios.post('/gradedata',{id:this.props.id,data})
        .then(response => {
            console.log(response);
            this.componentDidMount();
        })
        .catch(err=> console.log(err))
    }

    handleRemove = (id) => {
        this.setState({
            data: this.state.data.filter(info=> info.FormId !== id)
        })
    }

    componentDidMount(){
        console.log(this.state.id);
        axios.get('/gradedata', {
            params: {id: this.props.id}
        })
        .then(response => {
            console.log(response);
            if(!response.data.success){
                console.log("No data in the table");
            } else if(response.data.success){
                for(let count = 0; count < response.data.result.length; count++){
                    this.setState({
                        data: this.state.data.concat(response.data.result[count])
                    })
                }
            }
        })
    }

    render(){
        const index = {FormId : -1, name: '이름', credit: '학점', type:'수업 종류', grade: '성적'};

        const list = this.state.data.map(
            info => {
                return (<GradeFormButton onRemove = {this.handleRemove} onCreate = {this.handleCreate} key={info.FormId} info={info}/>);
            }
        );
        return(
            <HomeWrapper>
            <GradeForm FormId = {index.FormId} name = {index.name} credit = {index.credit} type = {index.type} grade= {index.grade}/>
            {list}
            <GradeFormInput name = '' creidt = ''type = '' grade = '' onAddition = {this.handleAddition}></GradeFormInput>
            <Button onClick = {this.handleClick}>수정</Button>
            </HomeWrapper>
        );
    }
}

export default GradeFormList;