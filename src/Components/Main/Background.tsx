import * as React from 'react';
import { useEffect, useRef, useState, Suspense, useCallback, useContext } from 'react';
import styled from '@emotion/styled';
import { map } from "../../Modules/functions";
import { HeadingPositionContext } from '../../main';
import Colors from '../../Cssvars/Colors';
import Konva from 'konva';
import { Layer, Stage, Rect, Image } from 'react-konva';
import { isMobile } from 'react-device-detect';


type ParticleProps = {
    position: [number, number],
    opacity: number,
    id: number,
    headingPosition: number,
    layerRef: React.MutableRefObject<any>,
};

const Particle: React.FC<ParticleProps> = (props) =>{
    const particleImage: HTMLImageElement = document.createElement('img');
    particleImage.src = 'img/particle.png';
    const offsetDefault = Math.random() * (Math.random() > .5 ? 1 : -1);
    const imageRef = useRef(null);

    const [sizeCoeff, setSizeCoeff] = useState(Math.random() + 1);
    const [centering, setCentering] = useState(0);
    const [colorFilter, setColorFilter] = useState(0);

    const onUpdateFrame = (frame) =>{
        const now: number = imageRef.current.y();
        const move:number = Math.sin(frame.time/1000 + offsetDefault)/5;
        let posY = now;
        if(props.id == 1){
            const diff = Math.abs(now - props.headingPosition);
            setColorFilter(255 * (diff < 100 ? diff : 100) * 0.01);
            if(now < props.headingPosition){
                posY = now + 0.02 * diff;
            }
            else if(now > props.headingPosition){
                posY = now - 0.02 * diff;
            }
        }
        imageRef.current.y(posY + move);
    }

    const updateFrameRef = useRef<(frame) => void>(onUpdateFrame);

    let anim = new Konva.Animation(updateFrameRef.current, props.layerRef.current);

    useEffect(() => {
        updateFrameRef.current = onUpdateFrame;
    }, [props.headingPosition]);

    useEffect(()=>{
        anim.start();
        return()=>{
            anim.stop();
        }
    }, [updateFrameRef.current]);

    useEffect(()=>{
        if(imageRef.current){
            setCentering(imageRef.current.width()/2);
        }
    }, []);

    return (
        <Image ref={imageRef} offset={{x: 0, y: centering}} filters={[Konva.Filters.RGB]} green={255} blue={props.id==1?colorFilter:255} red={150} opacity={props.opacity} x={props.position[0]-centering} y={props.position[1]-centering} width={150*sizeCoeff*(props.id==1?map(colorFilter, 0, 255, 1.5, 1):1)} height={150*sizeCoeff*(props.id==1?map(colorFilter, 0, 255, 1.5, 1):1)} image={particleImage}/>
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
    const layerRef = useRef(null);
    
    let positions: Array<[number, number]> = [
        [windowSize.w*0.1, windowSize.h*0.5],
        [windowSize.w*0.4, windowSize.h*0.5],
        [windowSize.w*0.8, windowSize.h*0.8],
    ];

    const [opacity, setOpacity] = useState(0);
    const isScroll = useCallback(()=>{
        const scroll = window.pageYOffset;
        setOpacity(scroll/3000 > 1 ? 1 : scroll/3000);
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

    const getWindowSize = () =>{
        return {
            // w: window.innerWidth,
            // h: window.innerHeight,
            w: isMobile ? window.screen.width : document.documentElement.clientWidth,
            h: isMobile ? window.screen.height : document.documentElement.clientHeight,
        };
    }

    useEffect(()=>{
        setWindowSize(getWindowSize());

        window.addEventListener('resize', ()=>{
            setWindowSize(getWindowSize());
        });
    }, []);

    return(
        <Wrap>
            <Stage width={windowSize.w} height={windowSize.h}>
                <Layer  ref={layerRef}>
                    <Rect fill={Colors.BLACK} x={0} y={0} width={windowSize.w} height={windowSize.h}/>
                    {positions.map(((pos, i)=><Particle layerRef={layerRef} headingPosition={headingPosition} opacity={opacity} key={i} id={i} position={pos}/>))}
                </Layer>
            </Stage>    
        </Wrap>
    );
}

export default Background;