import json, os, re
from datetime import date

ROOT = os.path.dirname(os.path.abspath(__file__))
BASE_URL = "https://www.pulse-news.example"  # TODO: replace with your real domain before launch
GA_ID = "G-XXXXXXXXXX"  # TODO: replace with your real GA4 Measurement ID
GSC_VERIFICATION = "REPLACE_WITH_YOUR_GOOGLE_SEARCH_CONSOLE_CODE"  # TODO

SITE_NAME = "PULSE"
SITE_TAGLINE = "What the world is reading right now"

AUTHORS = {
  "maya-chen": {
    "name": "Maya Chen",
    "role": "Technology & Science Correspondent",
    "bio": "Maya covers frontier technology and the science stories that are about to matter. She previously reported on emerging hardware and AI systems, and writes Pulse's weekly technology roundup.",
    "initials": "MC"
  },
  "daniel-osei": {
    "name": "Daniel Osei",
    "role": "Business & Work Correspondent",
    "bio": "Daniel writes about how work, money, and organizations are changing. He focuses on the economics behind cultural shifts — from office policy to the creator economy.",
    "initials": "DO"
  },
  "priya-nair": {
    "name": "Priya Nair",
    "role": "Health, Climate & Lifestyle Correspondent",
    "bio": "Priya reports on health, climate, food, and the way people are choosing to live differently. She's especially interested in stories where new data changes old advice.",
    "initials": "PN"
  }
}

CATEGORIES = [
  "Technology", "Work & Culture", "Climate", "Health",
  "Business", "Science", "Food", "Lifestyle", "Finance"
]

def slugify(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

CATEGORY_SLUGS = {c: slugify(c) for c in CATEGORIES}

ARTICLES = [
  dict(id=1, slug="ai-agents-boring-parts-of-your-job", cat="Technology", hot=True, author="maya-chen",
    title="AI Agents Just Started Doing the Boring Parts of Your Job",
    dek="Autonomous coding and research agents moved from novelty to daily habit in 2026 — and the shift is quieter than anyone expected.",
    read="6 min", date="2026-08-21",
    body=[
      "A year ago, most people who used an AI assistant were still typing prompts one at a time and copying the output somewhere else by hand. That gap has closed. Agents that can open a terminal, browse a codebase, run tests, and revise their own work until something actually passes are now a normal part of how software gets built — not a demo, a Tuesday.",
      "What changed wasn't a single breakthrough so much as a stack of smaller ones: longer context windows that let a model hold an entire project in mind, tool-use that's reliable enough to trust with real file systems, and a cultural shift where handing off a multi-step task no longer feels like a leap of faith.",
      "The boring parts went first. Migrating a config format, writing the fortieth unit test of the day, cleaning up a changelog — these are the tasks that used to eat an afternoon and now get delegated before lunch. The interesting part is what happens to the hours that frees up. Some teams are shipping faster. Others are simply arguing more, because the cost of trying an idea dropped and now there are more ideas to argue about.",
      "The skeptics have a fair point: agents still make confident mistakes, and the cleanup from a bad autonomous run can cost more time than it saved. But the trend line is not subtle. The question in most engineering meetings this year isn't whether to use an agent, it's which task to hand it next."
    ]),
  dict(id=2, slug="four-day-week-no-longer-experiment", cat="Work & Culture", hot=True, author="daniel-osei",
    title="The Four-Day Week Stopped Being an Experiment",
    dek="After years of pilot programs, a wave of mid-size companies made the shorter week permanent — and the productivity data finally caught up with the pitch.",
    read="5 min", date="2026-08-19",
    body=[
      "For most of the last decade, the four-day workweek lived in the same category as the standing desk: a good idea that a few companies tried and most treated as a perk rather than a policy. That's shifted. A string of multi-year pilots across professional services, healthcare administration, and software firms have now converted from trial to permanent policy, and the reasoning has moved from ideological to actuarial.",
      "The pattern in the data is consistent enough to be boring: output per hour rises enough to offset the lost day in roles built around focused, individual work, while roles that depend on constant availability — support desks, client-facing sales — see a smaller but still positive effect once staffing is restructured around coverage rather than headcount.",
      "The harder conversations are cultural, not financial. Middle managers who built their identity around being reachable are adjusting to a world where reachability is scheduled rather than assumed. And industries where a four-day week simply isn't possible — retail, manufacturing, frontline healthcare — are watching the trend from the outside, which is creating a new fault line in how workers compare jobs.",
      "None of this means the five-day week is finished. It means the burden of proof has flipped: companies now have to explain why they're still on five, not why they'd consider four."
    ]),
  dict(id=3, slug="direct-air-capture-gets-cheap", cat="Climate", hot=False, author="priya-nair",
    title="Direct Air Capture Finally Gets Cheap Enough to Matter",
    dek="A new generation of capture plants is pulling carbon from the sky at a fraction of the cost projected five years ago — and the economics are starting to work without subsidy.",
    read="7 min", date="2026-08-17",
    body=[
      "Direct air capture has spent most of its existence as the technology climate researchers mention with a caveat: promising in theory, absurdly expensive in practice. That caveat is getting quieter. New plants using solid-sorbent systems and waste-heat integration have pushed the cost per ton of captured carbon down sharply from where the first commercial facilities landed just a few years ago.",
      "The design changes are mostly unglamorous: better sorbent materials that need less energy to regenerate, plants built next to industrial heat sources instead of standalone, and manufacturing that borrows more from the auto industry's assembly-line playbook than from bespoke chemical engineering. None of it is a single dramatic fix — it's a hundred small ones stacked together.",
      "Critics still argue that capture technology is a distraction from cutting emissions at the source, and that argument hasn't gone away just because the price dropped. But the projects moving forward now are being paired with actual buyers — airlines and heavy industry purchasing removal credits directly — which is a different kind of validation than a subsidy program.",
      "The honest read is that direct air capture isn't going to solve climate change on its own, and nobody serious claims it will. What's changed is that it's no longer obviously too expensive to be part of the answer."
    ]),
  dict(id=4, slug="longevity-research-what-works", cat="Health", hot=True, author="priya-nair",
    title="What Longevity Research Actually Supports, and What's Still a Guess",
    dek="Between supplement marketing and genuine science, the gap has never been wider. Here's what's held up under scrutiny.",
    read="8 min", date="2026-08-20",
    body=[
      "Longevity has become one of the most heavily marketed categories in wellness, which makes it one of the hardest to read clearly. Strip away the supplement stacks and cold-plunge routines, and the research base that's actually accumulated real evidence is narrower — and less exciting — than the industry built around it.",
      "The strongest, most repeated findings are unglamorous: consistent resistance training, adequate protein intake, sleep regularity, and avoiding the two or three big risk multipliers — smoking, chronic poor sleep, sustained high blood sugar — still explain more variance in healthy lifespan than anything sold in a jar. Several compounds under heavy marketing, meanwhile, have thinner evidence in humans than the confidence of their branding would suggest, with results that look strong in early trials and considerably murkier once studies scale up.",
      "What is genuinely new is the measurement layer. Continuous glucose monitors, sleep trackers, and cheap blood panels have made it possible for ordinary people to see their own trends over time instead of guessing, and that visibility is changing behavior in ways that are easier to sustain than a strict protocol imposed from outside.",
      "The field's own researchers tend to be the most cautious voices in it — which is usually a sign worth listening to, in an industry built on selling certainty."
    ]),
  dict(id=5, slug="paid-newsletters-outearn-display-ads", cat="Business", hot=False, author="daniel-osei",
    title="Paid Newsletters Are Quietly Outearning Display Ads for Independent Writers",
    dek="The economics of online writing have flipped: a smaller, paying audience now beats a large free one for most working writers.",
    read="5 min", date="2026-08-15",
    body=[
      "For most of the 2010s, the advice to anyone trying to make a living writing online was to grow an audience first and figure out monetization later, usually through ads or sponsorships. That math has reversed. Independent writers with subscriber bases in the low thousands are now routinely reporting more reliable income than writers with ten times the free readership relying on advertising.",
      "The shift tracks a broader move toward direct relationships between creators and audiences, cutting out the algorithmic middle layer that decided who saw what. A newsletter that lands in an inbox doesn't have to fight a feed for attention, and a reader who pays a subscription is a fundamentally different kind of audience than one who clicked a link once.",
      "This isn't universally rosy. The paid model rewards a narrower kind of writing — consistent, identifiable voice, a beat the audience actually wants updates on — and it's brutal for writers whose strength is one-off viral pieces rather than a sustained relationship. Platforms taking a cut, typically a meaningful percentage of subscription revenue, are also facing new pressure from writers experimenting with independent billing.",
      "The bigger story might be what this means for journalism broadly: a media landscape where trust in an individual byline is becoming more valuable than trust in a masthead."
    ]),
  dict(id=6, slug="sodium-ion-batteries-second-contender", cat="Technology", hot=True, author="maya-chen",
    title="The Battery Chemistry Race Just Got a Real Second Contender",
    dek="Sodium-ion batteries have moved from lab curiosity to production lines, and they're changing the calculus for cheap EVs and grid storage.",
    read="6 min", date="2026-08-18",
    body=[
      "Lithium-ion has been the default answer to energy storage for so long that alternatives rarely got serious attention outside of academic papers. Sodium-ion batteries are the exception this year, moving out of pilot lines and into actual vehicles and grid-storage installations at a pace that surprised even people inside the industry.",
      "The appeal is straightforward: sodium is abundant and cheap compared to lithium, the supply chain isn't concentrated in the same handful of countries, and the batteries perform better in cold weather, a persistent weak point for lithium-ion. The tradeoff is energy density — sodium-ion packs store less energy per kilogram, which rules them out for long-range premium vehicles but makes them a strong fit for short-range city cars, buses, and stationary grid storage where weight matters less than cost.",
      "Automakers chasing an entry-level EV price point have taken notice first, since a cheaper battery is the single biggest lever on a budget vehicle's sticker price. Utility-scale storage projects are close behind, since grid batteries don't need to be light, just cheap and durable.",
      "Nobody in the industry expects sodium-ion to replace lithium outright. The more likely outcome is a split market — lithium for range, sodium for cost — which is a healthier place for the industry to be than a single-chemistry dependency."
    ]),
  dict(id=7, slug="mental-health-apps-regulatory-reckoning", cat="Health", hot=False, author="priya-nair",
    title="Mental Health Apps Are Facing Their First Real Regulatory Reckoning",
    dek="After years of light-touch oversight, regulators are starting to ask the apps millions rely on for therapy-adjacent support to prove they actually work.",
    read="6 min", date="2026-08-14",
    body=[
      "Mental health apps grew fast in a regulatory gray zone: not quite medical devices, not quite pure wellness products, and largely exempt from the kind of evidence requirements that apply to actual clinical treatment. That gray zone is narrowing. Several jurisdictions have introduced rules this year that require apps offering therapy-adjacent features — mood tracking tied to clinical claims, AI chat support marketed as therapeutic — to demonstrate efficacy rather than just user satisfaction.",
      "The push comes after a string of investigations found meaningful gaps between marketing language and what the underlying tools actually deliver, along with concerns about how sensitive mental health data gets used and sold once it leaves the app. For an industry that scaled largely on trust and word of mouth, the scrutiny is a genuine inflection point.",
      "The apps taking it seriously are the ones investing in actual clinical trials and publishing results, which is expensive and slow compared to shipping features. The ones that don't are likely to get squeezed out of app store categories that now require substantiation for health claims.",
      "For users, the practical upshot is a clearer, if smaller, field of tools that can back up what they promise — which, for a category dealing with something as consequential as mental health, is probably overdue."
    ]),
  dict(id=8, slug="private-space-stations-real-hardware", cat="Science", hot=True, author="maya-chen",
    title="Private Space Stations Are No Longer a Hypothetical",
    dek="With the current orbital station approaching retirement, the companies building its commercial successors are finally showing hardware, not just renderings.",
    read="7 min", date="2026-08-22",
    body=[
      "For years, the idea of commercial replacements for government-run orbital stations lived mostly in investor decks and artist renderings. That's changed this year, with multiple companies moving from concept to actual pressurized modules undergoing ground testing, and at least one program targeting an uncrewed demonstration flight in the near term.",
      "The business case has sharpened along with the hardware. Rather than betting on space tourism alone, the leading programs are structured around a mix of government research contracts, pharmaceutical microgravity manufacturing, and media production — a more diversified revenue base than the industry had a few years ago, when tourism was assumed to carry most of the weight.",
      "The technical challenges remain serious: life support systems that need to run reliably for years without a repair crew on call, and the basic economics of getting enough mass to orbit cheaply enough to make a station viable without permanent subsidy. Launch costs falling has done more to make this plausible than any single station design choice.",
      "What's notable is less any individual program succeeding and more the fact that there are now several credible competitors instead of one dominant plan — which is usually the sign an industry is becoming real rather than aspirational."
    ]),
  dict(id=9, slug="ai-phishing-emails-getting-good", cat="Technology", hot=False, author="maya-chen",
    title="AI-Written Phishing Emails Are Getting Uncomfortably Good",
    dek="Security teams say the tell-tale signs of a scam email — bad grammar, generic greetings — have mostly disappeared, and defenses are scrambling to catch up.",
    read="5 min", date="2026-08-16",
    body=[
      "The advice to watch for spelling mistakes and awkward phrasing in suspicious emails is aging out fast. Security researchers are reporting a sharp rise in phishing attempts that read as fluent, contextually appropriate, and personalized — the direct result of attackers using the same language models that power ordinary writing assistants, pointed at scraped personal and professional data instead of a to-do list.",
      "The shift changes what actually works as a defense. Training people to spot bad grammar was never a great strategy, but it worked well enough to matter; now that crutch is gone, and the emphasis is moving toward technical verification — authentication protocols, sender reputation systems — rather than asking humans to eyeball their way to safety.",
      "Ironically, the same AI capabilities driving the attacks are showing up on the defensive side too, with email security tools using language models to flag subtle behavioral anomalies that a fluent, well-written email would otherwise sail past. It's an arms race with both sides using similar tools, which is a strange but increasingly normal shape for cybersecurity conflicts to take.",
      "The practical takeaway for most people hasn't changed even if the tell-tales have: verify unusual requests through a second channel, and treat urgency in a message as a reason to slow down, not speed up."
    ]),
  dict(id=10, slug="return-to-office-mandates-talent-market", cat="Work & Culture", hot=False, author="daniel-osei",
    title="Return-to-Office Mandates Are Colliding With a Tighter Talent Market",
    dek="Companies pushing workers back to five days in-office are finding the leverage isn't quite where they expected it to be.",
    read="5 min", date="2026-08-13",
    body=[
      "A wave of large employers issued strict return-to-office mandates over the past two years, betting that a cooling job market would leave workers with little choice but to comply. The results have been messier than the announcements suggested. Attrition among senior and highly skilled staff has been notably higher at companies with the strictest mandates, even in a labor market that's generally favored employers.",
      "The pattern suggests office policy has become a sorting mechanism rather than a productivity lever: the employees most able to leave — typically the most experienced and most in-demand — are the ones most likely to act on a mandate they dislike, while employees with fewer options stay and comply. That's not the outcome most return-to-office arguments were built around.",
      "Companies that have taken a more flexible, hybrid-by-default approach are increasingly using it as a recruiting pitch rather than a concession, which has quietly turned office policy into a competitive differentiator in industries fighting for scarce specialized talent.",
      "None of this settles the underlying debate about whether in-person work produces better collaboration — reasonable people still disagree, and the evidence is genuinely mixed by role and industry. What's clearer is that mandates alone aren't a free lever; they come with a real cost in who chooses to stay."
    ]),
  dict(id=11, slug="precision-fermented-proteins-quiet-second-act", cat="Food", hot=False, author="priya-nair",
    title="Precision-Fermented Proteins Are the Quiet Second Act of Plant-Based Food",
    dek="After the first wave of plant-based meat lost momentum, a less flashy technology is picking up the slack — brewing actual animal proteins without the animal.",
    read="6 min", date="2026-08-12",
    body=[
      "The first generation of plant-based meat promised a near-identical substitute and largely delivered on texture while falling short on the underlying protein profile, which is part of why sales cooled after their initial surge. Precision fermentation is a different approach entirely: instead of approximating meat or dairy from plant ingredients, it uses engineered microorganisms to brew the actual proteins found in animal products — the same casein in cheese, the same proteins that give egg whites their structure — without an animal involved.",
      "The result tastes and behaves more like the real thing because, at a molecular level, key components of it are the real thing. Dairy companies have been the fastest to adopt the technology, using fermentation-derived proteins to cut costs and emissions in products like whey and cheese without changing the product a consumer actually experiences.",
      "The technology isn't cheap yet, and scaling fermentation to the volumes needed for mainstream grocery pricing remains the central bottleneck. But the trajectory mirrors other fermentation-based industries like insulin production, where costs fell sharply once production scaled past the early, expensive phase.",
      "It's a less visible revolution than a burger that bleeds like beef, but it may end up mattering more, since it targets ingredients that show up in far more products than any single substitute meat ever could."
    ]),
  dict(id=12, slug="slow-travel-winning-bucket-list-trip", cat="Lifestyle", hot=False, author="priya-nair",
    title="Slow Travel Is Winning Out Over the Bucket-List Trip",
    dek="More travelers are trading a checklist of cities for weeks spent in one place — and the data on flight bookings backs it up.",
    read="4 min", date="2026-08-11",
    body=[
      "The classic bucket-list itinerary — five countries in ten days, a photo at every landmark — is losing ground to a slower model: booking one base for several weeks and letting the trip unfold from there. Booking platforms are reporting a steady rise in longer, single-destination stays relative to the multi-city hop that defined travel planning for years.",
      "Part of the shift is practical. Remote work flexibility means more travelers can extend a trip without burning vacation days, turning a two-week holiday into a six-week stay with a laptop along for a portion of it. Part of it is a genuine change in appetite, with more travelers describing exhaustion with itineraries built for photos rather than experience.",
      "The travel industry has adjusted accordingly, with a rise in monthly rental listings tailored to extended stays and destination cities building infrastructure — co-working spaces, longer-term visa categories — specifically aimed at this slower-moving traveler rather than the weekend tourist.",
      "It's not a trend without friction: cities popular with slow travelers have seen real tension with local housing markets, as short and medium-term rentals compete with long-term residents for the same apartment stock. The upside for the traveler is real; the downside for the destination is a live and unresolved debate."
    ]),
  dict(id=13, slug="cloud-gaming-stopped-feeling-compromise", cat="Technology", hot=True, author="maya-chen",
    title="Cloud Gaming Finally Stopped Feeling Like a Compromise",
    dek="Years of lag jokes later, streaming a game instead of owning the hardware to run it has quietly become a genuinely good option.",
    read="5 min", date="2026-08-10",
    body=[
      "Cloud gaming has been declared the future of the industry so many times that most players learned to ignore the claim. This year's version of the pitch is different mostly because the experience finally holds up: wider fiber and 5G coverage combined with smarter server placement have pushed input latency down to a range where competitive players, not just casual ones, are willing to use it.",
      "The economics have shifted too. Instead of a single company trying to own the entire stack, the market has settled into a layer of infrastructure providers that game publishers and platforms plug into, similar to how streaming video separated content from delivery. That's made it viable for more players to enter without each one needing to build a global data center network from scratch.",
      "The remaining holdouts are less about technology now and more about ownership — players who want a game they can keep regardless of a service's survival, and publishers wary of a subscription model that changes how games get funded and how successful individual titles need to be. Those aren't small objections, but they're a different kind of argument than the old claim that it simply doesn't work, which was the entire debate a few years ago.",
      "The honest state of cloud gaming in 2026 is unglamorous: it just works, most of the time, for most games. That's a bigger deal than it sounds."
    ]),
  dict(id=14, slug="fire-movement-rebranding-flexibility", cat="Finance", hot=False, author="daniel-osei",
    title="The FIRE Movement Is Quietly Rebranding Around Flexibility, Not Retirement",
    dek="Early retirement enthusiasts are increasingly optimizing for the freedom to change careers, not the freedom to stop working entirely.",
    read="5 min", date="2026-08-09",
    body=[
      "The Financial Independence, Retire Early movement built its identity around a specific endpoint: save aggressively, hit a number, quit working for good. That framing is shifting among a newer cohort of adherents, who talk less about permanent retirement and more about reaching a savings threshold that buys the option to walk away from any specific job without walking away from work itself.",
      "Part of the change is generational skepticism about whether decades of pure leisure actually deliver the satisfaction the original movement promised — a number of high-profile early adopters have written candidly about boredom and identity loss after reaching their number and stopping entirely. Part of it is practical: a savings cushion that funds a career change or a sabbatical is a lower, more achievable bar than one meant to fund forty years of not working.",
      "This softer version, sometimes called Coast FIRE or Barista FIRE within community forums, focuses on reaching enough savings early that compound growth alone will fund retirement decades later, freeing up current income for lower-pressure or more meaningful work in the meantime rather than maximum saving.",
      "The core discipline — save early, save consistently, understand your number — hasn't changed. What's changed is the assumption that the finish line has to be a full stop."
    ]),
  dict(id=15, slug="wearables-predicting-illness-early", cat="Health", hot=False, author="priya-nair",
    title="Wearables Are Starting to Predict Illness Before Symptoms Show Up",
    dek="A new class of health-tracking algorithms is using subtle shifts in heart rate and temperature to flag illness days before people feel sick.",
    read="6 min", date="2026-08-08",
    body=[
      "Fitness trackers have measured heart rate and sleep for years, but the interesting development recently isn't the sensors — it's what's being done with the data. Several wearable makers have rolled out illness-detection algorithms that look for subtle, sustained shifts in resting heart rate, heart rate variability, and skin temperature, flagging a likely oncoming illness a day or more before a person notices any symptoms.",
      "The approach builds on research into how the body's autonomic nervous system responds in the earliest stages of infection, well before fever or fatigue become noticeable. Individually, none of the signals are dramatic; together, and tracked against a person's own baseline rather than a population average, they've proven more predictive than expected in early studies.",
      "The practical use case so far is modest but real: earlier isolation decisions, earlier rest, and in some pilot programs with employers, earlier flexibility around sick leave without requiring a formal diagnosis first. It's a preventative nudge rather than a diagnosis, and the companies involved are careful — for both medical and legal reasons — not to frame it as one.",
      "The bigger open question is what happens as this kind of continuous personal baseline data becomes something insurers, employers, or others might want access to. The technology is ahead of the policy conversation about who gets to see it."
    ]),
  dict(id=16, slug="secondhand-fashion-market-too-big-to-ignore", cat="Lifestyle", hot=False, author="priya-nair",
    title="The Secondhand Fashion Market Is Now Too Big for Brands to Ignore",
    dek="Resale platforms have grown from niche thrift culture into a retail category major fashion houses are building official programs around.",
    read="4 min", date="2026-08-07",
    body=[
      "Buying secondhand clothing used to sit culturally apart from buying new — a thrift-store activity distinct from a retail one. That line has mostly dissolved. Resale platforms have grown into a large enough share of overall apparel spending that fashion brands, including several luxury houses that once treated resale as a threat to their exclusivity, are now launching official buy-back and resale programs of their own.",
      "The motivations aren't purely environmental, even though sustainability messaging features heavily in the marketing. Brands running their own resale channels get to capture revenue that used to go entirely to third-party platforms, gather data on what customers actually want to resell, and offer entry price points that bring newer, younger customers into a brand before they can afford items new.",
      "Younger shoppers, meanwhile, increasingly treat checking resale prices as a normal part of any purchase decision, using resale value as an informal signal of a garment's quality — a use of the secondhand market that has nothing to do with saving money and everything to do with informed buying.",
      "The result is a fashion industry where the line between a first sale and a resale is blurrier than it's ever been, and where 'this will hold its value' has become an actual selling point on the primary retail floor."
    ]),
]

for a in ARTICLES:
    a["cat_slug"] = CATEGORY_SLUGS[a["cat"]]

def w(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)

def head(title, description, canonical_path, schema=None):
    canonical = f"{BASE_URL}{canonical_path}"
    schema_block = f'<script type="application/ld+json">{json.dumps(schema)}</script>' if schema else ""
    return f"""<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="{canonical}">
<meta name="robots" content="index, follow">
<meta name="google-site-verification" content="{GSC_VERIFICATION}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{SITE_NAME}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{canonical}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;700;900&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
{schema_block}
<!-- Google Analytics (GA4) — replace GA_ID above with your real Measurement ID before launch -->
<script async src="https://www.googletagmanager.com/gtag/js?id={GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', '{GA_ID}');
</script>"""

def nav(root, active=""):
    def cls(name):
        return ' class="active"' if active == name else ""
    cat_links = "".join(f'<a href="{root}categories/{CATEGORY_SLUGS[c]}.html">{c}</a>' for c in CATEGORIES)
    return f"""<header class="site">
  <a class="logo" href="{root}index.html"><span class="bar"></span>{SITE_NAME}</a>
  <nav class="cats">
    <a href="{root}index.html"{cls('home')}>Home</a>
    <div class="cats-dropdown" tabindex="0">
      <a href="#" onclick="return false;">Categories ▾</a>
      <div class="cats-dropdown-menu">{cat_links}</div>
    </div>
    <a href="{root}about.html"{cls('about')}>About</a>
    <a href="{root}contact.html"{cls('contact')}>Contact</a>
  </nav>
  <div class="nav-right">
    <a class="icon-btn" href="{root}search.html" aria-label="Search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </a>
  </div>
</header>"""

def footer(root):
    cat_links = "".join(f'<a href="{root}categories/{CATEGORY_SLUGS[c]}.html">{c}</a>' for c in CATEGORIES[:6])
    return f"""<footer>
  <div class="f-col">
    <div class="logo"><span class="bar"></span>{SITE_NAME}</div>
    <p style="margin-top:0.8rem; max-width:32ch;">{SITE_TAGLINE}.</p>
  </div>
  <div class="f-col"><h4>Categories</h4>{cat_links}</div>
  <div class="f-col"><h4>Company</h4>
    <a href="{root}about.html">About</a>
    <a href="{root}contact.html">Contact</a>
    <a href="{root}search.html">Search</a>
  </div>
  <div class="f-col"><h4>Legal</h4>
    <a href="{root}privacy.html">Privacy Policy</a>
    <a href="{root}terms.html">Terms of Service</a>
  </div>
  <div class="f-bottom">
    <span>&copy; {date.today().year} {SITE_NAME} Media. All rights reserved.</span>
    <span>Built as a static site &middot; add your domain in generate.py</span>
  </div>
</footer>"""

def ticker_markup():
    return '<div class="ticker-wrap"><div class="ticker" id="ticker" data-source="fetch"></div></div>'

def page_shell(root, title, description, canonical_path, body_html, active="", schema=None, extra_head=""):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
{head(title, description, canonical_path, schema)}
{extra_head}
<link rel="stylesheet" href="{root}assets/style.css">
</head>
<body data-root="{root}">
{ticker_markup()}
{nav(root, active)}
{body_html}
{footer(root)}
<script src="{root}assets/main.js"></script>
</body>
</html>"""

def card_html(root, a):
    hot = " hot" if a["hot"] else ""
    return f"""<div class="card{hot}">
  <div class="card-cat">{a['cat']}<span class="heat"><span></span><span></span><span></span></span></div>
  <h3><a href="{root}articles/{a['slug']}.html">{a['title']}</a></h3>
  <p>{a['dek']}</p>
  <div class="card-meta"><span>{a['read']} read</span><span>{a['date']}</span></div>
</div>"""

# ---------------- HOMEPAGE ----------------
def build_homepage():
    root = ""
    featured = ARTICLES[7]  # private space stations - most recent hot story
    side = [a for a in ARTICLES if a["id"] != featured["id"]][:3]
    rest = [a for a in ARTICLES if a["id"] not in [featured["id"]] + [s["id"] for s in side]]
    hero = f"""<section class="hero">
    <div>
      <div class="hero-eyebrow">Top story right now</div>
      <h1><a href="{root}articles/{featured['slug']}.html">{featured['title']}</a></h1>
      <p class="dek">{featured['dek']}</p>
      <div class="hero-meta"><span>{featured['cat']}</span><span>&middot;</span><span>{featured['read']} read</span><span>&middot;</span><span>{featured['date']}</span></div>
    </div>
    <div class="hero-side">
      {''.join(f'''<div class="hero-side-item">
        <div class="hero-side-num">0{i+2}</div>
        <div>
          <span class="hero-side-cat">{s['cat']}</span>
          <div class="hero-side-title"><a href="{root}articles/{s['slug']}.html">{s['title']}</a></div>
        </div>
      </div>''' for i, s in enumerate(side))}
    </div>
  </section>"""
    grid = f"""<main>
    <div class="section-label">Everything trending</div>
    <div class="grid">{''.join(card_html(root, a) for a in rest)}</div>
  </main>"""
    schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": SITE_NAME,
        "url": BASE_URL,
        "description": SITE_TAGLINE,
    }
    body = hero + grid
    html = page_shell(root, f"{SITE_NAME} — {SITE_TAGLINE}",
        "Pulse covers the technology, health, work, climate, and culture stories people are actually reading about right now.",
        "/index.html", body, active="home", schema=schema)
    w("index.html", html)

# ---------------- ARTICLE PAGES ----------------
def build_article(a):
    root = "../"
    related = [x for x in ARTICLES if x["cat"] == a["cat"] and x["id"] != a["id"]][:3]
    author = AUTHORS[a["author"]]
    breadcrumb = f"""<div class="breadcrumb"><a href="{root}index.html">Home</a> / <a href="{root}categories/{a['cat_slug']}.html">{a['cat']}</a> / {a['title']}</div>"""
    related_html = ""
    if related:
        related_html = f"""<div class="related">
      <div class="related-title">More in {a['cat']}</div>
      {''.join(f'''<a class="related-item" href="{root}articles/{r['slug']}.html">
        <span class="rc">{r['cat']}</span>
        <div class="rt">{r['title']}</div>
      </a>''' for r in related)}
    </div>"""
    body = f"""{breadcrumb}
<article class="reader">
  <a class="back-btn" href="{root}index.html">&larr; Back to {SITE_NAME}</a>
  <div class="r-cat"><a href="{root}categories/{a['cat_slug']}.html">{a['cat']}</a></div>
  <h1>{a['title']}</h1>
  <div class="r-meta">
    <span>By <a href="{root}authors/{a['author']}.html">{author['name']}</a></span>
    <span>{a['date']}</span>
    <span>{a['read']} read</span>
  </div>
  <p class="r-dek">{a['dek']}</p>
  <div class="r-body">{''.join(f'<p>{p}</p>' for p in a['body'])}</div>
  <div class="share-row">
    <a href="https://twitter.com/intent/tweet?url={BASE_URL}/articles/{a['slug']}.html&text={a['title']}" rel="noopener" target="_blank">Share on X</a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url={BASE_URL}/articles/{a['slug']}.html" rel="noopener" target="_blank">Share on LinkedIn</a>
    <a href="mailto:?subject={a['title']}&body={BASE_URL}/articles/{a['slug']}.html">Email</a>
  </div>
  <div class="author-box">
    <div class="author-avatar">{author['initials']}</div>
    <div>
      <div class="name"><a href="{root}authors/{a['author']}.html">{author['name']}</a></div>
      <div class="role">{author['role']}</div>
    </div>
  </div>
  {related_html}
</article>"""
    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": a["title"],
        "description": a["dek"],
        "datePublished": a["date"],
        "author": {"@type": "Person", "name": author["name"]},
        "publisher": {"@type": "Organization", "name": SITE_NAME},
        "mainEntityOfPage": f"{BASE_URL}/articles/{a['slug']}.html",
        "articleSection": a["cat"],
    }
    html = page_shell(root, f"{a['title']} — {SITE_NAME}", a["dek"], f"/articles/{a['slug']}.html", body, schema=schema)
    w(f"articles/{a['slug']}.html", html)

# ---------------- CATEGORY PAGES ----------------
def build_category(cat):
    root = "../"
    slug = CATEGORY_SLUGS[cat]
    items = [a for a in ARTICLES if a["cat"] == cat]
    breadcrumb = f"""<div class="breadcrumb"><a href="{root}index.html">Home</a> / {cat}</div>"""
    body = f"""{breadcrumb}
<main>
  <h1 class="page-title">{cat}</h1>
  <p class="page-sub">{len(items)} article{'s' if len(items) != 1 else ''} filed under {cat}.</p>
  <div class="grid">{''.join(card_html(root, a) for a in items) if items else '<div class="card"><p>No articles yet in this category.</p></div>'}</div>
</main>"""
    html = page_shell(root, f"{cat} — {SITE_NAME}", f"All {SITE_NAME} articles about {cat.lower()}.", f"/categories/{slug}.html", body)
    w(f"categories/{slug}.html", html)

# ---------------- AUTHOR PAGES ----------------
def build_author(slug, info):
    root = "../"
    items = [a for a in ARTICLES if a["author"] == slug]
    breadcrumb = f"""<div class="breadcrumb"><a href="{root}index.html">Home</a> / Authors / {info['name']}</div>"""
    body = f"""{breadcrumb}
<main>
  <div class="author-card" style="margin-bottom:2.4rem;">
    <div class="author-avatar">{info['initials']}</div>
    <div>
      <div class="name" style="font-family:var(--display); font-weight:700; font-size:1.6rem;">{info['name']}</div>
      <div class="role" style="margin:0.3rem 0 0.8rem;">{info['role']}</div>
      <p style="max-width:60ch; color:var(--ink-soft);">{info['bio']}</p>
    </div>
  </div>
  <div class="section-label">Articles by {info['name']}</div>
  <div class="grid">{''.join(card_html(root, a) for a in items)}</div>
</main>"""
    html = page_shell(root, f"{info['name']} — {SITE_NAME}", f"{info['bio']}", f"/authors/{slug}.html", body)
    w(f"authors/{slug}.html", html)

# ---------------- SEARCH PAGE ----------------
def build_search():
    root = ""
    breadcrumb = f"""<div class="breadcrumb"><a href="{root}index.html">Home</a> / Search</div>"""
    body = f"""{breadcrumb}
<section class="search-hero">
  <h1 class="page-title">Search Pulse</h1>
  <p class="page-sub">Search across every article by title, topic, or category.</p>
  <div class="search-box-lg">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input id="searchInput" type="text" placeholder="Try “AI”, “climate”, or “health”" autofocus>
  </div>
</section>
<div id="searchResults" style="padding-bottom:4rem;"></div>"""
    html = page_shell(root, f"Search — {SITE_NAME}", "Search every Pulse article by keyword or category.", "/search.html", body, active="search")
    w("search.html", html)

# ---------------- ABOUT ----------------
def build_about():
    root = ""
    breadcrumb = f"""<div class="breadcrumb"><a href="{root}index.html">Home</a> / About</div>"""
    author_cards = "".join(f"""<div class="author-card">
      <div class="author-avatar">{info['initials']}</div>
      <div>
        <div style="font-family:var(--display); font-weight:700; font-size:1.15rem;"><a href="authors/{slug}.html">{info['name']}</a></div>
        <div style="font-family:var(--mono); font-size:0.75rem; color:var(--ink-soft); margin:0.2rem 0 0.6rem;">{info['role']}</div>
        <p style="margin:0;">{info['bio']}</p>
      </div>
    </div>""" for slug, info in AUTHORS.items())
    body = f"""{breadcrumb}
<div class="static-page">
  <h1>About {SITE_NAME}</h1>
  <p>{SITE_NAME} covers the stories that are actually moving through conversation right now — in technology, health, work, climate, and culture — with a focus on what's genuinely new versus what's just loudly marketed.</p>
  <p>We publish original reporting and analysis, aimed at readers who want the shape of a trend explained clearly, without the hype or the doom.</p>
  <h2>Our team</h2>
  {author_cards}
  <h2>Editorial standards</h2>
  <p>Every story is written and reviewed before publication. When evidence is mixed or a claim is contested, we say so rather than flattening it into a cleaner narrative. If we get something wrong, we correct it openly.</p>
</div>"""
    html = page_shell(root, f"About — {SITE_NAME}", f"Learn about {SITE_NAME}, our team, and our editorial standards.", "/about.html", body, active="about")
    w("about.html", html)

# ---------------- CONTACT ----------------
def build_contact():
    root = ""
    breadcrumb = f"""<div class="breadcrumb"><a href="{root}index.html">Home</a> / Contact</div>"""
    body = f"""{breadcrumb}
<div class="static-page">
  <h1>Contact Us</h1>
  <p>Have a tip, a correction, or a question? Send us a message and we'll get back to you.</p>
  <!--
    This form currently has no backend. To make it functional on a static host,
    connect it to a form service such as Formspree, Netlify Forms, or Getform,
    then replace the form "action" attribute below with your endpoint.
  -->
  <form action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID" method="POST">
    <div class="form-field">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
    </div>
    <div class="form-field">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div class="form-field">
      <label for="subject">Subject</label>
      <input type="text" id="subject" name="subject">
    </div>
    <div class="form-field">
      <label for="message">Message</label>
      <textarea id="message" name="message" required></textarea>
    </div>
    <button class="submit-btn" type="submit">Send message</button>
  </form>
  <h2>Other ways to reach us</h2>
  <p>General inquiries: <a href="mailto:hello@pulse-news.example">hello@pulse-news.example</a><br>
  Press &amp; partnerships: <a href="mailto:press@pulse-news.example">press@pulse-news.example</a></p>
</div>"""
    html = page_shell(root, f"Contact — {SITE_NAME}", f"Get in touch with the {SITE_NAME} team.", "/contact.html", body, active="contact")
    w("contact.html", html)

# ---------------- PRIVACY ----------------
def build_privacy():
    root = ""
    breadcrumb = f"""<div class="breadcrumb"><a href="{root}index.html">Home</a> / Privacy Policy</div>"""
    body = f"""{breadcrumb}
<div class="static-page">
  <h1>Privacy Policy</h1>
  <p class="updated">Last updated: {date.today().isoformat()}</p>
  <p>This Privacy Policy explains how {SITE_NAME} ("we", "us") collects, uses, and protects information when you visit this website. This is a template policy — replace the bracketed details and review it with a qualified professional before publishing it on a live site.</p>
  <h2>Information we collect</h2>
  <p>We collect information you provide directly, such as your name and email address when you use our contact form. We also collect standard analytics information automatically, including pages visited, time on page, approximate location, and device/browser type, via Google Analytics.</p>
  <h2>Cookies and analytics</h2>
  <p>This site uses Google Analytics (GA4) to understand how visitors use it. Google Analytics uses cookies and similar technologies to collect anonymized usage data. You can opt out of Google Analytics tracking using browser extensions such as the Google Analytics Opt-out Browser Add-on, or by adjusting your cookie preferences where offered.</p>
  <h2>How we use information</h2>
  <ul>
    <li>To operate, maintain, and improve the site</li>
    <li>To respond to messages sent through our contact form</li>
    <li>To understand aggregate readership trends</li>
  </ul>
  <h2>Sharing of information</h2>
  <p>We do not sell personal information. We may share information with service providers who help us operate the site (such as analytics and form-processing providers), and where required by law.</p>
  <h2>Your rights</h2>
  <p>Depending on where you live, you may have rights to access, correct, or delete your personal information, and to object to certain processing. To exercise these rights, contact us at <a href="mailto:privacy@pulse-news.example">privacy@pulse-news.example</a>.</p>
  <h2>Contact</h2>
  <p>Questions about this policy can be sent to <a href="mailto:privacy@pulse-news.example">privacy@pulse-news.example</a>.</p>
</div>"""
    html = page_shell(root, f"Privacy Policy — {SITE_NAME}", f"How {SITE_NAME} collects and uses information.", "/privacy.html", body)
    w("privacy.html", html)

# ---------------- TERMS ----------------
def build_terms():
    root = ""
    breadcrumb = f"""<div class="breadcrumb"><a href="{root}index.html">Home</a> / Terms of Service</div>"""
    body = f"""{breadcrumb}
<div class="static-page">
  <h1>Terms of Service</h1>
  <p class="updated">Last updated: {date.today().isoformat()}</p>
  <p>These Terms of Service govern your use of {SITE_NAME}. This is a template — have it reviewed by a qualified professional before publishing on a live site.</p>
  <h2>Using the site</h2>
  <p>You may access and read content on {SITE_NAME} for personal, non-commercial use. You may not republish, redistribute, or reproduce our articles in full without written permission; brief excerpts with attribution and a link back are welcome.</p>
  <h2>Accuracy of content</h2>
  <p>We aim for accuracy but content is provided "as is" without warranties of any kind. Articles reflect information available at the time of publication and may become outdated.</p>
  <h2>User submissions</h2>
  <p>If you submit information through our contact form, you grant us permission to use it to respond to you. Do not submit confidential or sensitive information through the contact form.</p>
  <h2>Limitation of liability</h2>
  <p>{SITE_NAME} and its contributors are not liable for any damages arising from your use of, or inability to use, this site or its content.</p>
  <h2>Changes to these terms</h2>
  <p>We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
  <h2>Contact</h2>
  <p>Questions about these terms can be sent to <a href="mailto:legal@pulse-news.example">legal@pulse-news.example</a>.</p>
</div>"""
    html = page_shell(root, f"Terms of Service — {SITE_NAME}", f"The terms governing use of {SITE_NAME}.", "/terms.html", body)
    w("terms.html", html)

# ---------------- DATA / SITEMAP / ROBOTS ----------------
def build_data_json():
    data = [{
        "id": a["id"], "slug": a["slug"], "title": a["title"], "dek": a["dek"],
        "category": a["cat"], "hot": a["hot"], "read": a["read"], "date": a["date"],
        "author": a["author"]
    } for a in ARTICLES]
    w("data/articles.json", json.dumps(data, indent=2))

def build_sitemap():
    urls = ["/index.html", "/about.html", "/contact.html", "/privacy.html", "/terms.html", "/search.html"]
    urls += [f"/categories/{s}.html" for s in CATEGORY_SLUGS.values()]
    urls += [f"/authors/{slug}.html" for slug in AUTHORS]
    urls += [f"/articles/{a['slug']}.html" for a in ARTICLES]
    entries = "\n".join(
        f"  <url><loc>{BASE_URL}{u}</loc><changefreq>weekly</changefreq></url>" for u in urls
    )
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{entries}
</urlset>"""
    w("sitemap.xml", xml)

def build_robots():
    txt = f"""User-agent: *
Allow: /

Sitemap: {BASE_URL}/sitemap.xml
"""
    w("robots.txt", txt)

if __name__ == "__main__":
    build_homepage()
    for a in ARTICLES:
        build_article(a)
    for c in CATEGORIES:
        build_category(c)
    for slug, info in AUTHORS.items():
        build_author(slug, info)
    build_search()
    build_about()
    build_contact()
    build_privacy()
    build_terms()
    build_data_json()
    build_sitemap()
    build_robots()
    print("Site generated.")
