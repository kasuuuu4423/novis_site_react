import * as React from 'react';
import { Container, styled } from '@mui/material';
import { replaceAllReturns, sortByKeys } from '../../Modules/functions';
import ConfigCard from './ConfigCard';

const CustomContainer = styled(Container)({
    paddingTop: "100px",
});

type ConfigProps = {
    siteinfo: {[key: string]: any},
};

const Configuration: React.FC<ConfigProps> = (props) =>{
    let instructors: Array<any> = props.siteinfo.instructors ?? [{}];
    instructors = instructors.map((item) =>{
        return sortByKeys(item);
    });
    let plans: Array<any> = props.siteinfo.plans ?? [{}];
    plans = plans.map((item) =>{
        return sortByKeys(item);
    });
    const instructorKeys = instructors.map((item) =>{
        return item.name;
    });
    const qandaIds = props.siteinfo.qanda.map(item=>item.id);
    
    return(
        <CustomContainer maxWidth="sm">
            <ConfigCard
                title='SiteInfo'
                dbInfo={{collection: "contents", document: ["siteinfo"]}}
                defaults={[{
                    title: props.siteinfo.title,
                    about: replaceAllReturns(props.siteinfo.about),
                    privacyPolicy: replaceAllReturns(props.siteinfo.privacyPolicy)}]
                }/>
            <ConfigCard
                title='Instructor'
                annotation={"Twitter、InstagramはIDのみ、YouTube、WebsiteはURLを入力してください！"}
                dbInfo={{collection: "instructor", document: instructorKeys}}
                defaults={instructors} />
            <ConfigCard
                ids={plans.map(item=>item.id)}
                title='Course'
                dbInfo={{collection: "plans", document: instructorKeys}}
                defaults={plans.map(item=>item.data)} />
            <ConfigCard
                ids={props.siteinfo.qanda.map(item=>item.id)}
                title='Q&A'
                dbInfo={{collection: "qanda", document: qandaIds}}
                defaults={props.siteinfo.qanda.map(item=>item.data)} />
        </CustomContainer>
    );
}

export default Configuration;