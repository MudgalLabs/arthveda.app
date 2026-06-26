import { Screenshot } from "./screenshot";

export default function Features() {
    return (
        <section id="features" className="text-center mt-24">
            <div className="space-y-24">
                <section>
                    <h3 className="section-header">
                        Your trading at a glance.
                    </h3>

                    <div className="h-4" />

                    <p className="section-detail">
                        A <strong>clear view </strong> of your overall trading
                        performance. Cumulative PnL shows your long-term
                        trajectory. Key stats reveal strengths, weaknesses, and
                        improvement areas.
                    </p>

                    <div className="h-8" />

                    <Screenshot
                        src="/images/dashboard.webp"
                        alt="Analytics dashboard showing trading performance"
                        loading="lazy"
                    />
                </section>

                <section>
                    <h3 className="section-header">
                        Every trade. Organized. Searchable.
                    </h3>

                    <div className="h-4" />

                    <p className="section-detail">
                        Your trades tell a <strong>story</strong>. Search,
                        filter and sort your entire trading history instantly.
                        Track your evolution as a trader.
                    </p>

                    <div className="h-8" />

                    <Screenshot
                        src="/images/positions.webp"
                        alt="Positions list with filters"
                        loading="lazy"
                    />
                </section>

                <section>
                    <h3 className="section-header">
                        Every position has a story
                    </h3>

                    <div className="h-4" />

                    <p className="section-detail">
                        A trade without notes is just a number. Log the{" "}
                        <strong>why and how</strong>, not just the result. Write
                        rich notes, attach screenshots, track emotions, setups,
                        and mistakes with tags.
                    </p>

                    <div className="h-8" />

                    <Screenshot
                        src="/images/journaling.webp"
                        alt="Position log with notes and tags"
                        loading="lazy"
                    />
                </section>

                <section>
                    <h3 className="section-header">
                        Your trading as a timeline.
                    </h3>

                    <div className="h-4" />

                    <p className="section-detail">
                        See your performance day by day, week by week, all the
                        way to the big yearly picture. Green days, red days,
                        overtrading days. A <strong>calendar view</strong>{" "}
                        highlights your consistency and patterns you might miss.
                    </p>

                    <div className="h-8" />

                    <Screenshot
                        src="/images/calendar.webp"
                        alt="Trading calendar"
                        loading="lazy"
                    />
                </section>

                <section>
                    <h3 className="section-header">
                        Patterns create profits. They also create losses.
                    </h3>

                    <div className="h-4" />

                    <p className="section-detail">
                        Break down performance by tags, symbols, time, and
                        instruments. Discover where you win most, where you
                        struggle, and where to focus next. Decisions{" "}
                        <strong>backed by data </strong> beat decisions backed
                        by hope.
                    </p>

                    <div className="h-8" />

                    <Screenshot
                        src="/images/analytics.webp"
                        alt="Analytics breakdowns"
                        loading="lazy"
                    />
                </section>

                <section>
                    <h3 className="section-header">And there’s so much more</h3>

                    <div className="h-4" />

                    <p className="section-detail">
                        I’m adding new features based on real trader feedback.
                        Arthveda will keep growing with you and your trading{" "}
                        <strong>journey</strong>.
                    </p>
                </section>
            </div>
        </section>
    );
}
