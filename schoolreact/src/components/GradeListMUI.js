import React, {Component} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'

class GradeListMUI extends Component{
    state = {
        id:this.props.id,
        columns: [
            { title: '이름', field: 'name' },
            { title: '학점', field: 'credit', type: 'numberic' },
            { title: '수업 종류', field: 'type'},
            { title: '성적',field: 'grade'},
          ],
          data: [],
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
  return (
    <MaterialTable
      title="학점 관리 차트"
      columns={this.state.columns}
      data={this.state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...this.state.data];
              data.push(newData);
              this.setState({ ...this.state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...this.state.data];
              data[data.indexOf(oldData)] = newData;
              this.setState({ ...this.state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...this.state.data];
              data.splice(data.indexOf(oldData), 1);
              this.setState({ ...this.state, data });
            }, 600);
          }),
      }}
    />
  );
}
}

export default GradeListMUI;