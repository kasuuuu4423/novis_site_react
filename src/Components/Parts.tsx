import * as React from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import styled, {keyframes} from 'styled-components';
import Colors from '../Cssvars/Colors';
import { HeadingRefContext } from '../main';

export const scrollDuration = 1200;

type SectionHeaderProps = {
    name: string,
    sub: string,
    imgPath: string,
};
export const SectionHeader: React.FC<SectionHeaderProps> = (props) =>{
    const refContext = useContext(HeadingRefContext);

    return(
        <h2 ref={refContext[props.name]} className="h2 mb-3 text-center"><img id={props.name} src={props.imgPath} alt={props.name}/>
            <div className="font-s">{props.sub}</div>
        </h2>
    );
}

type ScrollbarProps = {
    boxHeight: number,
    textHeight: number,
    scrollThumbTop: number,
    top: number,
    left: number,
    id: number,
}
export const Scrollbar: React.FC<ScrollbarProps> = (props) =>{
    let thumbHeight = props.boxHeight * props.boxHeight / props.textHeight;
    let isShow = true;
    if(thumbHeight > props.boxHeight){
        thumbHeight = props.boxHeight;
        isShow = false;
    }

    return(
        <div className={isShow?"scrollbar":"scrollbar d-none"} style={{height: props.boxHeight + "px", top: props.top + "px", left: props.left + "px"}} id={"scrollbar_"+props.id}>
            <div className="relative h-100 w-100">
                <div style={{height: thumbHeight + "px", top: props.scrollThumbTop*100 + "%"}} className="thumb"></div>
            </div>
        </div>
    );
}

const animLoading = keyframes`
    from{
        transform: scale(0%);
    }
    to{
        transform: scale(120%);
    }
`;

export const Loading = styled.div`
    transform: scale(0%);
    width: 30px;
    height: 30px;
    background: ${Colors.BLUE};
    border-radius: 100%;
    margin: auto;
    animation: ${animLoading} .7s infinite -.7s cubic-bezier(0.76, 0, 0, 1.01) alternate;
`;

type WhiteProps = {
    isTransparent: boolean,
};
type _WhiteProps = {
    isTransparent: boolean,
    isHidden: boolean,
};
export const White: React.FC<WhiteProps> = (props) =>{
    const [isHidden, setIsHidden] = useState(false);
    useEffect(()=>{
        if(props.isTransparent){
            setTimeout(()=>{
                setIsHidden(true);
            }, 500);
        }
    }, [props.isTransparent]);

    return(
        <_White isHidden={isHidden} isTransparent={props.isTransparent}/>
    );
}
export const _White = styled.div<_WhiteProps>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${Colors.WHITE};
    transition: .5s;
    ${props=>props.isTransparent?`
        opacity: 0;
    `:""}
    ${props=>props.isHidden?`
        display: none;
    `:""}
`;