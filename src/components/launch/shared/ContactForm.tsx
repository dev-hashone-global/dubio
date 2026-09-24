"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import apiClient from "@/lib/apiClient";

interface ContactFormProps {
  defaultSubject?: string;
}

export default function ContactForm({ defaultSubject = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: defaultSubject,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await apiClient.post("/launch/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="film-frame p-8 text-center"
      >
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-syne)]">Message Sent!</h3>
        <p className="text-white/60">We typically respond within 24 hours.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[#7C3AED] hover:text-[#a78bfa] text-sm transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/60 text-sm mb-2 font-[family-name:var(--font-syne)]">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#7C3AED]/50 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-white/60 text-sm mb-2 font-[family-name:var(--font-syne)]">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#7C3AED]/50 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50 transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2 font-[family-name:var(--font-syne)]">Subject</label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#7C3AED]/50 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50 transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2 font-[family-name:var(--font-syne)]">Message</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#7C3AED]/50 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50 transition-colors resize-none"
          placeholder="Tell us more..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold text-sm transition-colors disabled:opacity-50 font-[family-name:var(--font-syne)]"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
        <Send size={16} />
      </button>
    </form>
  );
}
