import React, { useState } from 'react';
import ChatArea from '../components/chat/ChatArea';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate()

    // Function to toggle the chat area
    const toggleChatArea = () => {
        setShowChat(!showChat);
    };

    const logoutHandler = () =>{
        localStorage.removeItem('token')
        navigate('/login')
        
    }
    return (
        <div className="landing-page">
            <div className="landing-container">
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to EduLearn</h1>
                    <p>Your path to knowledge and success starts here!</p>
                    <button className="cta-button">Get Started</button>
                </div>
            </header>
            <section className="about-section">
                <h2>About Us</h2>
                <p>
                    EduLearn provides high-quality courses to help you enhance your skills and achieve your educational goals.
                </p>
            </section>

            <footer className="footer">
                <p>&copy; 2024 EduLearn. All rights reserved.</p>
            </footer>
        </div>

            {showChat && (
                <div >
                    <ChatArea/>
                </div>
            )}
            <button className="customer-care-button" onClick={toggleChatArea}>
                💬
            </button>
            <button className="logout-btn" onClick={logoutHandler}>
                Logout
            </button>
        </div>
    );
};

export default LandingPage;
