import Link from "next/link";

import { ChatLink } from "@/components/chat_link";

export default function TermsPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Terms of Service</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> June 1, 2026
            </p>

            <p>Welcome to Arthveda!</p>
            <p className="mb-8">
                By using Arthveda, you agree to these Terms of Service. Please
                read them carefully. If you do not agree, you should not use the
                service.
            </p>

            <h2 className="sub-heading">1. Overview</h2>
            <p>
                Arthveda is a Trading OS for Indian swing traders. It helps
                you discover stocks, journal trades, and share your process.
                A free tier is available with reasonable limits, alongside
                paid plans.
            </p>

            <h2 className="sub-heading mt-4">
                2. Subscriptions and One-time Access
            </h2>
            <p>
                Arthveda offers monthly and yearly recurring plans, and a
                &ldquo;One-time&rdquo; purchase (a single payment, no
                renewals). A free tier is available alongside these and does
                not require a payment method.
            </p>
            <p>
                Monthly and yearly Pro plans include a 30-day free trial. A
                valid payment method is required to start the trial, but you
                are not charged during the trial period. If you do not
                cancel before the trial ends, the plan auto-renews and is
                charged at the listed price; the subscription then continues
                to renew at the end of each billing period until cancelled.
                You can cancel anytime from your account; cancellation takes
                effect at the end of the current billing period. One-time
                purchases are not eligible for a trial.
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
