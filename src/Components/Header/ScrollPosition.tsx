import * as React from 'react';
import Colors from '../../Cssvars/Colors';
import styled, {css} from "styled-components";
import Mixin from "../../Cssvars/Mixin";
import FontSize from '../../Cssvars/FontSize';
import { Link, animateScroll as Scroll } from "react-scroll";

type ScrollPositionProps = {
    inViews: Array<any>,
};

const Wrap = styled.div`
    position: fixed;
    top: 30px;
    left: 0;
    width: 30px;
    .line{
        width: 100%;
        height: 2px;
        margin-bottom: 7px;
        background: ${Colors.WHITE};
        transition: .4s cubic-bezier(0.78,-0.01, 0.42, 1.39);
        &.active{
            height: 20px;
        }
    }
`;

const ScrollPosition: React.FC<ScrollPositionProps> = (props) =>{
    let lines: Array<JSX.Element> = [];
    for(let i = 0; i < props.inViews.length; i++){
        const isInView = props.inViews[i][1] ? "active" : "";
        lines.push(<div className={'line ' + isInView}></div>);
    }
    return(
        <Wrap>
            {lines}
        </Wrap>
    );
}


export default ScrollPosition;