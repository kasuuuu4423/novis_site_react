import * as React from 'react';
import styled from "styled-components";
import Mixin from '../../Cssvars/Mixin';
import { SectionHeading, Heading3, RadiusBoxText, BracketText } from "../Parts";
import { replaceAllReturns } from "../../Modules/functions";
import { CourseView, StudioFeeView } from "../../Modules/Microcms";

type PlanProps = {
    inViews: Array<any>,
    courses: CourseView[],
    studioJoin: StudioFeeView,
    studioPrice: StudioFeeView,
};

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
    plans?: Array<{ text: string; price: number }>,
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
                {props.plans ? props.plans.map((plan, i)=><RadiusBoxText key={i}>{plan.text}¥{plan.price.toLocaleString()}{props.isMin?"~":""}</RadiusBoxText>):""}
            </WrapPrice>
        </div>
    );
}

const Plan: React.FC<PlanProps> = (props) => {
    return (
        <Section ref={props.inViews[0]} className="Plan">
            <SectionHeading name="Plan" sub="コース" imgPath="./img/plan_h.png"/>
            {props.courses.map((course) =>
                <Course
                    key={course.id}
                    id={course.id}
                    name={course.name + " コース"}
                    plans={course.plans}
                    comment={replaceAllReturns(course.description)}
                />
            )}
            <div className="mb-4"></div>
            <div className="grid-2column-11">
                <Course key="studio-join" isSmall={true} name="スタジオ入会費" isAnnotate isMin plans={[{ text: props.studioJoin.text, price: props.studioJoin.price }]}/>
                <Course key="studio-price" isSmall={true} name="スタジオ料金" isAnnotate isMin plans={[{ text: props.studioPrice.text, price: props.studioPrice.price }]}/>
            </div>
        </Section>
    );
}

export default Plan;
