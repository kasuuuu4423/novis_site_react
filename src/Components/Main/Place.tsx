import * as React from 'react';
import styled, {css} from "styled-components";
import { SectionHeading } from "../Parts";

type PlaceProps = {
    inViews: Array<any>,
};
type PlaceState = {};

const Section = styled.section``;

class Place extends React.Component<PlaceProps, PlaceState>{
    constructor(props: PlaceProps){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <Section ref={this.props.inViews[0]} className="Place">
                <SectionHeading name="Place" sub="場所" imgPath="./img/place_h.png"/>
                <div className="slide mb-4"><img className="img-fluid" src="./img/place_1.png" alt="スタジオ シーラカンス 内観"/></div>
                    <div className="grid-2column-11">
                        <div className="info font-serif">
                            <div className="text-center mb-3">
                                <a target="_blank" rel="noopener noreferrer" href="https://st-siirakannsu.com/">
                                    <img loading='lazy' className="w-100" src="./img/place_2.png" alt="シーラカンス"/>
                                </a>
                            </div>
                            <div><span className="bg-gray">スタジオシーラカンス</span></div>
                            <div className="mb-3">
                                <span className="bg-gray">
                                    <a target="_blank" rel="noopener noreferrer" href="https://st-siirakannsu.com/">https://st-siirakannsu.com/</a>
                                </span>
                            </div>
                            <div><span className="bg-gray">〒060-0063</span></div>
                            <div><span className="bg-gray">札幌市中央区南3条西3丁目3-2</span></div>
                            <div className="mb-3"><span className="bg-gray">第2タムラビル地下1階</span></div>
                            <div className="mb-3"><span className="bg-gray">地下鉄すすきの駅1番出口から徒歩1分</span></div>
                        </div>
                        <div className="map">
                            <div className="iframe-43 iframe-md-100">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93436.15872859381!2d141.41545984706735!3d42.95973399989376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b29847e64d5c1%3A0x5ea2a0df9a40c77d!2z44K544K_44K444Kq44K344O844Op44Kr44Oz44K5!5e0!3m2!1sja!2sjp!4v1649779522435!5m2!1sja!2sjp" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
            </Section>
        );
    }
}

export default Place;