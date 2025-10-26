export default function AboutPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">About Us</h1>

            <p className="mb-4">
                <strong>Arthveda</strong> is an open-source trade journaling and
                analytics platform designed to help Indian traders track,
                analyse, and grow as a trader.
            </p>
            <p className="mb-4">
                Built by{" "}
                <a
                    className="text-base!"
                    href="https://github.com/MudgalLabs"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <strong>Mudgal Labs</strong>
                </a>{" "}
                in India, founded by{" "}
                <a
                    className="text-base!"
                    href="https://ceoshikhar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <strong>Shikhar Sharma</strong>
                </a>
                .
            </p>
            <p className="mb-4"></p>
            <p className="mb-4">
                Our mission is to empower everyday traders with insights and
                workflows that were previously accessible only to professional
                institutions.
            </p>
        </div>
    );
}
