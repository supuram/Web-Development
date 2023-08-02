import React, {useEffect} from "react";
import './Middlebar.css'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

export default function Middlebar(){
    // useEffect(() => {
    //     gsap.utils.toArray('.panel').forEach((panel, i) => {
    //         ScrollTrigger.create({
    //             trigger: panel,
    //             start: 'top top', 
    //             pin: true,
    //             pinSpacing: false
    //         })
    //     })
    //   }, []);
      
    return(
        <div>
            <div className="divFather1Middlebar panel">
                <div className="div1Middlebar"></div>
                <div className="div2Middlebar">
                    <h1 className="h1div2Middlebar">A GREAT PLACE TO START YOUR JOURNEY</h1>
                    <p className="pdiv2Middlebar">cskhgcs shkdgcksh csdhgcksjhuisd dsgckshbc dshkch kshdckhs cksjdhckshg</p>
                </div>
            </div>



            <div className="divFather2Middlebar panel">
                <div className="div3Middlebar"></div>
                <div className="div4Middlebar">
                    <h1 className="h1div4Middlebar">A GREAT PLACE TO START YOUR JOURNEY</h1>
                    <p className="pdiv4Middlebar">cskhgcs shkdgcksh csdhgcksjhuisd dsgckshbc dshkch kshdckhs cksjdhckshg</p>
                </div>
            </div>



            <div className="divFather3Middlebar panel">
                <div className="div5Middlebar"></div>
                <div className="div6Middlebar">
                    <h1 className="h1div6Middlebar">A GREAT PLACE TO START YOUR JOURNEY</h1>
                    <p className="pdiv6Middlebar">cskhgcs shkdgcksh csdhgcksjhuisd dsgckshbc dshkch kshdckhs cksjdhckshg</p>
                </div>
            </div>



            <div className="divFather4Middlebar panel">
                <div className="div7Middlebar"></div>
                <div className="div8Middlebar">
                    <h1 className="h1div8Middlebar">A GREAT PLACE TO START YOUR JOURNEY</h1>
                    <p className="pdiv8Middlebar">cskhgcs shkdgcksh csdhgcksjhuisd dsgckshbc dshkch kshdckhs cksjdhckshg</p>
                </div>
            </div>
        </div>
    )
}