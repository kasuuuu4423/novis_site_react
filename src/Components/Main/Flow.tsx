import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import Colors from '../../Cssvars/Colors';
import { SectionHeader } from "../Parts";
import { Link, animateScroll as Scroll } from "react-scroll";

const FlowSection = styled.div`
    background: ${Colors.DARKGRAY};
    width: 70%;
    max-width: 400px;
    padding: 5px;
    border-radius: 20rem;
    margin: auto;
    text-align: center;
    margin-bottom: 20px;
`;

type FlowProps = {
    inViews: Array<any>,
};
type FlowState = {};

const Section = styled.section`

`;

class Flow extends React.Component<FlowProps, FlowState>{
    flows = [
        <Link style={{cursor:"pointer", color: Colors.BLUE}} smooth="easeInOutQuint" duration={800} offset={-50} to="Contact">コンタクトフォームから申し込み</Link>,
        "運営からメールにて返信",
        "日程の調整&決定",
        "料金の振り込み",
        "当日にレッスン",
    ];

    constructor(props: FlowProps){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <Section ref={this.props.inViews[0]} className="Flow">
                <SectionHeader name="Flow" sub="流れ" imgPath="./img/flow_h.png"/>
                <div className="wrap_flowSection">
                    {this.flows.map((flow,i)=><FlowSection key={i}>{flow}</FlowSection>)}
                </div>
            </Section>
        );
    }
}

export default Flow;