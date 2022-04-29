import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

export const scrollDuration = 1200;

type SectionHeaderProps = {
    name: string,
    sub: string,
    imgPath: string,
};
export const SectionHeader: React.FC<SectionHeaderProps> = (props) =>{
    //console.log(props.ref);
    return(
        <h2 className="h2 mb-3 text-center"><img id={props.name} src={props.imgPath} alt={props.name}/>
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