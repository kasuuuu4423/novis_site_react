import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import InstructorPerson from "./InstructorParts/InstructorPerson";
import { SectionHeading } from "../Parts";

type InstructorProps = {
    inViews: Array<any>,
    instructors: Array<{[key: string]: string}>
};

type InstructorState = {};

const Section = styled.section``;

class Instructor extends React.Component<InstructorProps, InstructorState>{
    constructor(props: InstructorProps){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <Section ref={this.props.inViews[0]} className="instructor">
                <SectionHeading name="Instructor" sub="講師" imgPath="./img/instructor_h.png"/>
                {this.props.instructors.map((instructor, i) =>
                    <InstructorPerson key={i} id={i} name={instructor.name} imgPath={instructor.imgPath} twitterId={instructor.twitter} instagramId={instructor.instagram} websiteUrl={instructor.website} youtube={instructor.youtube} description={instructor.description}/>)}
            </Section>
        );
    }
}

export default Instructor;