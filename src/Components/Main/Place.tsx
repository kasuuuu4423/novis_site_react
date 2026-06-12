import * as React from 'react';
import styled from "styled-components";
import { SectionHeading } from "../Parts";
import { PlaceView } from "../../Modules/Microcms";
import { replaceAllReturns } from "../../Modules/functions";

type PlaceProps = {
    inViews: Array<any>,
    place: PlaceView,
};

const Section = styled.section``;

const Place: React.FC<PlaceProps> = (props) => {
    const { place } = props;
    const addressLines = place.address ? replaceAllReturns(place.address).split("\n") : [];

    return (
        <Section ref={props.inViews[0]} className="Place">
            <SectionHeading name="Place" sub="場所" imgPath="./img/place_h.png"/>
            {place.imgUrl ? (
                <div className="slide mb-4">
                    <img className="img-fluid" src={place.imgUrl} alt={place.name ?? "スタジオ内観"}/>
                </div>
            ) : ""}
            <div className="grid-2column-11">
                <div className="info font-serif">
                    {place.logoUrl ? (
                        <div className="text-center mb-3">
                            {place.url ? (
                                <a target="_blank" rel="noopener noreferrer" href={place.url}>
                                    <img loading='lazy' className="w-100" src={place.logoUrl} alt={place.name ?? "スタジオロゴ"}/>
                                </a>
                            ) : (
                                <img loading='lazy' className="w-100" src={place.logoUrl} alt={place.name ?? "スタジオロゴ"}/>
                            )}
                        </div>
                    ) : ""}
                    {place.name ? <div><span className="bg-gray">{place.name}</span></div> : ""}
                    {place.url ? (
                        <div className="mb-3">
                            <span className="bg-gray">
                                <a target="_blank" rel="noopener noreferrer" href={place.url}>{place.url}</a>
                            </span>
                        </div>
                    ) : ""}
                    {addressLines.map((line, i) => (
                        <div key={i} className={i === addressLines.length - 1 ? "mb-3" : ""}>
                            <span className="bg-gray">{line}</span>
                        </div>
                    ))}
                    {place.access ? (
                        <div className="mb-3">
                            <span className="bg-gray">{replaceAllReturns(place.access)}</span>
                        </div>
                    ) : ""}
                </div>
                {place.mapIframeSrc ? (
                    <div className="map">
                        <div className="iframe-43 iframe-md-100">
                            <iframe src={place.mapIframeSrc} loading="lazy"></iframe>
                        </div>
                    </div>
                ) : ""}
            </div>
        </Section>
    );
}

export default Place;
