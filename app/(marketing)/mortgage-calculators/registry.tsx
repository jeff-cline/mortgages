import type { ComponentType } from "react";

import PaymentCalculator from "@/components/calculators/PaymentCalculator";
import MonthlyCalculator from "@/components/calculators/MonthlyCalculator";
import InterestCalculator from "@/components/calculators/InterestCalculator";
import ThirtyYearCalculator from "@/components/calculators/ThirtyYearCalculator";
import ClosingCostsCalculator from "@/components/calculators/ClosingCostsCalculator";
import AmortizationCalculator from "@/components/calculators/AmortizationCalculator";
import PayoffCalculator from "@/components/calculators/PayoffCalculator";
import EarlyPayoffCalculator from "@/components/calculators/EarlyPayoffCalculator";
import AffordabilityCalculator from "@/components/calculators/AffordabilityCalculator";
import RefinanceCalculator from "@/components/calculators/RefinanceCalculator";
import RatesCalculator from "@/components/calculators/RatesCalculator";
import RentVsBuyCalculator from "@/components/calculators/RentVsBuyCalculator";
import DtiCalculator from "@/components/calculators/DtiCalculator";
import ReverseCalculator from "@/components/calculators/ReverseCalculator";
import CommercialCalculator from "@/components/calculators/CommercialCalculator";
import FhaCalculator from "@/components/calculators/FhaCalculator";

export interface CalculatorEntry {
  /** Keyword URL slug (exact). */
  slug: string;
  /** Human keyword, used as the page H1. */
  keyword: string;
  /** <= 60 chars, keyword-leading. */
  metaTitle: string;
  /** 140-158 chars, keyword-rich and compelling. */
  metaDescription: string;
  /** 1-2 words for compact UI. */
  shortLabel: string;
  /** One sentence for the master-page card. */
  cardBlurb: string;
  /** One of CALCULATOR_CATEGORIES. */
  category: string;
  /** Art key — visuals are added separately. */
  art: string;
  /** 2-3 unique SEO copy paragraphs. */
  intro: string[];
  /** Exactly 4 unique Q&As, used for FAQ schema + AEO. */
  faq: { q: string; a: string }[];
  /** 3 slugs of related calculators. */
  related: string[];
  /** The calculator component. */
  Component: ComponentType;
}

export const CALCULATOR_CATEGORIES = [
  "Payments & Costs",
  "Payoff & Amortization",
  "Affordability & Rates",
  "Specialty Loans",
] as const;

export const CALCULATORS: CalculatorEntry[] = [
  // ── Payments & Costs ───────────────────────────────────────────────
  {
    slug: "mortgage-payment-calculator",
    keyword: "Mortgage Payment Calculator",
    metaTitle: "Mortgage Payment Calculator: Estimate Monthly PITI",
    metaDescription:
      "Use our free mortgage payment calculator to estimate your full monthly payment — principal, interest, taxes, insurance and PMI — in just seconds. No signup.",
    shortLabel: "Payment",
    cardBlurb:
      "Estimate your complete monthly mortgage payment, broken down into principal, interest, taxes, insurance and PMI.",
    category: "Payments & Costs",
    art: "payment",
    intro: [
      "A mortgage payment calculator shows the true monthly cost of owning a home, not just the principal and interest most quotes advertise. Enter your home price, down payment, interest rate and loan term, and you'll see the full PITI payment — principal, interest, taxes and insurance — plus PMI and HOA dues where they apply. It's the number that actually hits your bank account each month.",
      "This tool is built for first-time buyers comparing budgets and for anyone weighing a specific listing against their income. Lenders qualify you on total PITI, so knowing it before you shop keeps you from falling in love with a house you can't comfortably afford. A larger down payment lowers both your loan amount and your private mortgage insurance (PMI), which kicks in below 20% down and typically runs about 0.46% to 1.50% of the loan amount per year until you reach roughly 20% equity.",
      "Use the result to set a realistic price ceiling, then stress-test it: nudge the rate up half a point to see how sensitive your payment is, and confirm the total still fits within roughly 28% of your gross monthly income. As of 2026, the baseline conforming loan limit for a one-unit home is $832,750 (up to $1,249,125 in high-cost areas); borrowing above your local limit pushes you into a jumbo loan with different pricing. When the numbers work, request a personalized quote to lock a real rate.",
    ],
    faq: [
      {
        q: "What does a mortgage payment calculator include?",
        a: "A complete mortgage payment calculator includes principal, interest, property taxes and homeowners insurance — together called PITI. It also adds private mortgage insurance (PMI) when your down payment is under 20%, and HOA dues if your property has them.",
      },
      {
        q: "How much should my mortgage payment be?",
        a: "A common guideline is that your total housing payment stay at or below 28% of your gross monthly income, and that all debts stay under 36%. These are starting points — your comfortable number depends on savings, other debts and lifestyle.",
      },
      {
        q: "Why is my estimated payment higher than the rate quote?",
        a: "Most advertised quotes show only principal and interest. Taxes and insurance are escrowed monthly and can add hundreds of dollars, and PMI — typically about 0.46% to 1.50% of the loan amount a year — applies below 20% down. A full payment calculator surfaces all of these so there are no surprises.",
      },
      {
        q: "Can I lower my monthly mortgage payment?",
        a: "Yes — a larger down payment, a longer term, a lower interest rate, or shopping homeowners insurance all reduce the monthly figure. Reaching 20% equity also lets you drop PMI. Refinancing later can lower the payment if rates fall.",
      },
    ],
    related: [
      "monthly-mortgage-calculator",
      "mortgage-affordability-calculator",
      "closing-cost-calculator",
    ],
    Component: PaymentCalculator,
  },
  {
    slug: "monthly-mortgage-calculator",
    keyword: "Monthly Mortgage Calculator",
    metaTitle: "Monthly Mortgage Calculator: See Your Real Cost",
    metaDescription:
      "Our monthly mortgage calculator breaks your home loan into an exact monthly figure, including taxes, insurance and PMI, so you can budget with confidence.",
    shortLabel: "Monthly",
    cardBlurb:
      "See exactly what your home loan costs each month, with every line item that lenders factor into your budget.",
    category: "Payments & Costs",
    art: "monthly",
    intro: [
      "A monthly mortgage calculator answers the question most buyers care about most: what will I actually pay every month? Plug in your loan amount, rate and term, and it converts the big purchase price into a single, repeatable monthly number — the figure your budget has to absorb for the next 15 or 30 years.",
      "Unlike a quick principal-and-interest estimate, a thorough monthly calculation folds in escrowed property taxes, homeowners insurance, and PMI when you put down less than 20%. That PMI typically costs about 0.46% to 1.50% of the loan amount per year and falls away once you reach roughly 20% equity. These add-ons routinely raise a payment by 20% or more, so seeing the all-in monthly cost helps renters compare buying to their current rent on equal footing.",
      "Once you have your monthly figure, map it against your take-home pay rather than gross income for a gut-check on cash flow. A handy tip: if the payment feels tight, extending from a 15- to a 30-year term lowers it meaningfully, though you'll pay more interest over the life of the loan. Keep in mind that as of 2026 a one-unit loan above $832,750 (or $1,249,125 in high-cost areas) is treated as a jumbo loan, which can carry stricter terms.",
    ],
    faq: [
      {
        q: "How is a monthly mortgage payment calculated?",
        a: "Principal and interest come from a standard amortization formula using your loan amount, interest rate and term. A full monthly calculator then adds one-twelfth of your annual property taxes and insurance, plus PMI if applicable, to reach the total.",
      },
      {
        q: "What's the difference between monthly principal and interest?",
        a: "Interest is the lender's charge on your outstanding balance; principal is the portion that reduces what you owe. Early in the loan most of your payment is interest, and over time the balance shifts toward principal.",
      },
      {
        q: "Does my monthly payment change over time?",
        a: "On a fixed-rate loan, principal and interest stay the same, but the escrow portion can change as property taxes and insurance premiums rise. Adjustable-rate loans can see the principal and interest portion change after the fixed period ends.",
      },
      {
        q: "Should I compare monthly cost to rent?",
        a: "Yes, but compare honestly. Add taxes, insurance, PMI (typically about 0.46% to 1.50% of the loan a year below 20% down) and expected maintenance to the loan payment, then weigh that against rent. Buying builds equity, but the true monthly cost of ownership is usually higher than principal and interest alone.",
      },
    ],
    related: [
      "mortgage-payment-calculator",
      "rent-vs-buy-calculator",
      "30-year-mortgage-calculator",
    ],
    Component: MonthlyCalculator,
  },
  {
    slug: "mortgage-interest-calculator",
    keyword: "Mortgage Interest Calculator",
    metaTitle: "Mortgage Interest Calculator: Total Interest Paid",
    metaDescription:
      "A mortgage interest calculator showing total interest paid over your loan and how rate, term and extra payments change it. Compare scenarios for free.",
    shortLabel: "Interest",
    cardBlurb:
      "Discover how much interest your mortgage really costs and how rate, term and extra payments shrink that total.",
    category: "Payments & Costs",
    art: "interest",
    intro: [
      "A mortgage interest calculator reveals the often-shocking total you'll pay a lender across the full life of a loan — frequently as much as the home itself on a 30-year term. Enter your balance, rate and term to see both the interest baked into each monthly payment and the cumulative interest you'll hand over by the final payment.",
      "This is the tool for borrowers deciding between rates, terms, or whether to buy down their rate with points. Because interest is front-loaded, the early years of a mortgage are mostly interest with little principal paydown. Understanding that curve helps you see why even a small rate difference compounds into thousands of dollars over decades.",
      "Use the results to test high-impact moves: shaving half a percent off your rate, switching from 30 to 15 years, or adding a modest extra principal payment each month. Any of these can cut total interest dramatically. A practical tip — even one extra payment per year noticeably shortens your loan and lowers lifetime interest.",
    ],
    faq: [
      {
        q: "How much total interest will I pay on my mortgage?",
        a: "It depends on your loan amount, rate and term. On a typical 30-year loan, total interest can approach or exceed the original loan amount. A mortgage interest calculator shows your exact lifetime interest based on your inputs.",
      },
      {
        q: "Why is most of my early payment interest?",
        a: "Mortgages amortize, so interest is charged on the remaining balance, which is highest at the start. Early payments are mostly interest with a small principal portion; as the balance falls, more of each payment goes to principal.",
      },
      {
        q: "Does a lower interest rate save much money?",
        a: "Significantly. Because interest compounds over many years, even a half-percentage-point reduction can save tens of thousands of dollars over a 30-year loan, in addition to lowering your monthly payment.",
      },
      {
        q: "How do extra payments reduce interest?",
        a: "Extra payments go straight to principal, lowering the balance that future interest is charged on. This shortens your loan term and can save substantial interest — even small, consistent extra amounts have an outsized effect over time.",
      },
    ],
    related: [
      "mortgage-amortization-calculator",
      "early-mortgage-payoff-calculator",
      "mortgage-rates-calculator",
    ],
    Component: InterestCalculator,
  },
  {
    slug: "30-year-mortgage-calculator",
    keyword: "30-Year Mortgage Calculator",
    metaTitle: "30-Year Mortgage Calculator: Payment & Interest",
    metaDescription:
      "Use this 30-year mortgage calculator to estimate monthly payments and total interest on a 30-year fixed loan, and compare it against shorter terms instantly.",
    shortLabel: "30-Year",
    cardBlurb:
      "Estimate the payment and lifetime interest on a 30-year fixed loan and weigh it against a shorter term.",
    category: "Payments & Costs",
    art: "thirty-year",
    intro: [
      "A 30-year mortgage calculator estimates the monthly payment and total interest for the most popular home loan in America — the 30-year fixed. By spreading repayment across 360 months, this term produces the lowest monthly payment of the standard options, which is why it's the default choice for most first-time and move-up buyers.",
      "Enter your loan amount and rate to see how affordable the monthly figure becomes, then notice the trade-off: a longer term means you pay interest for three decades, so lifetime interest is far higher than on a 15- or 20-year loan. This calculator helps you decide whether the lower payment is worth the added interest, given your budget and goals. As of 2026, a 30-year fixed loan at or below the conforming limit — $832,750 on a one-unit home, up to $1,249,125 in high-cost areas — usually earns the best pricing, since larger balances become jumbo loans.",
      "A smart way to use it: take the comfortable 30-year payment, then add voluntary extra principal whenever cash allows. You keep the safety of a low required payment but pay the loan down faster. Compare the 30-year result with a 15-year scenario to see exactly how much interest that flexibility costs.",
    ],
    faq: [
      {
        q: "Why choose a 30-year mortgage?",
        a: "A 30-year fixed loan spreads payments over 360 months, giving the lowest monthly payment among standard terms. That affordability and the rate stability of a fixed loan make it the most common choice for buyers prioritizing cash flow.",
      },
      {
        q: "How much more interest does a 30-year loan cost?",
        a: "Considerably more than a 15-year loan, because you borrow for twice as long and 15-year loans usually carry lower rates. The lower monthly payment comes at the cost of much higher total interest over the life of the loan.",
      },
      {
        q: "Can I pay off a 30-year mortgage early?",
        a: "Yes. Most 30-year loans have no prepayment penalty, so extra principal payments shorten the term and cut interest. Many borrowers take the low required payment for safety, then pay extra when they can.",
      },
      {
        q: "Is a 30-year or 15-year mortgage better?",
        a: "It depends on priorities. A 30-year loan maximizes monthly affordability and flexibility; a 15-year loan saves enormous interest and builds equity faster but demands a higher payment. Compare both to match your budget and goals.",
      },
    ],
    related: [
      "mortgage-payment-calculator",
      "mortgage-interest-calculator",
      "mortgage-amortization-calculator",
    ],
    Component: ThirtyYearCalculator,
  },
  {
    slug: "closing-cost-calculator",
    keyword: "Closing Cost Calculator",
    metaTitle: "Closing Cost Calculator: Estimate Cash to Close",
    metaDescription:
      "Our closing cost calculator estimates lender fees, title charges, taxes and prepaids so you know your true cash to close before you sign at the closing table.",
    shortLabel: "Closing",
    cardBlurb:
      "Estimate the lender fees, title charges and prepaids that make up your total cash to close.",
    category: "Payments & Costs",
    art: "closing",
    intro: [
      "A closing cost calculator estimates the one-time fees you pay to finalize a home purchase or refinance — money that's separate from your down payment and due at the closing table. Typical closing costs run roughly 2% to 5% of the loan amount and cover lender origination, appraisal, title insurance, recording fees, taxes and prepaid escrows.",
      "Buyers often budget carefully for the down payment but overlook these costs, leading to a cash crunch right before closing. This tool helps you forecast the full 'cash to close' so you arrive prepared. It's also useful for refinancers weighing whether the upfront cost is justified by the monthly savings.",
      "Use the estimate to negotiate: you can ask the seller for a closing-cost credit, shop title and lender fees, or compare lender-credit options that trade a slightly higher rate for lower upfront cash. A useful tip — request a Loan Estimate from each lender, since it itemizes these charges in a standardized, comparable format.",
    ],
    faq: [
      {
        q: "How much are closing costs?",
        a: "Closing costs typically total about 2% to 5% of the loan amount. On a $300,000 loan that's roughly $6,000 to $15,000, covering lender fees, title insurance, appraisal, taxes and prepaid escrows for taxes and insurance.",
      },
      {
        q: "What's included in closing costs?",
        a: "Common items include loan origination and underwriting fees, appraisal, credit report, title search and title insurance, recording fees, transfer taxes, and prepaid amounts for property taxes, homeowners insurance and interest.",
      },
      {
        q: "Can I reduce or roll in closing costs?",
        a: "Often yes. You can negotiate seller credits, shop third-party services, or accept a lender credit that raises your rate slightly in exchange for lower upfront cost. On a refinance, costs can sometimes be rolled into the loan balance.",
      },
      {
        q: "Are closing costs separate from the down payment?",
        a: "Yes. The down payment is your equity contribution toward the home's price, while closing costs are fees to process and finalize the loan. You need cash for both, so budget them separately when planning your purchase.",
      },
    ],
    related: [
      "mortgage-payment-calculator",
      "mortgage-refinance-calculator",
      "mortgage-affordability-calculator",
    ],
    Component: ClosingCostsCalculator,
  },

  // ── Payoff & Amortization ──────────────────────────────────────────
  {
    slug: "mortgage-amortization-calculator",
    keyword: "Mortgage Amortization Calculator",
    metaTitle: "Mortgage Amortization Calculator & Schedule",
    metaDescription:
      "A mortgage amortization calculator that builds a full schedule of principal, interest and balance for every payment, plus how extra payments speed payoff.",
    shortLabel: "Amortization",
    cardBlurb:
      "Build a full amortization schedule showing how each payment splits between principal and interest over time.",
    category: "Payoff & Amortization",
    art: "amortization",
    intro: [
      "A mortgage amortization calculator generates a payment-by-payment schedule for your loan, showing exactly how each installment divides between interest and principal and how your balance falls over time. Amortization is the structured process by which a fixed loan reaches a zero balance by its final payment, and the schedule makes that math transparent.",
      "This tool is ideal for borrowers who want to understand the mechanics behind their loan — why early payments barely dent the balance, and when the 'tipping point' arrives where principal finally overtakes interest. Homeowners also use the schedule to track equity buildup and to plan when they'll cross the 20% threshold to drop PMI.",
      "Try adding an extra monthly principal amount and watch the schedule compress, the payoff date move up, and total interest drop. A practical tip: print or save the schedule and check your loan statements against it each year to confirm your balance is tracking as expected and no errors have crept in.",
    ],
    faq: [
      {
        q: "What is mortgage amortization?",
        a: "Amortization is the process of paying off a loan through regular fixed payments that cover both interest and principal. Early payments are interest-heavy; over time, more goes to principal until the balance reaches zero at the end of the term.",
      },
      {
        q: "What does an amortization schedule show?",
        a: "It lists every scheduled payment with the interest portion, principal portion and remaining balance. This lets you see how equity builds, how much interest you pay each year, and exactly when the loan will be paid off.",
      },
      {
        q: "When does principal exceed interest in my payment?",
        a: "On a typical 30-year loan, the crossover where principal exceeds interest often occurs somewhere in the second decade, depending on your rate. A higher rate pushes that point later; an amortization calculator shows the exact payment number.",
      },
      {
        q: "How do extra payments affect amortization?",
        a: "Extra principal payments reduce the balance ahead of schedule, so less interest accrues going forward. This shortens the amortization period and can move your payoff date up by years while saving significant interest.",
      },
    ],
    related: [
      "mortgage-payoff-calculator",
      "mortgage-interest-calculator",
      "early-mortgage-payoff-calculator",
    ],
    Component: AmortizationCalculator,
  },
  {
    slug: "mortgage-payoff-calculator",
    keyword: "Mortgage Payoff Calculator",
    metaTitle: "Mortgage Payoff Calculator: Pay Off Faster",
    metaDescription:
      "Use our mortgage payoff calculator to see how extra payments shorten your term and slash total interest. Find your new payoff date and savings in seconds.",
    shortLabel: "Payoff",
    cardBlurb:
      "See how extra payments move up your payoff date and how much interest you'll save along the way.",
    category: "Payoff & Amortization",
    art: "payoff",
    intro: [
      "A mortgage payoff calculator shows when your loan will be fully paid and how much sooner you could reach that day by paying a little extra. Enter your current balance, rate and remaining term, then add an extra monthly or one-time amount to see your new payoff date and the total interest you'd save.",
      "This tool suits homeowners already in a loan who want a concrete plan to become debt-free faster. Because mortgage interest is charged on the outstanding balance, every extra dollar of principal you pay early prevents years of future interest on that dollar. The results often surprise people: modest extra payments can erase several years from a 30-year loan.",
      "Use the calculator to compare strategies — a fixed extra amount each month, biweekly payments, or annual lump sums from bonuses or tax refunds. A practical tip: confirm with your servicer that extra payments are applied to principal, and check that your loan has no prepayment penalty before you accelerate.",
    ],
    faq: [
      {
        q: "How can I pay off my mortgage faster?",
        a: "Add extra principal to your regular payment, switch to biweekly payments, or apply lump sums from bonuses and refunds. Each method reduces your balance ahead of schedule, shortening the term and cutting total interest.",
      },
      {
        q: "How much can extra payments save me?",
        a: "It varies by loan size and rate, but even a small consistent extra payment can save thousands in interest and shave years off a 30-year loan. A payoff calculator shows your exact savings and new payoff date.",
      },
      {
        q: "Do biweekly payments really help?",
        a: "Yes. Paying half your monthly amount every two weeks results in 26 half-payments, or 13 full payments, per year — one extra payment annually. That additional principal accelerates payoff and reduces interest over time.",
      },
      {
        q: "Should I make sure there's no prepayment penalty?",
        a: "Definitely. Most modern mortgages have none, but always confirm. Also tell your servicer to apply extra funds to principal rather than future payments, so the money actually reduces your balance and interest.",
      },
    ],
    related: [
      "early-mortgage-payoff-calculator",
      "mortgage-amortization-calculator",
      "mortgage-interest-calculator",
    ],
    Component: PayoffCalculator,
  },
  {
    slug: "early-mortgage-payoff-calculator",
    keyword: "Early Mortgage Payoff Calculator",
    metaTitle: "Early Mortgage Payoff Calculator: Save Interest",
    metaDescription:
      "An early mortgage payoff calculator showing how extra principal, biweekly or lump-sum payments cut years off your loan and save thousands in interest.",
    shortLabel: "Early Payoff",
    cardBlurb:
      "Map out an early payoff plan and see exactly how many years and dollars of interest you can save.",
    category: "Payoff & Amortization",
    art: "early-payoff",
    intro: [
      "An early mortgage payoff calculator helps you build a concrete plan to retire your home loan ahead of schedule. By modeling extra principal payments, biweekly schedules, or occasional lump sums, it shows the new payoff date and the often-substantial interest savings, so you can decide whether accelerating makes sense for your finances.",
      "This calculator is for homeowners who value being debt-free and want to quantify the payoff before committing cash. It's worth weighing against alternatives: if your mortgage rate is low, investing the extra money might earn more than the interest you'd save. The tool gives you the savings figure you need to make that comparison honestly.",
      "Run several scenarios to find a comfortable pace — an extra $100 or $200 a month, or one bonus payment a year. A practical tip: keep an emergency fund intact before aggressively prepaying, since money sent to principal isn't easily accessible again without refinancing or a home equity loan.",
    ],
    faq: [
      {
        q: "Is it worth paying off my mortgage early?",
        a: "It can be, especially for the guaranteed interest savings and peace of mind. But if your rate is low, investing the extra money may yield more. Compare your mortgage rate to expected investment returns, and keep an emergency fund first.",
      },
      {
        q: "What's the best way to pay off a mortgage early?",
        a: "Common strategies are adding a fixed extra principal amount monthly, making biweekly payments, or applying annual lump sums. The best approach is the one you can sustain consistently; all of them reduce principal and shorten the term.",
      },
      {
        q: "Will paying early hurt my taxes or credit?",
        a: "Paying down a mortgage reduces deductible interest, but most borrowers save far more in interest than any tax benefit is worth. Paying off a loan doesn't hurt your credit and can free up cash flow once the debt is gone.",
      },
      {
        q: "Should I keep an emergency fund while prepaying?",
        a: "Yes. Money paid into your mortgage is locked into home equity and hard to access quickly. Maintain three to six months of expenses in liquid savings before directing extra cash toward early payoff.",
      },
    ],
    related: [
      "mortgage-payoff-calculator",
      "mortgage-amortization-calculator",
      "mortgage-interest-calculator",
    ],
    Component: EarlyPayoffCalculator,
  },

  // ── Affordability & Rates ──────────────────────────────────────────
  {
    slug: "mortgage-affordability-calculator",
    keyword: "Mortgage Affordability Calculator",
    metaTitle: "Mortgage Affordability Calculator: How Much?",
    metaDescription:
      "Our mortgage affordability calculator estimates how much house you can buy from income, debts and down payment, using lender DTI rules. Get your range fast.",
    shortLabel: "Affordability",
    cardBlurb:
      "Find out how much house you can afford based on your income, debts and down payment.",
    category: "Affordability & Rates",
    art: "affordability",
    intro: [
      "A mortgage affordability calculator estimates the home price and loan amount you can realistically qualify for, based on your income, monthly debts, down payment and the prevailing interest rate. Rather than guessing, you get a target price range grounded in the same debt-to-income math lenders use to approve loans.",
      "This is the first tool to run before house hunting. Conventional lenders generally target a housing payment near 28% of gross monthly income (front-end) and total debts around 36% (back-end), though many will stretch to roughly 45% to 50% with strong compensating factors like reserves or excellent credit. The 43% figure you'll often hear is a common qualified-mortgage guideline, not a universal hard cap. By entering your real numbers, you avoid shopping above your range or getting pre-approved for a payment that strains your budget.",
      "Use the result as a ceiling, not a goal — many buyers comfortably spend less than the maximum to leave room for savings and life. A practical tip: paying down a car loan or credit card before applying lowers your DTI and can meaningfully increase the home price you qualify for. Note too that as of 2026 a one-unit loan above $832,750 (or $1,249,125 in high-cost areas) becomes a jumbo loan, which often demands a lower DTI and larger down payment to qualify.",
    ],
    faq: [
      {
        q: "How much house can I afford?",
        a: "It depends on income, monthly debts, down payment and rate. A common rule keeps your housing payment near 28% of gross income and total debts under about 36% to 43%. An affordability calculator turns those rules into a price range.",
      },
      {
        q: "What is the 28/36 rule?",
        a: "It's a conventional-lender guideline suggesting your housing costs stay at or below 28% of gross monthly income (front-end) and total debt payments below 36% (back-end). Many lenders allow higher ratios — often up to about 45% to 50% with compensating factors — but 28/36 is a conservative affordability benchmark.",
      },
      {
        q: "Does my down payment affect affordability?",
        a: "Yes. A larger down payment reduces your loan amount and monthly payment, helps you avoid PMI at 20% down, and can let you afford a higher-priced home for the same monthly cost.",
      },
      {
        q: "How can I afford more house?",
        a: "Lower your debt-to-income ratio by paying off other debts, increase your down payment, improve your credit score for a better rate, or boost income. Each step raises the loan amount you can responsibly qualify for.",
      },
    ],
    related: [
      "debt-to-income-calculator",
      "mortgage-payment-calculator",
      "mortgage-rates-calculator",
    ],
    Component: AffordabilityCalculator,
  },
  {
    slug: "mortgage-refinance-calculator",
    keyword: "Mortgage Refinance Calculator",
    metaTitle: "Mortgage Refinance Calculator: Should You?",
    metaDescription:
      "Use our mortgage refinance calculator to compare your current loan to a new one, find your break-even point, and see monthly and lifetime savings instantly.",
    shortLabel: "Refinance",
    cardBlurb:
      "Compare your current loan to a new rate and find the break-even point where refinancing pays off.",
    category: "Affordability & Rates",
    art: "refinance",
    intro: [
      "A mortgage refinance calculator compares your existing loan against a new one to show whether replacing it makes financial sense. Enter your current balance, rate and payment alongside the new rate and closing costs, and it calculates your monthly savings, lifetime interest difference, and the all-important break-even point.",
      "Refinancing is most attractive when rates drop, your credit improves, or you want to switch loan types — for example, from an adjustable to a fixed rate, or to drop FHA mortgage insurance. The calculator helps you weigh the upfront closing costs against ongoing savings so you can decide if the move is worthwhile.",
      "The break-even point is the key number: it's how many months of savings it takes to recoup your closing costs. If you'll stay in the home well past break-even, refinancing usually pays. A practical tip — beware of resetting a nearly paid-off loan back to 30 years, which can increase total interest even at a lower rate.",
    ],
    faq: [
      {
        q: "When does refinancing make sense?",
        a: "Refinancing often makes sense when you can lower your rate meaningfully, plan to stay past the break-even point, want to switch from an adjustable to a fixed rate, or need to drop mortgage insurance. The calculator quantifies the savings.",
      },
      {
        q: "What is a refinance break-even point?",
        a: "It's the number of months of monthly savings required to recover your refinance closing costs. If closing costs are $4,000 and you save $200 a month, you break even in 20 months; staying longer means net savings.",
      },
      {
        q: "Does refinancing reset my loan term?",
        a: "It can. A new 30-year refinance restarts the clock, which lowers payments but may raise total interest if you were far along on the old loan. Consider a shorter term to keep your payoff timeline on track.",
      },
      {
        q: "What are typical refinance closing costs?",
        a: "Refinance costs generally run about 2% to 5% of the loan amount, covering appraisal, origination, title and recording fees. Some lenders offer no-closing-cost options that fold the cost into the rate or balance.",
      },
    ],
    related: [
      "mortgage-rates-calculator",
      "closing-cost-calculator",
      "mortgage-payment-calculator",
    ],
    Component: RefinanceCalculator,
  },
  {
    slug: "mortgage-rates-calculator",
    keyword: "Mortgage Rates Calculator",
    metaTitle: "Mortgage Rates Calculator: Compare Rate Impact",
    metaDescription:
      "A mortgage rates calculator showing how different interest rates change your monthly payment and total interest, so you see what each rate really costs you.",
    shortLabel: "Rates",
    cardBlurb:
      "See how each interest rate changes your monthly payment and the total interest you'll pay.",
    category: "Affordability & Rates",
    art: "rates",
    intro: [
      "A mortgage rates calculator shows how the interest rate you're offered translates into a monthly payment and a lifetime interest cost. By comparing several rates side by side, you can see in dollars exactly what a quarter- or half-point difference means — both for your monthly budget and for the total you'll pay over the life of the loan.",
      "This tool is for borrowers shopping lenders or deciding whether to pay points to buy down their rate. Rates depend on your credit score, down payment, loan type, loan size and market conditions, and small differences compound enormously over 30 years. Loan size matters because, as of 2026, balances above the conforming limit — $832,750 on a one-unit home, up to $1,249,125 in high-cost areas — are jumbo loans that are often priced differently from conforming ones. Seeing the impact helps you judge whether a lower rate quote is worth higher fees.",
      "Use the calculator to set a target: figure out which rate keeps your payment within budget, then shop multiple lenders to hit it. A practical tip — get quotes within a short window so rate-shopping inquiries count as a single credit pull, and always compare the APR, which folds in fees, not just the headline rate.",
    ],
    faq: [
      {
        q: "How much does a lower interest rate save?",
        a: "Even a half-percentage-point reduction can lower your monthly payment noticeably and save tens of thousands of dollars over a 30-year loan. A rates calculator shows the exact monthly and lifetime difference between any two rates.",
      },
      {
        q: "What determines my mortgage rate?",
        a: "Lenders set your rate based on credit score, down payment size, loan type and term, property type, and overall market conditions. A stronger credit profile and larger down payment generally earn lower rates.",
      },
      {
        q: "Should I pay points to lower my rate?",
        a: "Paying discount points lowers your rate for an upfront fee. It pays off if you keep the loan long enough to recoup the cost through monthly savings. Compare the break-even period against how long you'll stay in the home.",
      },
      {
        q: "What's the difference between rate and APR?",
        a: "The interest rate is the cost of borrowing the principal, while APR includes the rate plus certain fees, giving a fuller picture of the loan's cost. Comparing APRs helps you evaluate offers on equal footing.",
      },
    ],
    related: [
      "mortgage-payment-calculator",
      "mortgage-refinance-calculator",
      "mortgage-interest-calculator",
    ],
    Component: RatesCalculator,
  },
  {
    slug: "rent-vs-buy-calculator",
    keyword: "Rent vs. Buy Calculator",
    metaTitle: "Rent vs. Buy Calculator: Which Is Cheaper?",
    metaDescription:
      "Our rent vs. buy calculator compares the true cost of renting against owning over time, factoring equity, taxes and upkeep, to show which option wins for you.",
    shortLabel: "Rent vs Buy",
    cardBlurb:
      "Compare the real long-term cost of renting versus buying, including equity, taxes and upkeep.",
    category: "Affordability & Rates",
    art: "rent-vs-buy",
    intro: [
      "A rent vs. buy calculator compares the long-term financial outcome of renting a home against buying one, so you can decide which makes more sense for your situation and timeline. It weighs your monthly rent and expected rent increases against a mortgage payment, taxes, insurance, maintenance and the equity you'd build as an owner.",
      "This tool matters because the cheaper choice isn't obvious. Buying carries upfront closing costs and ongoing upkeep, but builds equity and offers price stability; renting stays flexible and avoids maintenance, but your money doesn't accumulate. The right answer depends heavily on how long you plan to stay.",
      "Use the calculator to find your break-even horizon — the number of years after which owning beats renting. A practical tip: if you expect to move within a few years, renting often wins because you won't hold the home long enough to recoup buying costs. The longer you stay, the more buying tends to pull ahead.",
    ],
    faq: [
      {
        q: "Is it cheaper to rent or buy?",
        a: "It depends on home prices, rents, how long you'll stay, and local taxes. Renting is often cheaper short-term, while buying usually wins over many years as you build equity and avoid rising rents. A calculator finds your break-even point.",
      },
      {
        q: "How long should I stay to make buying worth it?",
        a: "Many buyers need to stay several years to recoup closing costs and overcome transaction expenses. The exact break-even depends on your market; if you'll move soon, renting is frequently the more economical choice.",
      },
      {
        q: "Does buying always build wealth?",
        a: "Not automatically. You build equity through principal paydown and appreciation, but maintenance, taxes, interest and transaction costs offset some gains. Over long horizons buying typically builds wealth, but it isn't guaranteed in every market.",
      },
      {
        q: "What costs of owning do renters forget?",
        a: "Beyond the mortgage, owners pay property taxes, homeowners insurance, maintenance and repairs, possible HOA dues, and PMI below 20% down. A fair comparison adds these to the loan payment before weighing it against rent.",
      },
    ],
    related: [
      "mortgage-affordability-calculator",
      "monthly-mortgage-calculator",
      "closing-cost-calculator",
    ],
    Component: RentVsBuyCalculator,
  },
  {
    slug: "debt-to-income-calculator",
    keyword: "Debt-to-Income Calculator",
    metaTitle: "Debt-to-Income Calculator: Check Your DTI",
    metaDescription:
      "Use our debt-to-income calculator to find your DTI ratio, see how lenders view it, and learn what you need to qualify for a mortgage. Quick, free, accurate.",
    shortLabel: "DTI",
    cardBlurb:
      "Calculate your debt-to-income ratio and see how it affects your mortgage qualification.",
    category: "Affordability & Rates",
    art: "dti",
    intro: [
      "A debt-to-income calculator finds the percentage of your gross monthly income that goes toward debt payments — the single most important number lenders use to decide whether you qualify for a mortgage. Enter your income and monthly debts to see both your front-end ratio (housing only) and back-end ratio (all debts).",
      "DTI matters because lenders cap how much of your income can be committed to debt. Conventional loans generally target about 28% front-end (housing) and 36% back-end (total debt), with many lenders allowing up to roughly 45% to 50% when you have strong compensating factors. FHA commonly uses a 31% / 43% guideline but can go higher — often around 47% / 50% — with compensating factors. The 43% figure is a common qualified-mortgage threshold, not a universal hard cap. Knowing your ratio before applying tells you whether you're in qualifying range and how much room you have for a mortgage payment.",
      "Use the result to plan: if your DTI is high, paying off a credit card or car loan can quickly improve it and boost your borrowing power. A practical tip — lenders count the minimum required payment on revolving debts, so even partially paying down balances and lowering those minimums can help your ratio.",
    ],
    faq: [
      {
        q: "What is a good debt-to-income ratio for a mortgage?",
        a: "Conventional loans generally aim for about 28% front-end and 36% back-end, though many lenders allow up to roughly 45% to 50% with compensating factors. FHA commonly uses 31% / 43% and can stretch to around 47% / 50%. The 43% figure is a common qualified-mortgage guideline, not a hard cap — but lower is always better.",
      },
      {
        q: "How is debt-to-income ratio calculated?",
        a: "Divide your total monthly debt payments by your gross monthly income, then multiply by 100. Lenders look at the front-end ratio (housing costs only) and the back-end ratio (all monthly debt payments including the new mortgage).",
      },
      {
        q: "What debts count toward DTI?",
        a: "Lenders include the proposed mortgage payment, car loans, student loans, credit card minimums, personal loans and other recurring obligations. Everyday expenses like utilities, groceries and insurance generally aren't counted.",
      },
      {
        q: "How can I lower my DTI to qualify?",
        a: "Pay down or pay off debts to reduce monthly obligations, avoid taking on new loans before applying, and increase your income if possible. Each lowers the ratio and improves your chances of mortgage approval.",
      },
    ],
    related: [
      "mortgage-affordability-calculator",
      "mortgage-payment-calculator",
      "fha-mortgage-calculator",
    ],
    Component: DtiCalculator,
  },

  // ── Specialty Loans ────────────────────────────────────────────────
  {
    slug: "reverse-mortgage-calculator",
    keyword: "Reverse Mortgage Calculator",
    metaTitle: "Reverse Mortgage Calculator: Estimate Proceeds",
    metaDescription:
      "Our reverse mortgage calculator estimates how much equity a homeowner 62+ could access through a HECM, based on age, home value and current rates. Free tool.",
    shortLabel: "Reverse",
    cardBlurb:
      "Estimate how much home equity a borrower aged 62+ could access through a reverse mortgage.",
    category: "Specialty Loans",
    art: "reverse",
    intro: [
      "A reverse mortgage calculator estimates how much of your home equity you could convert to cash through a reverse mortgage, typically a Home Equity Conversion Mortgage (HECM). Designed for homeowners aged 62 and older, these loans let you tap equity without monthly mortgage payments, with the balance repaid when you sell, move out or pass away.",
      "The amount available depends mainly on the youngest borrower's age, your home's value (capped at the FHA maximum claim amount, which is $1,249,125 for 2026), and current interest rates. Your proceeds equal that maximum claim amount multiplied by a principal limit factor (PLF) set by HUD: an older youngest borrower and a lower expected interest rate generally produce a higher PLF and more available cash. This calculator gives a ballpark figure so retirees can gauge whether a reverse mortgage could supplement income, cover expenses, or eliminate an existing mortgage payment.",
      "Use the estimate as a starting point for deeper research, since reverse mortgages carry upfront costs, ongoing fees and important obligations. A practical tip: you must keep paying property taxes, homeowners insurance and upkeep, and HUD requires independent counseling before you can take out a HECM, which protects you and clarifies the trade-offs.",
    ],
    faq: [
      {
        q: "Who qualifies for a reverse mortgage?",
        a: "For a HECM, the most common reverse mortgage, the youngest borrower must be at least 62, live in the home as a primary residence, have substantial equity, and complete HUD-approved counseling. You also must keep up with taxes, insurance and maintenance.",
      },
      {
        q: "How much money can I get from a reverse mortgage?",
        a: "Your proceeds equal the maximum claim amount — your home's appraised value capped at the 2026 FHA limit of $1,249,125 — times a principal limit factor (PLF) set by HUD. Because the PLF rises with the youngest borrower's age and falls as the expected interest rate climbs (it has a 5% floor), older borrowers and lower rates generally unlock more equity.",
      },
      {
        q: "Do I have to repay a reverse mortgage?",
        a: "You make no required monthly mortgage payments while living in the home. The loan, plus accrued interest and fees, becomes due when the last borrower sells, permanently moves out, or passes away — usually repaid by selling the home.",
      },
      {
        q: "What are the downsides of a reverse mortgage?",
        a: "Reverse mortgages have significant upfront and ongoing costs, the balance grows over time as interest accrues, and they reduce the equity left to heirs. You can also face foreclosure if you fail to pay taxes, insurance or maintain the home.",
      },
    ],
    related: [
      "mortgage-payment-calculator",
      "mortgage-affordability-calculator",
      "mortgage-refinance-calculator",
    ],
    Component: ReverseCalculator,
  },
  {
    slug: "commercial-mortgage-calculator",
    keyword: "Commercial Mortgage Calculator",
    metaTitle: "Commercial Mortgage Calculator: Payment & Balloon",
    metaDescription:
      "A commercial mortgage calculator estimating payments on amortizing and balloon loans, including the balloon balance due at term, for investors and businesses.",
    shortLabel: "Commercial",
    cardBlurb:
      "Estimate payments and balloon balances on commercial property loans for investors and businesses.",
    category: "Specialty Loans",
    art: "commercial",
    intro: [
      "A commercial mortgage calculator estimates payments on loans for income-producing or business-use property — offices, retail, multifamily, warehouses and the like. Commercial loans work differently from home mortgages: they often use a longer amortization for the payment but a shorter term, leaving a large balloon balance due at the end.",
      "This tool helps investors and business owners model the monthly payment and, crucially, the balloon amount they'll need to refinance or pay off when the term expires. Commercial loans commonly amortize over 25 to 30 years but mature far sooner — often on 5- to 10-year terms — leaving a balloon balance due at the end. They also tend to carry higher rates than residential mortgages, so understanding the structure is essential before committing.",
      "Use the calculator to test how amortization length and term interact, and to confirm the property's income can comfortably cover the payment. A practical tip — lenders evaluate the debt-service-coverage ratio (net operating income divided by debt payments) and typically require a minimum of about 1.20x to 1.25x, so size your loan with that cushion in mind.",
    ],
    faq: [
      {
        q: "How is a commercial mortgage different from a residential one?",
        a: "Commercial loans usually have shorter terms, higher rates, and a balloon payment, and they're underwritten on the property's income rather than just personal credit. Amortization commonly stretches 25 to 30 years even when the loan term is only 5 to 10, leaving a balloon balance due at maturity.",
      },
      {
        q: "What is a balloon payment?",
        a: "A balloon is the large remaining balance due at the end of a loan term that amortizes over a longer schedule. Borrowers typically refinance or sell to cover it, since the regular payments don't fully pay off the loan within the term.",
      },
      {
        q: "What is debt service coverage ratio (DSCR)?",
        a: "DSCR is the property's net operating income divided by its annual debt payments. Commercial lenders generally require a minimum DSCR of about 1.20x to 1.25x, meaning income comfortably exceeds the loan payment, before approving financing.",
      },
      {
        q: "How much down payment do commercial loans require?",
        a: "Commercial mortgages typically require larger down payments than home loans — often 20% to 35% of the property value, depending on the property type, the borrower's strength, and the lender's requirements.",
      },
    ],
    related: [
      "mortgage-amortization-calculator",
      "mortgage-payment-calculator",
      "mortgage-interest-calculator",
    ],
    Component: CommercialCalculator,
  },
  {
    slug: "fha-mortgage-calculator",
    keyword: "FHA Mortgage Calculator",
    metaTitle: "FHA Mortgage Calculator: Payment with MIP",
    metaDescription:
      "Our FHA mortgage calculator estimates your monthly payment with upfront and annual mortgage insurance, so first-time buyers see the true cost of an FHA loan.",
    shortLabel: "FHA",
    cardBlurb:
      "Estimate an FHA loan payment including upfront and annual mortgage insurance premiums.",
    category: "Specialty Loans",
    art: "fha",
    intro: [
      "An FHA mortgage calculator estimates the monthly payment on a loan insured by the Federal Housing Administration, including the mortgage insurance premiums unique to these loans. FHA loans are popular with first-time and lower-credit buyers because they allow down payments as low as 3.5% and have more flexible qualifying standards. For 2026, FHA loan limits run from a floor of $541,287 on a one-unit home in low-cost areas up to a ceiling of $1,249,125 in high-cost areas.",
      "What sets FHA financing apart is mortgage insurance: an upfront premium (UFMIP) equal to 1.75% of the base loan amount, usually financed into the loan balance, plus an annual premium (MIP) — typically around 0.55% a year for most 30-year loans with under 5% down — split into your monthly payment. This calculator folds both into the estimate so you see the genuine cost of an FHA loan, not just principal and interest, and can compare it fairly to a conventional option.",
      "Use the result to weigh FHA against conventional financing — FHA can be cheaper to qualify for with a smaller down payment or lower credit, but its mortgage insurance lasts the full loan term when you put down less than 10% (it cancels after 11 years with 10% or more down). A practical tip: many borrowers later refinance into a conventional loan once they build equity and improve credit, to shed ongoing MIP.",
    ],
    faq: [
      {
        q: "What is an FHA loan?",
        a: "An FHA loan is a mortgage insured by the Federal Housing Administration. It allows down payments as low as 3.5% and more lenient credit requirements, making homeownership accessible to first-time and lower-credit buyers in exchange for mortgage insurance.",
      },
      {
        q: "What is FHA mortgage insurance (MIP)?",
        a: "FHA loans require two premiums: an upfront premium (UFMIP) of 1.75% of the base loan amount, usually financed into the loan, and an annual premium (MIP) — typically around 0.55% a year for most 30-year loans with under 5% down — paid monthly. Together they protect the lender and let the FHA back loans with low down payments.",
      },
      {
        q: "Does FHA mortgage insurance ever go away?",
        a: "It depends on your down payment. If you put down less than 10%, annual MIP lasts the full loan term; if you put down 10% or more, it cancels after 11 years. Many borrowers with the minimum 3.5% down instead refinance into a conventional loan once they have enough equity and qualifying credit to shed MIP sooner.",
      },
      {
        q: "FHA or conventional — which is better?",
        a: "FHA is often easier to qualify for with low down payment or lower credit, while conventional loans can drop mortgage insurance at 20% equity. Compare the all-in monthly cost and your long-term plans to decide which fits.",
      },
    ],
    related: [
      "mortgage-payment-calculator",
      "debt-to-income-calculator",
      "closing-cost-calculator",
    ],
    Component: FhaCalculator,
  },
];

export function getCalculator(slug: string): CalculatorEntry | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
