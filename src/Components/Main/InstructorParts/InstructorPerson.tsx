import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import styled, {css} from "styled-components";
import { Scrollbar, scrollDuration } from "../../Parts";
import { Link, animateScroll as Scroll } from "react-scroll";
import Colors from '../../../Cssvars/Colors';

type InstructorPersonProps = {
    id: number,
    name: string,
    imgPath: string,
    description: string,
    twitterId: string,
    instagramId: string,
    youtube: string,
    websiteUrl: string,
};

const Text = styled.p`
    white-space: pre-wrap;
`;

const InstructorPerson: React.FC<InstructorPersonProps> = (props) =>{
    const [descHeight, setDescHeight] = useState(0);
    const [textHeight, setTextHeight] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollbarTop, setScrollbarTop] = useState(0);
    const [scrollbarLeft, setScrollbarLeft] = useState(0);

    const boxRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const isScroll = useCallback(()=>{
        if(boxRef.current && textRef.current){
            const scrollTop = boxRef?.current.scrollTop;
            const textHeight = textRef?.current.clientHeight;
            const ratio = scrollTop / textHeight;
            setScrollPosition(ratio);
        }
    }, []);

    const isResize = useCallback(()=>{
        if(boxRef.current && textRef.current){
            setDescHeight(boxRef?.current.clientHeight);
            setTextHeight(textRef?.current.clientHeight);

            setScrollbarTop(window.scrollY + boxRef.current.getBoundingClientRect().top)
            setScrollbarLeft(boxRef.current.getBoundingClientRect().right)
        }
    }, []);

    const isLoad = useCallback(()=>{
        setScrollbarTop(window.scrollY + boxRef.current.getBoundingClientRect().top);
        setScrollbarLeft(boxRef.current.getBoundingClientRect().right);
    }, []);

    useEffect(()=>{
        if(boxRef.current && textRef.current){
            setDescHeight(boxRef?.current.clientHeight);
            setTextHeight(textRef?.current.clientHeight);
            isLoad();
            boxRef.current.addEventListener("scroll", isScroll, {passive: true});
            //window.addEventListener("load", isLoad);
            window.addEventListener("resize", isResize);
            return ()=>{
                boxRef.current.removeEventListener("scroll", isScroll);
                //window.removeEventListener("load", isLoad);
                window.removeEventListener("resize", isResize);
            }
        }
    }, [boxRef, textRef]);

    useEffect(()=>{
        if(imgRef.current) imgRef.current.addEventListener("load", isLoad);
        return()=>{
            if(imgRef.current) imgRef.current.removeEventListener("load", isLoad);
        }
    }, [imgRef]);

    return (
        <div className="instrctr grid-2column mb-5" id={"instructor_"+props.id}>
            <div className="grid-side mb-3 mb-md-0">
                <div className="side">
                <div className="text-rotate-90 font-xl font-weight-500">{props.name}</div>
                <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                </div>
                <img ref={imgRef} className="img-cover" src={props.imgPath} alt={props.name}/>
            </div>
            <div className="info">
                <div ref={boxRef} className="font-serif text-scroll h-p300 h-md-p500 mb-3">
                    <Text ref={textRef} className="text"><span className="bg-gray">{props.description}</span></Text>
                </div>
                <Scrollbar id={props.id} top={scrollbarTop} left={scrollbarLeft} scrollThumbTop={scrollPosition} boxHeight={descHeight} textHeight={textHeight}/>
                <div className="sns">
                        {props.twitterId?<div className="twitter">
                            <div className="empty"></div>
                            <a target="_blank" rel="noopener noreferrer" href={"https://twitter.com/"+props.twitterId}>
                                <div className="mb-1 icon-text flex-align-center"><i className="icon-circle mr-1 fa-brands fa-twitter"></i><span>Twitter</span></div>
                            </a>
                        </div>:""}
                        {props.instagramId?<div className="instagram">
                            <div className="empty"></div>
                            <a target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/"+props.instagramId}>
                                <div className="mb-1 icon-text flex-align-center"><i className="icon-circle mr-1 fa-brands fa-instagram"></i><span>Instagram</span></div>
                            </a>
                        </div>:""}
                        {props.youtube?<div className="youtube">
                            <div className="empty"></div>
                            <a target="_blank" rel="noopener noreferrer" href={props.youtube}>
                                <div className="mb-1 icon-text flex-align-center"><i className="icon-circle mr-1 fa-brands fa-youtube"></i><span>YouTube</span></div>
                            </a>
                        </div>:""}
                        {props.websiteUrl?<div className="website">
                            <div className="empty"></div>
                            <a target="_blank" rel="noopener noreferrer" href={props.websiteUrl}>
                                <div className="mb-1 icon-text flex-align-center"><i className="icon-circle mr-1 fa-solid fa-globe"></i><span>Website</span></div>
                            </a>
                        </div>:""}
                        <div style={{color: Colors.BLUE, textAlign: 'right',}}><Link smooth="easeInOutQuint" duration={scrollDuration} offset={-50} style={{cursor: "pointer"}} to={"plan_"+props.name}>{props.name}のレッスンコース→</Link></div>
                </div>
            </div>
        </div>
    );
}

export default InstructorPerson;