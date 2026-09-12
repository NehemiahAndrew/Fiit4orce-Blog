import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  FileText,
  Globe,
  Info,
  Mail,
  Medal,
  MessageSquare,
  Smartphone,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "Fit4Force - Nigerian Military Recruitment Preparation",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    type: "website",
  },
};

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.fit4force.com.ng";
const downloadUrl =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL ??
  "https://play.google.com/store/apps/details?id=com.fitf4force.fit_4_force";

const agencies = [
  {
    name: "NIGERIAN ARMY",
    image: "/landing/agencies/Nigeria Army.jpeg",
    accent: "bg-[#4CAF50]",
  },
  {
    name: "NIGERIAN NAVY",
    image: "/landing/agencies/Navy.jpeg",
    accent: "bg-[#1565C0]",
  },
  {
    name: "NIGERIAN AIR FORCE",
    image: "/landing/agencies/AIRFORCE.jpeg",
    accent: "bg-[#3F51B5]",
  },
  {
    name: "NIGERIAN DEFENCE ACADEMY",
    image: "/landing/agencies/NDA.jpeg",
    accent: "bg-[#4CAF50]",
  },
  {
    name: "DIRECT SHORT SERVICE COMMISSION",
    image: "/landing/agencies/NDA.jpeg",
    accent: "bg-[#212121]",
  },
  {
    name: "POLICE ACADEMY",
    image: "/landing/agencies/POLAC.jpeg",
    accent: "bg-[#212121]",
  },
  {
    name: "FEDERAL FIRE SERVICE",
    image: "/landing/agencies/Fire Service.jpeg",
    accent: "bg-[#F44336]",
  },
  {
    name: "NSCDC",
    image: "/landing/agencies/Civil Defence.jpeg",
    accent: "bg-[#607D8B]",
  },
  {
    name: "NIGERIA CUSTOMS SERVICE",
    image: "/landing/agencies/custom.jpeg",
    accent: "bg-[#673AB7]",
  },
  {
    name: "NIGERIA IMMIGRATION SERVICE",
    image: "/landing/agencies/Immigration.jpeg",
    accent: "bg-[#009688]",
  },
  {
    name: "FEDERAL ROAD SAFETY CORPS",
    image: "/landing/agencies/FRSC.jpeg",
    accent: "bg-[#2196F3]",
  },
];

const heroFeatures = [
  {
    title: "FITNESS PLANS",
    description:
      "Get Fit & Ready with agency specific workout designed to build and make you fit.",
    icon: Dumbbell,
  },
  {
    title: "EXAM PREP",
    description:
      "Crack every exam with confidence! Get access to past questions and mock tests.",
    icon: FileText,
  },
  {
    title: "RECRUITMENT INFO",
    description:
      "Stay ahead of the competition with the latest updates from all Nigeria Security Forces.",
    icon: Info,
  },
];

const featureSections = [
  {
    eyebrow: "FITNESS PLANS",
    title: "Get Fit & Ready for Your Agency",
    description:
      "Build the strength, endurance, and stamina required for your target agency with our specialized programs.",
    image: "/landing/images/fitness-plan.png",
    imageAlt: "Fit4Force fitness plan screen",
    reverse: false,
    cta: "Start Training",
    bullets: [
      "Push-up & sit-up progressions",
      "Running/endurance training",
      "Swimming preparation (Navy)",
      "Video exercise demonstrations",
      "Progress tracking",
    ],
    icon: Dumbbell,
  },
  {
    eyebrow: "EXAM PREP",
    title: "Crack Every Exam with Confidence!",
    description:
      "Access thousands of practice questions and mock tests designed for each security agency.",
    image: "/landing/images/Exam-Prep.png",
    imageAlt: "Fit4Force exam preparation screen",
    reverse: true,
    cta: "Take a Quiz",
    bullets: [
      "5,000+ past questions & answers",
      "Scenario-based assessments",
      "Timed mock examinations",
      "Detailed explanations",
      "Performance analytics",
    ],
    icon: FileText,
  },
  {
    eyebrow: "COMMUNITY",
    title: "Join a Community of Future Officers",
    description:
      "Connect, share experiences, and support each other on your journey.",
    image: "/landing/images/connect-with-Aspiriants.png",
    imageAlt: "Fit4Force community screen",
    reverse: false,
    cta: "Join Community",
    bullets: [
      "Chat with fellow aspirants",
      "Share study tips & resources",
      "Form study groups",
      "Get motivation & support",
      "Success stories & advice",
    ],
    icon: Users,
  },
  {
    eyebrow: "KNOWLEDGE HUB",
    title: "Everything You Need to Know About Your Agency",
    description:
      "Comprehensive knowledge base covering all aspects of your target security agency.",
    image: "/landing/images/broaden-your-knowledge.png",
    imageAlt: "Fit4Force agency knowledge screen",
    reverse: true,
    cta: "Explore Knowledge",
    bullets: [
      "General knowledge & strategy",
      "Aptitude & interview preparation",
      "Training & physical fitness",
      "Technical & aviation knowledge",
      "Career development resources",
    ],
    icon: BookOpen,
  },
  {
    eyebrow: "ELITE TACTICAL TRAINING",
    title: "Go Beyond Basic Preparation",
    description:
      "Advanced modules for serious candidates who want to excel beyond standard preparation.",
    image: "/landing/images/Elite-section-screen.png",
    imageAlt: "Fit4Force elite training screen",
    reverse: true,
    cta: "Unlock Elite",
    bullets: [
      "OODA Loop decision training",
      "Antifragile stress drills",
      "Red team critical thinking",
      "Battle buddy system",
      "Competitive leaderboards",
    ],
    icon: Medal,
  },
];

const howItWorksSteps = [
  {
    number: "1",
    title: "DOWNLOAD THE APP",
    description: "Get FIT4FORCE from Play Store for free",
    icon: Smartphone,
  },
  {
    number: "2",
    title: "SELECT AGENCY",
    description: "Choose your target agency from the supported options",
    icon: Target,
  },
  {
    number: "3",
    title: "STUDY & TRAIN",
    description: "Access all your personalized materials and workouts",
    icon: BookOpen,
  },
  {
    number: "4",
    title: "PASS YOUR SCREENING",
    description: "Join your dream agency with stronger preparation",
    icon: Trophy,
  },
];

const testimonials = [
  {
    quote:
      "The UI is incredibly clean and intuitive. Everything is well-organized, from the study materials to the fitness plans.",
    name: "Adebayo O.",
    role: "Nigerian Navy Aspirant",
    location: "Lagos, Nigeria",
    initials: "AO",
  },
  {
    quote:
      "I am impressed with how comprehensive the app is. The fitness module is clear and the design makes studying enjoyable.",
    name: "Mohammed I.",
    role: "Nigerian Army Aspirant",
    location: "Kaduna, Nigeria",
    initials: "MI",
  },
  {
    quote:
      "The quiz interface is sleek, the study materials are well-categorized, and the dashboard gives me a clear view of progress.",
    name: "Chioma E.",
    role: "Air Force Aspirant",
    location: "Abuja, Nigeria",
    initials: "CE",
  },
  {
    quote:
      "The app runs smoothly and the interface makes it easy to track my daily study goals. Great user experience overall.",
    name: "Emeka N.",
    role: "Police Academy Aspirant",
    location: "Enugu, Nigeria",
    initials: "EN",
  },
  {
    quote:
      "I love how the practice questions are organized and how the clean design makes long study sessions less tiring.",
    name: "Fatima A.",
    role: "NSCDC Aspirant",
    location: "Port Harcourt, Nigeria",
    initials: "FA",
  },
];

const pricingPlans = [
  {
    name: "FREE",
    price: "0",
    period: "/month",
    cta: "Start Free",
    featured: false,
    savings: "",
    features: [
      "Basic quizzes",
      "Limited study materials",
      "Community access",
      "Basic fitness plans",
    ],
    disabled: ["AI Coach", "Mock exams", "Offline mode"],
  },
  {
    name: "STANDARD PREP",
    price: "2,800",
    period: "/1 month",
    cta: "Get Premium",
    featured: true,
    savings: "",
    features: [
      "Everything in Free",
      "All study materials",
      "AI Coach access",
      "Unlimited mock exams",
      "Performance analytics",
      "Offline mode",
      "Priority support",
    ],
    disabled: [],
  },
  {
    name: "BEST VALUE",
    price: "4,600",
    period: "/2 months",
    cta: "Get Best Value",
    featured: false,
    savings: "Save NGN 1,000!",
    features: [
      "Everything in Premium",
      "Elite tactical modules",
      "1-on-1 mentorship",
      "Priority support",
      "Exclusive webinars",
      "Battle Buddy matching",
      "Commitment contracts",
    ],
    disabled: [],
  },
];

const faqColumns = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is FIT4FORCE?",
        answer:
          "FIT4FORCE is a mobile app designed to help aspiring candidates prepare for recruitment into Nigerian military and paramilitary organizations with study materials, quizzes, mock exams, fitness training, and coaching.",
      },
      {
        question: "Which agencies does FIT4FORCE support?",
        answer:
          "FIT4FORCE supports the Nigerian Army, Navy, Air Force, NDA, DSSC, Police Academy, Fire Service, NSCDC, Customs, Immigration, and FRSC.",
      },
      {
        question: "Is FIT4FORCE free to use?",
        answer:
          "Yes. FIT4FORCE offers a free tier with essential study materials and basic preparation features.",
      },
    ],
  },
  {
    title: "Study Materials & Content",
    items: [
      {
        question: "What study materials are available?",
        answer:
          "The app includes digital books, quizzes, flashcards, agency knowledge guides, and downloadable study resources.",
      },
      {
        question: "Are the materials agency-specific?",
        answer:
          "Yes. The content is tailored to the selected agency so candidates see the most relevant materials for their target path.",
      },
      {
        question: "How often is the content updated?",
        answer:
          "Recruitment content and supporting study materials are updated as new information is prepared and published.",
      },
    ],
  },
  {
    title: "Quizzes & Mock Exams",
    items: [
      {
        question: "How many practice questions are available?",
        answer:
          "The reference landing page highlights 1,000+ questions across supported agencies, including agency-specific practice and scenario-based items.",
      },
      {
        question: "What kinds of questions are included?",
        answer:
          "Question types include multiple choice questions, scenario-based items, aptitude questions, current affairs, and agency-specific topics.",
      },
    ],
  },
  {
    title: "Premium Subscription",
    items: [
      {
        question: "What is included in premium?",
        answer:
          "Premium expands access to study materials, mock exams, coaching, analytics, offline content, and other advanced preparation features.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "The reference page mentions card payments, bank transfer, USSD, mobile money, and Paystack-backed checkout flows.",
      },
    ],
  },
  {
    title: "Support & Contact",
    items: [
      {
        question: "Who do I contact for support?",
        answer:
          "You can contact FIT4FORCE through email at contact.nehemiahtech@gmail.com and other support channels linked on the site.",
      },
      {
        question: "Is my data secure?",
        answer:
          "The platform presents itself as using standard security practices to protect candidate data and study progress.",
      },
    ],
  },
];

const footerAgencyLinks = [
  "Nigerian Army",
  "Nigerian Navy",
  "Nigerian Air Force",
  "Nigeria Police",
  "NSCDC",
  "Immigration",
  "Fire Service",
  "Nigeria Customs",
  "FRSC",
];

const footerFeatureLinks = [
  "Fitness Plans",
  "Exam Prep",
  "AI Coach",
  "Community",
  "Elite Training",
  "Recruitment Info",
];

const homeNavItems = [
  { href: "#features", label: "Features" },
  { href: "#agencies", label: "Agencies" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
];

export default function Home() {
  return (
    <main className="bg-white text-brand-navy">
      <HeroSection />
      <NavBand />
      <AgenciesSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient pt-10 text-white md:pt-14">
      <PlusDecorations tone="light" />
      <Container className="grid gap-10 pb-10 md:pb-14 lg:grid-cols-[480px_minmax(0,1fr)] lg:items-center">
        <div className="flex flex-col items-center lg:items-start">
          <div className="rounded-[2.8rem] bg-black/10 p-5 shadow-[0_28px_70px_rgba(15,23,42,0.24)] backdrop-blur-sm">
            <div className="rounded-[2.35rem] bg-[#e7f5ff]/92 px-6 py-4 sm:px-8 sm:py-5">
              <Image
                src="/landing/images/hero-section-dashboard-screen-shot.png"
                alt="Fit4Force dashboard screen"
                width={300}
                height={650}
                priority
                className="mx-auto h-auto w-auto max-w-[290px] rounded-[1.9rem] shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:max-w-[330px] lg:max-w-[350px]"
              />
            </div>
          </div>

          <div className="mt-8 flex w-full max-w-[260px] flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
              <span className="h-px flex-1 bg-white/45" />
              <span>Now available on Playstore</span>
              <span className="h-px flex-1 bg-white/45" />
            </div>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-[54px] w-auto"
              />
            </a>
            <div className="mt-4">
              <img
                src="/brand/fit4force-logo.png"
                alt="Fit4Force logo"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <div className="h-1.5 w-10 rounded-full bg-cyan-300" />
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.2rem]">
            FIT4FORCE - Nigeria&apos;s #1 Military & Paramilitary Recruitment Prep App
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/88 sm:text-lg sm:leading-8">
            Fit4Force is the all-in-one app for aspirants preparing for the{" "}
            <strong>Nigerian Army, Navy, Air Force, Police, NSCDC, Customs, Fire Service, Immigration</strong>{" "}
            and <strong>FRSC recruitment</strong>.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/82 sm:text-base">
            Your Journey from Civilian to Officer Starts Here!
          </p>

          <div className="mt-8 grid gap-3">
            {heroFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-[18px] bg-white/94 px-4 py-4 text-brand-navy shadow-[0_18px_40px_rgba(20,31,56,0.15)]"
                >
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold tracking-[0.08em] text-brand-cyan">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-brand-slate">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function NavBand() {
  return (
    <section className="border-b border-brand-border bg-white py-3">
      <Container className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/fit4force-logo.png"
            alt="Fit4Force logo"
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg object-contain"
          />
          <span className="text-sm font-extrabold tracking-[0.08em] text-brand-navy">
            FIT4FORCE
          </span>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {homeNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-slate transition hover:text-brand-navy"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={downloadUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-brand-cyan px-4 text-sm font-semibold text-white shadow-action transition hover:bg-brand-cyanDark"
        >
          <ArrowRight size={14} />
          Download App
        </a>
      </Container>
    </section>
  );
}

function AgenciesSection() {
  return (
    <section id="agencies" className="relative bg-white py-14 md:py-20">
      <Container>
        <SectionHeader
          title="PREPARE FOR YOUR DREAM AGENCY"
          subtitle="Comprehensive materials tailored for each Nigerian security organization"
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {agencies.map((agency) => (
            <div
              key={agency.name}
              className="rounded-[14px] border border-brand-border bg-white p-4 text-center shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(15,23,42,0.08)]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-brand-border bg-white">
                <Image
                  src={agency.image}
                  alt={agency.name}
                  width={56}
                  height={56}
                  className="h-12 w-12 object-contain"
                />
              </div>
              <h3 className="mt-3 text-[11px] font-bold leading-5 text-brand-navy">
                {agency.name}
              </h3>
              <div className={`mx-auto mt-3 h-1 w-10 rounded-full ${agency.accent}`} />
            </div>
          ))}
        </div>
      </Container>
      <div className="pointer-events-none absolute bottom-10 right-6 hidden text-brand-navy/25 lg:block">
        <div className="space-y-4 text-lg font-bold">
          <div>+</div>
          <div className="translate-x-4">+</div>
          <div>+</div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-10 md:py-14">
      <Container className="space-y-20 md:space-y-24">
        {featureSections.map((feature) => (
          <div
            key={feature.title}
            className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
              feature.reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="flex justify-center">
              <div className="rounded-[2.3rem] bg-transparent px-2 py-2 shadow-none">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  width={250}
                  height={540}
                  className="h-auto w-auto max-w-[270px] rounded-[1.75rem] sm:max-w-[310px]"
                />
              </div>
            </div>

            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-brand-cyan">
                <feature.icon size={18} />
                <span className="text-xs font-bold tracking-[0.16em]">
                  {feature.eyebrow}
                </span>
              </div>
              <div className="mt-3 h-1.5 w-10 rounded-full bg-brand-cyan" />
              <h3 className="mt-4 text-2xl font-bold leading-tight text-brand-navy md:text-[2rem]">
                {feature.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-brand-slate">
                {feature.description}
              </p>
              <ul className="mt-5 space-y-3">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm leading-6 text-brand-slate"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cyan/12 text-brand-cyan">
                      <Check size={12} />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={appUrl}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-cyan"
              >
                {feature.cta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-white py-16 md:py-20">
      <Container>
        <SectionHeader
          title="HOW IT WORKS"
          subtitle="Start your journey in 4 simple steps"
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {howItWorksSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                <div className="rounded-[24px] border border-brand-border bg-white px-5 py-7 text-center shadow-[0_18px_44px_rgba(15,23,42,0.06)]">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-cyan text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-sm font-extrabold leading-6 text-brand-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-brand-slate">
                    {step.description}
                  </p>
                </div>

                {index < howItWorksSteps.length - 1 ? (
                  <div className="pointer-events-none absolute right-[-16px] top-1/2 hidden -translate-y-1/2 xl:block">
                    <ArrowRight className="text-brand-cyan/50" size={18} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function TestimonialsSection() {
  const featured = testimonials[0];

  return (
    <section id="testimonials" className="bg-[#fbfdff] py-16 md:py-20">
      <Container>
        <SectionHeader
          title="SUCCESS STORIES"
          subtitle="Real candidates. Real results. Real testimonies."
        />

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="grid items-center gap-4 md:grid-cols-[56px_1fr_56px]">
            <button
              type="button"
              className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-white text-brand-slate shadow-soft"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="rounded-[28px] border border-brand-border bg-white px-6 py-8 text-center shadow-[0_22px_55px_rgba(15,23,42,0.08)] md:px-10">
              <p className="text-lg leading-8 text-brand-slate">
                &quot;{featured.quote}&quot;
              </p>
              <p className="mt-5 text-base text-[#ffb400]">★★★★★</p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple text-sm font-bold text-white">
                  {featured.initials}
                </div>
                <div className="text-left">
                  <p className="font-bold text-brand-navy">{featured.name}</p>
                  <p className="text-sm text-brand-slate">{featured.role}</p>
                  <p className="text-xs text-brand-slate/80">{featured.location}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-border bg-white text-brand-slate shadow-soft"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((item, index) => (
              <span
                key={item.name}
                className={`h-2.5 rounded-full ${
                  index === 0 ? "w-7 bg-brand-cyan" : "w-2.5 bg-brand-cyan/30"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="bg-[#fbfdff] py-16 md:py-20">
      <Container>
        <SectionHeader
          title="CHOOSE YOUR PLAN"
          subtitle="Flexible plans to match your preparation needs"
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[28px] border p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ${
                plan.featured
                  ? "border-brand-cyan bg-white ring-2 ring-brand-cyan/18"
                  : "border-brand-border bg-white"
              }`}
            >
              {plan.featured ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan px-4 py-1 text-xs font-bold text-white">
                  POPULAR
                </div>
              ) : null}
              <div className="text-center">
                <h3 className="text-lg font-extrabold text-brand-navy">{plan.name}</h3>
                <div className="mt-4">
                  <p className="text-4xl font-extrabold text-brand-navy">
                    <span className="text-xl align-top">NGN </span>
                    {plan.price}
                  </p>
                  <p className="mt-1 text-sm text-brand-slate">{plan.period}</p>
                  {plan.savings ? (
                    <p className="mt-2 text-sm font-bold text-brand-cyan">{plan.savings}</p>
                  ) : null}
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-brand-slate">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cyan/12 text-brand-cyan">
                      <Check size={12} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.disabled.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-brand-slate/55">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                      x
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-7 inline-flex h-11 w-full items-center justify-center rounded-pill px-5 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-brand-cyan text-white shadow-action hover:bg-brand-cyanDark"
                    : "border border-brand-border bg-white text-brand-navy hover:border-brand-cyan"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="bg-white py-16 md:py-20">
      <Container>
        <SectionHeader
          title="FREQUENTLY ASKED QUESTIONS"
          subtitle="Get answers to common questions about FIT4FORCE"
        />

        <div className="mt-10 grid gap-8 xl:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
          {faqColumns.map((column) => (
            <div
              key={column.title}
              className="rounded-[18px] border border-brand-border bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
            >
              <h3 className="text-base font-bold text-brand-navy">{column.title}</h3>
              <div className="mt-4 space-y-3">
                {column.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-brand-border bg-[#fbfdff] px-4 py-3"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-brand-navy">
                      <span>{item.question}</span>
                      <span className="text-brand-cyan transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-brand-slate">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient py-16 text-center text-white md:py-20">
      <PlusDecorations tone="light" compact />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl">
          <Image
            src="/brand/fit4force-logo.png"
            alt="Fit4Force logo"
            width={72}
            height={72}
            className="mx-auto h-16 w-16 rounded-2xl object-contain"
          />
          <h2 className="mt-6 text-3xl font-extrabold leading-tight md:text-4xl">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/85">
            Your Journey from Civilian to Officer Starts Here!
          </p>
          <p className="mt-3 text-base leading-7 text-white/82">
            Join thousands of Nigerians preparing for their dream career.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={downloadUrl} target="_blank" rel="noreferrer" className="inline-flex">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-[54px] w-auto"
              />
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-white/86">
            <span>★★★★☆</span>
            <span>4.8/5 on Play Store</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#11172b] py-12 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/fit4force-logo.png"
                alt="Fit4Force logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-contain"
              />
              <span className="text-lg font-bold tracking-[0.08em]">FIT4FORCE</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">
              The all-in-one app for aspirants preparing for Nigeria&apos;s military
              and paramilitary agencies.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/72">
              <Mail size={15} />
              <span>contact.nehemiahtech@gmail.com</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <FooterIcon href="https://www.facebook.com/share/1Af92SD7mc/">
                <MessageSquare size={16} />
              </FooterIcon>
              <FooterIcon href="https://tiktok.com/@fit4force">
                <CalendarDays size={16} />
              </FooterIcon>
              <FooterIcon href="https://nehemiah.is-a.dev/">
                <Globe size={16} />
              </FooterIcon>
            </div>
          </div>

          <FooterList title="AGENCIES" items={footerAgencyLinks} />
          <FooterList title="FEATURES" items={footerFeatureLinks} />
          <div>
            <h4 className="text-sm font-bold tracking-[0.16em] text-white/84">SUPPORT</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/68">
              <li>
                <a href="#faq" className="transition hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <Link href={downloadUrl} className="transition hover:text-white">
                  Download App
                </Link>
              </li>
              <li>
                <Link href={appUrl} className="transition hover:text-white">
                  Launch App
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/12 pt-6">
          <div className="flex flex-col gap-4 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
            <p>© 2026 FIT4FORCE. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#faq" className="transition hover:text-white">
                FAQs
              </a>
              <span>│</span>
              <Link href={downloadUrl} className="transition hover:text-white">
                Download
              </Link>
              <span>│</span>
              <Link href={appUrl} className="transition hover:text-white">
                Launch App
              </Link>
            </div>
            <p>Nehemiah Technologies</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mx-auto h-1.5 w-10 rounded-full bg-brand-cyan" />
      <h2 className="mt-4 text-2xl font-extrabold leading-tight text-brand-navy md:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-brand-slate sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function PlusDecorations({
  tone,
  compact = false,
}: {
  tone: "light" | "dark";
  compact?: boolean;
}) {
  const color = tone === "light" ? "text-white/25" : "text-brand-navy/20";

  return (
    <div className={`pointer-events-none absolute inset-0 ${color}`}>
      <span className={`absolute left-[6%] top-[18%] text-lg font-bold ${compact ? "hidden md:block" : ""}`}>
        +
      </span>
      <span className="absolute left-[10%] top-[30%] text-base font-bold">+</span>
      <span className="absolute right-[8%] top-[22%] text-lg font-bold">+</span>
      <span className="absolute right-[12%] bottom-[16%] text-base font-bold">+</span>
      <span className={`absolute left-[14%] bottom-[22%] text-lg font-bold ${compact ? "hidden lg:block" : ""}`}>
        +
      </span>
    </div>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold tracking-[0.16em] text-white/84">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-white/68">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="transition hover:text-white">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterIcon({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/78 transition hover:bg-white/12 hover:text-white"
    >
      {children}
    </a>
  );
}
