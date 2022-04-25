import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {css} from "styled-components";
import InstructorPerson from "./InstructorParts/InstructorPerson";
import { SectionHeader } from "../Parts";

type InstructorProps = {
    inViews: Array<any>,
    instructors: Array<{[key: string]: string}>
};

type InstructorState = {};

const Section = styled.section``;

class Instructor extends React.Component<InstructorProps, InstructorState>{
    constructor(props: InstructorProps){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <Section ref={this.props.inViews[0]} className="instructor">
                <SectionHeader name="Instructor" sub="講師" imgPath="./img/instructor_h.png"/>
                <div className="mb-4">
                    <InstructorPerson id={1} name="TATSUAKI" twitterId='tatsuaki1234' instagramId='tatsuaki_sigrid' youtubeId='TATSUAKIbeatbox' websiteUrl='' 
                        description='中学生の時に兄の影響でビートボックスを始める。地元の小さなライブハウスで経験を積み、高校卒業後札幌へ移住。ヒューマンビートボックスの日本一を決める大会JAPAN BEATBOX CHAMPIONSHIP 2012では初出場で高校生ながらBEST4、そして2016年にはソロ、タッグで日本チャンピオンに輝き、日本初の二冠という快挙を成し遂げた。2018年にはビートボックスアーティストチーム、4thGASを結成しビートボックスシーンに新たな風を作り出した。台湾で行われたASIA BEATBOX CHAMPIONSHIPでは2年連続の準優勝、タッグでは2位という世界レベルの成績。世界最大規模BEATBOXの大会GRAND BEATBOX BATTLEには日本人初のタッグで出場。公式世界大会ではソロ、タッグで日本代表で出場。めざましテレビでは独占インタビュー、生放送に出演とメディアにも露出し活躍の幅を広げている。2019年にはももいろクローバーZとさいたまスーパーアリーナ、大阪城ホールで共演を果たしビートボックスに新たな可能性を知らしめた。2022年に開催されたJPN CUPでは３回目の全国制覇を成し遂げ、JPN CUP初代日本チャンピオンに輝いた。現在はイベントを主催しながら、札幌を中心に様々なイベントに出演し、全国、海外のビートボックスの大会にも出場。日本トップアーティストとのコラボもこなし、ニュースクールスタイルで魅せるビートボックスは見ている人を楽しませる。日本を代表するヒューマンビートボクサー。'/>
                </div>
                <InstructorPerson id={2} name="YUTA" twitterId='YUTA_beatboxer' instagramId='yuta_beat' youtubeId='YUTABEATBOX' websiteUrl='https://yutabeatbox.com' 
                    description='北海道旭川市出身、大学進学とともに札幌に進出し、本格的に演奏活動を開始する。2018年には日本公式大会Japan Beatbox Championship2018北海道予選を優勝し、公式北海道チャンピオンの座を獲得する。また2019年には全国各地で開催されたヒューマンビートボックスバトル「Boost」の年間総合チャンピオンを決める全国大会Grand Boost Championship vol.3を優勝し、３代目の日本チャンピオンとなる。
                        2021年11月には自身の1stEPとなる「BIRTH」をデジタルリリースし、iTunes Store 、ヒップホップ／ラップ トップアルバムにおいて 日本TOP50にランクイン。
                        2021年12月に開催された北海道ビートボックスバトル七変化 vol.6ではTag部門準優勝の成績を収める。また2022年3月には、岐阜県で開催された JPN CUPのCrew部門にて日本3位に輝くなど、ユニットやグループとしての演奏活動にも力を注いでいる。
                        2022年6月には北海道空知地方で行われる野外音楽フェス「SORAON /// 空の青さと、音楽と。」に出演予定。中島美嘉やスガシカオ、MONKEY MAJIKらと並び、北海道出身の世界的なドラマーYOYOKAとの共演が決まっている。
                        現在はソロパフォーマンスのみならず、シンガーソングライターやラッパーとの楽曲制作、ダンサーとの共演など、エンターティメントの垣根を超えたコラボレーションを展開させている。'/>
            </Section>
        );
    }
}

export default Instructor;