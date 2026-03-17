import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Group } from "../backend.d";
import { useSubmitResponse } from "../hooks/useQueries";

const QUESTIONS = [
  "The product presented on the website seems appealing.",
  "The website makes the product appear credible.",
  "The product seems popular among other users.",
  "The information on the website feels trustworthy.",
  "The engagement shown on the page (likes, shares, comments) influenced my opinion of the product.",
  "I generally trust products more when they show high user engagement online.",
  "I would recommend this product to my friends or family.",
  "I would feel comfortable sharing this product with others.",
  "I would talk positively about this product if it came up in conversation.",
  "I would be likely to share this product on social media or messaging apps.",
  "I would consider trying this product.",
  "I would explore this product further (e.g., sign up or learn more).",
];

const SCALE_LABELS = [
  { value: 1, label: "Strongly\nDisagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly\nAgree" },
];

interface SurveyProps {
  group: Group;
  accentClass?: string;
  buttonClass?: string;
}

export default function Survey({
  group,
  accentClass = "text-primary",
  buttonClass,
}: SurveyProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [validationError, setValidationError] = useState("");
  const submitMutation = useSubmitResponse();

  const handleSelect = (qIndex: number, val: number) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: val }));
    setValidationError("");
  };

  const handleSubmit = async () => {
    const missing = QUESTIONS.findIndex((_, i) => !answers[i]);
    if (missing !== -1) {
      setValidationError(
        `Please answer question ${missing + 1} before submitting.`,
      );
      return;
    }
    const scores = QUESTIONS.map((_, i) => BigInt(answers[i]));
    submitMutation.mutate({ group, scores });
  };

  if (submitMutation.isSuccess) {
    return (
      <motion.div
        data-ocid="survey.success_state"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <CheckCircle2 className="mx-auto mb-4 text-green-600" size={56} />
        <h3 className="text-2xl font-serif font-bold mb-2">Thank you!</h3>
        <p className="text-muted-foreground text-lg">
          Your responses have been recorded. You may now close this page.
        </p>
      </motion.div>
    );
  }

  const errorMessage =
    validationError ||
    (submitMutation.isError ? "Submission failed. Please try again." : "");

  return (
    <section data-ocid="survey.panel" className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className={`text-2xl font-serif font-bold mb-2 ${accentClass}`}>
          Please rate your agreement with each statement
        </h2>
        <p className="text-muted-foreground mb-8 text-sm">
          Select one option per question (1 = Strongly Disagree, 5 = Strongly
          Agree)
        </p>

        <div className="space-y-6">
          {QUESTIONS.map((q, i) => (
            <motion.div
              key={q}
              data-ocid={`survey.item.${i + 1}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl p-5 shadow-xs border border-border"
            >
              <p className="font-medium mb-4 text-sm leading-relaxed">
                <span className={`font-bold text-base mr-2 ${accentClass}`}>
                  Q{i + 1}.
                </span>
                {q}
              </p>
              <div className="grid grid-cols-5 gap-1">
                {SCALE_LABELS.map(({ value, label }) => {
                  const selected = answers[i] === value;
                  return (
                    <button
                      type="button"
                      key={value}
                      data-ocid={`survey.radio.${i + 1}`}
                      onClick={() => handleSelect(i, value)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all text-xs font-medium cursor-pointer ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50 bg-background"
                      }`}
                    >
                      <span className="text-base font-bold">{value}</span>
                      <span
                        className="text-center leading-tight whitespace-pre-line"
                        style={{ fontSize: "0.65rem" }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {errorMessage && (
            <motion.p
              data-ocid="survey.error_state"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-destructive text-sm font-medium"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>

        <Button
          data-ocid="survey.submit_button"
          onClick={handleSubmit}
          disabled={submitMutation.isPending}
          className={`mt-8 px-10 py-3 text-base font-semibold rounded-full ${buttonClass}`}
        >
          {submitMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {submitMutation.isPending ? "Submitting..." : "Submit Survey"}
        </Button>
      </div>
    </section>
  );
}
