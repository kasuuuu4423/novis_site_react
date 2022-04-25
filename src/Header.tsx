import * as React from 'react';
import Colors from './Cssvars/Colors';
import styled, {css} from "styled-components";
import Hamburger from "./Components/Header/Hamburger";
import Nav from "./Components/Header/Nav";
import ScrollPosition from "./Components/Header/ScrollPosition";

type HeaderElmProps = {
    isOpen: boolean,
};

const HeaderElm = styled.header<HeaderElmProps>`
    position: fixed;
    display: flex;
    top: 35px;
    padding: 0 20px;
    width: 100%;
    z-index: 100;
`;


type HeaderProps = {
    inViews: Array<any>,
};
type HeaderState = {
    isOpen: boolean,
};

class Header extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps){
        super(props);

        this.state = {
            isOpen: false,
        }
    }

    hamOnClick = () =>{
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render(){
        return(
            <HeaderElm className="header" isOpen={this.state.isOpen}>
                <Hamburger isOpen={this.state.isOpen} onClick={this.hamOnClick}/>
                <Nav onClick={this.hamOnClick} isOpen={this.state.isOpen}/>
                <ScrollPosition inViews={this.props.inViews}/>
            </HeaderElm>
        );
    }
}

export default Header;