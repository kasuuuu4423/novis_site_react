import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useRef, useEffect, useState, useCallback } from 'react';
import styled, {css} from "styled-components";
import { Scrollbar, scrollDuration } from "../../Parts";
import { SnsLink, SnsType } from "../../SnsLink";
import { Link, animateScroll as Scroll } from "react-scroll";
import Colors from '../../../Cssvars/Colors';

type InstructorPersonProps = {
    id: number,
    name: string,
    imgPath: string,
    description: string,
    sns_x?: string,
    sns_instagram?: string,
    sns_youtube?: string,
    website?: string,
};

const Text = styled.p`
    white-space: pre-wrap;
`;

const INSTRUCTOR_SNS_LINKS: Array<{ type: SnsType; className: string; hrefKey: 'sns_x' | 'sns_instagram' | 'sns_youtube' | 'website' }> = [
    { type: 'x', className: 'x', hrefKey: 'sns_x' },
    { type: 'instagram', className: 'instagram', hrefKey: 'sns_instagram' },
    { type: 'youtube', className: 'youtube', hrefKey: 'sns_youtube' },
    { type: 'website', className: 'website', hrefKey: 'website' },
];

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
                        {INSTRUCTOR_SNS_LINKS.map(({ type, className, hrefKey }) => {
                            const href = props[hrefKey];
                            if (!href) return null;
                            return (
                                <div key={type} className={className}>
                                    <div className="empty"></div>
                                    <SnsLink type={type} href={href} showLabel />
                                </div>
                            );
                        })}
                        <div style={{color: Colors.BLUE, textAlign: 'right',}}><Link smooth="easeInOutQuint" duration={scrollDuration} offset={-50} style={{cursor: "pointer"}} to={"plan_"+props.name}>{props.name}のレッスンコース→</Link></div>
                </div>
            </div>
        </div>
    );
}

export default InstructorPerson;