import React from 'react'; 

import Tilt from 'react-tilt';
import './Logo.css'
import brain from './intellectual.png';

const Logo = () => {
	 return (
	 <div className='ma4 mt0'>
		<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
		 <div className="Tilt-inner">
			<img style={{paddingTop: '5px'}} 
				 alt='logo' src={brain} /></div>
		</Tilt>
		<div>Icons made by <a href="https://www.flaticon.com/authors/geotatah" title="geotatah">geotatah</a> from <a href="https://www.flaticon.com/" 		    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 		    title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
	 </div>
	);
}

export default Logo;