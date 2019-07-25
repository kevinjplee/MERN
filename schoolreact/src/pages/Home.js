// JavaScript source code
import React, {Component} from 'react';
import {GradeFormList} from 'components';
import {ChatForm} from 'pages';

class Home extends Component{
	state = {
		id: this.props.location.state.id
	}
	componentDidMount(){
		console.log(this.state.id);
	}


	render(){
		return(
			<React.Fragment>
				<GradeFormList id = {this.state.id}></GradeFormList>
				<ChatForm id = {this.state.id}></ChatForm>
			</React.Fragment>
		)
	}

}

export default Home;