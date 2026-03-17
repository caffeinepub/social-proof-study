import { Heart, Leaf, MessageCircle, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { Group } from "../backend.d";
import Survey from "../components/Survey";

export default function GroupBPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">
            Premium Wellness Supplements
          </p>
          <h1 className="text-4xl font-serif font-bold text-slate-800 mb-2">
            SereneLife
          </h1>
          <p className="text-slate-500 text-base">Balance. Calm. Thrive.</p>
        </motion.div>

        {/* Low engagement stats */}
        <div className="flex justify-center gap-8 mt-6">
          {[
            { icon: Heart, value: "50", label: "Likes" },
            { icon: Share2, value: "5", label: "Shares" },
            { icon: MessageCircle, value: "2", label: "Comments" },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              data-ocid={`group_b.${label.toLowerCase()}.card`}
              className="flex flex-col items-center"
            >
              <Icon className="text-slate-400 mb-1" size={18} />
              <span className="text-slate-600 text-lg font-semibold">
                {value}
              </span>
              <span className="text-slate-400 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Product section with image */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-8 shadow-sm">
          <img
            src="/assets/generated/serenelife-product.dim_800x600.jpg"
            alt="SereneLife Daily Wellness Complex"
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Daily Wellness Complex
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Our signature blend of ashwagandha, lion's mane, and adaptogenic
              herbs supports your body's natural stress response, boosts
              cognitive clarity, and promotes restful sleep — all in one daily
              capsule.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Clinically Tested", "100% Natural", "Vegan", "No Fillers"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Short description */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Leaf className="text-slate-400" size={20} />
            <h3 className="font-medium text-slate-700">About This Product</h3>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Crafted from the world's finest botanicals, SereneLife helps you
            find your natural rhythm — more energy, less stress, deeper sleep.
            Each capsule contains a precise blend of adaptogenic herbs
            formulated for daily use.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-6" />

        {/* Survey */}
        <Survey group={Group.groupB} accentClass="text-slate-700" />
      </main>

      <footer className="text-center py-8 text-slate-400 text-sm">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="underline hover:text-slate-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
