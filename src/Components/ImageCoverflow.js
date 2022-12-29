import React, { useState, useEffect } from 'react';
import Coverflow from "react-coverflow";

const ImageCoverflow = (props) => {
    const [active, setActive] = useState(-1);
    const albums = props.albums;
    const _propsSetActive = () => {
        return setActive(props.active)
    };
    useEffect(() => {
        _propsSetActive()
    })
    
    return (
        <div className="wrapper">
            <div className="wrapper-inner">
                <Coverflow
                    displayQuantityOfSide={1}
                    height={140}
                    width={270}
                    infiniteScroll
                    active={active}
                    startPosition={active}
                    enableHeading={false}
                    enableScroll={false}
                    clickable={true}
                    currentFigureScale={1.5}
                    otherFigureScale={1.2}
                >
                    {
                        albums.map((album, i) => {
                            return (
                                <img key={i} src="https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/36/85/8c/36858c09-446b-10dc-06ff-01517697696c/697691883991.jpg/200x200bb.png" alt={i} data-action="album" />
                            )
                        })
                    }
                </Coverflow>
            </div>
            <div className="title-heading">
                {albums[props.active] && albums[props.active].albumName.substring(0, 20)}
            </div>
        </div>
    );
}

export default ImageCoverflow;