// src/components/Booking.jsx
import { Element } from "react-scroll";
import Button from "../components/Button.jsx";
import { useState } from "react";

const Booking = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to your backend or email service
    alert("Thanks! We'll be in touch soon.");
    setForm({ name: "", email: "", service: "", date: "", message: "" });
  };

  return (
    <Element name="booking">
      <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 bg-s1/50">
        <div className="container">
          {/* Header to match Hero styling */}
          <div className="relative z-2 max-w-512 mx-auto text-center">
            <h2 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl">
              Book Our Services
            </h2>
            <p className="max-w-440 mx-auto mb-14 body-1 text-p5 max-md:mb-10">
              Tell us what you need and when—and we’ll get you set up with a
              custom plan.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-512 mx-auto grid gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-4 border border-s2 rounded text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-s2 rounded text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full p-4 border border-s2 rounded text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            >
              <option value="">Which service?</option>
              <option value="website">Website Development</option>
              <option value="consulting">Tech Consulting</option>
              <option value="eLearning">E-Learning Dev</option>
              <option value="automation">Automation & AI</option>
            </select>

            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-4 border border-s2 rounded text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Additional details (optional)"
              value={form.message}
              onChange={handleChange}
              className="w-full p-4 border border-s2 rounded text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            />

            {/* Use the same Button component with icon */}
            <Button icon="/images/zap.svg" type="submit">
              Send Booking Request
            </Button>
          </form>
        </div>
      </section>
    </Element>
  );
};

export default Booking;
