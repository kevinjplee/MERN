// JavaScript source code
import React, {Component} from 'react';
import {GradeFormList, Submit} from 'components';
import {ChatForm} from 'pages';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from 'modules/authModule'

class Home extends Component{
	state = {
		id: this.props.auth.user
	}
	componentDidMount(){
		console.log(this.props.auth.user);
	}

	handleLogout = (event) => {
		event.preventDefault();
		const{AuthActions} = this.props;
		AuthActions.userLogout();
		console.log("Logout")
	}

	render(){
		
		return(
			<React.Fragment>
				<GradeFormList></GradeFormList>
				{/*<ChatForm id = {this.state.id}></ChatForm>*/}
				<Submit onClick = {this.handleLogout} fullWidth variant = "contained">
				로그아웃</Submit>
			</React.Fragment>
		)
	}

}

export default connect(
	(state) => ({
		auth: state.auth
	}),
	(dispatch) => ({
		AuthActions: bindActionCreators(authActions, dispatch)
	})
)(Home);