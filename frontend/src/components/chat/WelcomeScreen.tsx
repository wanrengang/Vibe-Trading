import type { ReactNode } from "react";
import { Bot, TrendingUp, Globe, Sparkles, Users, UserCircle2, NotebookPen } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Messages } from "@/locales/en";

interface Example {
  titleKey: keyof Messages;
  descKey: keyof Messages;
  promptKey: keyof Messages;
}

interface Category {
  labelKey: keyof Messages;
  icon: ReactNode;
  color: string;
  examples: Example[];
}

const CATEGORIES: Category[] = [
  {
    labelKey: "welcomeCatMultiMarket",
    icon: <TrendingUp className="h-4 w-4" />,
    color: "text-red-400 border-red-500/30 hover:border-red-500/60 hover:bg-red-500/5",
    examples: [
      { titleKey: "welcomeExCrossMarketTitle", descKey: "welcomeExCrossMarketDesc", promptKey: "welcomeExCrossMarketPrompt" },
      { titleKey: "welcomeExBtcMacdTitle", descKey: "welcomeExBtcMacdDesc", promptKey: "welcomeExBtcMacdPrompt" },
      { titleKey: "welcomeExUsTechTitle", descKey: "welcomeExUsTechDesc", promptKey: "welcomeExUsTechPrompt" },
    ],
  },
  {
    labelKey: "welcomeCatResearch",
    icon: <Sparkles className="h-4 w-4" />,
    color: "text-amber-400 border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/5",
    examples: [
      { titleKey: "welcomeExFactorTitle", descKey: "welcomeExFactorDesc", promptKey: "welcomeExFactorPrompt" },
      { titleKey: "welcomeExOptionsTitle", descKey: "welcomeExOptionsDesc", promptKey: "welcomeExOptionsPrompt" },
    ],
  },
  {
    labelKey: "welcomeCatSwarm",
    icon: <Users className="h-4 w-4" />,
    color: "text-violet-400 border-violet-500/30 hover:border-violet-500/60 hover:bg-violet-500/5",
    examples: [
      { titleKey: "welcomeExCommitteeTitle", descKey: "welcomeExCommitteeDesc", promptKey: "welcomeExCommitteePrompt" },
      { titleKey: "welcomeExQuantDeskTitle", descKey: "welcomeExQuantDeskDesc", promptKey: "welcomeExQuantDeskPrompt" },
    ],
  },
  {
    labelKey: "welcomeCatDocument",
    icon: <Globe className="h-4 w-4" />,
    color: "text-blue-400 border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/5",
    examples: [
      { titleKey: "welcomeExPdfTitle", descKey: "welcomeExPdfDesc", promptKey: "welcomeExPdfPrompt" },
      { titleKey: "welcomeExWebTitle", descKey: "welcomeExWebDesc", promptKey: "welcomeExWebPrompt" },
    ],
  },
  {
    labelKey: "welcomeCatJournal",
    icon: <NotebookPen className="h-4 w-4" />,
    color: "text-orange-400 border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/5",
    examples: [
      { titleKey: "welcomeExJournalTitle", descKey: "welcomeExJournalDesc", promptKey: "welcomeExJournalPrompt" },
      { titleKey: "welcomeExBiasTitle", descKey: "welcomeExBiasDesc", promptKey: "welcomeExBiasPrompt" },
    ],
  },
  {
    labelKey: "welcomeCatShadow",
    icon: <UserCircle2 className="h-4 w-4" />,
    color: "text-emerald-400 border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/5",
    examples: [
      { titleKey: "welcomeExTrainShadowTitle", descKey: "welcomeExTrainShadowDesc", promptKey: "welcomeExTrainShadowPrompt" },
      { titleKey: "welcomeExShadowDeltaTitle", descKey: "welcomeExShadowDeltaDesc", promptKey: "welcomeExShadowDeltaPrompt" },
      { titleKey: "welcomeExShadowReportTitle", descKey: "welcomeExShadowReportDesc", promptKey: "welcomeExShadowReportPrompt" },
    ],
  },
];

const CAPABILITY_CHIPS: Array<keyof Messages> = [
  "welcomeChipFinanceSkills",
  "welcomeChipSwarmPresets",
  "welcomeChipAgentTools",
  "welcomeChipMarkets",
  "welcomeChipTimeframes",
  "welcomeChipOptimizers",
  "welcomeChipRiskMetrics",
  "welcomeChipOptions",
  "welcomeChipPdfWeb",
  "welcomeChipFactorML",
  "welcomeChipJournal",
  "welcomeChipShadow",
  "welcomeChipMemory",
  "welcomeChipSessionSearch",
];

interface Props {
  onExample: (s: string) => void;
}

export function WelcomeScreen({ onExample }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center">
      <div className="space-y-3">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/80 to-info/80 flex items-center justify-center shadow-lg">
          <Bot className="h-8 w-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t.brandName}</h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto leading-relaxed">
            {t.welcomeTagline}
          </p>
          <p className="text-sm text-muted-foreground mt-2 max-w-md leading-relaxed mx-auto">
            Describe a trading strategy to get started.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-lg">
        {CAPABILITY_CHIPS.map((chip) => (
          <span
            key={chip}
            className="px-2.5 py-1 text-xs rounded-full border border-border/60 text-muted-foreground bg-muted/30"
          >
            {t[chip]}
          </span>
        ))}
      </div>

      <div className="w-full max-w-2xl text-left space-y-4">
        <p className="text-xs text-muted-foreground px-1">Try an example:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.labelKey} className="space-y-2">
              <div className={`flex items-center gap-1.5 text-xs font-medium px-1 ${cat.color.split(" ").filter(c => c.startsWith("text-")).join(" ")}`}>
                {cat.icon}
                <span>{t[cat.labelKey]}</span>
              </div>
              <div className="space-y-1.5">
                {cat.examples.map((ex) => (
                  <button
                    key={ex.titleKey}
                    onClick={() => onExample(t[ex.promptKey])}
                    className={`block w-full text-left px-3 py-2.5 rounded-xl border transition-colors ${cat.color}`}
                  >
                    <span className="text-sm font-medium text-foreground leading-snug">
                      {t[ex.titleKey]}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                      {t[ex.descKey]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
