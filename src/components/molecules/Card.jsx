/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './card.css'; // 後でスタイルを定義します

export const Card = (props) => {
    const { nowPlayer } = props;
    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        opacity: flipped ? 0 : 1,
    });

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="card-container" onClick={handleClick}>
            <animated.div className="card" style={{ transform }}>
                <div className="card-front">
                    <animated.div className="click-text" style={{ opacity }}>
                        Click!
                    </animated.div>
                </div>
                <div className="card-back">
                    <img src={nowPlayer.isJinroh ? "/images/card-jinroh.png" : "/images/card-citizen.png"} alt="Card Back" />
                </div>
            </animated.div>
        </div>
    );
};

export default Card;
