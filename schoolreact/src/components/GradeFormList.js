import React, {Component} from 'react';
import {GradeForm, HomeWrapper, GradeFormButton, GradeFormInput, GradeListMUI} from 'components'
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
//Add grades to the database and re-render
    handleAddition = (data) =>{
        axios.post('/gradedata',{id:this.props.id,data})
        .then(response => {
            console.log(response);
            this.componentDidMount();
        })
        .catch(err=> console.log(err))
    }
//Remove grades
    handleRemove = (m_Id) => {
        axios.post('/deletegrade', {_id: m_Id})
        .then(response =>{
            if(response.data.success === true){
                this.componentDidMount();
            }
        })

    }

    componentDidMount(){
        this.setState({
            data: []
        })
        console.log(this.state.id);
        axios.get('/gradedata', {
            params: {id: this.props.id}
        })
        .then(response => {
            console.log(response);
            if(!response.data.success){
                console.log("No data in the table");
            } else if(response.data.success){
                var LoadData = response.data.result;
                for(let count = 0; count < response.data.result.length; count++){
                    this.setState({
                        data: this.state.data.concat(LoadData[count])
                    })
                }
            }
        })
    }

    render(){
        const index = {_id : -1, name: '이름', credit: '학점', type:'수업 종류', grade: '성적'};

        const list = this.state.data.map(
            info => {
                return (<GradeFormButton onRemove = {this.handleRemove} onCreate = {this.handleCreate} key={info._id} info={info}/>);
            }
        );
        return(
            <HomeWrapper label = "학점관리">
            <GradeListMUI id = {this.state.id}/>
            <GradeForm FormId = {index.FormId} name = {index.name} credit = {index.credit} type = {index.type} grade= {index.grade}/>
            {list}
            <GradeFormInput name = '' credit = '' type = '' grade = '' onAddition = {this.handleAddition}></GradeFormInput>
            </HomeWrapper>
        );
    }
}

export default GradeFormList;