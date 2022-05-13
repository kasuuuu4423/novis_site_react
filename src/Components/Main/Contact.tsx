import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import { useForm } from 'react-hook-form';
import Colors from '../../Cssvars/Colors';
import FontSize from '../../Cssvars/FontSize';
import { SectionHeading } from "../Parts";
import { useState, useEffect, useRef, useCallback } from "react";
import { sendForm } from "../../Modules/Firebase";
import { Loading } from "../Parts";


type ContactProps = {
    inViews: Array<any>,
};

type SectionProps = {
    formHidden: boolean,
};
const transition = .2;
const Section = styled.section<SectionProps>`
form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    transition: ${transition};
    ${props=>props.formHidden?`
        opacity: 0;
    `:""}
    .toggle{
        margin-bottom: 20px;
    }
    input:not(.toggle>input), select, textarea{
        width: 100%;
        max-width: 400px;
        background: ${Colors.WHITE};
        color: ${Colors.BLACK};
        border-radius: 1rem;
        padding: 5px 10px;
        &::placeholder{
            color: ${Colors.DARKGRAY};
        }
    }
    button.send{
        width: 100%;
        max-width: 100px;
        color: ${Colors.WHITE};
        background: ${Colors.BLUE};
        font-size: ${FontSize.m};
        text-align: center;
        border-radius: 1rem;
        padding: 5px 0;
        font-weight: bold;
    }
    select{
        color: ${Colors.DARKGRAY};
    }
    .form{
        &_apply, &_contact{
            width: 100%;
        }
        &_apply{
            display: flex;
            flex-wrap: wrap;
        }
    }
}
`;

const InputWrap = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-bottom: 20px;
position: relative;
i{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    //color: ${Colors.BLACK}
}
`;


const Contact: React.FC<ContactProps> = (props) =>{
    const [isApply, changeIsApply] = useState(true);
    const [isSend, setIsSend] = useState(false);
    const [formHidden, setFormHidden] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const { register, handleSubmit } = useForm();

    const onSubmit = () =>{
        if((formRef.current)){
            const inputs = document.forms[0].elements;
            const inputsArray: Array<Element> = Array.from(inputs);
            const catValue = inputsArray[0]["checked"] ? "apply" : "contact";
            const nameAndValue = inputsArray.map(input=>[input["name"], input["value"]]);
            const formData: {[key: string]: string} = Object.fromEntries(nameAndValue);
            const addedCat = Object.assign({}, formData, {cat: catValue});

            setFormHidden(true);
            sendForm(addedCat, ()=>{
                setIsSend(true);
            });
        }
    }

    return (
        <Section formHidden={formHidden} ref={props.inViews[0]} className="Contact">
            <SectionHeading name="Contact" sub="" imgPath="./img/contact_h.png"/>
            {!formHidden?<form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                <label className="toggle" htmlFor="apply"><input name='cat' type="radio" id="apply" value="apply" checked={isApply} onChange={()=>{changeIsApply(true)}}/>お申し込み</label>
                <label className="toggle" htmlFor="contact"><input name='cat' type="radio" id="contact" value="contact" checked={!isApply} onChange={()=>{changeIsApply(false)}}/>お問い合わせ</label>
                <InputWrap><input {...register("name"), { required: true, maxLength: 20 }} name="name" type="text" placeholder='名前' /></InputWrap>
                <InputWrap><input {...register("email"), { required: true, maxLength: 50 }} type="email" name='email' placeholder='メールアドレス' /></InputWrap>
                
                <div className={isApply?"form_apply":"form_apply d-none"}>
                    <InputWrap><input name='age' type="text" placeholder='年齢（学年）' /></InputWrap>
                    <InputWrap>
                        <select {...register("instructor")} name="instructor" id="instructor">
                            <option hidden>希望講師 ▽</option>
                            <option value="TATSUAKI">TATSUAKI</option>
                            <option value="YUTA">YUTA</option>
                        </select>
                    </InputWrap>
                    <InputWrap>
                        <select {...register("plan")} name="plan" id="plan">
                            <option hidden>希望コース ▽</option>
                            <option value="単発1回">単発1回</option>
                            <option value="1ヶ月（4回）">1ヶ月（4回）</option>
                        </select>
                    </InputWrap>
                </div>
                <div className={!isApply?"form_contact":"form_contact d-none"}>
                    <InputWrap>
                        <textarea {...register("content")} placeholder='お問い合わせ内容' name="content" id="" cols={30} rows={7}></textarea>
                    </InputWrap>
                </div>
                <button type='submit' className='send'>送信</button>
            </form>
            :
            isSend ?
                <div className="text-center">
                    送信が完了いたしました。<br/>
                    内容を確認したのち、担当者よりご連絡いたしますのでお待ち下さい。
                </div>
                :
                <div>
                    <Loading/>
                </div>
            }
        </Section>
    );
}

export default Contact;