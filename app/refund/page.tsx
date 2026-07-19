import { ChatLink } from "@/components/chat_link";

export default function RefundPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Refund Policy</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> July 20, 2026
            </p>

            <p className="mb-4">Thank you for trying Arthveda.</p>

            <p className="mb-4">
                Every new account includes a{" "}
                <strong>14-day free trial</strong> with full access.{" "}
                <strong>No card is required</strong> to start it, and no
                charge is made when it ends.
            </p>

            <p className="mb-4">
                <strong>All paid plans</strong> (yearly and One-time) come
                with a{" "}
                <strong>14-day money-back guarantee</strong>: if you change
                your mind, reach out within 14 days of being charged for a
                full refund. After 14 days, payments are non-refundable.
            </p>

            <p className="mb-4">
                Because the trial takes no payment method, there is no
                automatic charge when it ends and nothing to cancel. If you
                choose not to subscribe, your account simply becomes
                read-only: you keep access to your data and can continue to
                view, export and share it. Recurring plans renew at the
                listed price until cancelled; you can cancel anytime from
                your account, and cancellation takes effect at the end of
                the current billing period.
            </p>

            <p className="mb-4">
                <strong>One-time</strong> is a single payment with no
                renewals. The trial is granted on the account rather than on
                a plan, so it is unaffected by which plan you later choose.
                The 14-day money-back guarantee above applies from the day
                of payment.
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
