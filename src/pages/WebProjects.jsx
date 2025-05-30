// src/pages/WebProjects.jsx

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../sections/Header.jsx";
import Button from "../components/Button.jsx";
import Chatbot from "../sections/Chatbot.jsx";
import Footer from "../sections/Footer.jsx";

function WebProjects() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash === "#hero") {
            const el = document.getElementById("hero");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    }, [hash]);

    const projects = [
        {
            title: "SaaS Dashboard",
            img: "/images/projects/saas-dashboard.jpg",
            desc: "A responsive admin dashboard with real-time analytics and user management.",
            link: "https://github.com/yourusername/saas-dashboard",
        },
        {
            title: "E-Commerce Platform",
            img: "/images/projects/ecommerce.jpg",
            desc: "Full-featured online store with shopping cart, payment integration, and order tracking.",
            link: "https://github.com/yourusername/ecommerce-platform",
        },
        {
            title: "Portfolio Website",
            img: "/images/projects/portfolio.jpg",
            desc: "Personal portfolio site showcasing projects, blog posts, and a contact form.",
            link: "https://github.com/yourusername/portfolio-website",
        },
        {
            title: "Blog CMS",
            img: "/images/projects/blog.jpg",
            desc: "Custom content management system with rich-text editor and SEO tools.",
            link: "https://github.com/yourusername/blog-cms",
        },
    ];

    return (
        <main className="overflow-hidden">
            <Header />

            {/* Hero / Page Banner */}
            <section id="hero" className="pt-20 pb-32 bg-s1 font-poppins text-p5">
                <div
                    className="relative h-[350px] w-full overflow-hidden rounded-3xl mb-20"
                    style={{
                        backgroundImage: "url('/images/web-projects-hero.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center">
                        <h1 className="h1 text-white drop-shadow-xl mb-4">Our Web Projects</h1>
                        <p className="body-1 text-white drop-shadow-lg max-w-2xl">
                            Take a look at some of the websites and web apps we’ve built for clients
                            in business, non-profits, and beyond.
                        </p>
                    </div>
                </div>

                {/* Project Grid */}
                <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {projects.map((proj, idx) => (
                        <div
                            key={idx}
                            className="bg-s2 rounded-2xl shadow-lg overflow-hidden flex flex-col"
                        >
                            <div className="h-48 w-full overflow-hidden">
                                <img
                                    src={proj.img}
                                    alt={proj.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="h5 text-p4 mb-2">{proj.title}</h3>
                                <p className="body-3 text-p5 flex-1">{proj.desc}</p>
                                <Button
                                    href={proj.link}
                                    containerClassName="mt-4 self-start"
                                    markerFill="#FFF"
                                >
                                    View Project
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Booking CTA */}
                <div className="container text-center mb-32">
                    <h2 className="h4 mb-4">Ready to Start Your Own Project?</h2>
                    <p className="body-1 mb-6 max-w-2xl mx-auto">
                        Let’s talk about how we can bring your web idea to life—no obligation,
                        just a friendly chat.
                    </p>
                    <Button href="/#contact" containerClassName="inline-block mx-auto">
                        Book a Free Consultation
                    </Button>
                </div>
            </section>

            <Chatbot />
            <Footer />
        </main>
    );
}

export default WebProjects;