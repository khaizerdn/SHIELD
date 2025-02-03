import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/elements/homepage.css';
import logo from '../../assets/Asset 1.png';
import aboutusimage from '../../assets/shield1.jpg';
import membersimage from '../../assets/shield2.jpg';

const HomePage = () => {

    const [expandedFaq, setExpandedFaq] = useState(null);

    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    const faqData = [
        {
            question: "Who leads the SHIELD Society?",
            answer: "SHIELD Society President Larrah Jane Ashley T. Manzo."
        },
        {
            question: 'What does "SHIELD" stand for?',
            answer: "Software-Hardware Integration Engineering Leaders and Developers Society"
        },
        {
            question: "How many students are enrolled in CpE?",
            answer: "307 students."
        }
    ];

    const handleScrollToTop = () => {
        window.scrollTo(0, 0); // Scroll to the top when 'See more' is clicked
    };

    return (
        <div className="homepage">
            {/* Header Section */}
            <div className="header-section">
                <img src={logo} alt="SHIELD Society" className="logo" />
            </div>
            <div className='header-description'>
            <div className='section-title'>Software-Hardware Integration Engineering Leaders and Developers Society</div>
                <div className='subtext'>"Promoting Homage, Protecting Knowledge"</div>
            </div>

            {/* About Us Section */}
            <section className="about-section">
                <div className="about-text">
                    <div className='section-title'>ABOUT US</div>
                    <div className='subtext'>Software-Hardware Integration Engineering Leaders and Developers Society (SHIELD Society) 
                        is a student organization of Bachelor of Science in Computer Engineering Students, 
                        residing at the Cavite State University - Carmona Campus.</div>
                        <Link to="/aboutus" onClick={handleScrollToTop} className="button-see-more">See more</Link>
                </div>
                <div className="about-image">
                    <img src={membersimage} alt="About us" />
                </div>
            </section>

            {/* Members Section */}
            <section className="members-section">
                <div className="members-image">
                    <img src={aboutusimage} alt="Members" />
                </div>
                <div className="members-text">
                <div className='section-title'>MEMBERS</div>
                    <div className='subtext'>A comprehensive table of all currently registered Shield members, including both students and teachers. Browse through the list to view names, roles, and other key details, providing a clear overview of everyone in the Shield Society.</div>
                    <Link to="/members" onClick={handleScrollToTop} className="button-see-more">See more</Link>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className='section-title'>FAQ</div>
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                        onClick={() => toggleFaq(index)}
                    >
                        {expandedFaq === index ? (
                            <span className="faq-answer">{faq.answer}</span>
                        ) : (
                            <span>{faq.question}</span>
                        )}
                    </div>
                ))}
                <Link to="/faq" onClick={handleScrollToTop} className="button-see-more">See more</Link>
            </section>
            
        </div>
    );
};

export default HomePage;
