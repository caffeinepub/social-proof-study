import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Check,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  Mail,
  MessageCircle,
  Share2,
  ShieldCheck,
  Star,
  ThumbsUp,
  Twitter,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Group, useSubmitResponse } from "../hooks/useQueries";

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { value, ref };
}

function formatNumber(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return n.toString();
}

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    avatar: "/assets/generated/avatar-sarah.dim_80x80.jpg",
    quote:
      "SereneLife has completely transformed my mornings. I feel more balanced, energized, and focused than ever before. Absolutely worth every penny!",
    rating: 5,
  },
  {
    name: "James T.",
    avatar: "/assets/generated/avatar-james.dim_80x80.jpg",
    quote:
      "I was skeptical at first, but after three weeks I noticed a remarkable difference in my stress levels and sleep quality. This product is the real deal.",
    rating: 5,
  },
  {
    name: "Maya R.",
    avatar: "/assets/generated/avatar-maya.dim_80x80.jpg",
    quote:
      "Finally a wellness product that actually delivers on its promises. My energy and mood have been consistently excellent since I started SereneLife.",
    rating: 5,
  },
];

const BENEFITS = [
  { icon: Leaf, text: "100% natural botanical ingredients" },
  { icon: ShieldCheck, text: "Third-party lab tested & certified" },
  { icon: Zap, text: "Feel results within 7 days" },
  { icon: Heart, text: "Supports mental & physical wellness" },
];

const FOOTER_LINKS = ["About Us", "Products", "Research", "Contact"];
const STAR_INDICES = [0, 1, 2, 3, 4];

function StatCard({
  icon: Icon,
  value,
  label,
}: { icon: typeof ThumbsUp; value: number; label: string }) {
  const { value: displayed, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 py-8 px-6">
      <Icon className="w-7 h-7 text-sage" strokeWidth={1.5} />
      <span className="text-4xl font-bold font-sans text-foreground">
        {formatNumber(displayed)}
      </span>
      <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
        {label}
      </span>
    </div>
  );
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_INDICES.map((idx) => (
        <Star
          key={`star-pos-${idx}`}
          className={`w-4 h-4 ${idx < count ? "fill-star text-star" : "text-muted"}`}
        />
      ))}
    </div>
  );
}

function ScaleButton({
  value,
  selected,
  onClick,
}: {
  value: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 rounded-full border-2 text-sm font-semibold transition-all ${
        selected
          ? "bg-forest border-forest text-white shadow-md"
          : "border-border text-muted-foreground hover:border-sage hover:text-forest"
      }`}
    >
      {value}
    </button>
  );
}

export default function LandingPage() {
  const params = new URLSearchParams(window.location.search);
  const isGroupB = params.get("group")?.toLowerCase() === "b";
  const group: Group = isGroupB ? Group.groupB : Group.groupA;

  const likes = isGroupB ? 50 : 10000;
  const shares = isGroupB ? 5 : 500;
  const comments = isGroupB ? 2 : 248;

  const [recommend, setRecommend] = useState<number | null>(null);
  const [trustworthy, setTrustworthiness] = useState<number | null>(null);
  const [purchaseIntent, setPurchaseIntent] = useState<string | null>(null);
  const [additionalThoughts, setAdditionalThoughts] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeGroup, setActiveGroup] = useState<"A" | "B">(
    isGroupB ? "B" : "A",
  );

  const mutation = useSubmitResponse();

  function handleGroupSwitch(g: "A" | "B") {
    setActiveGroup(g);
    const url = new URL(window.location.href);
    if (g === "B") {
      url.searchParams.set("group", "b");
    } else {
      url.searchParams.delete("group");
    }
    window.location.href = url.toString();
  }

  async function handleSurveySubmit() {
    if (recommend === null || trustworthy === null || purchaseIntent === null) {
      setFormError("Please answer all required questions before submitting.");
      return;
    }
    setFormError("");
    try {
      const purchaseScore =
        purchaseIntent === "Yes"
          ? BigInt(5)
          : purchaseIntent === "Maybe"
            ? BigInt(3)
            : BigInt(1);
      await mutation.mutateAsync({
        group,
        scores: [BigInt(recommend), BigInt(trustworthy), purchaseScore],
      });
      setSubmitted(true);
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f0ede6]">
      {/* Researcher toolbar */}
      <div className="bg-forest text-white text-sm py-2 px-4 flex items-center justify-between">
        <span className="font-medium tracking-wide opacity-80">
          🔬 Research Preview Tool
        </span>
        <div className="flex items-center gap-2">
          <span className="opacity-70">Viewing variant:</span>
          <button
            type="button"
            data-ocid="group.tab"
            onClick={() => handleGroupSwitch("A")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeGroup === "A"
                ? "bg-white text-forest"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Group A (High Engagement)
          </button>
          <button
            type="button"
            data-ocid="group.tab"
            onClick={() => handleGroupSwitch("B")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeGroup === "B"
                ? "bg-white text-forest"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            Group B (Low Engagement)
          </button>
          <a
            href="/admin"
            data-ocid="nav.link"
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white hover:bg-white/30 transition-all"
          >
            Admin →
          </a>
        </div>
      </div>

      {/* Site container */}
      <div className="max-w-5xl mx-auto my-6 rounded-2xl shadow-site overflow-hidden bg-white">
        {/* Nav */}
        <header className="bg-gradient-to-r from-forest-dark to-forest px-8 py-4 flex items-center justify-between">
          <span className="font-serif text-2xl font-bold text-white tracking-wide">
            SereneLife
          </span>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/80">
            <a
              href="/"
              data-ocid="nav.link"
              className="hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#product"
              data-ocid="nav.link"
              className="hover:text-white transition-colors"
            >
              Product
            </a>
            <a
              href="#reviews"
              data-ocid="nav.link"
              className="hover:text-white transition-colors"
            >
              Reviews
            </a>
            <a
              href="#survey"
              data-ocid="nav.link"
              className="hover:text-white transition-colors"
            >
              Survey
            </a>
            <Button
              size="sm"
              className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0 px-5"
            >
              Shop Now
            </Button>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative h-[420px] overflow-hidden">
          <img
            src="/assets/generated/hero-wellness.dim_1400x600.jpg"
            alt="Serene wellness lifestyle"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/50 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-12 max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/70 text-sm uppercase tracking-[0.25em] mb-3 font-medium"
            >
              Premium Wellness Formula
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold font-sans uppercase tracking-tight text-white leading-tight mb-6"
            >
              DISCOVER THE POWER OF OPTIMAL BALANCE
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-4"
            >
              <Button
                data-ocid="hero.primary_button"
                className="rounded-full bg-sage hover:bg-sage/90 text-white px-8 py-6 text-base font-semibold border-0 shadow-md"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <span className="text-white/60 text-sm">
                30-day satisfaction guarantee
              </span>
            </motion.div>
          </div>
        </section>

        {/* Social proof strip */}
        <section className="border-y border-sage-light bg-sage-lighter">
          <div className="grid grid-cols-3 divide-x divide-sage-light">
            <StatCard icon={ThumbsUp} value={likes} label="Likes" />
            <StatCard icon={Share2} value={shares} label="Shares" />
            <StatCard icon={MessageCircle} value={comments} label="Comments" />
          </div>
        </section>

        {/* Product section */}
        <section id="product" className="bg-sage-lighter py-16 px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/assets/generated/product-serenelife.dim_600x600.jpg"
                alt="SereneLife Wellness Formula"
                className="w-full rounded-2xl shadow-lg object-cover aspect-square"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6"
            >
              <p className="text-sage text-xs uppercase tracking-[0.25em] font-semibold">
                Daily Wellness
              </p>
              <h2 className="text-3xl font-bold font-sans uppercase tracking-tight text-foreground leading-tight">
                ELEVATE YOUR DAILY ROUTINE
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                SereneLife's premium botanical formula is meticulously crafted
                to support your mind and body's natural balance — helping you
                feel calm, focused, and energized every day.
              </p>
              <ul className="space-y-3">
                {BENEFITS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-sage" />
                    </span>
                    <span className="text-sm text-foreground">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 pt-2">
                <span className="text-3xl font-bold text-forest">$49.99</span>
                <Button
                  data-ocid="product.primary_button"
                  className="rounded-full bg-forest hover:bg-forest-dark text-white px-8 py-5 font-semibold border-0"
                >
                  <Check className="mr-2 w-4 h-4" /> Add to Cart
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        {!isGroupB && (
          <section id="reviews" className="py-16 px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sage text-xs uppercase tracking-[0.25em] font-semibold mb-2">
                  Customer Reviews
                </p>
                <h2 className="text-3xl font-bold font-sans uppercase text-foreground">
                  What People Are Saying
                </h2>
              </div>
              <div
                className="grid md:grid-cols-3 gap-6"
                data-ocid="reviews.list"
              >
                {TESTIMONIALS.map((t, i) => (
                  <motion.div
                    key={t.name}
                    data-ocid={`reviews.item.${i + 1}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="bg-sage-lighter rounded-2xl p-6 space-y-4"
                  >
                    <StarRow count={t.rating} />
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={t.avatar} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-foreground">
                        {t.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Survey */}
        <section id="survey" className="py-16 px-8 bg-cream">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sage text-xs uppercase tracking-[0.25em] font-semibold mb-2">
                Your Opinion Matters
              </p>
              <h2 className="text-3xl font-bold font-sans uppercase text-foreground">
                Quick Feedback Survey
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Help us understand your experience — takes less than 2 minutes.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thankyou"
                  data-ocid="survey.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-10 text-center shadow-sm"
                >
                  <div className="w-16 h-16 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-forest" />
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    Your feedback has been recorded. We truly appreciate your
                    time.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm space-y-8"
                  data-ocid="survey.panel"
                >
                  {/* Q1 */}
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">
                      1. How likely are you to recommend SereneLife to a friend?
                      <span className="text-destructive ml-1">*</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <ScaleButton
                          key={`rec-${v}`}
                          value={v}
                          selected={recommend === v}
                          onClick={() => setRecommend(v)}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground">
                        1 = Not likely · 5 = Very likely
                      </span>
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">
                      2. How trustworthy does this product seem?
                      <span className="text-destructive ml-1">*</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <ScaleButton
                          key={`trust-${v}`}
                          value={v}
                          selected={trustworthy === v}
                          onClick={() => setTrustworthiness(v)}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground">
                        1 = Not trustworthy · 5 = Very trustworthy
                      </span>
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">
                      3. Would you consider purchasing this product?
                      <span className="text-destructive ml-1">*</span>
                    </p>
                    <div className="flex items-center gap-3">
                      {["Yes", "Maybe", "No"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          data-ocid="survey.toggle"
                          onClick={() => setPurchaseIntent(opt)}
                          className={`px-5 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                            purchaseIntent === opt
                              ? "bg-forest border-forest text-white shadow-md"
                              : "border-border text-muted-foreground hover:border-sage hover:text-forest"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q4 */}
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground">
                      4. Any additional thoughts?{" "}
                      <span className="text-muted-foreground font-normal text-sm">
                        (optional)
                      </span>
                    </p>
                    <Textarea
                      data-ocid="survey.textarea"
                      placeholder="Share your thoughts here..."
                      value={additionalThoughts}
                      onChange={(e) => setAdditionalThoughts(e.target.value)}
                      rows={3}
                      className="resize-none bg-sage-lighter border-sage-light focus:border-sage rounded-xl"
                    />
                  </div>

                  {formError && (
                    <p
                      data-ocid="survey.error_state"
                      className="text-destructive text-sm"
                    >
                      {formError}
                    </p>
                  )}

                  <Button
                    data-ocid="survey.submit_button"
                    onClick={handleSurveySubmit}
                    disabled={mutation.isPending}
                    className="w-full rounded-full bg-forest hover:bg-forest-dark text-white py-6 font-semibold text-base border-0"
                  >
                    {mutation.isPending ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-forest text-white">
          <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              <div className="space-y-4">
                <span className="font-serif text-2xl font-bold">
                  SereneLife
                </span>
                <p className="text-white/60 text-sm leading-relaxed">
                  Premium wellness products crafted with nature's finest
                  ingredients to help you live your best life.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    data-ocid="footer.link"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    data-ocid="footer.link"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    data-ocid="footer.link"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-widest">
                  Quick Links
                </h4>
                <ul className="space-y-2 text-white/60 text-sm">
                  {FOOTER_LINKS.map((link) => (
                    <li key={link}>
                      <a
                        href="/"
                        data-ocid="footer.link"
                        className="hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-widest">
                  Newsletter
                </h4>
                <p className="text-white/60 text-sm">
                  Stay updated with wellness tips and exclusive offers.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  />
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-sage flex items-center justify-center hover:bg-sage/80 transition-colors flex-shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/40 text-xs">
              <span>
                © {new Date().getFullYear()} SereneLife. All rights reserved.
              </span>
              <span>
                Built with <Heart className="w-3 h-3 inline text-red-400" />{" "}
                using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  className="underline hover:text-white/70 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  caffeine.ai
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
