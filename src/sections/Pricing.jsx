import React from "react";
import { Element } from "react-scroll";
import {
  hourlyRates,
  plans,
  projectBased,
  workshops,
  addOns,
  discounts,
  terms,
} from "../constants/index.jsx";
import Button from "../components/Button.jsx";

const Pricing = () => {
  return (
    <section className="py-16 bg-s2">
      <Element name="pricing">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-p3">
              Ella Tech Solutions Pricing
            </h1>
            <p className="text-p4 mt-2">
              Transparent, budget-friendly rates for Detroit-area organizations
            </p>
          </div>

          {/* Hourly Rates */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-p3 text-center mb-6">
              Hourly Rates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hourlyRates.map(({ service, rate }) => (
                <div
                  key={service}
                  className="bg-s1 p-6 rounded-lg shadow-md text-center"
                >
                  <p className="font-medium text-p3 mb-2">{service}</p>
                  <p className="text-p4">{rate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Package Options */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-p3 text-center mb-6">
              Packages & Retainers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map(({ id, title, price, caption, features, logo }) => (
                <div
                  key={id}
                  className="bg-s1 p-6 rounded-lg shadow-md flex flex-col"
                >
                  <img
                    src={logo}
                    alt={title}
                    className="h-12 w-auto mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-p3 mb-2">
                    {title}
                  </h3>
                  <p className="text-p4 text-lg mb-2">
                    {price ? `$${price}` : "Custom"}
                  </p>
                  <p className="text-p4 mb-4">{caption}</p>
                  <ul className="mb-4 space-y-1 text-p4 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <img
                          src="/images/check.png"
                          alt="check"
                          className="w-4 h-4"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-auto">Get Started</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Project-Based */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-p3 text-center mb-6">
              Project-Based Pricing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectBased.map(({ title, price }) => (
                <div
                  key={title}
                  className="bg-s1 p-6 rounded-lg shadow-md flex justify-between"
                >
                  <span className="text-p4">{title}</span>
                  <span className="font-medium text-p3">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workshops & Training */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-p3 text-center mb-6">
              Workshops & Training
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {workshops.map(({ title, price }) => (
                <div
                  key={title}
                  className="bg-s1 p-6 rounded-lg shadow-md flex justify-between"
                >
                  <span className="text-p4">{title}</span>
                  <span className="font-medium text-p3">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add-On Services */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-p3 text-center mb-6">
              Add-On Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-xl mx-auto">
              {addOns.map(({ title, price }) => (
                <div
                  key={title}
                  className="bg-s1 p-6 rounded-lg shadow-md flex justify-between"
                >
                  <span className="text-p4">{title}</span>
                  <span className="font-medium text-p3">{price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discounts & Terms */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-p3 mb-4">
              Discounts & Terms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-4">
              {discounts.map(({ title, detail }) => (
                <div key={title} className="text-p4">
                  <span className="font-medium">{title}:</span> {detail}
                </div>
              ))}
            </div>
            <p className="text-p4 mb-1">
              <span className="font-medium">Deposit:</span> {terms.deposit}
            </p>
            <p className="text-p4">
              <span className="font-medium">Validity:</span> {terms.validity}
            </p>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Pricing;
