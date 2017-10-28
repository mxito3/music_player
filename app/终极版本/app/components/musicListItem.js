import React from 'react'
import './musicListItem.less'
import Pubsub from 'pubsub-js'
let MusciListItem=React.createClass({
	
	playMusic(MusicItem)
	{
		Pubsub.publish('PLAY_MUSIC',MusicItem);
	},
	deleteMusic(MusicItem,e)
	{
		e.stopPropagation();
		//let ITem=item;
		Pubsub.publish('DELETE_MUSIC',MusicItem);
		console.log("点击了删除事件"+MusicItem.title);

	},
	render()
	{
		let MusicItem=this.props.musicListItem;
		return(<li onClick={this.playMusic.bind(this,MusicItem)}  className={`components-listitem row ${this.props.focus ? 'focus':' '}`}>
				<p><strong>{MusicItem.title}</strong> - {MusicItem.artist}</p>
				<p onClick={this.deleteMusic.bind(this,MusicItem)}   className="-col-auto delete"></p>
			</li>);
	}

});
export default MusciListItem;