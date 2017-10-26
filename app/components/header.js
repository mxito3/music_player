import React from 'react'
import './header.less'
let Header=React.createClass
({
render(){
	return (
	<div className="components_header row">
	<img src="static/images/logo.png" width="40px" alt="" className="-col-auto"/>
	<h1 className="caption">React Mus Player</h1>
	</div>
	);
}	
})
export default Header;