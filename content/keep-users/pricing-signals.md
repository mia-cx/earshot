---
title: Read your pricing from your numbers
order: 3
description: Spot underpricing from your close rate, margin per client and hours over contract.
---

> [!TLDR]
> - In most businesses, a minority of customers earns all the profit and a few lose money. Revenue reports hide which is which.
> - If you close more than about 40% of sales calls, you're probably too cheap.
> - Count margin per client, with your own hours at what it would cost to replace you.
> - Compare hours delivered with hours contracted, then fix your process, reprice or rescope, and drop a client only last.

## A high close rate is a price signal

Closing most of your sales calls feels like winning, but past a point **your price is too low**. @huntkyle's rule of thumb: above about 40%, you're probably losing 20% margin on every sale.

That number is his, unverified, and he sells agency consulting. Most teams still barely touch pricing: Patrick Campbell, whose company ProfitWell sold pricing software, [says its research found](https://www.mindtheproduct.com/a-guide-to-unlocking-growth-with-optimized-pricing/) companies spend 10 hours or less a year on it. No method is published, so treat it as a vendor's claim.

The check itself is free. Keep a sheet with calls, closes and close rate, and flag it whenever the rate stays above 40%.

## Count margin per client, not revenue

A billing report shows revenue, not which clients lose you money. [Robert Kaplan at Harvard Business School](https://www.library.hbs.edu/working-knowledge/a-balanced-scorecard-approach-to-measure-customer-profitability), co-developer of activity-based costing, found that in nearly every company studied, 15% to 20% of customers produce all of the profit or more, while the least profitable few wipe part of it out. His method needs two numbers: the hourly cost of each person's time, and the hours each customer takes.

In Hunt's audits, 10% to 20% of an agency's clients sit near or below zero gross margin once the owner's hours are counted. That's his figure, though it fits Kaplan's pattern.

Fix your view with three numbers:

- Gross margin per client, with your hours priced at what it would cost to replace you.
- Monthly churn, graded against a benchmark.
- A 13-week revenue forecast instead of a flat line.

> [!TRICK] Month-end bot prompt
> Give it exported files, not logins (see *Keep bots from doing damage*).
>
> ```
> Role: you are my Month-End bot.
> Read first: [revenue export from your billing tool], [costs sheet], [Sheets list of clients or members], [hours per client].
> When you run: the 1st of every month at 8am.
> Done looks like: one sheet tab with revenue, profit margin, new and churned [clients / members], each number set beside last month's. Flag any number that moved more than [15]%.
> Then add:
> - Gross margin per client, counting my hours at [what it would cost to replace me]. Flag anyone under 50%. My target is 60%.
> - Monthly churn, graded: 15% bleeding out, 10% treading water, 5% solid, 2.5% best in class.
> - The next 13 weeks: recurring revenue, minus churn at [X]%, plus signed deals. Never just repeat this month's revenue as a flat line.
> Ask me first before you: send an invoice, chase a payment, or move money.
> ```
>
> The churn grades and the 50% / 60% margin lines are Hunt's benchmarks for agencies.

## Find the clients you're subsidising

Scope creep is a pricing problem you can't see without a time log. Across three agencies, Hunt saw $18K to $20K of work delivered on $8K to $10K retainers (his anecdote).

Kaplan's order for fixing an unprofitable customer:

1. Fix your own process first. Customers shouldn't pay for your inefficiencies.
2. Reprice: every extra you offer should at least cover its cost.
3. Rescope or sell them more of what's profitable.
4. Drop the client only as a last resort.

> [!TRICK] Run a 90-day scope check
> ```
> Read [time tracking export] and [client contracts] for the last 90 days.
> For each client: hours delivered, hours in the contract, what those hours cost at [rate], and gross margin.
> Sort worst first, then mark each one reprice, rescope or sunset, with one line on why.
> Ask me first before you contact anyone.
> ```

The bot sorts and suggests. Talking to the client stays your job.

> [!DO] Work out your close rate
> Make a sheet with three columns: date, call, closed (yes or no). Fill in your last 10 sales calls and calculate the close rate. If it's above 40%, write a higher price for your next proposal.

> [!CHECK] What close rate on sales calls suggests your price is too low?
> Above about 40%.

> [!CHECK] A client's 90-day time log shows far more hours than their contract covers. What are your options?
> Reprice, rescope or sunset that client. A bot can sort and suggest, but talking to the client stays your job.

> [!CHECK] Why count gross margin per client, with your own hours priced at what it would cost to replace you?
> In most businesses a few customers earn all the profit and some lose money, and revenue reports hide which. Counting your hours reveals the ones near or below zero margin.

## Sources

- [Robert S. Kaplan, *A Balanced Scorecard Approach to Measure Customer Profitability* (HBS Working Knowledge, 2005)](https://www.library.hbs.edu/working-knowledge/a-balanced-scorecard-approach-to-measure-customer-profitability)
- [Patrick Campbell, *A Guide to Unlocking Growth with Optimized Pricing* (2020)](https://www.mindtheproduct.com/a-guide-to-unlocking-growth-with-optimized-pricing/)
- [@huntkyle: running business operations with bots, including close rate, month-end and scope checks](https://x.com/huntkyle/status/2118086670918750341)
