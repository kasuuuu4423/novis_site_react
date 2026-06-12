import * as React from 'react';
import { useState, useEffect, useRef, createContext } from 'react';
import * as ReactDOM from 'react-dom';
import styled from "styled-components";
import Colors from './Cssvars/Colors';
import Mixin from './Cssvars/Mixin';
import Header from './Header';
import About from './Components/Main/About';
import Instructor from './Components/Main/Instructor';
import Place from './Components/Main/Place';
import Plan from './Components/Main/Plan';
import Flow from './Components/Main/Flow';
import QandA from './Components/Main/QandA';
import Contact from './Components/Main/Contact';
import Background from './Components/Main/Background';
import { useInView } from 'react-intersection-observer';
import {
    fetchSetting,
    fetchInstructors,
    fetchCourses,
    fetchPlans,
    fetchQandA,
    buildCourseViews,
    buildPlaceView,
    buildSnsView,
    buildStudioFee,
    CourseView,
    PlaceView,
    SnsView,
    StudioFeeView,
} from './Modules/Microcms';
import { BrowserRouter, Route } from 'react-router-dom';
import { White, SNS } from './Components/Parts';


const Container = styled.div`
    //background: ${Colors.BLACK};
    color: ${Colors.WHITE};
    font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, "HiraKakuProN-W3", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, "BIZ UDPGothic", sans-serif;
    font-weight: 200;
    line-height: 1.5rem;
    font-size: 14px;
    overflow-x: hidden;
    section.top{
        height: 100vh;
    }
    section:not(.top, .video){
        margin-right: 50px;
        margin-left: 50px;
        ${Mixin.media("sm", "margin-right: 75px;")}
        ${Mixin.media("sm", "margin-left: 75px;")}

        ${Mixin.media("md", "margin-right: 200px;")}
        ${Mixin.media("md", "margin-left: 200px;")}

        ${Mixin.media("lg", "margin-right: 300px;")}
        ${Mixin.media("lg", "margin-left: 300px;")}
        
        ${Mixin.media("xl", "width: 900px;")}
        ${Mixin.media("xl", "margin-right: auto;")}
        ${Mixin.media("xl", "margin-left: auto;")}
    }
    section:not(.top, .header){
        padding-bottom: 7rem;
        &.about{
            padding-top: 5rem;
            padding-bottom: 10rem;
        }
    }
`;

type AppProps = {
};

const BG = styled.img`
    //mix-blend-mode: lighten;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const HeadingRefContext = createContext(null);
export const HeadingPositionContext = createContext(null);

const App: React.FC<AppProps> = (props) => {

    const [instructors, setInstructors] = useState([]);
    const [about, setAbout] = useState("");
    const [privacyPolicy, setPrivacyPolicy] = useState("");
    const [courses, setCourses] = useState<CourseView[]>([]);
    const [qAndA, setQAndA] = useState([]);
    const [pvUrl, setPvUrl] = useState("");
    const [place, setPlace] = useState<PlaceView>({});
    const [sns, setSns] = useState<SnsView>({});
    const [studioJoin, setStudioJoin] = useState<StudioFeeView>({ text: "（初回・必要な場合のみ）", price: 700 });
    const [studioPrice, setStudioPrice] = useState<StudioFeeView>({ text: "（1回あたり）", price: 360 });
    const [headingPosition, setHeadingPosition] = useState(0);
    const [inViewNow, setInViewNow] = useState(0);
    const [isLoad, setIsLoad] = useState(false);

    const headingRefs: { [key: string]: React.MutableRefObject<HTMLHeadingElement> } = {
        Top: useRef(null),
        Video: useRef(null),
        About: useRef(null),
        Instructor: useRef(null),
        Plan: useRef(null),
        Flow: useRef(null),
        Place: useRef(null),
        QandA: useRef(null),
        Contact: useRef(null),
    };
    const [headingRefContext, setHeadingRefContext] = useState(headingRefs);

    const numSections = 9;
    let inViews = [];
    for (let i = 0; i < numSections; i++) {
        inViews[i] = useInView({
            root: null,
            rootMargin: '0px',
            threshold: .45,
        });
    }

    useEffect(() => {
        const onScroll = () => {
            const refs = Object.values(headingRefContext);
            const headingPositions = refs.map(ref => ref.current?.getBoundingClientRect().top);
            for (let i = 0; i < inViews.length; i++) {
                if (inViews[i][1] && i != 0) {
                    setInViewNow(i);
                    break;
                }
            }
            setHeadingPosition(headingPositions[inViewNow]);
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [inViews]);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const [setting, instructorList, courseList, planList, qandaList] = await Promise.all([
                    fetchSetting(),
                    fetchInstructors(),
                    fetchCourses(),
                    fetchPlans(),
                    fetchQandA(),
                ]);

                if (setting) {
                    setAbout(setting.about);
                    setPrivacyPolicy(setting.privacy_policy);
                    setPvUrl(setting.pv_url);
                    setPlace(buildPlaceView(setting));
                    setSns(buildSnsView(setting));
                    setStudioJoin(buildStudioFee(setting.studio_join, "（初回・必要な場合のみ）", 700));
                    setStudioPrice(buildStudioFee(setting.studio_price, "（1回あたり）", 360));
                    document.querySelector('meta[name="description"]')?.setAttribute('content', setting.about);
                }

                setInstructors(instructorList);
                setCourses(buildCourseViews(courseList, planList));
                setQAndA(qandaList);
            } catch (error) {
                console.error("コンテンツの取得に失敗しました:", error);
            } finally {
                setIsLoad(true);
            }
        };

        loadContent();
    }, []);

    const sections = [
        <section key="top" ref={inViews[0][0]} className="top relative">
            <h2 ref={headingRefs["Top"]} style={{ opacity: 0, position: "absolute" }}></h2>
            <BG className='absolute-center' src="./img/bg.png" alt="背景" />
            <img style={{ transform: "translate(-51%, -100%)" }} className="absolute-center w-mx-300 w-90" src="./img/top_logo.png" alt="novis" />
            <div className="absolute-center-x text-center top-70 font-m font-weight-100">
                <span className='d-block mb-1'>Beatbox Lesson Studio</span><br />
                <SNS sns={sns} />
            </div>
        </section>,
        <section key="video" ref={inViews[1][0]} className="video">
            <h2 ref={headingRefs["Video"]} style={{ opacity: 0, position: "absolute" }}></h2>
            <div className="iframe-169">
                {pvUrl ? (
                    <iframe loading='lazy' width="560" height="315" src={pvUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                ) : ""}
            </div>
        </section>,
        <About key="about" text={about} inViews={inViews[2]} />,
        <Instructor key="instructor" instructors={instructors} inViews={inViews[3]} />,
        <Plan key="plan" courses={courses} studioJoin={studioJoin} studioPrice={studioPrice} inViews={inViews[4]} />,
        <Flow key="flow" inViews={inViews[5]} />,
        <Place key="place" place={place} inViews={inViews[6]} />,
        <QandA key="qanda" qanda={qAndA} inViews={inViews[7]} />,
        <Contact key="contact" privacyPolicy={privacyPolicy} inViews={inViews[8]} />,
    ];
    return (
        <BrowserRouter>
            <Route exact path="/">
                <White isTransparent={isLoad}></White>
                <Container>
                    <Header inViews={inViews} />
                    <main>
                        <HeadingRefContext.Provider value={headingRefContext}>
                            {sections}
                        </HeadingRefContext.Provider>
                    </main>
                    <HeadingPositionContext.Provider value={headingPosition}>
                        <Background />
                    </HeadingPositionContext.Provider>
                    <div className='text-center'><SNS sns={sns} /></div>
                    <div className='text-center'>©Novis 2022</div>
                </Container>
            </Route>
        </BrowserRouter>
    );
}

ReactDOM.render(<App key="Novis" />, document.querySelector('#app'));
