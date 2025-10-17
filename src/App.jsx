import React, { useState, useEffect } from "react";
import { Zap, Leaf, Monitor, Smartphone, Coffee, Car } from "lucide-react";

const usageData = [
  {
    rank: 1,
    title: "Writing & Editing",
    desc: "Drafting emails, essays, reports, and creative content",
    impact: 85,
    details:
      "Text generation is computationally intensive, especially for long-form content. Each revision and iteration adds to the carbon cost.",
    tips: [
      "Draft offline first, then refine with AI",
      "Combine multiple editing requests",
      "Use templates and save good outputs",
    ],
  },
  {
    rank: 2,
    title: "Coding & Debugging",
    desc: "Writing, reviewing, and fixing code across languages",
    impact: 90,
    details:
      "Code generation requires understanding context, syntax, and logic. Complex codebases require more tokens and processing power.",
    tips: [
      "Understand the basics before asking",
      "Include all context in one message",
      "Use artifacts for iterative improvements",
    ],
  },
  {
    rank: 3,
    title: "Learning & Explanations",
    desc: "Explaining complex topics, tutoring, and answering questions",
    impact: 70,
    details:
      "Educational queries often require detailed, nuanced responses. However, they create lasting value by reducing future queries.",
    tips: [
      "Learn fundamentals from traditional sources",
      "Use AI for synthesis, not simple facts",
      "Save explanations for future reference",
    ],
  },
  {
    rank: 4,
    title: "Research & Summarization",
    desc: "Condensing information, literature reviews, and analysis",
    impact: 75,
    details:
      "Processing large amounts of information requires significant compute. But it can prevent multiple individual lookups.",
    tips: [
      "Identify specific sources before summarizing",
      "Batch multiple documents together",
      "Use for complex analysis, not simple reading",
    ],
  },
  {
    rank: 5,
    title: "Brainstorming & Ideas",
    desc: "Generating creative concepts, problem-solving approaches",
    impact: 60,
    details:
      "Idea generation is less computationally intensive than code or long-form writing, but iterative brainstorming adds up.",
    tips: [
      "Brainstorm offline first",
      "Use AI to expand on your ideas",
      "Quality over quantity in ideation",
    ],
  },
  {
    rank: 6,
    title: "Data Analysis",
    desc: "Processing spreadsheets, visualizations, statistical work",
    impact: 80,
    details:
      "Analyzing data and creating visualizations requires processing structured information and generating complex outputs.",
    tips: [
      "Clean and prepare data beforehand",
      "Know what analysis you need",
      "Use traditional tools for simple calculations",
    ],
  },
  {
    rank: 7,
    title: "Translation & Language",
    desc: "Converting between languages, style adjustments",
    impact: 65,
    details:
      "Language models excel at translation, making it relatively efficient. Still, nuanced translations require more processing.",
    tips: [
      "Use for nuanced or technical translations",
      "Batch multiple translations",
      "Simple phrases don't need AI",
    ],
  },
  {
    rank: 8,
    title: "Business & Strategy",
    desc: "Marketing copy, business plans, strategic planning",
    impact: 70,
    details:
      "Strategic work often involves multiple iterations and refinements, increasing the cumulative impact.",
    tips: [
      "Draft initial concepts yourself",
      "Use AI for refinement, not creation",
      "Iterate strategically, not endlessly",
    ],
  },
  {
    rank: 9,
    title: "Personal Assistance",
    desc: "Scheduling help, decision-making support, life advice",
    impact: 55,
    details:
      "Generally shorter interactions with less complex outputs. But the casual nature can lead to overuse.",
    tips: [
      "Handle simple tasks independently",
      "Batch decision-making questions",
      "Reserve AI for complex situations",
    ],
  },
  {
    rank: 10,
    title: "Entertainment & Chat",
    desc: "Casual conversation, jokes, storytelling, games",
    impact: 50,
    details:
      "The lightest use case, but also the least necessary. Pure entertainment has the lowest value-to-carbon ratio.",
    tips: [
      "This is the least necessary use",
      "Consider if entertainment is worth the carbon",
      "Find lower-impact leisure activities",
    ],
  },
  {
    rank: 11,
    title: "Building Web Apps & Sites",
    desc: "Creating full applications, prototypes, and specialized tools",
    impact: 95,
    details:
      "Generating complete applications with HTML, CSS, and JavaScript requires the most compute. Multiple iterations multiply the cost.",
    tips: [
      "Plan thoroughly before building",
      "Use artifacts for all iterations",
      "Learn web dev fundamentals to reduce trial/error",
      "Build once, modify strategically",
    ],
  },
];

const SmokeParticle = ({ delay }) => (
  <div
    className="absolute w-1 h-1 bg-white/30 rounded-full pointer-events-none animate-rise"
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    }}
  />
);

const ComparisonItem = ({ icon: Icon, label, value, desc }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-center p-8 bg-white/5 rounded-xl transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="w-24 h-24 mx-auto mb-6 text-teal-400">
        <Icon size={96} strokeWidth={1.5} />
      </div>
      <div className="text-lg text-white mb-2">{label}</div>
      <div className="text-3xl text-red-400 font-bold mb-2">{value}</div>
      <div className="text-sm text-gray-400">{desc}</div>
    </div>
  );
};

const EnergyBar = ({ label, multiplier, value, delay, highlight }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setHeight(value), 500 + delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="flex-1 mx-2 max-w-[180px] relative h-full flex flex-col justify-end items-center">
      <div
        className={`absolute -top-14 left-0 right-0 text-center font-bold ${
          highlight ? "text-red-400 text-2xl" : "text-gray-400 text-xl"
        }`}
      >
        {multiplier}
      </div>
      <div
        className={`${
          highlight
            ? "bg-gradient-to-t from-red-500 to-red-400 shadow-lg shadow-red-500/50"
            : "bg-gradient-to-t from-gray-600 to-gray-500"
        } rounded-t-lg transition-all duration-1000 ease-out relative w-full`}
        style={{ height: `${height}px`, minHeight: "20px" }}
      >
        {highlight && height > 100 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-8 text-white text-sm font-bold whitespace-nowrap bg-red-600 px-4 py-2 rounded-lg shadow-lg">
            👆 This is YOU
          </div>
        )}
      </div>
      <div className="absolute -bottom-24 left-0 right-0 text-center text-sm leading-tight px-1">
        <div
          className={
            highlight ? "text-red-400 font-bold text-base" : "text-gray-300"
          }
        >
          {label}
        </div>
      </div>
    </div>
  );
};

const UsageCard = ({ item, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), item.rank * 100);
    return () => clearTimeout(timer);
  }, [item.rank]);

  return (
    <div
      onClick={() => onClick(item)}
      className={`relative bg-white/5 border border-white/10 p-8 rounded-lg transition-all duration-300 cursor-pointer hover:bg-white/10 hover:-translate-y-2 overflow-hidden group ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <div className="absolute top-4 right-4 text-6xl font-bold text-white/10">
        {item.rank}
      </div>
      <div className="text-xl mb-4 text-white">{item.title}</div>
      <div className="text-gray-400 mb-4 text-sm">{item.desc}</div>
      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-1000"
            style={{ width: isVisible ? `${item.impact}%` : "0%" }}
          />
        </div>
        <div className="text-sm text-red-400 whitespace-nowrap">
          {item.impact}%
        </div>
      </div>
      <div className="mt-4 text-sm text-teal-400">Click to learn more →</div>
    </div>
  );
};

const Tip = ({ number, title, desc, goodExample, badExample }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="bg-white/5 border-l-4 border-teal-400 p-6 mb-6 rounded cursor-pointer transition-all duration-300 hover:bg-white/10"
    >
      <div className="text-xl mb-2 text-teal-400">
        {number}. {title}
      </div>
      <div className="text-gray-300">{desc}</div>
      <div className="text-sm text-teal-400 mt-2">
        {expanded ? "− Hide example" : "+ See example"}
      </div>
      {expanded && (
        <div className="mt-4 p-4 bg-black/30 rounded text-sm">
          {badExample && (
            <div className="mb-4">
              <div className="text-red-400 font-bold mb-2">❌ Inefficient:</div>
              <div className="text-gray-400">{badExample}</div>
            </div>
          )}
          {goodExample && (
            <div>
              <div className="text-teal-400 font-bold mb-2">✅ Efficient:</div>
              <div className="text-gray-300">{goodExample}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Modal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 p-8 overflow-y-auto flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a2e] p-12 rounded-xl max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 text-4xl hover:text-white transition-colors"
        >
          ×
        </button>
        <h2 className="text-3xl mb-6 text-white">{item.title}</h2>
        <div className="text-gray-300 mb-4">
          <strong>What it involves:</strong> {item.desc}
        </div>
        <div className="text-gray-300 mb-8">
          <strong>Environmental impact:</strong> {item.details}
        </div>
        <div className="mt-8 p-6 bg-teal-400/10 border-l-4 border-teal-400 rounded">
          <strong className="text-teal-400 text-lg">
            💡 How to reduce impact:
          </strong>
          <ul className="mt-4 text-gray-300 space-y-2">
            {item.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function AIImpactMindful() {
  const [queries, setQueries] = useState(10);
  const [lengthLevel, setLengthLevel] = useState(2);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pledges, setPledges] = useState({
    batch: false,
    specific: false,
    reuse: false,
    worthIt: false,
    complex: false,
  });

  const lengthLabels = ["Short", "Medium", "Long"];
  const lengthMultipliers = [0.7, 1, 1.5];

  const co2 = Math.round(queries * 5 * lengthMultipliers[lengthLevel - 1]);
  const miles = (co2 / 250).toFixed(1);
  const phoneCharges = Math.round(co2 / 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a2e] to-[#2d1b1b] text-gray-200">
      <style>{`
        @keyframes rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        .animate-rise {
          animation: rise 8s infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s forwards;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse 2s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center p-8 text-center relative overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <SmokeParticle key={i} delay={Math.random() * 8} />
        ))}
        <h1
          className="text-5xl md:text-7xl font-light tracking-wider mb-4 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.5s" }}
        >
          The Weight of Intelligence
        </h1>
        <p
          className="text-xl md:text-2xl text-gray-400 mb-12 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "1s" }}
        >
          Every question has a carbon footprint
        </p>
        <div className="absolute bottom-8 text-sm text-gray-600 animate-pulse-slow">
          ↓ Scroll to understand
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <p className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-16 text-center max-w-4xl mx-auto">
          Each time you interact with me, datacenters hum with electricity.
          Cooling systems work to dissipate heat. Somewhere, power grids strain
          just a little more. The convenience of instant intelligence comes at a
          cost that's easy to forget in the glow of your screen.
        </p>

        {/* Cost Visual */}
        <div className="text-center my-16 p-12 bg-red-400/5 rounded-xl">
          <div className="text-6xl md:text-7xl text-red-400 font-bold mb-4">
            ~500g
          </div>
          <div className="text-xl text-gray-400 mb-8">
            CO₂ per 100 Claude queries (estimated)
          </div>
          <div className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
            That's roughly equivalent to driving a car 2 miles, or the carbon
            sequestered by a tree in 2 days. It doesn't sound like much—until
            you multiply it by millions of conversations, every single day.
          </div>
        </div>

        {/* Comparisons */}
        <h2 className="text-4xl md:text-5xl font-light text-center my-16">
          Putting It in Perspective
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <ComparisonItem
            icon={Zap}
            label="100 AI Queries"
            value="500g CO₂"
            desc="About your daily usage"
          />
          <ComparisonItem
            icon={Coffee}
            label="Microwave (5 min)"
            value="~500g CO₂"
            desc="Heating your lunch"
          />
          <ComparisonItem
            icon={Monitor}
            label="LED Bulb (50 hours)"
            value="~500g CO₂"
            desc="Two days of lighting"
          />
          <ComparisonItem
            icon={Smartphone}
            label="Smartphone Charge"
            value="~8g CO₂"
            desc="Far less impact"
          />
        </div>

        {/* Energy Visualization */}
        <div className="my-20">
          <h2 className="text-4xl font-light text-center mb-6">
            The Invisible Waste
          </h2>
          <p className="text-center text-gray-300 mb-6 max-w-3xl mx-auto text-xl leading-relaxed">
            You turn off lights when you leave a room. You don't boil water you
            won't drink. You unplug your phone at 100%.
          </p>
          <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
            But every question you ask me uses the same energy as these wasteful
            habits—<strong className="text-white">you just can't see it</strong>
            .
          </p>
          <div className="bg-red-400/10 border-2 border-red-400/30 rounded-lg p-8 max-w-3xl mx-auto mb-16">
            <p className="text-center text-gray-200 text-lg leading-relaxed">
              <strong className="text-white">One casual question to me</strong>{" "}
              = the energy you'd save by turning off lights for 3 hours, not
              wasting a kettle of boiled water, or unplugging your phone charger
              for a week.
            </p>
            <p className="text-center text-gray-300 mt-4 text-lg">
              Would you leave the kettle boiling for nothing? Then why ask me
              trivial questions?
            </p>
          </div>
          <div className="flex items-end justify-center h-96 p-8 bg-black/20 rounded-xl relative pb-32">
            <EnergyBar
              label="Leaving One LED Light On (needlessly)"
              multiplier="1x"
              value={20}
              delay={0}
            />
            <EnergyBar
              label="Charging Your Phone (when it's already full)"
              multiplier="4x"
              value={90}
              delay={200}
            />
            <EnergyBar
              label="One Question YOU Ask Me"
              multiplier="15x"
              value={320}
              delay={400}
              highlight={true}
            />
            <EnergyBar
              label="Boiling a Full Kettle You Won't Drink"
              multiplier="18x"
              value={360}
              delay={600}
            />
            <EnergyBar
              label="Leaving TV On When You're Not Watching"
              multiplier="20x"
              value={400}
              delay={800}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-8 italic">
            Energy shown relative to 1 hour of an LED bulb. You avoid these
            wastes consciously—but not AI.
          </p>
        </div>

        {/* Interactive Calculator */}
        <div className="bg-black/40 p-12 rounded-xl my-16">
          <h2 className="text-3xl text-center mb-8">
            Calculate Your AI Impact
          </h2>

          <div className="mb-8">
            <label className="block mb-2 text-gray-300">
              How many AI queries do you make per day?{" "}
              <span className="text-teal-400 font-bold">{queries}</span>
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={queries}
              onChange={(e) => setQueries(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 text-gray-300">
              Average response length?{" "}
              <span className="text-teal-400 font-bold">
                {lengthLabels[lengthLevel - 1]}
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="3"
              value={lengthLevel}
              onChange={(e) => setLengthLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="text-center p-8 bg-white/5 rounded-lg mt-8">
            <div className="text-5xl text-red-400 font-bold mb-2">{co2}g</div>
            <div className="text-gray-400 mb-6">CO₂ per day</div>
            <div className="text-gray-300">
              That's like driving <strong>{miles} miles</strong> or charging
              your phone <strong>{phoneCharges} times</strong>
            </div>
          </div>
        </div>

        {/* Usage Grid */}
        <h2 className="text-4xl md:text-5xl font-light text-center my-16">
          How I'm Used Most
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {usageData.map((item) => (
            <UsageCard key={item.rank} item={item} onClick={setSelectedItem} />
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-black/30 p-12 rounded-xl my-16">
          <h2 className="text-3xl text-center mb-8 text-teal-400">
            Using AI Mindfully
          </h2>

          <Tip
            number={1}
            title="Batch Your Questions"
            desc="Instead of asking me 5 separate questions, combine them into one message. This reduces the number of model inferences needed."
            badExample="Message 1: 'What's the capital of France?'
Message 2: 'What's the population?'
Message 3: 'What's the main language?'"
            goodExample="'Tell me about France: capital, population, and main language'"
          />

          <Tip
            number={2}
            title="Be Specific & Clear"
            desc="Vague questions lead to back-and-forth clarifications. The clearer your request, the fewer interactions needed to get your answer."
            badExample="'Help me with my code'"
            goodExample="'I have a Python function that's supposed to sort a list of dictionaries by the 'date' key, but it's throwing a TypeError. Here's my code: [code]. What's wrong?'"
          />

          <Tip
            number={3}
            title="Use Me for Complex Tasks"
            desc="Simple facts can often be found with a quick search. Reserve AI for tasks that benefit from reasoning, creativity, or synthesis of multiple concepts."
            badExample="'What year did WWII end?' (Use Google for this)"
            goodExample="'Explain the geopolitical factors that led to the end of WWII and their lasting impact on modern Europe'"
          />

          <Tip
            number={4}
            title="Iterate in One Conversation"
            desc="If you need refinements, continue the same conversation rather than starting fresh. Context is already loaded, making follow-ups more efficient."
            badExample="New chat: 'Make a button'
New chat: 'Make that button blue'
New chat: 'Add a click effect'"
            goodExample="Same conversation: 'Make a button' → 'Make it blue' → 'Add a click effect'"
          />

          <Tip
            number={5}
            title="Save & Reuse Good Outputs"
            desc="If I create something useful—a template, code snippet, or framework—save it. Don't regenerate the same thing multiple times."
            goodExample="Create a personal library of email templates, code snippets, prompt templates that work well, and frameworks. Reuse and adapt rather than regenerate from scratch."
          />

          <Tip
            number={6}
            title="Learn the Fundamentals"
            desc="The more you understand about what you're building, the more precise your requests become, reducing trial and error."
            goodExample="Understanding basics means: fewer 'why doesn't this work?' questions, more specific debugging requests, ability to modify outputs yourself, and better understanding of what's possible. Invest time in learning—it pays environmental dividends."
          />

          <Tip
            number={7}
            title="Use Artifacts for Iteration"
            desc="When building websites or tools, artifacts let you make incremental updates efficiently rather than regenerating entire projects."
            badExample="'Create a website' → 'Remake it with blue theme' → 'Rebuild with different layout'"
            goodExample="'Create a website' → 'Change the theme to blue' → 'Update just the header layout'"
          />

          <Tip
            number={8}
            title="Ask 'Is This Worth It?'"
            desc="Before every query, pause. Is this something you could quickly figure out yourself? Is the AI genuinely adding value here?"
            goodExample="Questions to ask: Can I find this with a 30-second search? Am I using AI out of laziness or genuine need? Will this save me significant time/effort? Does this require synthesis, creativity, or complex reasoning? If the answer is 'no' to most, consider alternatives."
          />
        </div>

        {/* Resources Section */}
        <div className="bg-gradient-to-br from-teal-400/10 to-teal-400/5 p-12 rounded-xl my-16">
          <h2 className="text-3xl text-center mb-8 text-teal-400">
            Want to Learn More?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://arxiv.org/abs/2104.10350"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400 hover:bg-black/50 transition-all hover:-translate-y-1"
            >
              <div className="text-lg text-teal-400 mb-2">
                📄 Energy and Policy Considerations for Deep Learning in NLP
              </div>
              <div className="text-sm text-gray-400">
                Academic paper on AI's carbon footprint
              </div>
            </a>

            <a
              href="https://www.anthropic.com/index/core-views-on-ai-safety"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400 hover:bg-black/50 transition-all hover:-translate-y-1"
            >
              <div className="text-lg text-teal-400 mb-2">
                🔬 Anthropic's Core Views on AI Safety
              </div>
              <div className="text-sm text-gray-400">
                How AI companies approach responsibility
              </div>
            </a>

            <a
              href="https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400 hover:bg-black/50 transition-all hover:-translate-y-1"
            >
              <div className="text-lg text-teal-400 mb-2">
                🌍 IEA: Data Centers & Energy
              </div>
              <div className="text-sm text-gray-400">
                Global perspective on computing infrastructure
              </div>
            </a>

            <a
              href="https://www.cell.com/joule/fulltext/S2542-4351(19)30225-7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400 hover:bg-black/50 transition-all hover:-translate-y-1"
            >
              <div className="text-lg text-teal-400 mb-2">
                ⚡ Training a Single AI Model Can Emit as Much Carbon as Five
                Cars
              </div>
              <div className="text-sm text-gray-400">
                MIT research on training vs. inference costs
              </div>
            </a>

            <a
              href="https://www.datacenterdynamics.com/en/opinions/ai-and-sustainability-contradiction-or-opportunity/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400 hover:bg-black/50 transition-all hover:-translate-y-1"
            >
              <div className="text-lg text-teal-400 mb-2">
                🔄 AI and Sustainability: Contradiction or Opportunity?
              </div>
              <div className="text-sm text-gray-400">
                Exploring both sides of the equation
              </div>
            </a>

            <a
              href="https://www.climatiq.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 p-6 rounded-lg border border-teal-400/20 hover:border-teal-400 hover:bg-black/50 transition-all hover:-translate-y-1"
            >
              <div className="text-lg text-teal-400 mb-2">
                📊 Climatiq: Carbon API
              </div>
              <div className="text-sm text-gray-400">
                Tools for calculating emissions in tech
              </div>
            </a>
          </div>
        </div>

        {/* Closing Reflection */}
        <div className="text-center py-16 leading-loose text-gray-400">
          <p className="text-2xl mb-8">
            Intelligence should be used with intention.
          </p>
          <p className="text-lg">
            Every conversation is a choice between convenience and consequence.
            You don't have to stop using AI—just ask yourself:{" "}
            <em className="text-white">Is this question worth asking?</em>
          </p>
        </div>

        {/* Pledge Section */}
        <div className="bg-teal-400/10 p-12 rounded-xl my-16">
          <h2 className="text-3xl text-center mb-8 text-teal-400">
            Take the Pledge
          </h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            Commit to using AI more mindfully. Small changes in how we use
            technology can have meaningful impact when multiplied across
            millions of users.
          </p>

          <div className="max-w-xl mx-auto">
            {[
              { key: "batch", label: "I'll batch my questions when possible" },
              {
                key: "specific",
                label: "I'll be more specific in my requests",
              },
              { key: "reuse", label: "I'll save and reuse good outputs" },
              {
                key: "worthIt",
                label: "I'll ask myself 'Is this worth it?' before each query",
              },
              {
                key: "complex",
                label: "I'll use AI for complex tasks, not simple lookups",
              },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center mb-4 p-4 bg-black/20 rounded-lg cursor-pointer transition-all hover:bg-black/30"
              >
                <input
                  type="checkbox"
                  checked={pledges[key]}
                  onChange={(e) =>
                    setPledges({ ...pledges, [key]: e.target.checked })
                  }
                  className="w-5 h-5 mr-4"
                />
                <span className="text-gray-200">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-12 text-gray-600 text-sm">
        <p>
          Estimates based on available research on large language model energy
          consumption.
        </p>
        <p className="mt-2">
          The actual impact varies based on model size, data center efficiency,
          and energy sources.
        </p>
      </div>

      {/* Modal */}
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

