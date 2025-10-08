export default function RefundPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Refund Policy</h1>

            <p className="mb-2">
                <strong>Effective Date:</strong> October 9, 2025
            </p>

            <p className="mb-4">Thank you for subscribing to Arthveda.</p>
            <p className="mb-4">
                We provide a 14-day 100% money-back guarantee. No questions
                asked. If you are not satisfied with our service within the
                first 14 days of your subscription, please contact us at{" "}
                <a
                    href="mailto:hey@arthveda.app"
                    className="font-bold text-sm! sm:text-base!"
                >
                    hey@arthveda.app
                </a>{" "}
                and we will process your refund promptly.
            </p>
            <p>
                You can also reach out to us if you have any questions or
                concerns.
            </p>
        </div>
    );
}
