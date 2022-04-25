import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import Colors from '../../Cssvars/Colors';
import FontSize from '../../Cssvars/FontSize';
import { SectionHeader } from "../Parts";
import { useState, useEffect, useRef, useCallback } from "react";

type ContactProps = {
    inViews: Array<any>,
};


const Section = styled.section`
form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
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
        &[type="submit"]{
            max-width: 100px;
            color: ${Colors.WHITE};
            background: ${Colors.BLUE};
            font-size: ${FontSize.m};
            text-align: center;
            padding: 5px 0;
            font-weight: bold;
        }
        &::placeholder{
            color: ${Colors.DARKGRAY};
        }
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

    
    return (
        <Section ref={props.inViews[0]} className="Contact">
            <SectionHeader name="Contact" sub="" imgPath="./img/contact_h.png"/>
            <form action="">
                <label className="toggle" htmlFor="apply"><input name='cat' type="radio" id="apply" checked={isApply} onChange={()=>{changeIsApply(true)}}/>お申し込み</label>
                <label className="toggle" htmlFor="contact"><input name='cat' type="radio" id="contact" checked={!isApply} onChange={()=>{changeIsApply(false)}}/>お問い合わせ</label>
                <InputWrap><input name="name" type="text" placeholder='名前' /></InputWrap>
                <InputWrap><input type="email" name='email' placeholder='メールアドレス' /></InputWrap>
                {isApply?
                    <div className="form_apply">
                        <InputWrap><input name='age' type="text" placeholder='年齢（学年）' /></InputWrap>
                        <InputWrap>
                            <select name="instructor" id="instructor">
                                <option hidden>希望講師 ▽</option>
                                <option value="TATSUAKI">TATSUAKI</option>
                                <option value="YUTA">YUTA</option>
                            </select>
                        </InputWrap>
                        <InputWrap>
                            <select name="plan" id="plan">
                                <option hidden>希望コース ▽</option>
                                <option value="single">単発1回</option>
                                <option value="monthly">1ヶ月（4回）</option>
                            </select>
                        </InputWrap>
                    </div>
                :<div className="form_contact">
                    <InputWrap>
                        <textarea placeholder='お問い合わせ内容' name="content" id="" cols={30} rows={7}></textarea>
                    </InputWrap>
                </div>
                }
                <input type="submit" value="送信" />
            </form>
        </Section>
    );
}

export default Contact;