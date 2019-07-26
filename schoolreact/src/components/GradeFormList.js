import React, {Component} from 'react';
import {HomeWrapper} from 'components'
import axios from 'axios'
import MaterialTable from 'material-table'

class GradeFormList extends Component {

    
    SelectId = 0;
    state = {
        id: this.props.id,
        columns: [
            { title: '이름', field: 'name' },
            { title: '학점', field: 'credit', type: 'numeric' },
            { title: '수업 종류', field: 'type'},
            { title: '성적',field: 'grade'},
          ],
        data:[]
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
        return(
            <HomeWrapper>
            <MaterialTable
            title="학점 관리 차트"
            columns={this.state.columns}
            data={this.state.data}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    axios.post('/gradedata',{id:this.props.id,data:newData})
                    .then(response => {
                        if(response.data.success){
                            resolve();
                            const data = [...this.state.data];
                            data.push(newData);
                            this.setState({ ...this.state, data });
                        }
                    })
                    .catch(err=> console.log(err))
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    axios.post('/modifygrade',newData)
                    .then(response =>{
                        if(response.data.success){
                            resolve();
                            const data = [...this.state.data];
                            data[data.indexOf(oldData)] = newData;
                            this.setState({ ...this.state, data }); 
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })    
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    axios.post('/deletegrade', {_id: oldData._id})
                    .then(response =>{
                     if(response.data.success === true){
                        resolve();
                        const data = [...this.state.data];
                        data.splice(data.indexOf(oldData), 1);
                        this.setState({ ...this.state, data });
                        }
                    })
                  }, 600);
                }),
            }}
          />        
            </HomeWrapper>
            /*
            <HomeWrapper label = "학점관리">
            <GradeForm FormId = {index.FormId} name = {index.name} credit = {index.credit} type = {index.type} grade= {index.grade}/>
            {list}
            <GradeFormInput name = '' credit = '' type = '' grade = '' onAddition = {this.handleAddition}></GradeFormInput>
            </HomeWrapper>
            */
        );
    }
}

export default GradeFormList;