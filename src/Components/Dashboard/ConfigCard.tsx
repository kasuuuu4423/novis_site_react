import * as React from "react";
import { useRef, useState } from "react";
import { Card, Box, Button, TextField } from '@mui/material';
import { db, updateDocFromDb } from '../../Modules/Firebase';


type CustomTextFieldProps = {
    content: JSX.Element,
};

const CustomBox: React.FC<CustomTextFieldProps> = (props) =>{
    return(
        <Box sx={{
            margin: "auto",
            padding: 4,
            paddingTop: 0,
        }}>
            {props.content}
        </Box>
    );
}


type ConfigCardProps = {
    title: string,
    defaults?: Array<{[key: string]: string}>,
    dbInfo: {
        collection: string,
        document: Array<string>
    },
    ids?: Array<string>,
    annotation?: string, 
};

const ConfigCard: React.FC<ConfigCardProps> = (props) =>{
    let numData = 0;
    let countData = 0;
    const refs: Array<React.MutableRefObject<HTMLInputElement>> = [];
    let keys = [[],[]];

    if(props.defaults){
        props.defaults.forEach((d,i)=>{
            let num = Object.values(d).length;
            numData += num;
            const dArray = Object.entries(d);
            dArray.forEach((item)=>keys[1].push(item[0]));
            for(let j = 0; j < num; j++){
                keys[0].push(i);
            }
        });
        for(let i = 0; i < numData; i++){
            refs.push(useRef(null));
        }
    }



    const onUpdate = (id: number, key: string = "") =>{
        console.log("Success " + key);
    }
    
    const buttonOnClick = () =>{
        for(let i = 0; i < refs.length; i++){
            if(refs[i].current) {
                const res = updateDocFromDb(db, props.dbInfo.collection, props.ids ? props.ids[keys[0][i]] : props.dbInfo.document[keys[0][i]], Object.fromEntries([[keys[1][i], refs[i].current.value]]), ()=>{onUpdate(i, keys[1][i])});
            }
        }
    }

    
    return(
        <Card sx={{marginBottom: "50px"}}>
            <Box sx={{padding: 4, fontWeight: "bold"}}><h2>{props.title}</h2></Box>
            {props.annotation?<Box sx={{padding: 4, paddingTop: 0, paddingBottom: 4, fontWeight: "bold"}}><p>{props.annotation}</p></Box>:""}
            {props.defaults ? props.defaults.map((d, i)=>{
                const fields: Array<JSX.Element> = [];
                for(const [key, value] of Object.entries(d)){
                    fields.push(
                        <CustomBox key={key} content={
                            <div>
                                <TextField type={typeof value == "string" ? "text" : "number"} inputRef={refs[countData]} multiline={value.length > 20} fullWidth label={key} defaultValue={value}/>
                            </div>
                        }/>
                    );
                    countData++;
                }
                return(
                    <Box key={i} sx={{marginBottom: 5}}>
                        {fields}
                    </Box>
                );
            }): ""}
            <Box sx={{
                margin: "auto",
                padding: 4,
                paddingTop: 0,
                textAlign: "right",
                }}>
                <Button onClick={buttonOnClick} variant="contained">変更</Button>
            </Box>
        </Card>
    );
}

export default ConfigCard;