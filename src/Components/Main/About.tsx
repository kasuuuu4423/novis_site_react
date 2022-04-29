import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import { SectionHeader } from "../Parts";
import { replaceAllReturns } from "../../Modules/functions";

type AboutProps = {
    inViews: Array<any>,
    text: string,
};
type AboutState = {};

const Section = styled.section`
    p{
        white-space: pre-wrap;
    }
`;

class About extends React.Component<AboutProps, AboutState>{
    constructor(props: AboutProps){
        super(props);

        this.state = {
        };
    }

    render(){
        const text = this.props.text ? replaceAllReturns(this.props.text):"";
        return (
            <Section ref={this.props.inViews[0]} className="about flex-align-center flex-wrap flex-justify-center">
                <SectionHeader  name="About" sub="Novisとは" imgPath="./img/about_h.png"/>
                <p className="text-center w-100">
                    {text}
                </p>
            </Section>
        );
    }
}

export default About;