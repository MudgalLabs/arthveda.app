import { ChatLink } from "@/components/chat_link";

export default function PrivacyPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Privacy Policy</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> June 1, 2026
            </p>

            <p className="mb-8">
                This policy explains what information Arthveda collects, how we
                use it, and your rights regarding your data.
            </p>

            <h2 className="sub-heading">1. What We Collect</h2>
            <ul>
                <li>
                    Your <strong>email address</strong> and{" "}
                    <strong>public profile details</strong> (like name and
                    avatar) from your OAuth provider (e.g., Google, GitHub).
                </li>
                <li>
                    The <strong>trade data</strong> you import into Arthveda.
                </li>
                <li>
                    <strong>Payment information</strong> for paid plans,
                    processed by <strong>Paddle</strong>, our payments
                    partner and merchant of record. Arthveda does not store
                    or see your full card details; Paddle&rsquo;s privacy
                    policy applies to that data.
                </li>
            </ul>
            <p>
                We only collect data necessary to provide you with a
                personalized and functional experience.
            </p>

            <h2 className="sub-heading mt-4">
                2. How We Use Your Data (And What We Don&rsquo;t Look At)
            </h2>
            <ul>
                <li>
                    Your profile helps identify your account and personalize
                    your experience.
                </li>
                <li>
                    Your trade data powers charts, metrics, and analytics
                    available within the platform.
                </li>
                <li>We do not sell your data or use it for advertising.</li>
            </ul>
            <p className="mt-4">
                We do not read your individual trade data. The trades, notes,
                watchlists, and screener runs you create in Arthveda are
                private to your account. Automated systems process them to
                render your charts, metrics, and analytics &mdash; operators
                and support staff do not browse user trade histories.
            </p>
            <p>
                For operational monitoring (keeping the service running,
                handling billing, preventing fraud, debugging errors) we do
                look at account-level signals: user profiles, subscription
                status, invoices, login activity, and error logs. These never
                include the contents of your trades.
            </p>

            <h2 className="sub-heading mt-4">3. Cookies & Analytics</h2>
            <p>We use cookies to authenticate users.</p>
            <p>
                We also use <strong>PostHog</strong> to understand how people
                interact with Arthveda (anonymous clicks, page views, flows).
                This helps us improve usability, fix bugs, and guide product
                decisions. We do not use third-party ad or tracking services.
            </p>

            <h2 className="sub-heading mt-4">4. Data Storage & Security</h2>
            <p>
                Your data is stored securely. We apply reasonable security
                measures to protect it from unauthorized access or loss.
            </p>

            <h2 className="sub-heading mt-4">5. Your Rights</h2>
            <ul>
                <li>
                    You may delete your account or request data deletion at any
                    time.
                </li>
                <li>You may export your trade data (if supported).</li>
                <li>
                    Feel free to reach out if you have questions about your
                    data.
                </li>
            </ul>

            <h2 className="sub-heading mt-4">6. Changes to This Policy</h2>
            <p>
                We may update this policy in the future. If we make major
                changes, we’ll do our best to notify you in the app or via
                email.
            </p>

            <h2 className="sub-heading mt-4">7. Contact</h2>
            <p>
                Have questions or concerns?{" "}
                <ChatLink className="text-base!">Open the chat widget</ChatLink>{" "}
                at the bottom-right, or email{" "}
                <a className="text-base!" href="mailto:hey@ceoshikhar.com">
                    hey@ceoshikhar.com
                </a>
                .
            </p>
        </div>
    );
}
