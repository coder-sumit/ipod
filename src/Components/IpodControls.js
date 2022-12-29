import React from 'react';
import menu from '../assets/menu.svg';
import next_track from '../assets/next_track.svg';
import prev_track from '../assets/prev_track.svg';
import play_pause from '../assets/play_pause.svg';
const ipodControls = (props) => {
            return (
            <div id="circle" className="controls" onMouseDown={props.onRotate}>
                <img id="menu" className="menu" src={menu} alt="menu" onClick={props.onMenuClick} draggable="false"/>
                <img id="next" className="next" src={next_track} alt="next_track" onClick={props.onNextClick} draggable="false"/>
                <img id="prev" className="previous" src={prev_track} alt="previous track" onClick={props.onPrevClick} draggable="false"/>
                <img id="play" className="play" src={play_pause} alt="play pause" onClick={props.onPlayPauseClick} draggable="false"/>
                <div id="center-btn" className="centerButton" onClick={props.onCenterBtnClick}></div>
            </div>
        )
    
}

export default ipodControls;