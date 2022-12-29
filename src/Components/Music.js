import React, { useState, useEffect } from 'react';

const MusicAlbums = (props) => {
    const { songs } = props;
    const [selectedSong, setSelectedSong] = useState(0);
    const _propsSetSelectedSong = () => {
        return setSelectedSong(props.activeSongId);
    };
    useEffect(() => {
        _propsSetSelectedSong()
    })

    let musicComponent = <div className="list">
            {songs.map((song, index) => {
                return (
                    <div className={selectedSong === index ? "song-card selected" : "song-card"} key={index}>
                        <div className="left">
                            <img alt="song-poster" src="https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/be/82/fe/be82fe07-f5e6-8f26-651e-664bb1ba2b99/194690422300_cover.jpg/200x200bb.png" />
                        </div>
                        <div className="right">
                            <div className="song-singer"><b>Singer:</b> Young Dolph</div>
                            <div className="song-title">Title: Rich Slave (Deluxe)</div>
                        </div>
                    </div>
                )
            })}
        </div>
    
    return (musicComponent);
}

export default MusicAlbums;