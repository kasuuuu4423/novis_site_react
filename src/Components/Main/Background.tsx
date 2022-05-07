import * as React from 'react';
import { useEffect, useRef, useState, Suspense, useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import { map } from "../../Modules/functions";
import { HeadingPositionContext } from '../../main';
import Colors from '../../Cssvars/Colors';
import Konva from 'konva';
import { Layer, Stage, Rect, Image } from 'react-konva';


type ParticleProps = {
    position: [number, number],
    opacity: number,
    id: number,
    headingPosition: number,
};
type ParticleState = {
    offsetY: number,
    sin: number,
};

const Particle: React.FC<ParticleProps> = (props) =>{
    const particleImage: HTMLImageElement = document.createElement('img');
    particleImage.src = 'img/particle.png';
    const offsetDefault = Math.random()*100 * (Math.random()*100 > 5 ? 1 : -1);
    const imageRef = useRef(null);

    const [offsetY, setOffsetY] = useState(offsetDefault);
    const [posY, setPosY] = useState(0);
    const [sin, setSin] = useState(0);
    const [now, setNow] = useState(0);
    const [sizeCoeff, setSizeCoeff] = useState(Math.random() + 1);
    const [centering, setCentering] = useState(0);
    const [diff, setDiff] = useState(0);
    const [colorFilter, setColorFilter] = useState(0);
    //console.log(offsetY);

    const updateFrame = () =>{
        if(sin < 3.14*2){
            setSin(sin + offsetDefault/1000);
            setOffsetY(Math.sin(sin)*10)
        }
        else{
            setSin(0);
            setOffsetY(Math.sin(sin)*10);
        }
        
        setDiff(Math.abs(now - props.headingPosition));
        if(now < props.headingPosition){
            setNow(now + 0.02 * diff);
        }
        else if(now > props.headingPosition){
            setNow(now - 0.02 * diff);
        }
        setColorFilter(255 * (diff<100?diff:100) * 0.01);
        setPosY(
            props.id == 1 ? 
                now + offsetY :
                props.position[1] + offsetY
        );
    }


    const updateFrameRef = useRef<() => void>(updateFrame);
    useEffect(() => {
        updateFrameRef.current = updateFrame; // 新しいcallbackをrefに格納！
    }, [updateFrame]);

    useEffect(()=>{
        if(imageRef.current){
            setCentering(imageRef.current.width()/2);
        }
        const update = () =>{updateFrameRef.current()}
        const id = setInterval(update, 33);
        return()=>{
            clearInterval(id);
        }
    }, []);
    
    useEffect(() => {
        if (particleImage) {
            imageRef.current.cache();
        }
    }, [particleImage]);

    return (
        <Image ref={imageRef} filters={[Konva.Filters.RGB]} green={255} blue={props.id==1?colorFilter:255} red={150} opacity={props.opacity} x={props.position[0]-centering} y={posY-centering} width={150*sizeCoeff*(props.id==1?map(colorFilter, 0, 255, 1.5, 1):1)} height={150*sizeCoeff*(props.id==1?map(colorFilter, 0, 255, 1.5, 1):1)} image={particleImage}/>
    );
}

const Wrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
`;

const Background: React.FC = () =>{
    const [windowSize, setWindowSize] = useState({w: 0, h: 0});
    const particleImage: HTMLImageElement = document.createElement('img');
    particleImage.src = 'img/particle.png';
    const headingPosition = useContext(HeadingPositionContext);
    
    let positions: Array<[number, number]> = [
        [windowSize.w*0.15, windowSize.h*0.5],
        [windowSize.w*0.4, windowSize.h*0.5],
        [windowSize.w*0.85, windowSize.h*0.8],
    ];

    const [opacity, setOpacity] = useState(0);
    const isScroll = useCallback(()=>{
        const scroll = window.pageYOffset;
        setOpacity(scroll/1000 > 1 ? 1 : scroll/1000);
    }, []);

    useEffect(()=>{
        const o = [];
        for(let i = 0; i < positions.length; i++){
            o.push([0, Math.random(), 0]);
        }
        window.addEventListener('scroll', isScroll, {passive: true});
        return(()=>{
            window.removeEventListener('scroll', isScroll);
        });
    }, []);

    useEffect(()=>{
        setWindowSize({
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight,
        });

        window.addEventListener('resize', ()=>{
            setWindowSize({
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight,
            });
        });
    }, []);

    return(
        <Wrap>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Rect fill={Colors.BLACK} x={0} y={0} width={windowSize.w} height={windowSize.h}/>
                    {positions.map(((pos, i)=><Particle headingPosition={headingPosition} opacity={opacity} key={i} id={i} position={pos}/>))}
                </Layer>
            </Stage>    
        </Wrap>
    );
}

export default Background;