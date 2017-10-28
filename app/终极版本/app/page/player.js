import React from 'react'
import Progress from '../components/progress'
import './player.less'
import {Link} from 'react-router'
import Pubsub from 'pubsub-js'
let duration=null;
let Player=React.createClass(
{
	getInitialState()
	{
		 	return  {progress:0,volume:0,isPLay:true,leftTime:''}
	},
	 resolve_Bar_click(progress)
    {
    		$("#player").jPlayer('play',duration*progress);
    },
	change_volume(progress)
	{
			$("#player").jPlayer('volume',progress);
	},
	playNext()
	{
		Pubsub.publish('PLAY_NEXT');
	},
	playPrev()
	{
		Pubsub.publish('PLAY_PRE');
	},
	formatTime(time)
	{
		let minute=Math.floor(time/60);
		let second=Math.floor(time%60);
		second=second<10? `0${second}`:second;
		return `${minute}:${second}`;
	},
	play()
	{
		if(this.state.isPLay)
		{
			$("#player").jPlayer('pause');
		}
		else
		{
			$("#player").jPlayer('play');
		}
		this.setState({
			isPLay:!this.state.isPLay
		});
	},
   	componentDidMount()
	{
    $("#player").bind($.jPlayer.event.timeupdate,(e)=>
		{
			duration=e.jPlayer.status.duration;
		     this.setState({
		     	volume:e.jPlayer.options.volume*100,
		     	progress:e.jPlayer.status.currentPercentAbsolute,
		        leftTime:duration*(1-e.jPlayer.status.currentPercentAbsolute/100)});
		});
	},
	render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title" >{this.props.currentMusitItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusitItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.formatTime(this.state.leftTime)}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					              <Progress progress={this.state.volume} back={this.change_volume} backg={'#0000ff'}>
					              </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px',marginTop:5}}>
			              <Progress  progress={this.state.progress} back={this.resolve_Bar_click} backg={'#ff0000'}>
			              </Progress>
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.playPrev}></i>
	                			<i className={`icon ml20 ${this.state.isPLay? 'pause':'play'}`} onClick={this.play}></i>
	                			<i className="icon next ml20" onClick={this.playNext}></i>
                			</div>
                			<div className="-col-auto">
                				<i className="icon repeat-cycle"></i>
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img src={this.props.currentMusitItem.cover} alt={this.props.currentMusitItem.title}/>
                	</div>
                </div>
            </div>
        );
    }
});

export default Player;