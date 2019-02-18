import React from 'react';  
 
class Register extends React.Component {
	
	 //set up contructor with props and state
	 constructor(props) {
		 super(props);
		 this.state = {			 
			 name: '',
			 email: '',
			 password: ''
		 }
	 }
	 
	 //create some events to update state based on change value of fields
	 onNameChange = (event) => {
		 this.setState({ name: event.target.value})
	 }
	 
	 onEmailChange = (event) => {
		 this.setState({ email: event.target.value})
	 }
	 onPasswordChange = (event) => {
		 this.setState({ password: event.target.value})
	 }
	 
	 //create an event to send data on submit
	 onSubmitSignIn = () => {
		 fetch('https://pure-retreat-98314.herokuapp.com/register',
		  { method:'post',
			 headers: {'Content-Type': 'application/json'},
			 body: JSON.stringify({
				 name: this.state.name,
				 email: this.state.email, 
				 password: this.state.password
			 })		 
		  }
		 ).then(response => response.json())
		 //according to the API we made, the data returned will be the user this time, so for clarification change var data below to user
		  .then(user => {  //add conditional to prevent login if wrong password, based on response message sent back
			 if (user.id) 
			 {
				 //load the user that was returned into the app's state
				this.props.loadUser(user)
				this.props.onRouteChange('home');
			 }			 
		 })			 
	 }
	 
	render() {
		 const { onRouteChange } = this.props;
		 return (
		 <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				  <legend className="f1 fw6 ph0 mh0">Registration</legend>
				  
				  <div className="mt3">
					<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="text" name="name"  id="name" 
							onChange = {this.onNameChange}
							/>
				  </div>
				  
				  <div className="mt3">
					<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					<input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="email" name="email-address"  id="email-address" 
							onChange = {this.onEmailChange}
							/>
				  </div>
				  <div className="mv3">
					<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					<input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
							type="password" name="password"  id="password" 
							onChange = {this.onPasswordChange}
							/>
				  </div> 
				</fieldset>
				<div className="">
				  <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						 type="submit" value="Register + Sign in"
						 onClick= {this.onSubmitSignIn} 
						 />
				</div> 
			  </div>
			</main>
		 </article>
		);
	}
}

export default Register;