import * as React from 'react';
import { useRef, useEffect } from 'react';
import { db, updateDocFromDb } from '../../Modules/Firebase';
import { Card, Container, styled, Box, Button, TextField } from '@mui/material';
import { replaceAllReturns, sortByKeys } from '../../Modules/functions';
import ConfigCard, { CustomBox } from './ConfigCard';

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
    
    return(
        <CustomContainer maxWidth="sm">
            <ConfigCard title='About' dbInfo={{collection: "contents", document: ["siteinfo"]}} defaults={[{about: replaceAllReturns(props.siteinfo.about)}]}/>
            <ConfigCard title='Instructor' dbInfo={{collection: "instructor", document: instructorKeys}} defaults={instructors} />
            <ConfigCard ids={plans.map(item=>item.id)} title='Course' dbInfo={{collection: "plans", document: instructorKeys}} defaults={plans.map(item=>item.data)} />
        </CustomContainer>
    );
}

export default Configuration;