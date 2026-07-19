import BuilderCard from "@/components/builder_card";
import { ChatLink } from "@/components/chat_link";

export default function AboutPage() {
    return (
        <div className="mt-12">
            <h1 className="big-heading mb-12">About</h1>

            <p className="mb-4">
                <strong>Arthveda</strong> is the Trading OS for India, built
                for serious traders of every style.
            </p>
            <p className="mb-4">
                It brings together three connected workflows:{" "}
                <strong>Discover</strong> stocks worth tracking,{" "}
                <strong>Journal</strong> the trades and decisions you make, and
                build a public <strong>Social</strong> identity around your
                process. One workspace, end to end.
            </p>
            <p className="mb-4">
                Hi, I&apos;m Shikhar. I build things. Sometimes they&apos;re
                good. Arthveda is designed, developed, and maintained by me,
                from India.
            </p>
            <p className="mb-4">
                The idea is simple: give Indian traders the tools to build a
                real trading process, and a reputation that rests on it. Process
                over P&amp;L.
            </p>
            <p className="mb-8">
                If you have feedback, I&apos;d love to hear from you.{" "}
                <ChatLink className="text-base!">Talk to me</ChatLink> using the
                chat widget, or email{" "}
                <a className="text-base!" href="mailto:hey@ceoshikhar.com">
                    hey@ceoshikhar.com
                </a>
                .
            </p>

            <BuilderCard />
        </div>
    );
}
