// src/sections/Contact.jsx
import React, { useState } from "react";
import { Element } from "react-scroll";
import Button from "../components/Button.jsx";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unknown error");
      setStatus("success");
      setForm({ name: "", email: "", service: "", date: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <Element name="contact">
      <section
        id="contact"
        className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 bg-s1/50"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-p4 uppercase mb-4">
              Schedule Consultation Now
            </h2>
            <p className="text-lg text-p5">
              Let us know your needs and preferred timing—we'll create a tailored plan just for you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto grid grid-cols-1 gap-6 bg-white/80 p-8 rounded-2xl shadow-lg"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-4 border border-s2 rounded-lg text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="p-4 border border-s2 rounded-lg text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="p-4 border border-s2 rounded-lg text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            >
              <option value="">Which service?</option>
              <option value="website">Website Development</option>
              <option value="consulting">Tech Consulting</option>
              <option value="eLearning">E-Learning Development</option>
              <option value="automation">Automation & AI</option>
              <option value="other">Other</option>
            </select>

            <input
              type="datetime-local"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="p-4 border border-s2 rounded-lg text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Additional details (optional)"
              value={form.message}
              onChange={handleChange}
              className="p-4 border border-s2 rounded-lg text-body-1 text-p5 focus:outline-none focus:ring-2 focus:ring-p4"
            />

            <div className="text-center mt-4">
              <Button icon="/images/zap.svg" type="submit">
                {status === "loading"
                  ? "Sending..."
                  : status === "success"
                  ? "Sent ✅"
                  : status === "error"
                  ? "Error, retry"
                  : "Send Contact Request"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Element>
  );
}

export default Contact;