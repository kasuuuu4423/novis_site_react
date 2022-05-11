import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import Colors from '../../Cssvars/Colors';
import Mixin from '../../Cssvars/Mixin';
import { SectionHeading, Heading3, RadiusBoxText, BracketText } from "../Parts";
import { replaceAllReturns } from "../../Modules/functions";

type PlanProps = {
    inViews: Array<any>,
    course: Array<string>,
    plans: {[key: string]: Array<{}>},
};

type PlanState = {};

const Section = styled.section``;


const WrapPrice = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ${Mixin.media("md", "justify-content: space-evenly;")}
`;

type CourseProps = {
    id?: string,
    name: string,
    comment?: string,
    plans?: Array<{[key: string]: string | number}>
    isSmall?: boolean,
    isMin?: boolean,
    isAnnotate?: boolean,
};

const Course: React.FC<CourseProps> = (props) =>{
    const margin = props.isSmall ? " mb-2" : " mb-3";
    return(
        <div className={"course font-serif" + margin}>
            <Heading3 id={"plan_"+props.id}>{props.name} {props.isAnnotate?"*":""}</Heading3>
            {props.comment?<BracketText>{props.comment}</BracketText>:""}
            <WrapPrice>
                {props.plans ? props.plans.map((plan, i)=><RadiusBoxText key={i}>{plan.text}¥{typeof plan.price == "number" ? plan.price.toLocaleString():parseInt(plan.price).toLocaleString()}{props.isMin?"~":""}</RadiusBoxText>):""}
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
        const courses = this.props.course ? this.props.course.map((description)=>{return [description[0], replaceAllReturns(description[1])]}):[];
        return (
            <Section ref={this.props.inViews[0]} className="Plan">
                <SectionHeading name="Plan" sub="コース" imgPath="./img/plan_h.png"/>
                {courses != [] ? courses.map((course)=>{
                    return <Course key={course[0]} id={course[0]} name={course[0] +" コース"} plans={this.props.plans[course[0]]} //singlePrice='8,000' monthlyPrice='30,000'
                        comment={course[1]}/>
                }):""}
                <div className="mb-4"></div>
                <div className="grid-2column-11">
                    <Course key="スタジオ会員登録料" isSmall={true} name="スタジオ入会費" isAnnotate isMin plans={[{text: "（初回・必要な場合のみ）", price: 700}]}/>
                    <Course key="スタジオ料金" isSmall={true} name="スタジオ料金" isAnnotate isMin plans={[{text: "（1回あたり）", price: 360}]}/>
                </div>
            </Section>
        );
    }
}

export default Plan;