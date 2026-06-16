import type { ComponentType } from "react";
import PaymentCalculator from "@/components/calculators/PaymentCalculator";
import AffordabilityCalculator from "@/components/calculators/AffordabilityCalculator";
import RefinanceCalculator from "@/components/calculators/RefinanceCalculator";
import AmortizationCalculator from "@/components/calculators/AmortizationCalculator";
import RentVsBuyCalculator from "@/components/calculators/RentVsBuyCalculator";
import ExtraPaymentCalculator from "@/components/calculators/ExtraPaymentCalculator";
import ClosingCostsCalculator from "@/components/calculators/ClosingCostsCalculator";
import DtiCalculator from "@/components/calculators/DtiCalculator";

export interface Faq {
  q: string;
  a: string;
}

export interface CalculatorEntry {
  slug: string;
  title: string;
  /** One-line description for cards and meta. */
  description: string;
  /** Longer keyword-rich SEO copy: array of paragraphs. */
  longSeoIntro: string[];
  faq: Faq[];
  Component: ComponentType;
}

export const CALCULATORS: Record<string, CalculatorEntry> = {
  payment: {
    slug: "payment",
    title: "Mortgage Payment Calculator",
    description:
      "Estimate your full monthly payment — principal, interest, taxes, insurance, HOA and PMI.",
    longSeoIntro: [
      "Our mortgage payment calculator shows the complete monthly cost of owning a home, not just principal and interest. Enter your home price, down payment, interest rate and loan term, and we break the payment into every component a lender includes when they qualify you: principal and interest (P&I), property taxes, homeowners insurance, HOA dues and private mortgage insurance (PMI).",
      "Many first-time buyers are surprised by how much taxes and insurance add to the bottom line. On a typical loan, escrowed taxes and insurance can add hundreds of dollars per month on top of P&I, and PMI applies whenever your down payment is under 20% (a loan-to-value above 80%). Seeing the full PITI payment up front helps you budget with confidence and avoid sticker shock at closing.",
      "Adjust the down payment slider to watch how a larger down payment lowers both your loan amount and your PMI, and compare 15-, 20- and 30-year terms to balance monthly affordability against total interest paid. When you are ready, request a personalized quote to lock in a real rate from our lending partners.",
    ],
    faq: [
      {
        q: "What is PITI?",
        a: "PITI stands for Principal, Interest, Taxes and Insurance — the four core parts of a monthly mortgage payment. Lenders use your total PITI (plus HOA and PMI when they apply) to decide how much you can borrow.",
      },
      {
        q: "When do I have to pay PMI?",
        a: "Private mortgage insurance is typically required when your down payment is less than 20% of the home's value, meaning a loan-to-value ratio above 80%. Once you build 20% equity you can usually request to cancel it.",
      },
      {
        q: "How is my property tax estimated?",
        a: "We estimate property tax as an annual percentage of the home's value, divided into 12 monthly payments. Local rates vary widely, so adjust the percentage to match your county for the most accurate result.",
      },
      {
        q: "Does a 15-year loan really save money?",
        a: "Yes. A 15-year mortgage has a higher monthly payment but a lower rate and far less total interest because you pay the balance off twice as fast. Use the loan-term toggle to compare.",
      },
    ],
    Component: PaymentCalculator,
  },
  affordability: {
    slug: "affordability",
    title: "Home Affordability Calculator",
    description:
      "Find out how much house you can afford based on your income, debts and down payment.",
    longSeoIntro: [
      "The home affordability calculator answers the question every buyer starts with: how much house can I actually afford? Enter your gross annual income, recurring monthly debts, planned down payment, interest rate and loan term, and we estimate the maximum home price a lender is likely to approve.",
      "Affordability is driven by your debt-to-income (DTI) ratio. Lenders generally cap your total monthly housing payment plus other debts at around 43% of your gross monthly income. Our calculator works backward from that limit — accounting for estimated taxes and insurance — to find the highest price that keeps you within a safe DTI.",
      "Remember that the maximum a lender will approve is not always the amount you should spend. Leaving room in your budget for maintenance, savings and life keeps homeownership comfortable. Use the sliders to see how paying down debt or saving a larger down payment increases your buying power, then get a personalized quote to confirm the numbers with a real lender.",
    ],
    faq: [
      {
        q: "How much income do I need to buy a house?",
        a: "It depends on the price, your debts and current rates. Lenders look at your debt-to-income ratio rather than income alone, so reducing monthly debt can boost how much home you qualify for at the same salary.",
      },
      {
        q: "What debt-to-income ratio do lenders want?",
        a: "Most conventional loans target a DTI of 43% or below, including your new mortgage payment. Some loan programs allow higher ratios with strong credit and reserves.",
      },
      {
        q: "Does a bigger down payment help me afford more?",
        a: "Yes. A larger down payment lowers your loan amount and monthly payment, removes PMI above 20%, and can raise the total price you qualify for.",
      },
    ],
    Component: AffordabilityCalculator,
  },
  refinance: {
    slug: "refinance",
    title: "Refinance Calculator",
    description:
      "See your new payment, monthly savings and how long it takes to break even on closing costs.",
    longSeoIntro: [
      "A refinance calculator helps you decide whether replacing your current mortgage with a new loan is worth it. Enter your current balance, rate and years remaining, then the new rate, term and estimated closing costs. We compute your current and new monthly payments, the monthly savings, and the break-even point — the number of months it takes for those savings to recoup your closing costs.",
      "The break-even period is the single most important number in any refinance decision. If you plan to stay in the home well beyond the break-even point, refinancing usually pays off. If you might sell or refinance again before then, the upfront costs may outweigh the savings.",
      "Keep in mind that extending your term — for example refinancing a loan with 25 years left back into a fresh 30-year — can lower your monthly payment while increasing total interest over the life of the loan. Compare both the monthly savings and the long-term picture, then request a personalized refinance quote to see real rates.",
    ],
    faq: [
      {
        q: "What is a refinance break-even point?",
        a: "It is how long it takes for your monthly savings to add up to the cost of refinancing. If closing costs are $6,000 and you save $200 a month, you break even in 30 months.",
      },
      {
        q: "Is it worth refinancing for a small rate drop?",
        a: "Sometimes. Even a small drop can be worthwhile on a large balance if you plan to stay past the break-even point. Use the calculator to confirm the savings outweigh the closing costs.",
      },
      {
        q: "Will refinancing reset my loan term?",
        a: "It can. Refinancing into a new 30-year loan restarts the clock, which lowers payments but may raise total interest. You can also refinance into a shorter term to pay off faster.",
      },
    ],
    Component: RefinanceCalculator,
  },
  amortization: {
    slug: "amortization",
    title: "Amortization Calculator",
    description:
      "View your full payoff schedule — how each year splits between principal, interest and balance.",
    longSeoIntro: [
      "An amortization calculator reveals exactly how your mortgage is paid down over time. Enter your loan amount, interest rate and term, and we generate a year-by-year schedule showing how much of each payment goes to principal versus interest, plus your remaining balance at the end of every year.",
      "Early in a mortgage, the majority of each payment goes toward interest while the balance falls slowly. As the years pass, the balance shrinks and more of every payment attacks principal. Watching this shift in the schedule helps you understand why making extra principal payments early has such an outsized impact on total interest.",
      "Use the summary to see your total interest and total amount paid over the life of the loan, and scroll the yearly table to track your equity growth. When you are ready for real numbers, get a personalized quote from our lending partners.",
    ],
    faq: [
      {
        q: "What is amortization?",
        a: "Amortization is the process of paying off a loan with regular equal payments over time. Each payment covers the interest due plus a portion of principal, so the balance gradually falls to zero.",
      },
      {
        q: "Why is so much of my early payment interest?",
        a: "Interest is charged on the outstanding balance, which is highest at the start. As you pay down principal, the interest portion shrinks and the principal portion grows each month.",
      },
      {
        q: "How can I pay less total interest?",
        a: "Making extra principal payments, choosing a shorter term, or securing a lower rate all reduce total interest. Even small extra payments early in the loan have a large compounding effect.",
      },
    ],
    Component: AmortizationCalculator,
  },
  "rent-vs-buy": {
    slug: "rent-vs-buy",
    title: "Rent vs. Buy Calculator",
    description:
      "Compare the true cost of renting and buying over your time horizon and get a clear verdict.",
    longSeoIntro: [
      "The rent vs. buy calculator compares the real, net cost of renting versus owning over the number of years you expect to stay. It is not as simple as comparing rent to a mortgage payment: buying involves a down payment, taxes, insurance and closing costs, but it also builds equity and benefits from home appreciation.",
      "Our model nets the equity you build and the appreciation you gain against the payments and carrying costs of owning, then compares that to the total rent you would pay — adjusted for annual rent inflation — over the same horizon. The result is a clear verdict telling you which option costs less and by how much.",
      "Your time horizon matters enormously. Because buying has high upfront costs, owning usually wins only if you stay long enough to outgrow them, often five to seven years or more. Adjust the appreciation and rent-inflation assumptions to stress-test the decision, then get a personalized quote when buying makes sense.",
    ],
    faq: [
      {
        q: "Is it cheaper to rent or buy?",
        a: "It depends on your time horizon, the price-to-rent ratio in your area, interest rates and how fast home values and rents rise. The calculator nets all of these out to give you a clear answer for your inputs.",
      },
      {
        q: "How long should I plan to stay before buying makes sense?",
        a: "Because closing costs and the down payment are large upfront expenses, buying typically pays off only if you stay long enough to build equity — often around five to seven years, though it varies.",
      },
      {
        q: "Does home appreciation guarantee buying is better?",
        a: "No. Appreciation helps, but it is not guaranteed and markets can fall. The calculator lets you test conservative and optimistic appreciation rates so you can see the range of outcomes.",
      },
    ],
    Component: RentVsBuyCalculator,
  },
  "extra-payment": {
    slug: "extra-payment",
    title: "Extra Payment Calculator",
    description:
      "See how much interest and time you save by adding a little extra to each monthly payment.",
    longSeoIntro: [
      "The extra payment calculator shows the powerful effect of paying a bit more than required each month. Enter your loan amount, rate, term and a planned extra monthly amount, and we reveal how many years and months you shave off the loan and how much total interest you save.",
      "Because mortgage interest is charged on the remaining balance, every extra dollar of principal you pay early stops accruing interest for the rest of the loan. Even modest extra payments — an extra $100 or $200 a month — can cut years off a 30-year mortgage and save tens of thousands of dollars in interest.",
      "Extra payments are flexible: unlike refinancing into a shorter term, you are not locked into a higher required payment, so you can pay extra when you can and skip it when money is tight. Experiment with the extra-payment slider to find a number that fits your budget, then get a personalized quote to start.",
    ],
    faq: [
      {
        q: "Do extra mortgage payments really save money?",
        a: "Yes. Extra payments go straight to principal, which reduces the balance that interest is charged on, saving interest every month for the rest of the loan and shortening the payoff time.",
      },
      {
        q: "Is it better to pay extra or refinance to a shorter term?",
        a: "Extra payments keep flexibility because your required payment stays low. A shorter term usually offers a slightly lower rate but locks in a higher mandatory payment. The calculator helps you weigh the trade-off.",
      },
      {
        q: "When should I make extra payments for the biggest impact?",
        a: "The earlier the better. Because interest is front-loaded, extra principal in the first years of the loan eliminates the most future interest.",
      },
    ],
    Component: ExtraPaymentCalculator,
  },
  "closing-costs": {
    slug: "closing-costs",
    title: "Closing Costs Calculator",
    description:
      "Estimate the one-time fees due at closing — origination, title, appraisal, escrow and more.",
    longSeoIntro: [
      "Closing costs are the one-time fees you pay to finalize a home purchase, and they typically run 2% to 5% of the price. This closing costs calculator itemizes the most common charges — loan origination, appraisal, title insurance, recording and transfer taxes, prepaid escrow, underwriting and credit fees — so you know how much cash to bring on top of your down payment.",
      "Some fees scale with your loan or home price, like origination (a percentage of the loan) and title insurance (a percentage of the price), while others are flat, like the appraisal and underwriting fees. Seeing the breakdown helps you spot which costs you might shop for or negotiate, and which are largely fixed.",
      "Plan for closing costs early so they do not derail your budget. You may be able to negotiate seller concessions or roll some costs into the loan. Once you have your estimate, get a personalized quote and a detailed loan estimate from our lending partners.",
    ],
    faq: [
      {
        q: "How much are closing costs?",
        a: "Closing costs typically range from 2% to 5% of the purchase price. On a $400,000 home that is roughly $8,000 to $20,000, paid in addition to your down payment.",
      },
      {
        q: "Can I roll closing costs into my mortgage?",
        a: "Sometimes. Certain refinances and loan programs let you finance part of the closing costs, and you can often negotiate seller concessions on a purchase. This raises your loan balance, so weigh the trade-off.",
      },
      {
        q: "Which closing costs can I shop for?",
        a: "You can often shop for title insurance, settlement services and some lender fees. Appraisals and government recording or transfer taxes are generally fixed.",
      },
    ],
    Component: ClosingCostsCalculator,
  },
  dti: {
    slug: "dti",
    title: "Debt-to-Income (DTI) Calculator",
    description:
      "Add up your monthly debts to see your DTI ratio and whether it falls in a healthy lending range.",
    longSeoIntro: [
      "Your debt-to-income ratio is one of the most important numbers lenders use to decide whether to approve your mortgage. This DTI calculator adds up your monthly debt obligations — housing, car payments, credit cards, student loans and other debts — and divides them by your gross monthly income to show your ratio as a percentage.",
      "Lenders generally look for a DTI of 43% or below for a qualified mortgage, and a ratio of 36% or under is considered ideal and helps you secure the best rates. Our calculator labels your result Healthy, Manageable or High so you can see at a glance where you stand and how much room you have for a new mortgage payment.",
      "If your DTI is higher than you would like, you can improve it by paying down revolving balances, avoiding new debt before applying, or increasing your income. Use the calculator to model different scenarios, then get a personalized quote to see what you qualify for.",
    ],
    faq: [
      {
        q: "What is a good debt-to-income ratio?",
        a: "A DTI of 36% or below is ideal, and most lenders accept up to 43% for a qualified mortgage. Lower ratios unlock better rates and a smoother approval.",
      },
      {
        q: "What debts count toward my DTI?",
        a: "Recurring monthly obligations such as housing, auto loans, minimum credit card payments, student loans and other installment debt. Utilities and groceries are not included.",
      },
      {
        q: "How can I lower my DTI quickly?",
        a: "Pay down credit cards and small loans, avoid taking on new debt before applying, and consider increasing income. Even paying off one small loan can move you into a better band.",
      },
    ],
    Component: DtiCalculator,
  },
};

export const CALCULATOR_SLUGS = Object.keys(CALCULATORS);
