import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'

const MusicPlayer = (props) => {
    const [songPlaying, setSongPlaying] = useState(true);
    console.log('reactMusicPlayer PROPS', props);
    const song = props.song;
    const songId = props.songId;
    const _propsSwapPlaying = () => {
        return setSongPlaying(props.isMusicPlaying)
    };
    useEffect(() => {
        _propsSwapPlaying()
    })
    // render music player
    return (
        <div className='player-wrapper' style={{ backgroundImage: `https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/36/85/8c/36858c09-446b-10dc-06ff-01517697696c/697691883991.jpg/200x200bb.png` }}>
            <ReactPlayer
                className='react-player'
                key="id18"
                url="https://itunes.apple.com/us/genre/id18"
                playing={songPlaying}
                controls={true}
                light={true}
                width='100%'
                height='20%'
                onReady={() => _propsSwapPlaying()}
            />
        </div>
    );

}
export default MusicPlayer;