import React from 'react';
import '../../css/elements/aboutuspage.css';
import adviser1 from '../../assets/ADVISER_Abril.jpg';
import adviser2 from '../../assets/ADVISER_Ravina.jpg';
import person1 from '../../assets/(1) PRESIDENT_Manzo.jpg';
import person2 from '../../assets/(2) VP INTERNAL_Tabor.jpg';
import person3 from '../../assets/(3) VP EXTERNAL_Librando.jpg';
import person4 from '../../assets/(4) SECRETARY_Sadia.jpg';
import person5 from '../../assets/(5) ASSISTANT SECRETARY_Rebollos.jpg';
import person6 from '../../assets/(6) TREASURER_Ancheta.jpg';
import person7 from '../../assets/(7) AUDITOR_Punongbayan.jpg';
import person8 from '../../assets/(8) BUSINESS MANAGER_Samorin.png';
import person9 from '../../assets/(9) SERGEANT AT ARMS_Bito-on.jpg';
import person10 from '../../assets/(10) PIO_Majan.jpg';
import person11 from '../../assets/(10) Assistant PIO Dofitas .png';
import person12 from '../../assets/(11) ALFONSO, GIHARU M.jpg';
import person13 from '../../assets/(12) 4th year Representative_Labastida_Kristine.jpg';
import person14 from '../../assets/(13) 3RD YEAR REP_Amoroso.png';
import person15 from '../../assets/(14) 2ND YEAR REP_Almeda.jpg';
import person16 from '../../assets/(15) 1ST YEAR REP_Villamor.png';

const AboutusPage = () => {
    return (
        <div className="aboutuspage">

            {/* About Us description*/}

            <div className="aboutus-section">
                <div className='section-title'>ABOUT US</div>
                <div className='subtext'>Software-Hardware Integration Engineering Leaders and Developers Society
                    (SHIELD Society) is a student organization of Bachelor of Science in Computer Engineering Students,
                    residing at the Cavite State University - Carmona Campus.</div>
            </div>


            {/* Mission Vision Duo*/}
            {/* <div className="missionvision-section" >

                <div className="Mission">
                    <div className='section-title'>MISSION</div>
                    <div className='subtext'>Cavite State University shall provide excellent, equitable and relevant educational opportunities in the arts,
                        sciences and technology through quality instruction and responsive research and development activities.
                        It shall produce professional, skilled and morally upright individuals for global competitiveness.
                    </div>
                </div>
                <div className="Vision">
                    <div className='section-title'>VISION</div>
                    <div className='subtext'>The premier university in historic Cavite globally recognized for excellence in character development,
                        academics, research, innovation and sustainable community engagement.</div>
                </div>
            </div> */}

            <div className="advisers-section">
                <div className='section-title'>ADVISERS</div>
                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={adviser1} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>ADVISER</div>
                            <div className='personName'>Dr. Mark Anthony R. Abril</div>
                            <div className='personName'>markanthony.abril@cvsu.edu.ph</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={adviser2} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>ADVISER</div>
                            <div className='personName'>Mr. Ricarte Jay P. Ravina</div>
                            <div className='personName'>ricartehay.ravina@cvsu.edu.ph</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="officials-section">
                <div className='section-title'>OFFICIALS</div>
                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={person1} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>PRESIDENT</div>
                            <div className='personName'>Larrah Jane Ashley T. Manzo</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person2} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>VP INTERNAL</div>
                            <div className='personName'>John Benedict L. Tabor</div>
                            <div className='personName'>cc.johnbenedict.tabor@cvsu.edu.ph</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person3} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>VP EXTERNAL</div>
                            <div className='personName'>Keanu Estefano A. Librando</div>
                            <div className='personName'>cc.keanuestefano.librando@cvsu.edu.ph</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person4} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>SECRETARY</div>
                            <div className='personName'>Rachelle G. Sadia</div>
                            <div className='personName'>cc.rachelle.sadia@cvsu.edu.ph</div>
                        </div>
                    </div>
                </div>

                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={person5} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>ASSISTANT SECRETARY</div>
                            <div className='personName'>Elisha B. Rebollos</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person6} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>TREASURER</div>
                            <div className='personName'>Jeremy Yuan D. Ancheta</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person7} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>AUDITOR</div>
                            <div className='personName'>Aveon Jayne T. Punongbayan</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person8} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>BUSINESS MANAGER</div>
                            <div className='personName'>Jirou Matthew P. Samorin</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>
                </div>

                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={person9} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>SERGEANT AT ARMS</div>
                            <div className='personName'>Hannah Jane C. Bito-on</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person10} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>PUBLIC INFORMATION OFFICER</div>
                            <div className='personName'>Alyssa P. Majan</div>
                            <div className='personName'>cc.alyssa.majan@cvsu.edu.ph</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person11} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>ASSISTANT PIO</div>
                            <div className='personName'>Julia Isabel T. Dofitas</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person12} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>Gender and Development Representative</div>
                            <div className='personName'>Giharu M. Alfonso</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>


                </div>

                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={person13} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>4TH YEAR REPRESENTATIVE</div>
                            <div className='personName'>Kristine D. Labastida</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person14} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>3RD YEAR REPRESENTATIVE</div>
                            <div className='personName'>Crystal Angeline D. Amoroso</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person15} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>2ND YEAR REPRESENTATIVE</div>
                            <div className='personName'>Ken Natheneil F. Almeda</div>
                            <div className='personName'>cc.larrahjaneashley.manzo@cvsu.edu.ph</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={[person16]} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>1ST YEAR REPRESENTATIVE</div>
                            <div className='personName'>Mikka Ashlyn B. Villamor</div>
                            <div className='personName'>cc.mikkaashlyn.villamor@cvsu.edu.ph</div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default AboutusPage;
