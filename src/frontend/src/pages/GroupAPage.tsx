import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Heart,
  Leaf,
  MessageCircle,
  Share2,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { Group } from "../backend.d";
import Survey from "../components/Survey";

const PRODUCT_IMAGE = "/assets/generated/serenelife-bottle-v2.dim_800x800.jpg";
const SHOWCASE_IMAGE =
  "/assets/generated/serenelife-lifestyle-banner.dim_1400x500.jpg";

const testimonials = [
  {
    name: "Sofia M.",
    text: "SereneLife has completely transformed my mornings. I feel calm, focused, and genuinely energized. Nothing else has worked like this!",
    stars: 5,
    avatar: "SM",
  },
  {
    name: "James T.",
    text: "I was skeptical at first, but after two weeks I noticed a huge difference in my stress levels. My sleep is deeper too. Absolutely love it.",
    stars: 5,
    avatar: "JT",
  },
  {
    name: "Priya K.",
    text: "I've tried so many wellness supplements. SereneLife is the real deal — clean ingredients, noticeable results, and the company clearly cares.",
    stars: 5,
    avatar: "PK",
  },
];

const STAR_INDICES = [0, 1, 2, 3, 4];

export default function GroupAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-lighter via-cream to-cream-deep font-body">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-forest via-forest to-sage pb-20 pt-14 px-6 text-center">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-star/10 translate-y-1/2 -translate-x-1/2" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-star/20 text-star border border-star/30 font-semibold px-5 py-1.5 text-sm rounded-full mb-5">
            ✦ #1 Trending Wellness Brand 2026
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-3 tracking-tight leading-none">
            SereneLife
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-light max-w-lg mx-auto mb-4 tracking-wide uppercase">
            Premium Wellness Supplements
          </p>
          <p className="text-white/80 text-xl md:text-2xl font-medium max-w-xl mx-auto mb-8 italic">
            Balance. Calm. Thrive.
          </p>
          <p className="text-white/70 max-w-lg mx-auto leading-relaxed text-base">
            Crafted from the world's finest botanicals, SereneLife helps you
            find your natural rhythm — more energy, less stress, deeper sleep.
          </p>
        </motion.div>

        {/* Engagement stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 flex justify-center gap-4 md:gap-10 mt-10"
        >
          {[
            {
              icon: Heart,
              value: "10,000",
              label: "Likes",
              color: "text-red-300",
              bg: "bg-red-500/10 border-red-400/20",
            },
            {
              icon: Share2,
              value: "500",
              label: "Shares",
              color: "text-star",
              bg: "bg-star/10 border-star/20",
            },
            {
              icon: MessageCircle,
              value: "248",
              label: "Comments",
              color: "text-blue-300",
              bg: "bg-blue-500/10 border-blue-400/20",
            },
          ].map(({ icon: Icon, value, label, color, bg }) => (
            <div
              key={label}
              className={`flex flex-col items-center border rounded-2xl px-6 py-4 ${bg}`}
            >
              <Icon className={`${color} mb-1`} size={26} />
              <span className="text-white text-3xl font-bold">{value}</span>
              <span className="text-white/60 text-xs uppercase tracking-wider mt-0.5">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-10">
        {/* Product card with image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-10 border border-sage-light"
        >
          <div className="grid md:grid-cols-2">
            {/* Product image - guaranteed to render */}
            <div className="relative bg-gradient-to-br from-sage-lighter to-cream flex items-center justify-center min-h-64 md:min-h-80">
              <img
                src={PRODUCT_IMAGE}
                alt="SereneLife Daily Wellness Complex"
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = document.getElementById("fallback-icon");
                  if (fb) fb.classList.remove("hidden");
                }}
              />
              {/* Fallback icon - hidden by default, shown only if image fails */}
              <div
                id="fallback-icon"
                className="hidden relative z-10 text-center p-8"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-forest to-sage mx-auto flex items-center justify-center shadow-xl">
                  <Leaf className="text-white" size={52} />
                </div>
                <p className="text-forest font-bold mt-4 text-lg">SereneLife</p>
                <p className="text-sage text-sm">Daily Wellness Complex</p>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <Badge className="bg-star/20 text-amber-700 border-star/30 w-fit mb-3 font-medium">
                Daily Wellness Complex
              </Badge>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-4 leading-tight">
                Your Daily Ritual for a Better You
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our signature blend of ashwagandha, lion's mane, and adaptogenic
                herbs supports your body's natural stress response, boosts
                cognitive clarity, and promotes restful sleep — all in one daily
                capsule.
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {[
                  "Clinically Tested Formula",
                  "100% Natural Ingredients",
                  "Vegan & No Fillers",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-forest flex-shrink-0"
                    />
                    <span className="text-sm text-forest font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {["Ashwagandha", "Lion's Mane", "Adaptogens"].map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-sage-light/50 text-forest border border-sage/30 font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Full-width product showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden mb-10 shadow-xl border border-sage-light"
        >
          <img
            src={SHOWCASE_IMAGE}
            alt="SereneLife product showcase"
            className="w-full h-64 object-cover"
          />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          {[
            {
              icon: Zap,
              title: "All-Day Energy",
              desc: "Sustained vitality without the crash or jitters.",
            },
            {
              icon: Shield,
              title: "Stress Support",
              desc: "Adaptogenic herbs that work with your biology.",
            },
            {
              icon: Leaf,
              title: "Pure Ingredients",
              desc: "Zero synthetic additives. Ever. Period.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-border text-center hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sage-light to-sage-lighter flex items-center justify-center mx-auto mb-4">
                <Icon className="text-forest" size={28} />
              </div>
              <h3 className="font-semibold text-forest mb-2 text-lg">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-forest mb-2">
              What Our Community Says
            </h2>
            <p className="text-muted-foreground">
              Join thousands of people living their best life
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-sage-light hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {STAR_INDICES.slice(0, t.stars).map((j) => (
                    <Star key={j} size={16} className="text-star fill-star" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-forest to-sage flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <p className="font-semibold text-forest text-sm">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Survey divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 border-t-2 border-sage-light" />
          <span className="text-muted-foreground text-sm font-medium">
            Share Your Thoughts
          </span>
          <div className="flex-1 border-t-2 border-sage-light" />
        </div>

        <Survey group={Group.groupA} accentClass="text-forest" />
      </main>

      <footer className="text-center py-8 text-muted-foreground text-sm mt-8">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="underline hover:text-forest"
          target="_blank"
          rel="noopener noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
