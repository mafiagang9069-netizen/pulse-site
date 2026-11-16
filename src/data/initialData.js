/**
 * Initial Seed Data for PULSE Editorial Platform
 * Preserves all 16 existing articles, categories, and author metadata from original site.
 */

export const INITIAL_AUTHORS = {
  "maya-chen": {
    id: "maya-chen",
    name: "Maya Chen",
    role: "Technology & Science Correspondent",
    bio: "Maya covers frontier technology and the science stories that are about to matter. She previously reported on emerging hardware and AI systems, and writes Pulse's weekly technology roundup.",
    initials: "MC",
    verified: false,
    verificationNote: "Contributor profile — identity and biographical details are awaiting editorial verification.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  "daniel-osei": {
    id: "daniel-osei",
    name: "Daniel Osei",
    role: "Business & Work Correspondent",
    bio: "Daniel writes about how work, money, and organizations are changing. He focuses on the economics behind cultural shifts — from office policy to the creator economy.",
    initials: "DO",
    verified: false,
    verificationNote: "Contributor profile — identity and biographical details are awaiting editorial verification.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  "priya-nair": {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Health, Climate & Lifestyle Correspondent",
    bio: "Priya reports on health, climate, food, and the way people are choosing to live differently. She's especially interested in stories where new data changes old advice.",
    initials: "PN",
    verified: false,
    verificationNote: "Contributor profile — identity and biographical details are awaiting editorial verification.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  }
};

export const INITIAL_CATEGORIES = [
  {
    id: "technology",
    name: "Technology",
    slug: "technology",
    description: "Frontier computing, AI systems, foundational infrastructure, and consumer hardware shifts.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "business",
    name: "Business",
    slug: "business",
    description: "Corporate strategies, market mechanics, startup economics, and global trade dynamics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "science",
    name: "Science",
    slug: "science",
    description: "Orbital exploration, fundamental physics, materials science, and breakthrough discoveries.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "health",
    name: "Health",
    slug: "health",
    description: "Clinical research, preventative medicine, longevity studies, and biotech policy.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "finance",
    name: "Finance",
    slug: "finance",
    description: "Personal wealth strategies, monetary policy, modern banking, and fiscal philosophy.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Intentional living, sustainable fashion, modern travel, and cultural choices.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "world",
    name: "World",
    slug: "world",
    description: "International affairs, geopolitical developments, and borderless challenges.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "politics",
    name: "Politics",
    slug: "politics",
    description: "Governance, legislation, electoral trends, and civic institutions.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "climate",
    name: "Climate",
    slug: "climate",
    description: "Energy transitions, carbon capture, ecology, and climate adaptation technologies.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "work-culture",
    name: "Work & Culture",
    slug: "work-culture",
    description: "The evolution of the workplace, talent markets, organizational design, and creative life.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
  },
  {
    id: "food",
    name: "Food",
    slug: "food",
    description: "Agricultural technology, precision fermentation, gastronomy, and nutritional science.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=85"
  }
];

export const INITIAL_ARTICLES = [
  {
    id: "pulse-art-01",
    originalId: 1,
    title: "AI Agents Just Started Doing the Boring Parts of Your Job",
    slug: "ai-agents-boring-parts-of-your-job",
    subtitle: "Autonomous coding and research agents moved from novelty to daily habit in 2026 — and the shift is quieter than anyone expected.",
    excerpt: "Autonomous coding and research agents moved from novelty to daily habit in 2026 — and the shift is quieter than anyone expected.",
    content: `A year ago, most people who used an AI assistant were still typing prompts one at a time and copying the output somewhere else by hand. That gap has closed. Agents that can open a terminal, browse a codebase, run tests, and revise their own work until something actually passes are now a normal part of how software gets built — not a demo, a Tuesday.

What changed wasn't a single breakthrough so much as a stack of smaller ones: longer context windows that let a model hold an entire project in mind, tool-use that's reliable enough to trust with real file systems, and a cultural shift where handing off a multi-step task no longer feels like a leap of faith.

The boring parts went first. Migrating a config format, writing the fortieth unit test of the day, cleaning up a changelog — these are the tasks that used to eat an afternoon and now get delegated before lunch. The interesting part is what happens to the hours that frees up. Some teams are shipping faster. Others are simply arguing more, because the cost of trying an idea dropped and now there are more ideas to argue about.

The skeptics have a fair point: agents still make confident mistakes, and the cleanup from a bad autonomous run can cost more time than it saved. But the trend line is not subtle. The question in most engineering meetings this year isn't whether to use an agent, it's which task to hand it next.`,
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    category: "Technology",
    categorySlug: "technology",
    authorId: "maya-chen",
    authorName: "Maya Chen",
    status: "published",
    featured: false,
    trending: true,
    seoTitle: "AI Agents Just Started Doing the Boring Parts of Your Job — PULSE",
    metaDescription: "Autonomous coding and research agents moved from novelty to daily habit in 2026 — and the shift is quieter than anyone expected.",
    keywords: ["AI agents", "autonomous coding", "software development", "generative AI", "developer productivity"],
    publishedAt: "2026-08-21T09:00:00Z",
    updatedAt: "2026-08-21T09:00:00Z",
    createdAt: "2026-08-21T09:00:00Z",
    readingTime: "6 min"
  },
  {
    id: "pulse-art-02",
    originalId: 2,
    title: "The Four-Day Week Stopped Being an Experiment",
    slug: "four-day-week-no-longer-experiment",
    subtitle: "After years of pilot programs, a wave of mid-size companies made the shorter week permanent — and the productivity data finally caught up with the pitch.",
    excerpt: "After years of pilot programs, a wave of mid-size companies made the shorter week permanent — and the productivity data finally caught up with the pitch.",
    content: `For most of the last decade, the four-day workweek lived in the same category as the standing desk: a good idea that a few companies tried and most treated as a perk rather than a policy. That's shifted. A string of multi-year pilots across professional services, healthcare administration, and software firms have now converted from trial to permanent policy, and the reasoning has moved from ideological to actuarial.

The pattern in the data is consistent enough to be boring: output per hour rises enough to offset the lost day in roles built around focused, individual work, while roles that depend on constant availability — support desks, client-facing sales — see a smaller but still positive effect once staffing is restructured around coverage rather than headcount.

The harder conversations are cultural, not financial. Middle managers who built their identity around being reachable are adjusting to a world where reachability is scheduled rather than assumed. And industries where a four-day week simply isn't possible — retail, manufacturing, frontline healthcare — are watching the trend from the outside, which is creating a new fault line in how workers compare jobs.

None of this means the five-day week is finished. It means the burden of proof has flipped: companies now have to explain why they're still on five, not why they'd consider four.`,
    featuredImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
    category: "Work & Culture",
    categorySlug: "work-culture",
    authorId: "daniel-osei",
    authorName: "Daniel Osei",
    status: "published",
    featured: false,
    trending: true,
    seoTitle: "The Four-Day Week Stopped Being an Experiment — PULSE",
    metaDescription: "After years of pilot programs, a wave of mid-size companies made the shorter week permanent — and productivity data caught up.",
    keywords: ["four-day work week", "future of work", "workplace productivity", "organizational culture"],
    publishedAt: "2026-08-19T10:30:00Z",
    updatedAt: "2026-08-19T10:30:00Z",
    createdAt: "2026-08-19T10:30:00Z",
    readingTime: "5 min"
  },
  {
    id: "pulse-art-03",
    originalId: 3,
    title: "Direct Air Capture Finally Gets Cheap Enough to Matter",
    slug: "direct-air-capture-gets-cheap",
    subtitle: "A new generation of capture plants is pulling carbon from the sky at a fraction of the cost projected five years ago — and the economics are starting to work without subsidy.",
    excerpt: "A new generation of capture plants is pulling carbon from the sky at a fraction of the cost projected five years ago — and the economics are starting to work without subsidy.",
    content: `Direct air capture has spent most of its existence as the technology climate researchers mention with a caveat: promising in theory, absurdly expensive in practice. That caveat is getting quieter. New plants using solid-sorbent systems and waste-heat integration have pushed the cost per ton of captured carbon down sharply from where the first commercial facilities landed just a few years ago.

The design changes are mostly unglamorous: better sorbent materials that need less energy to regenerate, plants built next to industrial heat sources instead of standalone, and manufacturing that borrows more from the auto industry's assembly-line playbook than from bespoke chemical engineering. None of it is a single dramatic fix — it's a hundred small ones stacked together.

Critics still argue that capture technology is a distraction from cutting emissions at the source, and that argument hasn't gone away just because the price dropped. But the projects moving forward now are being paired with actual buyers — airlines and heavy industry purchasing removal credits directly — which is a different kind of validation than a subsidy program.

The honest read is that direct air capture isn't going to solve climate change on its own, and nobody serious claims it will. What's changed is that it's no longer obviously too expensive to be part of the answer.`,
    featuredImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85",
    category: "Climate",
    categorySlug: "climate",
    authorId: "priya-nair",
    authorName: "Priya Nair",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "Direct Air Capture Finally Gets Cheap Enough to Matter — PULSE",
    metaDescription: "A new generation of capture plants is pulling carbon from the sky at a fraction of projected costs.",
    keywords: ["direct air capture", "carbon removal", "climate technology", "clean energy"],
    publishedAt: "2026-08-17T08:15:00Z",
    updatedAt: "2026-08-17T08:15:00Z",
    createdAt: "2026-08-17T08:15:00Z",
    readingTime: "7 min"
  },
  {
    id: "pulse-art-04",
    originalId: 4,
    title: "What Longevity Research Actually Supports, and What's Still a Guess",
    slug: "longevity-research-what-works",
    subtitle: "Between supplement marketing and genuine science, the gap has never been wider. Here's what's held up under scrutiny.",
    excerpt: "Between supplement marketing and genuine science, the gap has never been wider. Here's what's held up under scrutiny.",
    content: `Longevity has become one of the most heavily marketed categories in wellness, which makes it one of the hardest to read clearly. Strip away the supplement stacks and cold-plunge routines, and the research base that's actually accumulated real evidence is narrower — and less exciting — than the industry built around it.

The strongest, most repeated findings are unglamorous: consistent resistance training, adequate protein intake, sleep regularity, and avoiding the two or three big risk multipliers — smoking, chronic poor sleep, sustained high blood sugar — still explain more variance in healthy lifespan than anything sold in a jar. Several compounds under heavy marketing, meanwhile, have thinner evidence in humans than the confidence of their branding would suggest, with results that look strong in early trials and considerably murkier once studies scale up.

What is genuinely new is the measurement layer. Continuous glucose monitors, sleep trackers, and cheap blood panels have made it possible for ordinary people to see their own trends over time instead of guessing, and that visibility is changing behavior in ways that are easier to sustain than a strict protocol imposed from outside.

The field's own researchers tend to be the most cautious voices in it — which is usually a sign worth listening to, in an industry built on selling certainty.`,
    featuredImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=85",
    category: "Health",
    categorySlug: "health",
    authorId: "priya-nair",
    authorName: "Priya Nair",
    status: "published",
    featured: false,
    trending: true,
    seoTitle: "What Longevity Research Actually Supports, and What's Still a Guess — PULSE",
    metaDescription: "Between supplement marketing and genuine science, here is what actual peer-reviewed longevity research supports.",
    keywords: ["longevity research", "healthspan", "wellness science", "preventative medicine"],
    publishedAt: "2026-08-20T11:00:00Z",
    updatedAt: "2026-08-20T11:00:00Z",
    createdAt: "2026-08-20T11:00:00Z",
    readingTime: "8 min"
  },
  {
    id: "pulse-art-05",
    originalId: 5,
    title: "Paid Newsletters Are Quietly Outearning Display Ads for Independent Writers",
    slug: "paid-newsletters-outearn-display-ads",
    subtitle: "The economics of online writing have flipped: a smaller, paying audience now beats a large free one for most working writers.",
    excerpt: "The economics of online writing have flipped: a smaller, paying audience now beats a large free one for most working writers.",
    content: `For most of the 2010s, the advice to anyone trying to make a living writing online was to grow an audience first and figure out monetization later, usually through ads or sponsorships. That math has reversed. Independent writers with subscriber bases in the low thousands are now routinely reporting more reliable income than writers with ten times the free readership relying on advertising.

The shift tracks a broader move toward direct relationships between creators and audiences, cutting out the algorithmic middle layer that decided who saw what. A newsletter that lands in an inbox doesn't have to fight a feed for attention, and a reader who pays a subscription is a fundamentally different kind of audience than one who clicked a link once.

This isn't universally rosy. The paid model rewards a narrower kind of writing — consistent, identifiable voice, a beat the audience actually wants updates on — and it's brutal for writers whose strength is one-off viral pieces rather than a sustained relationship. Platforms taking a cut, typically a meaningful percentage of subscription revenue, are also facing new pressure from writers experimenting with independent billing.

The bigger story might be what this means for journalism broadly: a media landscape where trust in an individual byline is becoming more valuable than trust in a masthead.`,
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    category: "Business",
    categorySlug: "business",
    authorId: "daniel-osei",
    authorName: "Daniel Osei",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "Paid Newsletters Are Quietly Outearning Display Ads — PULSE",
    metaDescription: "The economics of online writing have flipped: smaller paying audiences beat large ad-supported ones.",
    keywords: ["paid newsletters", "creator economy", "digital journalism", "independent publishing"],
    publishedAt: "2026-08-15T14:20:00Z",
    updatedAt: "2026-08-15T14:20:00Z",
    createdAt: "2026-08-15T14:20:00Z",
    readingTime: "5 min"
  },
  {
    id: "pulse-art-06",
    originalId: 6,
    title: "The Battery Chemistry Race Just Got a Real Second Contender",
    slug: "sodium-ion-batteries-second-contender",
    subtitle: "Sodium-ion batteries have moved from lab curiosity to production lines, and they're changing the calculus for cheap EVs and grid storage.",
    excerpt: "Sodium-ion batteries have moved from lab curiosity to production lines, and they're changing the calculus for cheap EVs and grid storage.",
    content: `Lithium-ion has been the default answer to energy storage for so long that alternatives rarely got serious attention outside of academic papers. Sodium-ion batteries are the exception this year, moving out of pilot lines and into actual vehicles and grid-storage installations at a pace that surprised even people inside the industry.

The appeal is straightforward: sodium is abundant and cheap compared to lithium, the supply chain isn't concentrated in the same handful of countries, and the batteries perform better in cold weather, a persistent weak point for lithium-ion. The tradeoff is energy density — sodium-ion packs store less energy per kilogram, which rules them out for long-range premium vehicles but makes them a strong fit for short-range city cars, buses, and stationary grid storage where weight matters less than cost.

Automakers chasing an entry-level EV price point have taken notice first, since a cheaper battery is the single biggest lever on a budget vehicle's sticker price. Utility-scale storage projects are close behind, since grid batteries don't need to be light, just cheap and durable.

Nobody in the industry expects sodium-ion to replace lithium outright. The more likely outcome is a split market — lithium for range, sodium for cost — which is a healthier place for the industry to be than a single-chemistry dependency.`,
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    category: "Technology",
    categorySlug: "technology",
    authorId: "maya-chen",
    authorName: "Maya Chen",
    status: "published",
    featured: false,
    trending: true,
    seoTitle: "Sodium-Ion Batteries: The Real Second Contender in Energy Storage — PULSE",
    metaDescription: "Sodium-ion batteries move from laboratory curiosity to mass production lines for budget EVs and grid storage.",
    keywords: ["sodium-ion batteries", "electric vehicles", "battery chemistry", "energy storage"],
    publishedAt: "2026-08-18T13:00:00Z",
    updatedAt: "2026-08-18T13:00:00Z",
    createdAt: "2026-08-18T13:00:00Z",
    readingTime: "6 min"
  },
  {
    id: "pulse-art-07",
    originalId: 7,
    title: "Mental Health Apps Are Facing Their First Real Regulatory Reckoning",
    slug: "mental-health-apps-regulatory-reckoning",
    subtitle: "After years of light-touch oversight, regulators are starting to ask the apps millions rely on for therapy-adjacent support to prove they actually work.",
    excerpt: "After years of light-touch oversight, regulators are starting to ask the apps millions rely on for therapy-adjacent support to prove they actually work.",
    content: `Mental health apps grew fast in a regulatory gray zone: not quite medical devices, not quite pure wellness products, and largely exempt from the kind of evidence requirements that apply to actual clinical treatment. That gray zone is narrowing. Several jurisdictions have introduced rules this year that require apps offering therapy-adjacent features — mood tracking tied to clinical claims, AI chat support marketed as therapeutic — to demonstrate efficacy rather than just user satisfaction.

The push comes after a string of investigations found meaningful gaps between marketing language and what the underlying tools actually deliver, along with concerns about how sensitive mental health data gets used and sold once it leaves the app. For an industry that scaled largely on trust and word of mouth, the scrutiny is a genuine inflection point.

The apps taking it seriously are the ones investing in actual clinical trials and publishing results, which is expensive and slow compared to shipping features. The ones that don't are likely to get squeezed out of app store categories that now require substantiation for health claims.

For users, the practical upshot is a clearer, if smaller, field of tools that can back up what they promise — which, for a category dealing with something as consequential as mental health, is probably overdue.`,
    featuredImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=85",
    category: "Health",
    categorySlug: "health",
    authorId: "priya-nair",
    authorName: "Priya Nair",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "Mental Health Apps Face Their First Real Regulatory Reckoning — PULSE",
    metaDescription: "Regulators require therapy-adjacent and AI mental wellness apps to demonstrate clinical efficacy.",
    keywords: ["mental health apps", "digital therapeutics", "health regulation", "wellness tech"],
    publishedAt: "2026-08-14T07:45:00Z",
    updatedAt: "2026-08-14T07:45:00Z",
    createdAt: "2026-08-14T07:45:00Z",
    readingTime: "6 min"
  },
  {
    id: "pulse-art-08",
    originalId: 8,
    title: "Private Space Stations Are No Longer a Hypothetical",
    slug: "private-space-stations-real-hardware",
    subtitle: "With the current orbital station approaching retirement, the companies building its commercial successors are finally showing hardware, not just renderings.",
    excerpt: "With the current orbital station approaching retirement, the companies building its commercial successors are finally showing hardware, not just renderings.",
    content: `For years, the idea of commercial replacements for government-run orbital stations lived mostly in investor decks and artist renderings. That's changed this year, with multiple companies moving from concept to actual pressurized modules undergoing ground testing, and at least one program targeting an uncrewed demonstration flight in the near term.

The business case has sharpened along with the hardware. Rather than betting on space tourism alone, the leading programs are structured around a mix of government research contracts, pharmaceutical microgravity manufacturing, and media production — a more diversified revenue base than the industry had a few years ago, when tourism was assumed to carry most of the weight.

The technical challenges remain serious: life support systems that need to run reliably for years without a repair crew on call, and the basic economics of getting enough mass to orbit cheaply enough to make a station viable without permanent subsidy. Launch costs falling has done more to make this plausible than any single station design choice.

What's notable is less any individual program succeeding and more the fact that there are now several credible competitors instead of one dominant plan — which is usually the sign an industry is becoming real rather than aspirational.`,
    featuredImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=85",
    category: "Science",
    categorySlug: "science",
    authorId: "maya-chen",
    authorName: "Maya Chen",
    status: "published",
    featured: true, // Flagship Cover Story!
    trending: true,
    seoTitle: "Private Space Stations Are No Longer a Hypothetical — PULSE",
    metaDescription: "Commercial orbital space stations move from investor decks to real pressurized flight hardware.",
    keywords: ["private space stations", "commercial orbit", "aerospace engineering", "space economy"],
    publishedAt: "2026-08-22T16:00:00Z",
    updatedAt: "2026-08-22T16:00:00Z",
    createdAt: "2026-08-22T16:00:00Z",
    readingTime: "7 min"
  },
  {
    id: "pulse-art-09",
    originalId: 9,
    title: "AI-Written Phishing Emails Are Getting Uncomfortably Good",
    slug: "ai-phishing-emails-getting-good",
    subtitle: "Security teams say the tell-tale signs of a scam email — bad grammar, generic greetings — have mostly disappeared, and defenses are scrambling to catch up.",
    excerpt: "Security teams say the tell-tale signs of a scam email — bad grammar, generic greetings — have mostly disappeared, and defenses are scrambling to catch up.",
    content: `The advice to watch for spelling mistakes and awkward phrasing in suspicious emails is aging out fast. Security researchers are reporting a sharp rise in phishing attempts that read as fluent, contextually appropriate, and personalized — the direct result of attackers using the same language models that power ordinary writing assistants, pointed at scraped personal and professional data instead of a to-do list.

The shift changes what actually works as a defense. Training people to spot bad grammar was never a great strategy, but it worked well enough to matter; now that crutch is gone, and the emphasis is moving toward technical verification — authentication protocols, sender reputation systems — rather than asking humans to eyeball their way to safety.

Ironically, the same AI capabilities driving the attacks are showing up on the defensive side too, with email security tools using language models to flag subtle behavioral anomalies that a fluent, well-written email would otherwise sail past. It's an arms race with both sides using similar tools, which is a strange but increasingly normal shape for cybersecurity conflicts to take.

The practical takeaway for most people hasn't changed even if the tell-tales have: verify unusual requests through a second channel, and treat urgency in a message as a reason to slow down, not speed up.`,
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    category: "Technology",
    categorySlug: "technology",
    authorId: "maya-chen",
    authorName: "Maya Chen",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "AI-Written Phishing Emails Are Getting Uncomfortably Good — PULSE",
    metaDescription: "Traditional tell-tale signs of phishing scams are vanishing with the rise of hyper-fluent generative models.",
    keywords: ["cybersecurity", "AI phishing", "social engineering", "infosec defenses"],
    publishedAt: "2026-08-16T12:00:00Z",
    updatedAt: "2026-08-16T12:00:00Z",
    createdAt: "2026-08-16T12:00:00Z",
    readingTime: "5 min"
  },
  {
    id: "pulse-art-10",
    originalId: 10,
    title: "Return-to-Office Mandates Are Colliding With a Tighter Talent Market",
    slug: "return-to-office-mandates-talent-market",
    subtitle: "Companies pushing workers back to five days in-office are finding the leverage isn't quite where they expected it to be.",
    excerpt: "Companies pushing workers back to five days in-office are finding the leverage isn't quite where they expected it to be.",
    content: `A wave of large employers issued strict return-to-office mandates over the past two years, betting that a cooling job market would leave workers with little choice but to comply. The results have been messier than the announcements suggested. Attrition among senior and highly skilled staff has been notably higher at companies with the strictest mandates, even in a labor market that's generally favored employers.

The pattern suggests office policy has become a sorting mechanism rather than a productivity lever: the employees most able to leave — typically the most experienced and most in-demand — are the ones most likely to act on a mandate they dislike, while employees with fewer options stay and comply. That's not the outcome most return-to-office arguments were built around.

Companies that have taken a more flexible, hybrid-by-default approach are increasingly using it as a recruiting pitch rather than a concession, which has quietly turned office policy into a competitive differentiator in industries fighting for scarce specialized talent.

None of this settles the underlying debate about whether in-person work produces better collaboration — reasonable people still disagree, and the evidence is genuinely mixed by role and industry. What's clearer is that mandates alone aren't a free lever; they come with a real cost in who chooses to stay.`,
    featuredImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85",
    category: "Work & Culture",
    categorySlug: "work-culture",
    authorId: "daniel-osei",
    authorName: "Daniel Osei",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "Return-to-Office Mandates Collide With a Tighter Talent Market — PULSE",
    metaDescription: "Companies pushing 5-day office mandates experience senior talent attrition in competitive sectors.",
    keywords: ["return to office", "hybrid work", "talent retention", "workplace policy"],
    publishedAt: "2026-08-13T10:10:00Z",
    updatedAt: "2026-08-13T10:10:00Z",
    createdAt: "2026-08-13T10:10:00Z",
    readingTime: "5 min"
  },
  {
    id: "pulse-art-11",
    originalId: 11,
    title: "Precision-Fermented Proteins Are the Quiet Second Act of Plant-Based Food",
    slug: "precision-fermented-proteins-quiet-second-act",
    subtitle: "After the first wave of plant-based meat lost momentum, a less flashy technology is picking up the slack — brewing actual animal proteins without the animal.",
    excerpt: "After the first wave of plant-based meat lost momentum, a less flashy technology is picking up the slack — brewing actual animal proteins without the animal.",
    content: `The first generation of plant-based meat promised a near-identical substitute and largely delivered on texture while falling short on the underlying protein profile, which is part of why sales cooled after their initial surge. Precision fermentation is a different approach entirely: instead of approximating meat or dairy from plant ingredients, it uses engineered microorganisms to brew the actual proteins found in animal products — the same casein in cheese, the same proteins that give egg whites their structure — without an animal involved.

The result tastes and behaves more like the real thing because, at a molecular level, key components of it are the real thing. Dairy companies have been the fastest to adopt the technology, using fermentation-derived proteins to cut costs and emissions in products like whey and cheese without changing the product a consumer actually experiences.

The technology isn't cheap yet, and scaling fermentation to the volumes needed for mainstream grocery pricing remains the central bottleneck. But the trajectory mirrors other fermentation-based industries like insulin production, where costs fell sharply once production scaled past the early, expensive phase.

It's a less visible revolution than a burger that bleeds like beef, but it may end up mattering more, since it targets ingredients that show up in far more products than any single substitute meat ever could.`,
    featuredImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=85",
    category: "Food",
    categorySlug: "food",
    authorId: "priya-nair",
    authorName: "Priya Nair",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "Precision-Fermented Proteins: The Second Act of Alternative Food — PULSE",
    metaDescription: "Brewing real animal proteins with engineered microorganisms without the animal.",
    keywords: ["precision fermentation", "food tech", "alternative proteins", "sustainable agriculture"],
    publishedAt: "2026-08-12T15:30:00Z",
    updatedAt: "2026-08-12T15:30:00Z",
    createdAt: "2026-08-12T15:30:00Z",
    readingTime: "6 min"
  },
  {
    id: "pulse-art-12",
    originalId: 12,
    title: "Slow Travel Is Winning Out Over the Bucket-List Trip",
    slug: "slow-travel-winning-bucket-list-trip",
    subtitle: "More travelers are trading a checklist of cities for weeks spent in one place — and the data on flight bookings backs it up.",
    excerpt: "More travelers are trading a checklist of cities for weeks spent in one place — and the data on flight bookings backs it up.",
    content: `The classic bucket-list itinerary — five countries in ten days, a photo at every landmark — is losing ground to a slower model: booking one base for several weeks and letting the trip unfold from there. Booking platforms are reporting a steady rise in longer, single-destination stays relative to the multi-city hop that defined travel planning for years.

Part of the shift is practical. Remote work flexibility means more travelers can extend a trip without burning vacation days, turning a two-week holiday into a six-week stay with a laptop along for a portion of it. Part of it is a genuine change in appetite, with more travelers describing exhaustion with itineraries built for photos rather than experience.

The travel industry has adjusted accordingly, with a rise in monthly rental listings tailored to extended stays and destination cities building infrastructure — co-working spaces, longer-term visa categories — specifically aimed at this slower-moving traveler rather than the weekend tourist.

It's not a trend without friction: cities popular with slow travelers have seen real tension with local housing markets, as short and medium-term rentals compete with long-term residents for the same apartment stock. The upside for the traveler is real; the downside for the destination is a live and unresolved debate.`,
    featuredImage: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
    category: "Lifestyle",
    categorySlug: "lifestyle",
    authorId: "priya-nair",
    authorName: "Priya Nair",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "Slow Travel Is Winning Out Over the Bucket-List Trip — PULSE",
    metaDescription: "More travelers trade multi-city blitzes for extended single-location stays and immersive living.",
    keywords: ["slow travel", "digital nomadism", "extended stays", "sustainable tourism"],
    publishedAt: "2026-08-11T09:20:00Z",
    updatedAt: "2026-08-11T09:20:00Z",
    createdAt: "2026-08-11T09:20:00Z",
    readingTime: "4 min"
  },
  {
    id: "pulse-art-13",
    originalId: 13,
    title: "Cloud Gaming Finally Stopped Feeling Like a Compromise",
    slug: "cloud-gaming-stopped-feeling-compromise",
    subtitle: "Years of lag jokes later, streaming a game instead of owning the hardware to run it has quietly become a genuinely good option.",
    excerpt: "Years of lag jokes later, streaming a game instead of owning the hardware to run it has quietly become a genuinely good option.",
    content: `Cloud gaming has been declared the future of the industry so many times that most players learned to ignore the claim. This year's version of the pitch is different mostly because the experience finally holds up: wider fiber and 5G coverage combined with smarter server placement have pushed input latency down to a range where competitive players, not just casual ones, are willing to use it.

The economics have shifted too. Instead of a single company trying to own the entire stack, the market has settled into a layer of infrastructure providers that game publishers and platforms plug into, similar to how streaming video separated content from delivery. That's made it viable for more players to enter without each one needing to build a global data center network from scratch.

The remaining holdouts are less about technology now and more about ownership — players who want a game they can keep regardless of a service's survival, and publishers wary of a subscription model that changes how games get funded and how successful individual titles need to be. Those aren't small objections, but they're a different kind of argument than the old claim that it simply doesn't work, which was the entire debate a few years ago.

The honest state of cloud gaming in 2026 is unglamorous: it just works, most of the time, for most games. That's a bigger deal than it sounds.`,
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    category: "Technology",
    categorySlug: "technology",
    authorId: "maya-chen",
    authorName: "Maya Chen",
    status: "published",
    featured: false,
    trending: true,
    seoTitle: "Cloud Gaming Finally Stopped Feeling Like a Compromise — PULSE",
    metaDescription: "Low-latency edge networks and fiber coverage make game streaming a genuinely seamless experience.",
    keywords: ["cloud gaming", "game streaming", "edge computing", "interactive entertainment"],
    publishedAt: "2026-08-10T17:40:00Z",
    updatedAt: "2026-08-10T17:40:00Z",
    createdAt: "2026-08-10T17:40:00Z",
    readingTime: "5 min"
  },
  {
    id: "pulse-art-14",
    originalId: 14,
    title: "The FIRE Movement Is Quietly Rebranding Around Flexibility, Not Retirement",
    slug: "fire-movement-rebranding-flexibility",
    subtitle: "Early retirement enthusiasts are increasingly optimizing for the freedom to change careers, not the freedom to stop working entirely.",
    excerpt: "Early retirement enthusiasts are increasingly optimizing for the freedom to change careers, not the freedom to stop working entirely.",
    content: `The Financial Independence, Retire Early movement built its identity around a specific endpoint: save aggressively, hit a number, quit working for good. That framing is shifting among a newer cohort of adherents, who talk less about permanent retirement and more about reaching a savings threshold that buys the option to walk away from any specific job without walking away from work itself.

Part of the change is generational skepticism about whether decades of pure leisure actually deliver the satisfaction the original movement promised — a number of high-profile early adopters have written candidly about boredom and identity loss after reaching their number and stopping entirely. Part of it is practical: a savings cushion that funds a career change or a sabbatical is a lower, more achievable bar than one meant to fund forty years of not working.

This softer version, sometimes called Coast FIRE or Barista FIRE within community forums, focuses on reaching enough savings early that compound growth alone will fund retirement decades later, freeing up current income for lower-pressure or more meaningful work in the meantime rather than maximum saving.

The core discipline — save early, save consistently, understand your number — hasn't changed. What's changed is the assumption that the finish line has to be a full stop.`,
    featuredImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1400&q=85",
    category: "Finance",
    categorySlug: "finance",
    authorId: "daniel-osei",
    authorName: "Daniel Osei",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "The FIRE Movement Rebrands Around Flexibility, Not Retirement — PULSE",
    metaDescription: "Early financial independence advocates shift from total retirement to career autonomy and sabbaticals.",
    keywords: ["FIRE movement", "financial independence", "Coast FIRE", "personal finance"],
    publishedAt: "2026-08-09T11:15:00Z",
    updatedAt: "2026-08-09T11:15:00Z",
    createdAt: "2026-08-09T11:15:00Z",
    readingTime: "5 min"
  },
  {
    id: "pulse-art-15",
    originalId: 15,
    title: "Wearables Are Starting to Predict Illness Before Symptoms Show Up",
    slug: "wearables-predicting-illness-early",
    subtitle: "A new class of health-tracking algorithms is using subtle shifts in heart rate and temperature to flag illness days before people feel sick.",
    excerpt: "A new class of health-tracking algorithms is using subtle shifts in heart rate and temperature to flag illness days before people feel sick.",
    content: `Fitness trackers have measured heart rate and sleep for years, but the interesting development recently isn't the sensors — it's what's being done with the data. Several wearable makers have rolled out illness-detection algorithms that look for subtle, sustained shifts in resting heart rate, heart rate variability, and skin temperature, flagging a likely oncoming illness a day or more before a person notices any symptoms.

The approach builds on research into how the body's autonomic nervous system responds in the earliest stages of infection, well before fever or fatigue become noticeable. Individually, none of the signals are dramatic; together, and tracked against a person's own baseline rather than a population average, they've proven more predictive than expected in early studies.

The practical use case so far is modest but real: earlier isolation decisions, earlier rest, and in some pilot programs with employers, earlier flexibility around sick leave without requiring a formal diagnosis first. It's a preventative nudge rather than a diagnosis, and the companies involved are careful — for both medical and legal reasons — not to frame it as one.

The bigger open question is what happens as this kind of continuous personal baseline data becomes something insurers, employers, or others might want access to. The technology is ahead of the policy conversation about who gets to see it.`,
    featuredImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=85",
    category: "Health",
    categorySlug: "health",
    authorId: "priya-nair",
    authorName: "Priya Nair",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "Wearables Are Starting to Predict Illness Before Symptoms Show Up — PULSE",
    metaDescription: "Biometric algorithms track autonomic nervous system anomalies to flag illness 24-48 hours before symptoms appear.",
    keywords: ["wearable technology", "biometric tracking", "preventative medicine", "health algorithms"],
    publishedAt: "2026-08-08T08:30:00Z",
    updatedAt: "2026-08-08T08:30:00Z",
    createdAt: "2026-08-08T08:30:00Z",
    readingTime: "6 min"
  },
  {
    id: "pulse-art-16",
    originalId: 16,
    title: "The Secondhand Fashion Market Is Now Too Big for Brands to Ignore",
    slug: "secondhand-fashion-market-too-big-to-ignore",
    subtitle: "Resale platforms have grown from niche thrift culture into a retail category major fashion houses are building official programs around.",
    excerpt: "Resale platforms have grown from niche thrift culture into a retail category major fashion houses are building official programs around.",
    content: `Buying secondhand clothing used to sit culturally apart from buying new — a thrift-store activity distinct from a retail one. That line has mostly dissolved. Resale platforms have grown into a large enough share of overall apparel spending that fashion brands, including several luxury houses that once treated resale as a threat to their exclusivity, are now launching official buy-back and resale programs of their own.

The motivations aren't purely environmental, even though sustainability messaging features heavily in the marketing. Brands running their own resale channels get to capture revenue that used to go entirely to third-party platforms, gather data on what customers actually want to resell, and offer entry price points that bring newer, younger customers into a brand before they can afford items new.

Younger shoppers, meanwhile, increasingly treat checking resale prices as a normal part of any purchase decision, using resale value as an informal signal of a garment's quality — a use of the secondhand market that has nothing to do with saving money and everything to do with informed buying.

The result is a fashion industry where the line between a first sale and a resale is blurrier than it's ever been, and where 'this will hold its value' has become an actual selling point on the primary retail floor.`,
    featuredImage: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
    category: "Lifestyle",
    categorySlug: "lifestyle",
    authorId: "priya-nair",
    authorName: "Priya Nair",
    status: "published",
    featured: false,
    trending: false,
    seoTitle: "The Secondhand Fashion Market Is Now Too Big for Brands to Ignore — PULSE",
    metaDescription: "Resale platforms evolve from vintage thrifting to official brand-backed luxury resale channels.",
    keywords: ["secondhand fashion", "circular economy", "retail resale", "sustainable fashion"],
    publishedAt: "2026-08-07T14:15:00Z",
    updatedAt: "2026-08-07T14:15:00Z",
    createdAt: "2026-08-07T14:15:00Z",
    readingTime: "4 min"
  }
];

export const BRAND_CONFIG = {
  name: "PULSE",
  tagline: "What the world is reading right now",
  taglineSecondary: "Independent perspective. Clear reporting.",
  description: "PULSE explores the ideas, industries and everyday shifts changing how we live and work. Independent perspective and clear reporting across technology, business, science, health and culture.",
  canonicalHost: "https://pulse-site-mkrs.onrender.com",
  gscVerification: "TeHpXFhlFnrR00GtA10uYcMcwMqaCP22Mdx8twcZIl8",
  contactEmail: "editorial@pulse-media.internal",
  established: "2026"
};
