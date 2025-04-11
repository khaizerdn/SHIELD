import '../../css/elements/aboutuspage.css';
import adviser1 from '../../assets/profilepic.png';
import adviser2 from '../../assets/profilepic.png';
import person1 from '../../assets/profilepic.png';
import person2 from '../../assets/profilepic.png';
import person3 from '../../assets/profilepic.png';
import person4 from '../../assets/profilepic.png';
import person5 from '../../assets/profilepic.png';
import person6 from '../../assets/profilepic.png';
import person7 from '../../assets/profilepic.png';
import person8 from '../../assets/profilepic.png';
import person9 from '../../assets/profilepic.png';
import person10 from '../../assets/profilepic.png';
import person11 from '../../assets/profilepic.png';
import person12 from '../../assets/profilepic.png';
import person13 from '../../assets/profilepic.png';
import person14 from '../../assets/profilepic.png';
import person15 from '../../assets/profilepic.png';
import person16 from '../../assets/profilepic.png';

const AboutusPage = () => {
    return (
        <div className="aboutuspage">

            <div className="aboutus-section">
                <div className='section-title'>ABOUT US</div>
                <div className='subtext'>Software-Hardware Integration Engineering Leaders and Developers Society
                    (SHIELD Society) is a student organization of Bachelor of Science in Computer Engineering Students,
                    residing at the Cavite State University - Carmona Campus.</div>
            </div>

            <div className="advisers-section">
                <div className='section-title'>ADVISERS</div>
                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={adviser1} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>ADVISER</div>
                            <div className='personName'>Dr. Alex S. Rivera</div>
                            <div className='personName'>alex.rivera@example.com</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={adviser2} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>ADVISER</div>
                            <div className='personName'>Mr. Jamie L. Cruz</div>
                            <div className='personName'>jamie.cruz@example.com</div>
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
                            <div className='personName'>Taylor R. Carson</div>
                            <div className='personName'>president@shield.org</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person2} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>VP INTERNAL</div>
                            <div className='personName'>Jordan B. Lane</div>
                            <div className='personName'>vpinternal@shield.org</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person3} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>VP EXTERNAL</div>
                            <div className='personName'>Casey M. Logan</div>
                            <div className='personName'>vpexternal@shield.org</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person4} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>SECRETARY</div>
                            <div className='personName'>Morgan L. Avery</div>
                            <div className='personName'>secretary@shield.org</div>
                        </div>
                    </div>
                </div>

                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={person5} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>ASSISTANT SECRETARY</div>
                            <div className='personName'>Skyler J. Quinn</div>
                            <div className='personName'>asstsecretary@shield.org</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person6} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>TREASURER</div>
                            <div className='personName'>Cameron V. Blake</div>
                            <div className='personName'>treasurer@shield.org</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person7} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>AUDITOR</div>
                            <div className='personName'>Dakota W. Emerson</div>
                            <div className='personName'>auditor@shield.org</div>
                        </div>
                    </div>

                    <div className="person">
                        <div className="personimg"><img src={person8} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>BUSINESS MANAGER</div>
                            <div className='personName'>Riley K. Maddox</div>
                            <div className='personName'>bizmanager@shield.org</div>
                        </div>
                    </div>
                </div>

                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={person9} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>SERGEANT AT ARMS</div>
                            <div className='personName'>Avery T. Morgan</div>
                            <div className='personName'>saa@shield.org</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person10} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>PUBLIC INFORMATION OFFICER</div>
                            <div className='personName'>Reese L. Peyton</div>
                            <div className='personName'>pio@shield.org</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person11} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>ASSISTANT PIO</div>
                            <div className='personName'>Jamie C. Sloan</div>
                            <div className='personName'>asstpio@shield.org</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person12} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>Gender and Development Representative</div>
                            <div className='personName'>Rory S. Kendall</div>
                            <div className='personName'>gadrep@shield.org</div>
                        </div>
                    </div>
                </div>

                <div className="PersonRow">
                    <div className="person">
                        <div className="personimg"><img src={person13} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>4TH YEAR REPRESENTATIVE</div>
                            <div className='personName'>Blake T. Cameron</div>
                            <div className='personName'>rep4@shield.org</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person14} alt="person" /></div>
                        <div className='personInfo'>
                            <div className='personName'>3RD YEAR REPRESENTATIVE</div>
                            <div className='personName'>River M. Ellis</div>
                            <div className='personName'>rep3@shield.org</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person15} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>2ND YEAR REPRESENTATIVE</div>
                            <div className='personName'>Parker A. Finley</div>
                            <div className='personName'>rep2@shield.org</div>
                        </div>
                    </div>
                    <div className="person">
                        <div className="personimg"><img src={person16} alt="Person1" /></div>
                        <div className='personInfo'>
                            <div className='personName'>1ST YEAR REPRESENTATIVE</div>
                            <div className='personName'>Drew N. Sawyer</div>
                            <div className='personName'>rep1@shield.org</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutusPage;
