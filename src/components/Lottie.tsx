import React from 'react';
import LoaderDate from '../static/lottie/9921-loader.json';
import { useLottie, LottieOptions } from "lottie-react";

interface LottieProps{
    width: number;
    height: number;
}
function Lottie({ width, height }: LottieProps){
    const lottieOptions: LottieOptions = {
        animationData: JSON.parse(JSON.stringify(LoaderDate)),
        loop: true,
        autoplay: true,
        style: {width, height}
    };

    const { View } = useLottie(lottieOptions);

    return View;
}

export default Lottie;