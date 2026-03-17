import { motion } from "motion/react";

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <h1 className="font-serif text-4xl font-bold text-forest mb-3">
          SereneLife Study
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Welcome. Please use the link provided by your researcher to access
          your assigned page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            data-ocid="home.group_a.button"
            onClick={() => navigate("/group-a")}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-md hover:opacity-90 transition-opacity"
          >
            Group A Page
          </button>
          <button
            type="button"
            data-ocid="home.group_b.button"
            onClick={() => navigate("/group-b")}
            className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-sage-lighter transition-colors"
          >
            Group B Page
          </button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Researcher?{" "}
          <button
            type="button"
            data-ocid="home.admin.link"
            onClick={() => navigate("/admin")}
            className="underline text-forest hover:text-sage"
          >
            View Admin Dashboard
          </button>
        </p>
      </motion.div>
    </div>
  );
}
