import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#e4002b]">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Guess The Met
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Test your art knowledge with masterpieces from The Metropolitan
            Museum of Art's collection
          </p>
          <Link
            to="/play"
            className="inline-block bg-white text-[#e4002b] text-xl font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Start Playing
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Discover Masterpieces",
              description:
                "Explore artwork from one of the world's largest art collections",
              icon: "🎨",
            },
            {
              title: "Test Your Knowledge",
              description:
                "Challenge yourself with different difficulty levels and categories",
              icon: "🧠",
            },
            {
              title: "Learn Art History",
              description:
                "Discover interesting facts about art while you play",
              icon: "📚",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:bg-white/20 transition-colors duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How to Play Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            How to Play
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Settings",
                description: "Select difficulty level and art categories",
              },
              {
                step: "2",
                title: "Guess the Artwork",
                description:
                  "Look at the pixelated image and choose the correct title",
              },
              {
                step: "3",
                title: "Score Points",
                description:
                  "Earn points for correct guesses and unlock achievements",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white text-[#e4002b] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/70">
          <p className="mb-2">
            Powered by{" "}
            <a
              href="https://metmuseum.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              The Metropolitan Museum of Art Collection API
            </a>
          </p>
          <p>Created with ❤️ for art lovers everywhere</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
