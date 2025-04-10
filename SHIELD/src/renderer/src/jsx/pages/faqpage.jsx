import React, { useState } from 'react';
import '../../css/elements/faqpage.css';

const FAQPage = () => {
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
            },
            {
                question: "What is the organization's motto?",
                answer: '"Promoting Homage, Protecting Knowledge"'
            },
            {
                question: "Does the SHIELD Society collect fees?",
                answer: "Yes, 100 pesos every year. Must be paid before the 1st semester ends."
            },
            {
                question: "Where are you located?",
                answer: "We are currently residing at the Cavite State University - Carmona Campus."
            },
            {
                question: "How many officers are there in the SHIELD Society?",
                answer: "16 student officers and 2 Advisers."
            }
        ];
    

    return (
        <div className="faqpage">
            <section className="faq-section-1">
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
            </section>
        </div>
    );
};

export default FAQPage;