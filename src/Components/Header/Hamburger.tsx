import * as React from 'react';
import Colors from '../../Cssvars/Colors';
import styled, {css} from "styled-components";

type HamElmProps = {
    isOpen: boolean,
};

const HamElm = styled.div<HamElmProps>`
    &.hamburger{
        position: fixed;
        width: 40px;
        height: 30px;
        z-index: 100;
        right: 30px;
        top: 30px;
        cursor: pointer;
        .lines{
            height: 100%;
            position: relative;
            .line{
                width: 100%;
                height: 2px;
                background-color: ${Colors.WHITE};
                transform: translateY(-50%);
                position: absolute;
                transition: .2s;
                &:nth-child(1){
                    top: 0;
                }
                &:nth-child(2){
                    top: 50%;
                }
                &:nth-child(3){
                    top: 100%;
                }
                ${props => props.isOpen ? css`
                    background-color: ${Colors.BLACK};
                    &:nth-child(1){
                    top: 50%;
                        transform: rotate(45deg);
                    }
                    &:nth-child(2){
                        opacity: 0;
                    }
                    &:nth-child(3){
                    top: 50%;
                        transform: rotate(-45deg);
                    }
                `:''}
            }
        }
    }
`;


type HamProps = {
    isOpen: boolean,
    onClick: ()=>void,
};
type HamState = {
};

class Hamburger extends React.Component<HamProps, HamState>{
    constructor(props: HamProps){
        super(props);
    }

    render(){
        return(
            <HamElm isOpen={this.props.isOpen} onClick={()=>this.props.onClick()} id="hamburger" className="hamburger">
                <div className="lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </HamElm>
        );
    }
}

export default Hamburger;