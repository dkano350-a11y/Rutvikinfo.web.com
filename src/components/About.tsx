
export default function About() {
  const stats = [
    { icon: "🎓", title: "Sem 5 BBA", subtitle: "AIHM Ahmedabad" },
    { icon: "🚀", title: "6+ Projects", subtitle: "Built & Designed" },
    { icon: "🛠️", title: "10+ Tools", subtitle: "In Tech Stack" },
    { icon: "📍", title: "Ahmedabad", subtitle: "Gujarat, India" },
  ];

  return (
    <section id="about" className="py-20 px-6 relative bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="reveal-grid grid md:grid-cols-2 gap-12 items-center" >
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy mb-6">
              I'm Rutvik.
            </h2>
            <div className="space-y-4 text-charcoal text-lg leading-relaxed">
              <p>
                A BBA Marketing student (Sem 5, AIHM Ahmedabad) who got obsessed
                with one question:{" "}
                <strong>
                  what happens when you combine marketing strategy with AI
                  tools?
                </strong>
              </p>
              <p>
                I actively build AI-powered apps using no-code and low-code
                platforms. My toolkit includes ChatGPT, Claude, and Gemini — not
                just as a user, but as a builder. I've conceptualized and
                developed projects across AI companions, EV tech, FMCG startups,
                and data automation.
              </p>
              <p className="font-medium text-navy bg-electric/5 p-4 rounded-xl border border-electric/10 inline-block mt-4">
                My edge: Marketing strategy + AI building + No-code execution.
                All three, in one person.
              </p>
            </div>
          </div>

          <div className="reveal-grid grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300" >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="font-bold text-navy text-lg">{stat.title}</div>
                <div className="text-sm text-charcoal mt-1">
                  {stat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
