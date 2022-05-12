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
import Dashboard from './Dashboard';
import { useInView } from 'react-intersection-observer';
import { getDocsFromDb, getDocFromDb } from './Modules/Firebase';
import { BrowserRouter,  Route } from 'react-router-dom';
import { db } from './Modules/Firebase';
import { White } from './Components/Parts';


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
`;

export const HeadingRefContext = createContext(null);
export const HeadingPositionContext = createContext(null);

const App: React.FC<AppProps> = (props) =>{

    const [instructors, setInstructors] = useState([]);
    const [title, setTitle] = useState("");
    const [about, setAbout] = useState("");
    const [courses, setCourses] = useState([]);
    const [plans, setPlans] = useState({});
    const [plansOrgn, setPlansOrgn] = useState([]);
    const [qAndA, setQAndA] = useState([]);
    const [headingPosition, setHeadingPosition] = useState(0);
    const [inViewNow, setInViewNow] = useState(0);
    const [isLoad, setIsLoad] = useState(false);

    const headingRefs: {[key: string]: React.MutableRefObject<HTMLHeadingElement>} = {
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
    for(let i = 0; i < numSections; i++){
        inViews[i] = useInView({
            root: null,
            rootMargin: '0px',
            threshold: .45,
        });
    }

    useEffect(()=>{
        const onScroll = ()=>{
            const refs = Object.values(headingRefContext);
            const headingPositions = refs.map(ref=>ref.current?.getBoundingClientRect().top);
            for(let i = 0; i < inViews.length; i++){
                if(inViews[i][1] && i != 0){
                    setInViewNow(i);
                    break;
                }
            }
            setHeadingPosition(headingPositions[inViewNow]);
        }

        window.addEventListener("scroll", onScroll, {passive: true});
        return ()=>{
            window.removeEventListener("scroll", onScroll);
        }
    }, [inViews]);

    useEffect(()=>{
        getDocsFromDb(db, "instructor", (list) =>{
            setInstructors(list.map(item=>item.data));
            const pd = list.map(item=>item.data).map((inst: {[key: string]: string})=>{
                return [inst.name, inst.plan_description];
            });
            setCourses(pd);
        });
        getDocFromDb(db, "contents", "siteinfo", (doc) =>{
            setAbout(doc.about);
            setTitle(doc.title);
            document.title = doc.title;
        });
        getDocsFromDb(db, "plans",  (list) =>{
            let p = {};
            list.map(item=>item.data).forEach((plan: {[key: string]: string | number}) =>{
                if(!Array.isArray(p[plan.instructor])) p[plan.instructor] = [];
                p[plan.instructor].push({
                    price: plan.price,
                    text: plan.text,
                });
            });
            //let orgn = doc.concat([doc.id]);
            setPlansOrgn(list);
            setPlans(p);
        });
        getDocsFromDb(db, "qanda",  (list) =>{
            setQAndA(list);
            setIsLoad(true);
        });
    }, []);

    const sections = [
        <section ref={inViews[0][0]} className="top relative">
            <h2 ref={headingRefs["Top"]} style={{opacity: 0, position: "absolute"}}></h2>
            <BG className='absolute-center' src="./img/bg.png" alt="背景" />
            <img style={{transform: "translate(-51%, -50%)"}} className="absolute-center w-mx-300 w-90" src="./img/top_logo.png" alt="novis"/>
            <div className="absolute-center-x top-80 font-m font-weight-100">Beatbox Lesson Studio</div>
        </section>,
        <section ref={inViews[1][0]} className="video">
            <h2 ref={headingRefs["Video"]} style={{opacity: 0, position: "absolute"}}></h2>
            <div className="iframe-169">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/tK94QT5a-dg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
        </section>,
        <About text={about} inViews={inViews[2]}/>,
        <Instructor instructors={instructors} inViews={inViews[3]}/>,
        <Plan course={courses} plans={plans} inViews={inViews[4]}/>,
        <Flow inViews={inViews[5]}/>,
        <Place inViews={inViews[6]}/>,
        <QandA qanda={qAndA} inViews={inViews[7]}/>,
        <Contact inViews={inViews[8]}/>,
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
                        <Background/>
                    </HeadingPositionContext.Provider>
                </Container>
            </Route>
            <Route exact path="/dashboard">
                <Dashboard title={title} about={about} plans={plansOrgn} instructors={instructors} course={courses} qanda={qAndA}/>
            </Route>
        </BrowserRouter>
    );
}

ReactDOM.render(<App key="Novis"/>, document.querySelector('#app'));