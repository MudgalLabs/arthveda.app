import { ChatLink } from "@/components/chat_link";

export default function ContactPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">Contact</h1>

            <p className="mb-4">
                Whether you have a question, want to share feedback, report a
                bug, or just say hello, I&apos;d love to hear from you.
            </p>
            <p className="mb-4">
                You can{" "}
                <ChatLink className="text-base!">message me right here</ChatLink>{" "}
                using the chat widget, or email me at{" "}
                <a className="text-base!" href="mailto:hey@ceoshikhar.com">
                    hey@ceoshikhar.com
                </a>
                .
            </p>
            <p className="mb-4">
                I usually respond within 24–48 hours, Monday to Friday.
            </p>
            <p>
                {`If you're an existing user, please include your registered email
                ID so I can help you faster.`}
            </p>
        </div>
    );
}
