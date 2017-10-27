import React from 'react'
import './progress.less'
let Progress=React.createClass
({
render:function(){
	return (<div className="components_progress row">{ this.props.progress }s{/*规定传过来的东西叫做progress*/}</div>);
}	
})
export default Progress;