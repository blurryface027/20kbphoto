"use client";

import { useState } from "react";
import { HiOutlineEnvelope, HiOutlinePaperAirplane, HiOutlineCheckCircle } from "react-icons/hi2";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Feedback");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs">
      {submitted ? (
        <div className="text-center py-10 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <HiOutlineCheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Message Sent Successfully!</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Thank you for reaching out to 20KB Photo. Our team will review your message promptly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setMessage("");
            }}
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition-all"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Subject Topic
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium"
            >
              <option value="General Feedback">General Feedback</option>
              <option value="Report Preset Change">Report Preset Specification Change</option>
              <option value="Request New Tool">Request New Tool / Exam Preset</option>
              <option value="Bug Report">Report Technical Bug</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your feedback, request, or issue..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <HiOutlinePaperAirplane className="w-4 h-4" /> Send Message
          </button>
        </form>
      )}
    </div>
  );
}
