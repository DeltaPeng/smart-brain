import React, { Component } from 'react'; 
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Particles from 'react-particles-js';
 
const particlesOptions = {
		particles: {
			number: {
				value: 40,
				density: {
					enable: true,
					value_area: 800
				}
			}
		}
	  };

const initialState = {	
		input: '',
		imageUrl: '',
		box: {},
		route: 'signin',
		isSignedIn: false,
		user: {
				id:'',
				name:'',
				email: '', 
				entries: 0,
				joined: ''
		}
}
	  
class App extends Component {
	
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			user: {
					id:'',
					name:'',
					email: '', 
					entries: 0,
					joined: ''
			}
		};
	}
	
	//create function for use in Register.js, loads a user into the state.  Need to pass into Register
	loadUser = (userData) => {
		this.setState( {user: {
			id: userData.id,
			name:userData.name,
			email: userData.email, 
			entries: userData.entries,
			joined: userData.joined
			}
		})
	}
	
	//get the face detection bounding box values in pixel pos rather than %
	calculateFaceLocation = (data) => {
		//the bounding box params are in % of the image values
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		//get the original image user input in
		const image = document.getElementById('inputImage');
		
		//set to number just so js knows for sure it's a number
		const width = Number(image.width);
		const height = Number(image.height);
		 
		//figure out the 4 points that make up the face box, then surround that in a Border		
		//return an object to fill up the box state
		return {
			leftCol: clarifaiFace.left_col * width,
			rightCol: width - (clarifaiFace.right_col * width),
			topRow: clarifaiFace.top_row * height,
			bottomRow: height - (clarifaiFace.bottom_row * height), 
		}
	}
	
	displayFaceBox = (box) => {
		  console.log(box);
		this.setState({box: box});
	}
	
	
	onInputChange = (event) => {
		console.log(event.target.value);
		this.setState({input: event.target.value});
	}
	
	onPictureSubmit = () => {
		this.setState({imageUrl: this.state.input});
	    fetch('https://pure-retreat-98314.herokuapp.com/imageurl', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						inputVal: this.state.input
					})		 
				}) .then(response => response.json())
		.then(response => { 
			//if we got a response, send data to server to run image endpoint
			if (response) {
				fetch('https://pure-retreat-98314.herokuapp.com/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})		 
				})
				 .then(response => response.json()) 
				 .then(count => {
					 //use Object.assign to change a single value of the object
					this.setState(Object.assign(this.state.user, { entries: count}))}
				 )
				 .catch(console.log);
			}
			
			this.displayFaceBox(this.calculateFaceLocation(response));
		})
		.catch(err => {
		  console.log(err);
		});
	}
	
	onRouteChange = ( newRoute) => {
		if ( newRoute === 'signin') {
			this.setState(initialState);
		} else if ( newRoute === 'home') {
			this.setState({isSignedIn: true});
		} 
		
		this.setState({route: newRoute});
	} 
	
  render() {
    return ( 
      <div className="App"> 
		<Particles className='particles'
				   params={particlesOptions} />
		
		<Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
		{ this.state.route === 'home'
			?  <div>
					<Logo />
					<Rank name={this.state.user.name} entries={this.state.user.entries} />
					<ImageLinkForm onInputChange={this.onInputChange} 
								   onPictureSubmit={this.onPictureSubmit} /> 
					<FaceRecognition imageUrl={this.state.imageUrl} 
									 box={this.state.box}
					 /> 
				</div>
			:	( this.state.route === 'register' 
				?  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
				:  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
			)
		}
      </div>
    );
  }
}

export default App;
