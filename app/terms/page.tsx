export default function TermsPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Terms of Service</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> June 29, 2025
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

            <h2 className="sub-heading mt-4">2. Your Responsibilities</h2>
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

            <h2 className="sub-heading mt-4">3. Data Ownership</h2>
            <p>
                You own the trade data you import into Arthveda. We do not claim
                ownership and will never share it without your consent. You can
                export your data at any time (if the feature is supported).
            </p>

            <h2 className="sub-heading mt-4">4. Service Availability</h2>
            <p>
                We aim to keep the platform stable and accessible, but make
                no uptime or data-retention guarantees. Features may change
                or be removed without notice.
            </p>

            <h2 className="sub-heading mt-4">5. Termination</h2>
            <p>
                You can stop using Arthveda anytime. We may suspend or terminate
                accounts that abuse the system or violate these terms.
            </p>

            <h2 className="sub-heading mt-4">6. Changes to These Terms</h2>
            <p>
                We may update these Terms of Service over time. Continued use
                after changes means you accept the updated terms.
            </p>

            <h2 className="sub-heading mt-4">7. Contact</h2>
            <p>
                For questions or feedback, email us at{" "}
                <a className="text-base!" href="mailto:hey@arthveda.app">
                    hey@arthveda.app
                </a>
            </p>
        </div>
    );
}
