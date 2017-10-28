import React from 'react'
import MusciListItem from '../components/musicListItem'
let MusicList=React.createClass({
	render()
	{
		let listEle=null;
		listEle=this.props.musicList.map((item) => 
		{
			return (<MusciListItem 
				focus={item===this.props.currentMusitItem}
				key={item.id} 
				musicListItem={item}
				>
				{item.title}
				</MusciListItem>)
		});
		return(<ul>{listEle}</ul>);
	}
});
export default MusicList;