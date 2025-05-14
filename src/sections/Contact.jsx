import React, { useState } from "react";
import { Element } from "react-scroll";
import Button from "../components/Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent("Contact Form Submission");
    const body = encodeURIComponent(
      `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`,
    );
    window.location.href = `mailto:hello@ellatechsolutions.com?subject=${subject}&body=${body}`;
  };

  return (
    <Element name="contact">
      <section className="container mx-auto py-20">
        <div className="max-w-2xl mx-auto p-8 border border-s2 rounded-3xl bg-s1/50">
          <h2 className="h2 text-center mb-6">Contact Us</h2>
          <div className="mb-8 text-center space-y-2">
            <p>Ella Tech Solutions</p>
            <p>Detroit, MI</p>
            <p>Phone: (313) 555-1234</p>
            <p>Email: hello@ellatechsolutions.com</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-s3 rounded-lg focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-s3 rounded-lg focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="px-4 py-2 border border-s3 rounded-lg focus:outline-none"
            />
            <Button type="submit" className="self-center mt-4">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </Element>
  );
};

export default Contact;
