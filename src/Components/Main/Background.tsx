import * as React from 'react';
import { useEffect, useRef, useState, useContext, useCallback } from 'react';
import styled from '@emotion/styled';
import { map, getWindowSize } from "../../Modules/functions";
import { HeadingPositionContext } from '../../main';
import Colors from '../../Cssvars/Colors';
import Konva from 'konva';
import { Layer, Stage, Rect, Image } from 'react-konva';

const PARTICLE_IMAGE_SRC = '/img/particle.png';

function createFallbackParticleImage(): HTMLImageElement {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
    }
    const img = document.createElement('img');
    img.src = canvas.toDataURL();
    return img;
}

function loadParticleImage(): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = document.createElement('img');
        img.onload = () => resolve(img);
        img.onerror = () => resolve(createFallbackParticleImage());
        img.src = PARTICLE_IMAGE_SRC;
    });
}

type ParticleProps = {
    position: [number, number],
    opacity: number,
    id: number,
    headingPosition: number,
    layerRef: React.MutableRefObject<any>,
    particleImage: HTMLImageElement,
};

const Particle: React.FC<ParticleProps> = (props) =>{
    const offsetDefault = Math.random() * (Math.random() > .5 ? 1 : -1);
    const imageRef = useRef(null);

    const [sizeCoeff, setSizeCoeff] = useState(Math.random() + 1);
    const [centering, setCentering] = useState(0);
    const [colorFilter, setColorFilter] = useState(0);

    const onUpdateFrame = (frame) =>{
        if (!imageRef.current) return;
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

    useEffect(() => {
        updateFrameRef.current = onUpdateFrame;
    }, [props.headingPosition]);

    useEffect(()=>{
        if (!props.layerRef.current) return;
        const anim = new Konva.Animation((frame) => updateFrameRef.current(frame), props.layerRef.current);
        anim.start();
        return () => {
            anim.stop();
        };
    }, [props.layerRef, props.particleImage]);

    useEffect(()=>{
        if(imageRef.current){
            setCentering(imageRef.current.width()/2);
        }
    }, [props.particleImage]);

    return (
        <Image ref={imageRef} offset={{x: 0, y: centering}} filters={[Konva.Filters.RGB]} green={255} blue={props.id==1?colorFilter:255} red={150} opacity={props.opacity} x={props.position[0]-centering} y={props.position[1]-centering} width={150*sizeCoeff*(props.id==1?map(colorFilter, 0, 255, 1.5, 1):1)} height={150*sizeCoeff*(props.id==1?map(colorFilter, 0, 255, 1.5, 1):1)} image={props.particleImage}/>
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
    const [particleImage, setParticleImage] = useState<HTMLImageElement | null>(null);
    const headingPosition = useContext(HeadingPositionContext);
    const layerRef = useRef(null);
    
    let positions: Array<[number, number]> = [
        [windowSize.w*0.1, windowSize.h*0.5],
        [windowSize.w*0.4, windowSize.h*0.5],
        [windowSize.w*0.9, windowSize.h*0.8],
    ];

    const [opacity, setOpacity] = useState(0);
    const isScroll = useCallback(()=>{
        const scroll = window.pageYOffset;
        setOpacity(scroll/3000 > 1 ? 1 : scroll/3000);
    }, []);

    useEffect(()=>{
        let cancelled = false;
        loadParticleImage().then((img) => {
            if (!cancelled) setParticleImage(img);
        });
        return () => { cancelled = true; };
    }, []);

    useEffect(()=>{
        window.addEventListener('scroll', isScroll, {passive: true});
        return(()=>{
            window.removeEventListener('scroll', isScroll);
        });
    }, [isScroll]);

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
                    {particleImage && positions.map(((pos, i)=><Particle layerRef={layerRef} headingPosition={headingPosition} opacity={opacity} key={i} id={i} position={pos} particleImage={particleImage}/>))}
                </Layer>
            </Stage>    
        </Wrap>
    );
}

export default Background;
