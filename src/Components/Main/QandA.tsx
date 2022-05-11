import * as React from 'react';
import styled from 'styled-components';
import { SectionHeading, Heading3, BracketText } from "../Parts";

const Section = styled.section``;

type QandAProps = {
    inViews: Array<any>,
    qanda: Array<any>,
}

const QandA: React.FC<QandAProps> = (props) =>{
    console.log(props.inViews);
    return(
        <Section ref={props.inViews[0]}>
            <SectionHeading name='Q&A' sub='よくある質問' imgPath='img/qanda_h.png'/>
            {props.qanda.map((item, i)=>
                <div key={"qanda_"+i} className="qanda">
                    <Heading3>{item.data.q}</Heading3>
                    <BracketText>{item.data.a}</BracketText>
                </div>
            )}
        </Section>
    );
}

export default QandA;