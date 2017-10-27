import React from 'react'
import './progress.less'
let Progress=React.createClass
({
	changeProgress(e)//处理进度条的点击事件
	{
		let progressBar=this.refs.progressBar;
		let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
		//console.log(progress);
		if(this.props.back&&this.props.back(progress))
		{
			this.props.back(progress);
		}
	},
render:function(){
	return (<div className="components_progress" onClick={this.changeProgress} ref="progressBar">
		<div className="progress" style={{width:`${this.props.progress}%`}}></div>
      </div>);
}	
})
export default Progress; 