import { ChatLink } from "@/components/chat_link";

export default function RefundPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Refund Policy</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> July 5, 2026
            </p>

            <p className="mb-4">Thank you for trying Arthveda.</p>

            <p className="mb-4">
                Arthveda has a <strong>free tier</strong> you can use
                indefinitely, with reasonable limits. No card required.
            </p>

            <p className="mb-4">
                <strong>All paid plans</strong> (monthly, yearly, and
                One-time) come with a{" "}
                <strong>14-day money-back guarantee</strong>: if you change
                your mind, reach out within 14 days of being charged for a
                full refund. After 14 days, payments are non-refundable.
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
                <strong>One-time</strong> is a single payment (no renewals)
                and is not eligible for a trial, per how our payment provider
                handles one-time payments. The 14-day money-back guarantee
                above applies from the day of payment.
            </p>

            <p className="mb-4">
                Payments are processed by <strong>Paddle</strong>, our
                merchant of record. Where Paddle&rsquo;s checkout terms add
                statutory consumer protections (e.g. EU/UK cooling-off
                rights), those continue to apply on top of this policy.
            </p>

            <p>
                For questions or to request a refund,{" "}
                <ChatLink className="font-bold text-base!">
                    message me
                </ChatLink>{" "}
                using the chat widget, or email{" "}
                <a
                    href="mailto:hey@ceoshikhar.com"
                    className="font-bold text-base!"
                >
                    hey@ceoshikhar.com
                </a>
                .
            </p>
        </div>
    );
}
