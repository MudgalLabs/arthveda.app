import Link from "next/link";

import { ChatLink } from "@/components/chat_link";

export default function TermsPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Terms of Service</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> July 20, 2026
            </p>

            <p>Welcome to Arthveda!</p>
            <p className="mb-8">
                By using Arthveda, you agree to these Terms of Service. Please
                read them carefully. If you do not agree, you should not use the
                service.
            </p>

            <h2 className="sub-heading">1. Overview</h2>
            <p>
                Arthveda is a Trading OS for Indian traders. It helps
                you discover stocks, journal trades, and share your process.
                New accounts include a 14-day free trial; continued use of
                the paid features requires a subscription.
            </p>

            <h2 className="sub-heading mt-4">
                2. Subscriptions and One-time Access
            </h2>
            <p>
                Arthveda offers a yearly recurring plan and a
                &ldquo;One-time&rdquo; purchase (a single payment, no
                renewals). Legacy monthly subscriptions created before July
                20, 2026 continue to renew on their existing terms until
                cancelled, but monthly is no longer offered to new
                subscribers.
            </p>
            <p>
                Every new account includes a <strong>14-day free trial</strong>
                with full access to the paid features. <strong>No payment
                method is required to start the trial, and no charge is made
                when it ends.</strong> There is nothing to cancel. The trial is
                granted once per account.
            </p>
            <p>
                When the trial ends, or if a subscription lapses or is
                cancelled, the account moves to a <strong>read-only</strong>
                state. You keep access to the data you created and may
                continue to view, export and share it. You will not be able
                to create or modify data until you subscribe. We do not
                delete your data because a subscription ended. Recurring
                subscriptions renew at the listed price until cancelled; you
                can cancel anytime from your account, and cancellation takes
                effect at the end of the current billing period.
            </p>
            <p>
                Payments are processed by Paddle, our merchant of record.
                Paddle&rsquo;s terms also apply at checkout.
            </p>
            <p>
                A One-time purchase grants access for the lifetime of the
                Arthveda product, not the lifetime of the user. If Arthveda is
                shut down, discontinued, or otherwise ceases operation, access
                to all plans &mdash; including One-time &mdash; ends with the
                service. A One-time purchase is not a guarantee of perpetual
                service or of any specific runway.
            </p>
            <p>
                Refunds for One-time purchases are handled per our{" "}
                <Link className="text-base!" href="/refund">
                    refund policy
                </Link>
                .
            </p>

            <h2 className="sub-heading mt-4">3. Your Responsibilities</h2>
            <ul>
                <li>
                    You agree to use Arthveda in compliance with all applicable
                    laws and regulations.
                </li>
                <li>
                    You must not misuse, disrupt, or attack the service or
                    infrastructure.
                </li>
                <li>
                    You are responsible for keeping your account credentials
                    secure.
                </li>
            </ul>

            <h2 className="sub-heading mt-4">4. Data Ownership</h2>
            <p>
                You own the trade data you import into Arthveda. We do not claim
                ownership and will never share it without your consent. You can
                export your data at any time (if the feature is supported).
            </p>

            <h2 className="sub-heading mt-4">5. Service Availability</h2>
            <p>
                We aim to keep the platform stable and accessible, but make
                no uptime or data-retention guarantees. Features may change
                or be removed without notice. We may also discontinue the
                service entirely with reasonable notice, after which all
                access (including One-time) ends.
            </p>

            <h2 className="sub-heading mt-4">6. Termination</h2>
            <p>
                You can stop using Arthveda anytime. We may suspend or terminate
                accounts that abuse the system or violate these terms.
            </p>

            <h2 className="sub-heading mt-4">7. Changes to These Terms</h2>
            <p>
                We may update these Terms of Service over time. Continued use
                after changes means you accept the updated terms.
            </p>

            <h2 className="sub-heading mt-4">8. Contact</h2>
            <p>
                For questions or feedback,{" "}
                <ChatLink className="text-base!">chat with me</ChatLink> using
                the widget at the bottom-right, or email me at{" "}
                <a className="text-base!" href="mailto:hey@ceoshikhar.com">
                    hey@ceoshikhar.com
                </a>
                .
            </p>
        </div>
    );
}
