import * as React from 'react';
import { useEffect, useState, Suspense, useCallback } from 'react';
import styled from '@emotion/styled';
import { useTexture } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import {  TextureLoader } from 'three';
import { Vector3 } from 'three';
import { map } from "../../Modules/functions";


// const Circle = () => {
//     const tex = useLoader(TextureLoader, 'img/particle.png');
//     return (
//         <mesh>
//             <circleGeometry />
//             <meshStandardMaterial map={tex} transparent/>
//         </mesh>
//     );
// };

type ParticleProps = {
    position: [number, number, number],
    offsetDefault: [number, number, number],
    opacity: number,
    id: number,
};
const Particle: React.FC<ParticleProps> = (props) =>{
    const tex = useLoader(TextureLoader, 'img/particle.png');
    let [offset, setOffset] = useState([0,0,0]);
    let sin = props.offsetDefault[1] > 0.3 ? -1 : 1 * props.offsetDefault[1];
    const updatePosition = () =>{
        if(sin < 3.14*2){
            setOffset([0, Math.sin(sin), 0]);
            sin += props.offsetDefault[1]/150;
        }
        else{
            sin = 0;
            setOffset([0, Math.sin(sin), 0]);
        }
    }
    
    useEffect(()=>{
        setInterval(updatePosition, 10);
    }, []);

    const pos = new Vector3(props.position[0]+(offset[0]/10), props.position[1]+(offset[1]/3*props.offsetDefault[1]), props.position[2]+(offset[2]/10));
    return (
        <sprite position={pos} scale={new Vector3(3, 3, 1)}>
            <spriteMaterial opacity={props.opacity} attach='material' transparent map={tex} />
        </sprite>
    );
}

const Wrap = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
`;

type BackgroundProps = {};
const Background: React.FC<BackgroundProps> = (props) =>{
    const windowWidth = document.documentElement.clientWidth;
    let positions: Array<[number, number, number]> = [
        [2*map(windowWidth, 1, 2000, 0, 2), 1.5, 1.5],
        [1*map(windowWidth, 1, 2000, 0, 2), -1.5, -0.9],
        [-2*map(windowWidth, 1, 2000, 0, 2), 0, 1.2],
    ];
    const  [offsets, setOffset] = useState([]);
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
        setOffset(o);
        window.addEventListener('scroll', isScroll);
        return(()=>{
            window.removeEventListener('scroll', isScroll);
        });
    }, []);

    return(
        <Wrap>
            <Canvas>
                <color attach="background" args={[0,0,0]} />
                <ambientLight intensity={0.5} />
                {/* <directionalLight color="white" position={[0, 0, 5]} /> */}
                <Suspense fallback={null}>
                    {positions.map(((pos, i)=><Particle opacity={opacity} key={i} id={i} offsetDefault={offsets[i]} position={pos}/>))}
                </Suspense>
            </Canvas>
        </Wrap>
    );
}

export default Background;