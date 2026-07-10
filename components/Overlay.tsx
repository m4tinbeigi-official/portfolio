'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/profile';

const card = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' as const } },
};

function Holo({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' | 'center' }) {
  return (
    <section className={`section section--${align}`}>
      <motion.div
        className="holo-card"
        variants={card}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.35 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default function Overlay() {
  return (
    <div className="overlay">
      {/* 0 — HERO */}
      <section className="section section--center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 2.4, ease: 'easeOut' }}
        >
          <div className="sys">Incoming transmission · dimension C-137</div>
          <h1 className="hero-title">
            RICK <span className="accent">SANCHEZ</span>
          </h1>
          <p className="hero-sub">
            {profile.realName} — {profile.title}
          </p>
          <p className="hero-sub" style={{ opacity: 0.65, fontSize: '0.95rem' }}>
            {profile.tagline}
          </p>
        </motion.div>
      </section>

      {/* 1 — ABOUT */}
      <Holo align="right">
        <div className="sys">Specimen analysis</div>
        <h2>Who is this guy?</h2>
        {profile.about.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        <p className="dim">{profile.location}</p>
      </Holo>

      {/* 2 — EXPERIENCE */}
      <Holo align="left">
        <div className="sys">Career timeline · decrypted</div>
        <h2>Field Missions</h2>
        {profile.experience.map((xp) => (
          <div className="xp-row" key={xp.company}>
            <div className="xp-head">
              <span className="xp-company">{xp.company}</span>
              <span className="xp-period">{xp.period}</span>
            </div>
            <div className="xp-role">{xp.role}</div>
            <ul>
              {xp.points.map((pt) => (
                <li key={pt.slice(0, 24)}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </Holo>

      {/* 3 — PROJECTS */}
      <Holo align="right">
        <div className="sys">Experiment vault · unlocked</div>
        <h2>The Experiments</h2>
        <div className="proj-grid">
          {profile.projects.map((p) => (
            <a className="proj-card" key={p.name} href={p.link} target="_blank" rel="noreferrer">
              <div className="proj-code">{p.codename}</div>
              <div className="proj-name">{p.name}</div>
              <div className="proj-desc">{p.description}</div>
              <div className="tags">
                {p.tech.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              {p.stat && <div className="proj-stat">★ {p.stat}</div>}
            </a>
          ))}
        </div>
      </Holo>

      {/* 4 — SKILLS */}
      <Holo align="left">
        <div className="sys">Genome sequencing · complete</div>
        <h2>Skill Genome</h2>
        {profile.skills.map((s, i) => (
          <div className="skill-row" key={s.name}>
            <div className="skill-head">
              <span className="skill-name">{s.name}</span>
              <span className="skill-pct">{s.level}%</span>
            </div>
            <div className="skill-track">
              <motion.div
                className="skill-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </Holo>

      {/* 5 — ACHIEVEMENTS */}
      <Holo align="right">
        <div className="sys">Trophy chamber · access granted</div>
        <h2>Artifacts Collected</h2>
        <div className="ach-grid">
          {profile.achievements.map((a) => (
            <div className="ach" key={a.title}>
              <div className="ach-title">{a.title}</div>
              <div className="ach-detail">{a.detail}</div>
            </div>
          ))}
        </div>
      </Holo>

      {/* 6 — CONTACT */}
      <section className="section section--center">
        <motion.div
          className="holo-card"
          style={{ maxWidth: 620 }}
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
        >
          <div className="sys">Portal charged · destination: you</div>
          <h2>{profile.contact.heading}</h2>
          <p>{profile.contact.line}</p>
          <div className="contact-links">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            {profile.socials.map((s) => (
              <a className="btn" key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <p className="dim" style={{ marginTop: 24, textAlign: 'center', fontSize: '0.8rem' }}>
            WUBBA LUBBA DUB DUB · © {new Date().getFullYear()} {profile.realName}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
