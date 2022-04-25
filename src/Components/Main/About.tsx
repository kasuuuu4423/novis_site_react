import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import { SectionHeader } from "../Parts";

type AboutProps = {
    inViews: Array<any>,
};
type AboutState = {};

const Section = styled.section``;

class About extends React.Component<AboutProps, AboutState>{
    constructor(props: AboutProps){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <Section ref={this.props.inViews[0]} className="about flex-align-center flex-wrap flex-justify-center">
                <SectionHeader  name="About" sub="Novisとは" imgPath="./img/about_h.png"/>
                <p className="text-center w-100">
                    北海道札幌市を拠点とするヒューマンビートボックスレッスン。<br/>
                    日本トップクラスのビートボクサーが講師として所属している。<br/>
                    音楽的な技術のみならず、ヒューマンビートボックスとして重要な<br/>
                    「人間ならではの表現力」を養うことにも力を入れている。
                </p>
            </Section>
        );
    }
}

export default About;