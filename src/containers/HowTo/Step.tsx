import React from 'react';

interface IStepProps{
    text: string;
    index: number;
}

function Step({ text, index }: IStepProps){
    return(
        <div className = "how-to-step-root">
            <div className = 'how-to-step-number'>
                <p>{index}</p>
            </div>
            <p className = "how-it-work-text">{text}</p>
        </div>
    )
}

export default Step;