import * as React from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import Colors from './Cssvars/Colors';
import Mixin from './Cssvars/Mixin';
import Header from './Header';
import About from './Components/Main/About';
import Instructor from './Components/Main/Instructor';
import Place from './Components/Main/Place';
import Plan from './Components/Main/Plan';
import Flow from './Components/Main/Flow';
import Contact from './Components/Main/Contact';
import Background from './Components/Main/Background';
import Dashboard from './Dashboard';
import { useInView } from 'react-intersection-observer';
import { getDocsFromDb, getDocFromDb, getInstructors } from './Modules/Firebase';
import { BrowserRouter,  Route } from 'react-router-dom';
import { db } from './Modules/Firebase';



const Container = styled.div`
    //background: ${Colors.BLACK};
    color: ${Colors.WHITE};
    font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, "HiraKakuProN-W3", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, "BIZ UDPGothic", sans-serif;
    font-weight: 200;
    line-height: 1.5rem;
    font-size: 14px;
    section.top, section.about{
        height: 100vh;
    }
    section:not(.top){
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
    }
`;

type AppProps = {
};

const BG = styled.img`
    mix-blend-mode: lighten;
`;

const App: React.FC<AppProps> = (props) =>{
    const [instructors, setInstructors] = useState([]);
    const [about, setAbout] = useState("");
    const [courses, setCourses] = useState([]);
    const [plans, setPlans] = useState({});
    const [plansOrgn, setPlansOrgn] = useState([]);

    useEffect(()=>{
        getDocsFromDb(db, "instructor", (list) =>{
            setInstructors(list);
            const pd = list.map((inst: {[key: string]: string})=>{
                return [inst.name, inst.plan_description];
            });
            setCourses(pd);
        });
        getDocFromDb(db, "contents", "siteinfo", (doc) =>{
            setAbout(doc.about);
            document.title = doc.title;
        });
        getDocsFromDb(db, "plans",  (doc) =>{
            let p = {};
            doc.forEach((plan: {[key: string]: string | number}) =>{
                if(!Array.isArray(p[plan.instructor])) p[plan.instructor] = [];
                p[plan.instructor].push({
                    price: plan.price,
                    text: plan.text,
                });
            });
            setPlansOrgn(doc);
            setPlans(p);
        });
    }, []);


    const numSections = 7;
    let inViews = [];
    for(let i = 0; i < numSections; i++){
        inViews[i] = useInView({
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        });
    }
    const sections = [
        <section ref={inViews[0][0]} className="top relative">
            <BG className='absolute-center' src="./img/bg.png" alt="" />
            <img className="absolute-center w-mx-300 w-90" src="./img/top_logo.png" alt="novis"/>
            <div className="absolute-center-x top-80 font-m font-weight-100">Beatbox Lesson Studio</div>
        </section>,
        <About text={about} inViews={inViews[1]}/>,
        <Instructor instructors={instructors} inViews={inViews[2]}/>,
        <Plan course={courses} plans={plans} inViews={inViews[3]}/>,
        <Flow inViews={inViews[4]}/>,
        <Place inViews={inViews[5]}/>,
        <Contact inViews={inViews[6]}/>,
    ];

    return (
        <BrowserRouter>
            <Route exact path="/">
                <Container>
                    <Header inViews={inViews} />
                    <main>
                        {sections}
                    </main>
                </Container>
            </Route>
            <Route path="/dashboard">
                <Dashboard about={about} plans={plansOrgn} instructors={instructors} course={courses}/>
            </Route>
            <Background/>
        </BrowserRouter>
    );
}

ReactDOM.render(<App key="Novis"/>, document.querySelector('#app'));