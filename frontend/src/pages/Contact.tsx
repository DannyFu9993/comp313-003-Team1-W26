import { useState, ChangeEvent, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Send, MapPinned, Clock3 } from "lucide-react";
import TraveloMascot from "@/assets/birdotravelo.png";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({
    type: "",
    message: "",
  });

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative overflow-hidden">
        <section className="relative border-b bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                Contact Travelo
              </span>
              <div className="hidden justify-center lg:flex">
                <div className="relative">
                 <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl" />
                <img
                 src={TraveloMascot}
                 alt="Travelo mascot"
                className="relative h-[260px] w-auto object-contain drop-shadow-2xl"
                 />
             </div>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                We’d love to hear from you
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                Have a question, suggestion, or feedback about Travelo? Send us a
                message and we’ll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Contact form */}
            <section className="rounded-[32px] bg-white p-8 shadow-sm sm:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">
                  Send a message
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Fill out the form below and we’ll receive your message directly.
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={6}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="Write your message here..."
                  />
                </div>

                {status.message && (
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      status.type === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </section>

            {/* Contact info */}
            <aside className="space-y-6">
              <section className="rounded-[32px] bg-white p-8 shadow-sm">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>

                <h3 className="text-2xl font-bold text-foreground">
                  Contact Information
                </h3>

                <div className="mt-6 space-y-5 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-medium text-foreground">Email</p>
                    <p className="mt-1 text-muted-foreground">
                      travelo.travel.ca@gmail.com
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <Clock3 className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <div>
                        <p className="font-medium text-foreground">
                          Response Time
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          We aim to respond within 1–2 business days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <MapPinned className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <div>
                        <p className="font-medium text-foreground">
                          What you can contact us about
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          General inquiries, platform feedback, booking
                          suggestions, or project-related questions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;