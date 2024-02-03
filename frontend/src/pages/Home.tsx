import React from "react";
import "./Home.css"; // Import your stylesheet
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <h1>Welcome to ChatBot World</h1>
        <p>Your personal assistant for all your questions and tasks.</p>
      </header>

      <section className="cta-section">
        <p>Ready to get started?</p>
        <Link to={"/login"}>
          <button>Chat Now</button>
        </Link>
      </section>

      <section className="illustration-section">
        <img src="chatbot-login.png" alt="Chatbot Illustration" width={"32%"} />
      </section>

      <footer className="footer">
        <p>&copy; 2024 ChatBot World. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
