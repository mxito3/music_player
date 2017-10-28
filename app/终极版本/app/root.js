require("react-hot-loader/patch");
import React from 'react';
import Header from './components/header';
import Player from './page/player';
import { MUSIC_LIST } from './config/music_list' 
import MusicList from './page/musicList'
import {Router,IndexRoute,Link,Route,hashHistory} from 'react-router' 
import Pubsub from 'pubsub-js'
let App=React.createClass({
	getInitialState()
	{
		return {currentMusitItem:MUSIC_LIST[0],musicList:MUSIC_LIST}
	},
		play_music(musicItem)
	{
			$("#player").jPlayer('setMedia',{mp3:musicItem.file}).jPlayer('play');
			this.setState({
				currentMusitItem:musicItem
			});
	},
	findMusicItemindex(MusicItem)
	{
		return this.state.musicList.indexOf(MusicItem);
	},
	play_next(type)
	{
		let index=this.findMusicItemindex(this.state.currentMusitItem);
		let len=this.state.musicList.length;
		if(type=='next')
		{
		    index=(index+1)%len;
		}
		else
		{
			index=(index-1+len)%len;
		}
		this.play_music(this.state.musicList[index]);
	},

	componentDidMount()
	{
			
			$("#player").jPlayer
			                   ({
			supplied:'mp3',
			smoothPlayBar: true,
			wmode:'window'
		                       });
		    this.play_music(this.state.currentMusitItem);
		    $('#player').bind($.jPlayer.event.ended,(e)=>{
		    	this.play_next('next');
		    });
		    Pubsub.subscribe('DELETE_MUSIC',(msg,MusicItem)=>
		    {
		    	console.log("需要删除："+MusicItem.title);
		    	this.setState({musicList:this.state.musicList.filter(item =>{
		    		return item!==MusicItem;
		    	})})
		    });
		    Pubsub.subscribe('PLAY_MUSIC',(msg,MusicItem)=>{
		    	console.log("需要播放："+MusicItem.title);
		    		this.play_music(MusicItem);
		    });
		    Pubsub.subscribe('PLAY_NEXT',(msg,MusicItem)=>{
	
		    		this.play_next('next');
		    });
		    	   Pubsub.subscribe('PLAY_PRE',(msg,MusicItem)=>{
	
		    		this.play_next('PREV');
		    });

	},
	componentWillUnMount()
	{
		Pubsub.unsubscribe('DELETE_MUSIC');
		Pubsub.unsubscribe('PLAY_MUSIC');
		//Pubsub.unsubscribe('PLAY_NEXT');
		//Pubsub.unsubscribe('PLAY_PRE');
	},
	render()
	{
		return (
			<div>
			<Header/>
			{React.cloneElement(this.props.children,this.state)}
			</div>
		);
	}
});


let Root=React.createClass({
	render()
	{
		return(
				<Router history={hashHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Player}></IndexRoute>
						<Route path="/list" component={MusicList}></Route>
					</Route>
				</Router>
			);
	}
});
export default Root;