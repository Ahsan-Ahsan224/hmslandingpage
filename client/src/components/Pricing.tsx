import { useState } from "react";
import { motion } from "framer-motion";
import { FaDollarSign, FaCheck } from "react-icons/fa";

const pricingPlans = [
  {
    title: "Starter Care",
    price: 29,
    period: "month",
    features: [
      "Patient Management",
      "Appointment Scheduling",
      "Basic Reporting",
    ],
  },
  {
    title: "Pro Care",
    price: 59,
    period: "month",
    features: [
      "All Starter Features",
      "EMR Integration",
      "Pharmacy Management",
    ],
  },
  {
    title: "Ultimate Care",
    price: 99,
    period: "month",
    features: [
      "All Pro Features",
      "Advanced Analytics",
      "Priority Support",
    ],
  },
];

const Pricing = () => {
  const [activePlan, setActivePlan] = useState(0);

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            className="max-w-xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Flexible pricing for every healthcare provider. Select a plan and see the features glow!
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              className={`relative bg-card rounded-3xl flex flex-col items-center px-8 py-12 min-h-[520px] shadow-xl transition-all duration-500
                border-2 ${activePlan === idx ? "border-primary shadow-primary/30" : "border-transparent"}
                ${activePlan === idx ? "scale-105 z-10" : "scale-95 opacity-80"}
              `}
              whileHover={{ scale: 1.08, boxShadow: "0 0 32px 8px #3b82f6" }}
              onClick={() => setActivePlan(idx)}
              style={{ cursor: "pointer" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary p-4 text-3xl shadow-lg">
                  <FaDollarSign />
                </span>
                <span className="text-4xl font-extrabold gradient-text">${plan.price}</span>
                <span className="text-base text-muted-foreground">/ {plan.period}</span>
              </div>
              <h3 className="text-2xl font-bold mb-8 text-center">{plan.title}</h3>
              <div className="flex-1 flex flex-col justify-end w-full">
                <ul className="space-y-6 mt-8">
                  {plan.features.map((feature, fidx) => (
                    <motion.li
                      key={feature}
                      className={`flex items-center gap-3 text-lg font-medium px-4 py-3 rounded-xl transition-all duration-300
                        ${activePlan === idx && fidx === 0 ? "bg-primary/10 text-primary shadow-lg" : ""}
                        ${activePlan === idx ? "glow" : "opacity-70"}
                      `}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: activePlan === idx ? "0 0 16px 4px #3b82f6" : "",
                      }}
                    >
                      <FaCheck className={`text-xl ${activePlan === idx ? "text-primary" : "text-muted-foreground"}`} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.button
                className={`mt-10 px-8 py-3 rounded-full font-bold text-white bg-primary shadow-lg transition-all duration-300
                  ${activePlan === idx ? "ring-4 ring-primary/30" : ""}
                `}
                whileHover={{ scale: 1.07, boxShadow: "0 0 24px 4px #3b82f6" }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Optional: Add a glowing background effect */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      <style>{`
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #06b6d4, #a21caf);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glow {
          box-shadow: 0 0 24px 4px #3b82f6;
        }
      `}</style>
    </section>
  );
};

export default Pricing;