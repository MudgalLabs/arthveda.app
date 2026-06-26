export default function RefundPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Refund Policy</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> June 1, 2026
            </p>

            <p className="mb-4">Thank you for trying Arthveda.</p>

            <p className="mb-4">
                Arthveda has a <strong>free tier</strong> you can use
                indefinitely, with reasonable limits. No card required.
            </p>

            <p className="mb-4">
                <strong>Monthly and yearly Pro plans</strong> include a
                30-day free trial. A valid payment method is required to
                start, but you are not charged during the trial. If you do
                not cancel before the trial ends, the plan you chose is
                charged automatically and renews at the listed price
                thereafter. You can cancel anytime from your account;
                cancellation takes effect at the end of the current billing
                period.
            </p>

            <p className="mb-4">
                <strong>Lifetime</strong> is a one-time purchase and is not
                eligible for a trial. If you change your mind, reach out
                within <strong>14 days of payment</strong> for a refund.
                After 14 days, Lifetime purchases are non-refundable.
            </p>

            <p className="mb-4">
                Payments are processed by <strong>Paddle</strong>, our
                merchant of record. Where Paddle&rsquo;s checkout terms add
                statutory consumer protections (e.g. EU/UK cooling-off
                rights), those continue to apply on top of this policy.
            </p>

            <p>
                For questions or to request a refund, email{" "}
                <a
                    href="mailto:hey@ceoshikhar.com"
                    className="font-bold text-sm! sm:text-base!"
                >
                    hey@ceoshikhar.com
                </a>
                .
            </p>
        </div>
    );
}
