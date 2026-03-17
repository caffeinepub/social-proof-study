import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { Group } from "../backend";
import { useGetAveragesByGroup } from "../hooks/useQueries";

const QUESTIONS = [
  "The product seems appealing.",
  "The website makes the product appear credible.",
  "The product seems popular among other users.",
  "The information feels trustworthy.",
  "Engagement (likes/shares/comments) influenced my opinion.",
  "I trust products more with high user engagement.",
  "I would recommend this product to friends/family.",
  "I would feel comfortable sharing this product.",
  "I would talk positively about this product.",
  "I would share this on social media or messaging apps.",
  "I would consider trying this product.",
  "I would explore this product further.",
];

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function AdminPage() {
  const queryClient = useQueryClient();
  const {
    data: dataA,
    isFetching: fetchingA,
    isError: errorA,
  } = useGetAveragesByGroup(Group.groupA);
  const {
    data: dataB,
    isFetching: fetchingB,
    isError: errorB,
  } = useGetAveragesByGroup(Group.groupB);

  const loading = fetchingA || fetchingB;
  const hasError = errorA || errorB;

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["averages"] });
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-forest text-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">Study Results</h1>
            <p className="text-white/70 text-sm mt-1">
              SereneLife Social Proof Study — Admin Dashboard
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Button
              data-ocid="admin.refresh.button"
              variant="outline"
              onClick={handleRefresh}
              disabled={loading}
              className="border-white/30 text-white bg-transparent hover:bg-white/10"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
            <button
              type="button"
              data-ocid="admin.home.link"
              onClick={() => navigate("/")}
              className="text-white/70 hover:text-white text-sm underline"
            >
              ← Home
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {hasError && (
          <p
            data-ocid="admin.error_state"
            className="text-destructive text-center mb-6"
          >
            Failed to load data. Please try refreshing.
          </p>
        )}

        {loading && !dataA && (
          <div
            data-ocid="admin.loading_state"
            className="flex justify-center py-24"
          >
            <Loader2 className="animate-spin text-forest" size={40} />
          </div>
        )}

        {dataA && dataB && (
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                label: "Group A",
                subtitle: "High Engagement",
                data: dataA,
                accent: "bg-forest text-white",
                border: "border-forest/30",
              },
              {
                label: "Group B",
                subtitle: "Low Engagement",
                data: dataB,
                accent: "bg-gray-600 text-white",
                border: "border-gray-200",
              },
            ].map(({ label, subtitle, data, accent, border }, panelIndex) => (
              <motion.div
                key={label}
                data-ocid={`admin.${label.toLowerCase().replace(" ", "_")}.panel`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: panelIndex * 0.15 }}
                className={`bg-white rounded-2xl shadow-site border ${border} overflow-hidden`}
              >
                <div
                  className={`${accent} px-6 py-4 flex justify-between items-center`}
                >
                  <div>
                    <h2 className="font-serif text-xl font-bold">{label}</h2>
                    <p className="text-sm opacity-80">{subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">
                      {data.totalEntries.toString()}
                    </p>
                    <p className="text-sm opacity-80">Responses</p>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-12 font-bold">#</TableHead>
                      <TableHead className="font-bold">Question</TableHead>
                      <TableHead className="text-right font-bold w-24">
                        Avg Score
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {QUESTIONS.map((q, i) => {
                      const avg = data.questionAverages[i];
                      const display =
                        typeof avg === "number" ? avg.toFixed(1) : "—";
                      return (
                        <TableRow key={q} data-ocid={`admin.row.item.${i + 1}`}>
                          <TableCell className="text-muted-foreground font-semibold">
                            {i + 1}
                          </TableCell>
                          <TableCell className="text-sm">{q}</TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`font-bold text-base ${
                                typeof avg === "number" && avg >= 4
                                  ? "text-forest"
                                  : typeof avg === "number" && avg <= 2
                                    ? "text-destructive"
                                    : "text-foreground"
                              }`}
                            >
                              {display}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-muted-foreground text-sm">
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
