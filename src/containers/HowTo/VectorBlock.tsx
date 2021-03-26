import React from 'react';
import VectopImg from '../../static/images/Vector.png';

interface IVectorBlock{
    title: string;
    text: string;
    img: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    }
}

function VectorBlock({ title, text, img }: IVectorBlock){
    return(
        <div className = 'how-to-vector-block-root'>
            <p className = "how-to-vector-block-title">{title}</p>
            <p className = "how-to-vector-block-text">{text}</p>
            <div className = "how-to-vector-img-wrap" style = {img}>
                <img alt = "" src = {VectopImg}/>
            </div>
        </div>
    )
}

export default VectorBlock;