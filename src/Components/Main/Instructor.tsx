import * as React from 'react';
import styled from "styled-components";
import InstructorPerson from "./InstructorParts/InstructorPerson";
import { SectionHeading } from "../Parts";
import { InstructorView } from "../../Modules/Microcms";

type InstructorProps = {
    inViews: Array<any>,
    instructors: InstructorView[],
};

const Section = styled.section``;

const Instructor: React.FC<InstructorProps> = (props) => {
    return (
        <Section ref={props.inViews[0]} className="instructor">
            <SectionHeading name="Instructor" sub="講師" imgPath="./img/instructor_h.png"/>
            {props.instructors.map((instructor, i) =>
                <InstructorPerson
                    key={i}
                    id={i}
                    name={instructor.name}
                    imgPath={instructor.imgPath}
                    sns_x={instructor.sns_x}
                    sns_instagram={instructor.sns_instagram}
                    sns_youtube={instructor.sns_youtube}
                    website={instructor.website}
                    description={instructor.description}
                />
            )}
        </Section>
    );
}

export default Instructor;
