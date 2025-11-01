export default function RefundPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Refund Policy</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> November 1, 2025
            </p>

            <p className="mb-4">Thank you for subscribing to Arthveda.</p>
            <p className="mb-4">
                We offer a <strong>30-day free trial</strong> so you can explore
                Arthveda in full before making any payment. You’ll only be
                charged once your trial period ends and you choose to continue
                with a paid subscription.
            </p>
            <p>
                If you have any questions, concerns or would like to{" "}
                <strong>request for a refund</strong>, feel free to contact us
                at{" "}
                <a
                    href="mailto:hey@arthveda.app"
                    className="font-bold text-sm! sm:text-base!"
                >
                    hey@arthveda.app
                </a>
                .
            </p>
        </div>
    );
}
