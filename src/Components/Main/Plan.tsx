import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import Colors from '../../Cssvars/Colors';
import Mixin from '../../Cssvars/Mixin';
import { SectionHeader } from "../Parts";

type PlanProps = {
    inViews: Array<any>,
};
type PlanState = {};

const Section = styled.section``;

type CourseProps = {
    id?: string,
    name: string,
    comment?: string,
    singlePrice?: string,
    monthlyPrice?: string,
    prices?: Array<Array<string>>,
    isSmall?: boolean,
};
const Comment = styled.div`
    position: relative;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: pre-wrap;
    //word-break: keep-all;
    text-align: center;
    &::before, &::after{
        content: "";
        position: absolute;
        width: 10px;
        height: 100%;
        border-top: 1px solid ${Colors.WHITE};
        border-bottom: 1px solid ${Colors.WHITE};
    }
    &::before{
        left: 0;
        border-left: 1px solid ${Colors.WHITE};
    }
    &::after{
        right: 0;
        border-right: 1px solid ${Colors.WHITE};
    }
`;

const Price = styled.div<{isSmall: boolean}>`
    background: ${Colors.WHITE};
    color: ${Colors.BLACK};
    border-radius: 1rem;
    padding: ${props => props.isSmall?"2px 10px":"5px 10px"};
    width: 70%;
    text-align: center;
    margin-bottom: 10px;
    ${Mixin.media("md", "margin-bottom: 0px;")}
    ${Mixin.media("md", "width: 45%;")}
    ${Mixin.media("md", "max-width: 400px;")}
`;
const Head3 = styled.h3`
    background: ${Colors.DARKGRAY};
    padding: 5px;
    margin-bottom: 20px;
`;
const WrapPrice = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${Mixin.media("md", "justify-content: space-evenly;")}
`;

const Course: React.FC<CourseProps> = (props) =>{

    return(
        <div className="course font-serif">
            <Head3 id={"plan_"+props.id}>{props.name}</Head3>
            {props.comment?<Comment>{props.comment}</Comment>:""}
            <WrapPrice>
                {props.singlePrice?<Price isSmall={props.isSmall} key="single" className="single">単発1回¥{props.singlePrice}</Price>:""}
                {props.monthlyPrice?<Price isSmall={props.isSmall} key="monthly" className="monthly">1ヶ月（4回）¥{props.monthlyPrice}</Price>:""}
                {props.prices?props.prices.map((price, i)=><Price isSmall={props.isSmall} key={i} className={price[0]}>{price[1]}</Price>):""}
            </WrapPrice>
        </div>
    );
}

class Plan extends React.Component<PlanProps, PlanState>{
    constructor(props: PlanProps){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <Section ref={this.props.inViews[0]} className="Plan">
                <SectionHeader  name="Plan" sub="コース" imgPath="./img/plan_h.png"/>
                <Course key="TATSUAKI" id="TATSUAKI" name="TATSUAKI コース" singlePrice='8,000' monthlyPrice='30,000'
                    comment="生徒のやりたい事に寄り添い合い、自分らしさを引き出せるよう指導します。特に大会に勝ちたい人は是非僕のレッスンに来て下さい。
ビートボックスができるようになるだけでなく、そこで出来る仲間やコミュニティを大事にやっていきたい。"/>
                <div className="mb-4"></div>
                <Course key="YUTA" id="YUTA" name="YUTA コース" singlePrice='5,000' monthlyPrice='16,000'
                    comment='基礎からの習得はもちろん、習得した音で個性を引き出すための演奏の仕方まで指導します。
また、大会やライブ、作品制作などの目標設定からサポートし、豊富な経験を活かして音楽表現以外の点に関してもアドバイスをします。'/>
                <div className="mb-4"></div>
                <div className="grid-2column-11">
                    <div className="mb-2">
                        <Course key="スタジオ入会費" isSmall={true} name="スタジオ入会費" prices={[["studio", "（初回のみ）¥2,000"]]}/>
                    </div>
                    <Course key="スタジオ料金" isSmall={true} name="スタジオ料金" prices={[["studio", "（1回あたり）¥360"]]}/>
                </div>
            </Section>
        );
    }
}

export default Plan;