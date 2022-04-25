import * as React from 'react';
import Colors from '../../Cssvars/Colors';
import styled, {css} from "styled-components";
import Mixin from "../../Cssvars/Mixin";
import FontSize from '../../Cssvars/FontSize';
import { Link, animateScroll as Scroll } from "react-scroll";
import { scrollDuration } from "../Parts";

type NavElmProps = {
    isOpen: boolean,
};

const NavElm = styled.nav<NavElmProps>`
    z-index: 99;
    position: fixed;
    height: 100vh;
    top: 0;
    right: 0;
    background-position: center right;
    color: ${Colors.BLACK};
    max-width: 250px;
    width: 50%;
    display: flex;
    align-items: center;
    transform: translateX(150%);
    transition: .5s cubic-bezier(0, 0.7, 0.34, 1);
    .bg{
        position: absolute;
        top: 50%;
        right: -1%;
        transform: translateY(-50%);
        z-index: -1;
        width: 140%;
        height: 100%;
        opacity: 0;
        transition: .8s;
    }
    ul{
        display: flex;
        align-content: space-around;
        flex-wrap: wrap;
        max-height: 500px;
        height: 70%;
        li{
            width: 100%;
            font-size: ${FontSize.lm};
            font-weight: 300;
            img{
                width: 80%;
            }
        }
    }
    ${props => props.isOpen?css`
        transform: none;
        .bg{
            opacity: 1;
        }
    `:''}
`;

type NavItemProps = {
    name: string,
    onClick: ()=>void,
};

const NavItem: React.FC<NavItemProps> = (props) =>{
    return(
        <li className="ml-1"><span style={{cursor:"pointer"}}>
            <Link onClick={props.onClick} smooth="easeInOutQuint" duration={scrollDuration} offset={-50} to={props.name}>{props.name}</Link>
        </span></li>
    );
}

type NavProps = {
    isOpen: boolean,
    onClick: ()=>void,
};
type NavState = {
};

class Nav extends React.Component<NavProps, NavState>{
    links = [
        "About",
        "Instructor",
        "Plan",
        "Flow",
        "Place",
        "Contact",
    ];

    constructor(props: NavProps){
        super(props);
    }

    toTOP = () =>{
        const options = {
            smooth: "easeInOutQuint",
            duration: scrollDuration,
            offset: -50.
        };
        Scroll.scrollToTop(options);
        this.props.onClick();
    }

    render(){
        return(
            <NavElm isOpen={this.props.isOpen}>
                <img src="./img/nav_bg.png" alt="" className="bg" />
                <ul>
                    <li className=""><a style={{cursor:"pointer"}} onClick={this.toTOP}><img src="./img/logo_black.png" alt="Novis"/></a></li>
                    {this.links.map((link)=><NavItem onClick={this.props.onClick} key={link} name={link} />)}
                </ul>
            </NavElm>
        );
    }
}

export default Nav;