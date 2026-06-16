export interface PhaseSection {
  heading: string;
  body: string;
}

export interface PhaseFaq {
  q: string;
  a: string;
}

export interface Phase {
  slug: string;
  title: string;
  tagline: string;
  order: number;
  /** 1-2 paragraphs of introduction. */
  intro: string;
  /** 3-4 sections of genuinely useful guidance. */
  sections: PhaseSection[];
  /** 4-6 concrete action items. */
  checklist: string[];
  /** Calculator slug from /mortgage-calculators/<slug>. */
  recommendedCalculator: string;
  /** Exactly 3 FAQ items. */
  faq: PhaseFaq[];
}

export const PHASES: Phase[] = [
  {
    slug: "pre-qualification",
    title: "Pre-Qualification",
    tagline: "Get a quick, no-pressure estimate of what you can borrow.",
    order: 1,
    intro:
      "Pre-qualification is the very first step of the mortgage journey. It gives you a fast, informal estimate of how much a lender might be willing to lend you based on a snapshot of your income, debts, and credit. Because it relies on self-reported numbers and usually involves only a soft credit check, pre-qualification has no impact on your credit score and can often be completed online in minutes.\n\nThink of pre-qualification as your starting line. It won't carry the same weight as a pre-approval when you make an offer, but it helps you set a realistic price range, spot credit or debt issues early, and walk into the home-buying process with a clear budget instead of a guess.",
    sections: [
      {
        heading: "What pre-qualification actually tells you",
        body: "A pre-qualification estimates your maximum loan amount and a rough monthly payment using the income, assets, and monthly debts you report. Lenders apply two key ratios: a front-end ratio (housing costs vs. gross income) and a back-end debt-to-income ratio (all monthly debts vs. gross income). Most conventional programs look for a back-end DTI at or below 43%, though many loans go higher. The number you receive is an estimate, not a commitment — but it is a reliable way to anchor your home search to a price you can actually carry.",
      },
      {
        heading: "Soft pull vs. hard pull",
        body: "Pre-qualification typically uses a soft credit inquiry, which is invisible to other lenders and does not affect your score. That makes it safe to shop and compare several lenders before committing. A hard inquiry — the kind that can shave a few points off your score — usually does not happen until you formally apply or move to full pre-approval. Knowing the difference lets you explore your options freely without worrying about credit damage.",
      },
      {
        heading: "Strengthen your numbers before you apply",
        body: "Use this phase to tidy up the inputs lenders care about. Paying down credit-card balances lowers your DTI and can lift your score; avoiding new loans or large purchases keeps your profile stable; and saving toward a larger down payment reduces both your loan amount and any private mortgage insurance. Even small improvements now can widen the range of homes — and rates — available to you later.",
      },
    ],
    checklist: [
      "Gather rough figures for gross monthly income and recurring monthly debts.",
      "Check your credit score through a free service so there are no surprises.",
      "Estimate how much cash you have for a down payment and closing costs.",
      "Run an affordability estimate to set a target price range.",
      "Request pre-qualification from two or three lenders to compare.",
    ],
    recommendedCalculator: "mortgage-affordability-calculator",
    faq: [
      {
        q: "Does pre-qualification hurt my credit score?",
        a: "Usually not. Most pre-qualifications use a soft credit inquiry that does not affect your score, so you can shop several lenders safely. Always confirm with the lender before you proceed.",
      },
      {
        q: "How long does pre-qualification take?",
        a: "Often just a few minutes online or a short phone call. Because it relies on information you report rather than verified documents, lenders can return an estimate almost immediately.",
      },
      {
        q: "Is pre-qualification a guarantee of a loan?",
        a: "No. It is an early estimate based on unverified information. The amount can change once a lender reviews your documents and pulls a full credit report during pre-approval and underwriting.",
      },
    ],
  },
  {
    slug: "pre-approval",
    title: "Pre-Approval",
    tagline: "Turn an estimate into a verified, offer-ready commitment letter.",
    order: 2,
    intro:
      "Pre-approval is where your borrowing power becomes real. Unlike pre-qualification, a pre-approval involves a lender verifying your income, assets, and credit, then issuing a letter stating how much they are prepared to lend. In competitive markets, a pre-approval letter is often the difference between an offer that gets taken seriously and one that gets passed over.\n\nA pre-approval typically requires a hard credit pull and documentation such as pay stubs, W-2s, and bank statements. The payoff is a stronger negotiating position, a precise budget, and a much faster path to closing once you find the right home.",
    sections: [
      {
        heading: "What documents you'll need",
        body: "Lenders verify the story behind your numbers, so gather two years of W-2s or tax returns, recent pay stubs covering 30 days, two to three months of bank and investment statements, and identification. Self-employed buyers should expect to provide profit-and-loss statements and additional tax documentation. Having these ready up front shortens the timeline and signals to the lender that you are organized and serious.",
      },
      {
        heading: "Locking in your real monthly payment",
        body: "Pre-approval is the moment to translate a price range into an actual monthly payment. Once a lender quotes you a rate, you can model principal, interest, taxes, insurance, and PMI to confirm the home you want fits your budget — not just the maximum the lender will allow. Borrowing less than your ceiling leaves room for maintenance, savings, and life. The maximum you qualify for and the payment you're comfortable with are rarely the same number.",
      },
      {
        heading: "How long pre-approval lasts",
        body: "Most pre-approval letters are valid for 60 to 90 days because credit and financial conditions change. If your search runs long, your lender can refresh the letter. During this window, keep your finances steady: don't change jobs, open new credit lines, or make large deposits without documentation, since any of these can change your approval before closing.",
      },
      {
        heading: "Shopping rates the smart way",
        body: "Rate shopping pays off. Multiple mortgage inquiries within a focused window — typically 14 to 45 days depending on the scoring model — are usually treated as a single inquiry, so comparing several lenders does minimal damage to your score. Compare the APR, not just the headline rate, and weigh lender fees and points so you're comparing true total cost.",
      },
    ],
    checklist: [
      "Collect pay stubs, W-2s, tax returns, and recent bank statements.",
      "Authorize a hard credit pull so the lender can verify your file.",
      "Compare pre-approval offers from multiple lenders on APR and fees.",
      "Calculate the full monthly payment at your quoted rate.",
      "Get your pre-approval letter in writing before you tour homes.",
      "Avoid new debt or job changes that could affect your approval.",
    ],
    recommendedCalculator: "mortgage-payment-calculator",
    faq: [
      {
        q: "What's the difference between pre-qualification and pre-approval?",
        a: "Pre-qualification is an informal estimate based on self-reported information. Pre-approval is a verified commitment from a lender who has reviewed your documents and credit, and it carries far more weight with sellers.",
      },
      {
        q: "How long is a pre-approval letter good for?",
        a: "Typically 60 to 90 days. After that, the lender may need updated documents and a fresh credit check before re-issuing the letter.",
      },
      {
        q: "Will applying with several lenders hurt my credit?",
        a: "Minimally. Credit-scoring models group mortgage inquiries made within a short window — generally 14 to 45 days — as a single event, so you can shop rates with little impact.",
      },
    ],
  },
  {
    slug: "house-hunting",
    title: "House Hunting",
    tagline: "Find the right home — and the right monthly payment to match.",
    order: 3,
    intro:
      "With a pre-approval in hand, the search begins. House hunting is the most exciting phase, but it's also where buyers most often stretch beyond what's comfortable. The goal is to find a home that fits your life and your budget, factoring in not just the purchase price but the full ongoing cost of ownership.\n\nA disciplined search starts with a clear list of must-haves and a firm payment ceiling. Working with a knowledgeable agent, touring efficiently, and running the numbers on every serious contender keeps you focused and ready to move quickly when the right home appears.",
    sections: [
      {
        heading: "Budget for the whole cost of ownership",
        body: "List price is only the beginning. Property taxes, homeowners insurance, HOA dues, PMI, utilities, and maintenance all add to your monthly outlay. A common rule of thumb is to budget 1% to 2% of the home's value annually for maintenance. Before you fall for a listing, model the complete monthly payment so you know the true cost of saying yes — two homes at the same price can have very different carrying costs once taxes and HOA fees are included.",
      },
      {
        heading: "Make a competitive, protected offer",
        body: "When you find the one, your agent will help you craft an offer with a price, earnest money deposit, and contingencies for financing, appraisal, and inspection. These contingencies protect your deposit if something goes wrong. In hot markets, buyers sometimes adjust contingencies to stand out — but never waive protections you don't fully understand. A strong pre-approval letter attached to your offer reassures sellers you can close.",
      },
      {
        heading: "Don't skip the inspection",
        body: "A professional home inspection can uncover roof, foundation, electrical, plumbing, or HVAC problems that aren't visible on a tour. The few hundred dollars an inspection costs can save you tens of thousands — or give you leverage to renegotiate the price or request repairs. Use the inspection period wisely and attend the inspection if you can to learn how the home works.",
      },
    ],
    checklist: [
      "Write down your must-haves, nice-to-haves, and deal-breakers.",
      "Set a firm monthly-payment ceiling and stick to it.",
      "Run the full payment estimate on every home you seriously consider.",
      "Partner with a buyer's agent who knows your target neighborhoods.",
      "Schedule a professional inspection before removing contingencies.",
      "Keep your finances stable so your pre-approval stays valid.",
    ],
    recommendedCalculator: "mortgage-payment-calculator",
    faq: [
      {
        q: "How many homes should I tour before making an offer?",
        a: "There's no magic number. Some buyers know within a handful of showings; others tour dozens. Quality matters more than quantity — touring homes that truly fit your criteria is more productive than seeing everything on the market.",
      },
      {
        q: "How much earnest money should I offer?",
        a: "Earnest money typically runs 1% to 3% of the purchase price, though it varies by market. A larger deposit signals serious intent, and it's generally credited toward your down payment or closing costs at settlement.",
      },
      {
        q: "Should I waive the inspection to win a bidding war?",
        a: "It's risky. An inspection protects you from costly hidden defects. If you must compete aggressively, talk with your agent about alternatives like an information-only inspection rather than waiving your protections entirely.",
      },
    ],
  },
  {
    slug: "application",
    title: "Loan Application",
    tagline: "Submit a complete, accurate application to start the clock to closing.",
    order: 4,
    intro:
      "Once your offer is accepted, you submit a formal loan application with the lender you've chosen. This is the official start of the mortgage process, and federal rules require the lender to provide a Loan Estimate within three business days. The application captures the full picture of your finances and the property, and the quality of what you submit directly affects how smoothly the rest of the process goes.\n\nAccuracy and completeness are everything here. A well-organized application with all supporting documents lets the lender order the appraisal, open underwriting, and move toward a clear-to-close without avoidable delays.",
    sections: [
      {
        heading: "Understand your Loan Estimate",
        body: "The Loan Estimate is a standardized three-page form that lays out your interest rate, monthly payment, and total closing costs. Review it line by line: the loan terms, projected payments, and the Closing Costs section covering origination charges, services you can and can't shop for, taxes, and prepaids. Because every lender uses the same form, you can compare offers side by side. If anything looks off, ask — this is the moment to question fees, not at the closing table.",
      },
      {
        heading: "Budget for closing costs",
        body: "Closing costs typically run 2% to 5% of the loan amount and include lender fees, title insurance, appraisal, recording fees, and prepaid taxes and insurance. Estimating these early prevents a cash shortfall right before closing. Some costs are negotiable, and in many markets you can ask the seller to contribute toward them. Knowing your total cash-to-close — down payment plus closing costs — keeps the finish line in clear view.",
      },
      {
        heading: "Decide when to lock your rate",
        body: "After applying, you can lock your interest rate to protect against market increases while your loan is processed. Locks commonly last 30 to 60 days. If rates are volatile or rising, locking early provides certainty; some lenders offer a float-down option if rates later improve. Discuss the lock period with your loan officer so it comfortably covers your expected closing date.",
      },
    ],
    checklist: [
      "Choose your lender and submit a complete application package.",
      "Review the Loan Estimate within three business days of applying.",
      "Estimate your total closing costs and cash-to-close.",
      "Decide whether and when to lock your interest rate.",
      "Respond quickly to any document requests from your loan officer.",
      "Keep credit, employment, and bank balances stable.",
    ],
    recommendedCalculator: "closing-cost-calculator",
    faq: [
      {
        q: "What is a Loan Estimate?",
        a: "A Loan Estimate is a standardized form lenders must send within three business days of your application. It details your rate, monthly payment, and closing costs so you can compare offers from different lenders directly.",
      },
      {
        q: "How much should I budget for closing costs?",
        a: "Plan for roughly 2% to 5% of the loan amount. This covers lender fees, title insurance, appraisal, recording fees, and prepaid taxes and insurance. A closing-costs estimate helps you avoid surprises.",
      },
      {
        q: "Should I lock my interest rate right away?",
        a: "It depends on the market and your closing timeline. Locking protects you if rates rise, while floating could pay off if they fall. Match your lock period to your expected closing date and talk through the trade-offs with your loan officer.",
      },
    ],
  },
  {
    slug: "underwriting",
    title: "Processing & Underwriting",
    tagline: "The lender verifies everything and issues your clear-to-close.",
    order: 5,
    intro:
      "Underwriting is where the lender confirms that you and the property meet all the requirements for the loan. A processor assembles your file and orders verifications and an appraisal; an underwriter then reviews your credit, income, assets, and the property to decide whether the loan can be approved. It's the most document-heavy phase, and your responsiveness has a direct effect on how fast it moves.\n\nMany loans receive a conditional approval — an approval subject to a short list of remaining items. Clearing those conditions promptly leads to the coveted clear-to-close. The key to a smooth underwriting period is staying available, organized, and financially stable.",
    sections: [
      {
        heading: "What underwriters look for",
        body: "Underwriters evaluate the classic pillars of lending: capacity (can you repay, measured largely by your debt-to-income ratio), credit (your repayment history), capital (your down payment and reserves), and collateral (the property's value via appraisal). Your DTI is often the make-or-break number — most programs want your total monthly debts at or below 43% of gross income, though some allow more with compensating factors like strong reserves or a high credit score.",
      },
      {
        heading: "The appraisal and what happens if it's low",
        body: "The lender orders an independent appraisal to confirm the home is worth what you're paying. If the appraisal comes in below the contract price, you have options: renegotiate with the seller, cover the gap in cash, dispute the appraisal with new comparable sales, or in some cases walk away if you have an appraisal contingency. Understanding this risk in advance keeps a low appraisal from derailing your purchase.",
      },
      {
        heading: "Responding to conditions",
        body: "Conditional approval comes with a list of items the underwriter still needs — a letter explaining a deposit, an updated pay stub, proof a debt was paid, or an insurance binder. Treat these requests as urgent. Each day a condition sits unanswered can push back your closing. Keep your finances frozen during this period: no new credit, no large unexplained deposits, no job changes. Once conditions are satisfied, you receive your clear-to-close.",
      },
    ],
    checklist: [
      "Respond to every underwriter condition as fast as possible.",
      "Confirm your debt-to-income ratio leaves room within program limits.",
      "Avoid opening new credit or making large purchases.",
      "Keep documentation ready for any large or unusual deposits.",
      "Review the appraisal and discuss options if it comes in low.",
      "Secure homeowners insurance and provide the binder to your lender.",
    ],
    recommendedCalculator: "debt-to-income-calculator",
    faq: [
      {
        q: "How long does underwriting take?",
        a: "Often one to two weeks, though it varies with loan complexity and how quickly you supply documents. Responding promptly to conditions is the single biggest factor in keeping it fast.",
      },
      {
        q: "What debt-to-income ratio do I need to qualify?",
        a: "Many conventional loans target a back-end DTI of 43% or less, but some programs allow higher ratios with compensating factors like strong cash reserves or an excellent credit score. Lower is always safer.",
      },
      {
        q: "What happens if the appraisal comes in low?",
        a: "You can renegotiate the price, pay the difference in cash, challenge the appraisal with new comparables, or, if your contract has an appraisal contingency, walk away. Your agent and lender can help you weigh the options.",
      },
    ],
  },
  {
    slug: "closing",
    title: "Closing",
    tagline: "Sign, fund, and get the keys — with no last-minute surprises.",
    order: 6,
    intro:
      "Closing — also called settlement — is the finish line where ownership transfers to you. After your clear-to-close, you'll receive a Closing Disclosure, review final numbers, conduct a final walkthrough, and sign the paperwork that makes the home yours. With preparation, closing day is a celebration rather than a scramble.\n\nThe biggest keys to a smooth closing are reviewing your Closing Disclosure carefully, arranging your cash-to-close correctly, and avoiding any financial moves that could jeopardize the loan in the final stretch.",
    sections: [
      {
        heading: "Review your Closing Disclosure",
        body: "By law, you must receive the Closing Disclosure at least three business days before closing. Compare it against your original Loan Estimate: your interest rate, loan terms, and monthly payment should match, and closing costs should be in line with what you were quoted. Certain fees can only increase within strict limits. Use this three-day window to question anything unexpected — it exists specifically to protect you from surprises.",
      },
      {
        heading: "Arrange your cash-to-close",
        body: "Your cash-to-close is the down payment plus closing costs minus any credits or earnest money already paid. These funds generally must arrive by wire transfer or cashier's check — personal checks are usually not accepted. Confirm the exact amount and wiring instructions directly with your settlement agent by phone, and beware of wire-fraud scams: criminals send fake instructions, so always verify with a known phone number before sending money.",
      },
      {
        heading: "Final walkthrough and signing",
        body: "Just before closing, you'll do a final walkthrough to confirm the home is in the agreed condition, repairs were completed, and nothing was damaged during move-out. At the signing, you'll sign the promissory note, mortgage or deed of trust, and closing statement. Once documents are signed and the loan funds, the deed is recorded and the keys are yours. Bring a government-issued ID and your verified funds.",
      },
    ],
    checklist: [
      "Review the Closing Disclosure against your Loan Estimate.",
      "Verify the exact cash-to-close amount and secure wiring instructions by phone.",
      "Complete a final walkthrough of the property.",
      "Bring a government-issued photo ID to the signing.",
      "Confirm homeowners insurance is active as of closing day.",
      "Keep your finances unchanged until the loan funds.",
    ],
    recommendedCalculator: "closing-cost-calculator",
    faq: [
      {
        q: "What is a Closing Disclosure?",
        a: "It's the final five-page statement of your loan terms, monthly payment, and closing costs. You must receive it at least three business days before closing so you can compare it to your Loan Estimate and review the numbers.",
      },
      {
        q: "How do I pay my cash-to-close?",
        a: "Usually by wire transfer or cashier's check. Confirm the exact amount and instructions by calling your settlement agent at a known number — never trust wiring details sent only by email, which is a common fraud tactic.",
      },
      {
        q: "Can my loan still fall through at closing?",
        a: "It can if your financial situation changes. Avoid new debt, large purchases, or job changes before closing, and respond to any final lender requests, since lenders may re-verify employment and credit right up to funding.",
      },
    ],
  },
  {
    slug: "servicing",
    title: "Servicing & Payments",
    tagline: "Manage your loan, protect your home, and pay it off smarter.",
    order: 7,
    intro:
      "After closing, your loan enters the servicing phase — the years you spend making payments and building equity. Your servicer (which may differ from the lender who originated the loan) collects payments, manages your escrow account, and handles questions. This is the longest phase of your mortgage, and small, smart decisions here can save you thousands of dollars over the life of the loan.\n\nStaying organized with payments, understanding your escrow account, and exploring strategies like extra principal payments can shorten your loan term, reduce total interest, and help you reach full ownership sooner.",
    sections: [
      {
        heading: "How escrow accounts work",
        body: "Most loans include an escrow account that collects a portion of your property taxes and homeowners insurance each month and pays those bills when they come due. Your servicer performs an annual escrow analysis; if taxes or insurance rise, your monthly payment can increase, and a shortage may be spread across the next year. Understanding escrow helps you anticipate payment changes rather than being caught off guard.",
      },
      {
        heading: "The power of extra principal payments",
        body: "Applying extra money directly to principal is one of the most effective ways to save. Because early payments are mostly interest, even modest additional principal early in the loan can shave years off the term and save tens of thousands in interest. Options include one extra payment a year, a fixed extra amount monthly, or biweekly payments. Always confirm with your servicer that extra funds are applied to principal, not prepaid interest.",
      },
      {
        heading: "Dropping PMI and protecting your home",
        body: "If you put less than 20% down, you're likely paying private mortgage insurance. Once your loan balance reaches 80% of the original value, you can typically request PMI cancellation, and it must automatically terminate at 78%. Tracking your equity can end this cost years early. This is also the phase to keep adequate homeowners insurance and consider protections like mortgage or disability coverage that keep payments current if life throws a curveball.",
      },
    ],
    checklist: [
      "Set up automatic payments to avoid late fees and protect your credit.",
      "Review your annual escrow analysis and plan for payment changes.",
      "Consider extra principal payments to shorten your loan and cut interest.",
      "Track your equity and request PMI cancellation at 80% loan-to-value.",
      "Keep homeowners insurance current and revisit coverage yearly.",
      "Watch interest rates in case refinancing becomes worthwhile.",
    ],
    recommendedCalculator: "early-mortgage-payoff-calculator",
    faq: [
      {
        q: "Why did my monthly mortgage payment go up?",
        a: "If your payment increased, it's usually because property taxes or homeowners insurance rose, changing your escrow requirement. Your servicer's annual escrow analysis explains the adjustment and any shortage being collected.",
      },
      {
        q: "How much can extra payments really save me?",
        a: "Quite a lot, especially early on. Because early payments are mostly interest, extra principal payments in the first years can cut years off your loan and save tens of thousands in interest. An extra-payment calculator shows your exact savings.",
      },
      {
        q: "When can I stop paying PMI?",
        a: "You can generally request cancellation once your balance reaches 80% of the home's original value, and it must end automatically at 78%. Paying down principal faster can let you drop PMI years ahead of schedule.",
      },
    ],
  },
  {
    slug: "refinance",
    title: "Refinancing",
    tagline: "Lower your rate, change your term, or tap equity — when the math works.",
    order: 8,
    intro:
      "Refinancing replaces your current mortgage with a new one, ideally on better terms. Homeowners refinance to lower their interest rate, shorten or extend their loan term, switch from an adjustable to a fixed rate, eliminate PMI, or tap home equity with a cash-out refinance. Because refinancing has its own closing costs, the decision comes down to whether the savings outweigh the cost — and how long you plan to stay.\n\nThe most important number in any refinance is the break-even point: how many months it takes for your monthly savings to recover the cost of the new loan. If you'll stay in the home well past break-even, refinancing can be one of the highest-return financial moves available to a homeowner.",
    sections: [
      {
        heading: "Calculate your break-even point",
        body: "To find break-even, divide your total refinance costs by your monthly savings. If refinancing costs $4,000 and saves you $200 a month, you break even in 20 months — after that, the savings are yours. If you plan to move or refinance again before reaching break-even, the refinance likely isn't worth it. This single calculation should anchor every refinance decision, far more than the headline rate alone.",
      },
      {
        heading: "Rate-and-term vs. cash-out",
        body: "A rate-and-term refinance changes your interest rate, loan term, or both without increasing your balance — the classic move when rates drop. A cash-out refinance replaces your loan with a larger one and gives you the difference in cash, useful for home improvements or consolidating higher-interest debt. Cash-out loans usually carry slightly higher rates and reduce your equity, so borrow deliberately and weigh the long-term cost.",
      },
      {
        heading: "When refinancing makes sense",
        body: "Refinancing tends to pay off when rates have fallen meaningfully since you closed, when your credit has improved enough to qualify for a better rate, when you want to drop PMI or move off an adjustable rate, or when shortening your term saves substantial interest. Conversely, restarting a 30-year clock can increase total interest even at a lower rate, so look at both the monthly payment and the lifetime cost before you decide.",
      },
    ],
    checklist: [
      "Calculate your refinance break-even point before applying.",
      "Compare your current rate to today's rates and check your credit.",
      "Decide between a rate-and-term and a cash-out refinance.",
      "Gather income, asset, and property documents as you did originally.",
      "Shop multiple lenders and compare APR, not just the rate.",
      "Weigh the lifetime interest cost against the monthly savings.",
    ],
    recommendedCalculator: "mortgage-refinance-calculator",
    faq: [
      {
        q: "How do I know if refinancing is worth it?",
        a: "Compare your total refinance costs to your monthly savings to find your break-even point. If you'll stay in the home well beyond that point, refinancing usually makes sense. A refinance calculator does this math for you instantly.",
      },
      {
        q: "What's the difference between rate-and-term and cash-out refinancing?",
        a: "A rate-and-term refinance changes your rate or term without adding to your balance. A cash-out refinance gives you a larger loan and returns the difference as cash, typically at a slightly higher rate and with less remaining equity.",
      },
      {
        q: "Will refinancing reset my loan term?",
        a: "It can. Refinancing into a new 30-year loan restarts the clock, which may raise total interest even at a lower rate. Choosing a shorter term or making extra payments can offset this — always compare lifetime cost, not just the monthly payment.",
      },
    ],
  },
];

export const PHASE_SLUGS = PHASES.map((p) => p.slug);

export function getPhase(slug: string): Phase | undefined {
  return PHASES.find((p) => p.slug === slug);
}
