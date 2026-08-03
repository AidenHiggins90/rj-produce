# Getting the customer quote

One line from a long-standing buyer would outperform anything else on the site. I can't
write it — a fabricated testimonial is worse than none, and in this trade someone will
recognise the name and check. So here's everything except the quote itself.

## Who to ask

The best candidate is a buyer who has been with you for years and would take your call
today — not necessarily the biggest account. What makes a quote work is specificity:
"they called me before the shortage hit" beats "great service and quality" every time.

Two or three asks is plenty. One published quote is enough to change the page.

## The ask

Short, low-friction, and easy to say no to:

> Subject: One line for our new site?
>
> Hi [name],
>
> We've rebuilt the RJ Produce website and I'd like to include a word from a customer
> who actually knows how we work. Would you be willing to give me a sentence or two?
>
> Nothing formal — something like why you keep buying from us, or a time we got you out
> of a hole. I'd credit it to you, your title, and your company, and I'll send you the
> exact wording to approve before anything goes live.
>
> If it's easier, tell me over the phone and I'll write it up for you to sign off.
>
> [signature]

Asking over the phone works better than email with most produce buyers. Take notes, write
it up, send it back for approval.

## What to collect

- The quote, 1–2 sentences
- Name, title, company
- Written approval to publish (an email reply is fine — keep it)
- Optional: permission to use their logo

## Where it goes

The design system already has a pull-quote band. Once you have an approved quote, drop
this into `index.html` immediately before the closing `<section class="cta-band">`, and
tell me — I'll place it, restore the `.feature-quote` styles that the CSS prune removed,
and check it on mobile.

```html
<!-- CUSTOMER QUOTE -->
<section class="section feature-quote-band">
  <div class="wrap">
    <figure class="feature-quote">
      <blockquote>QUOTE GOES HERE — one or two sentences, in their words.</blockquote>
      <figcaption>
        <span class="fq-name">NAME</span>
        <span class="fq-role">TITLE, COMPANY</span>
      </figcaption>
    </figure>
  </div>
</section>
```

Second-best if nobody will go on record: a named-but-unquoted proof line — "supplying
[company] since 2011" — with their permission. Weaker than a quote, still far stronger
than the anonymous "trusted by retailers and distributors" the site says today.
