import { useState, useEffect, useMemo } from 'react'
import { GOALS, RESOURCES, JOBS, QUIZ, QUIZ_TECHNOLOGIES } from './data.js'

/* ---------- helpers ---------- */
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
  }, [key, value])
  return [value, setValue]
}

const goalById = (id) => GOALS.find((g) => g.id === id)
const PAGES = [
  ['home', 'Home'], ['skills', 'Skills'], ['learn', 'Learning'],
  ['quiz', 'Assessment'], ['jobs', 'Opportunities'], ['profile', 'Profile'],
]

function Empty({ icon = '🔍', title, text, action }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  )
}

function SectionHead({ eyebrow, title, text }) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

/* ---------- Home ---------- */
function Home({ go, pickGoal }) {
  const features = [
    ['🎯', 'Career Goal', 'Choose a path that matches your interests.'],
    ['🧭', 'Skill Recommendations', 'See the skills and roadmap you need.'],
    ['📚', 'Learning Resources', 'Free, trusted courses and tutorials.'],
    ['📝', 'Skill Assessment', 'Test yourself and find your gaps.'],
    ['📄', 'Profile & Resume', 'Build a student profile and printable resume.'],
    ['💼', 'Job Matching', 'Browse and filter internships and jobs.'],
  ]
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="pill">SDG 4 · Quality Education &nbsp;|&nbsp; SDG 8 · Decent Work</span>
            <h1>Learn New Skills. <span className="accent">Find Your Next Opportunity.</span></h1>
            <p className="hero-text">
              SkillConnect guides college students from the right skills, to the right learning,
              to the right internships and jobs — all in one place.
            </p>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => go('skills')}>Explore Skills</button>
              <button className="btn btn-outline-light" onClick={() => go('jobs')}>Find Internships</button>
            </div>
          </div>
          <div className="flow-card">
            <h3>Your journey</h3>
            {[['1', 'Skills', 'Pick a goal & get a roadmap'], ['2', 'Learning', 'Follow free resources'], ['3', 'Opportunities', 'Apply with a ready profile']].map(([n, t, d]) => (
              <div className="flow-step" key={n}>
                <span className="flow-num">{n}</span>
                <div><strong>{t}</strong><small>{d}</small></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead eyebrow="Why SkillConnect" title="Everything students need, in one platform"
          text="Our survey and interviews showed students feel lost, overwhelmed and disconnected. SkillConnect brings guidance, learning and opportunities together." />
        <div className="grid grid-3">
          {features.map(([i, t, d]) => (
            <div className="card hover" key={t}>
              <div className="icon-box">{i}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <SectionHead eyebrow="Learning paths" title="Recommended learning paths" text="Pick a path to see the skills you need and a step-by-step roadmap." />
          <div className="grid grid-4">
            {GOALS.map((g) => (
              <button className="card hover path-card" key={g.id} onClick={() => pickGoal(g.id)}>
                <div className="icon-box">{g.icon}</div>
                <h3>{g.name}</h3>
                <p>{g.blurb}</p>
                <span className="link">View roadmap →</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------- Skills ---------- */
function Skills({ goal, setGoal, go, setLearnGoal }) {
  const g = goalById(goal)
  const [roadmapProgress, setRoadmapProgress] = useLocalStorage('sc_roadmap_progress', {})
  const completedSteps = roadmapProgress[goal] || []
  const toggleStep = (index) => {
    const next = completedSteps.includes(index)
      ? completedSteps.filter((step) => step !== index)
      : [...completedSteps, index]
    setRoadmapProgress({ ...roadmapProgress, [goal]: next })
  }
  const progressPercent = g ? Math.round((completedSteps.length / g.roadmap.length) * 100) : 0
  return (
    <section className="section container">
      <SectionHead eyebrow="Skill recommendations" title="Choose your career goal"
        text="Select a goal to see recommended skills and a learning roadmap." />
      <div className="grid grid-4">
        {GOALS.map((x) => (
          <button key={x.id} className={'card hover goal-btn' + (goal === x.id ? ' selected' : '')} onClick={() => setGoal(x.id)}>
            <div className="icon-box">{x.icon}</div>
            <h3>{x.name}</h3>
          </button>
        ))}
      </div>

      {!g ? (
        <Empty icon="🎯" title="No goal selected yet" text="Choose one of the career goals above to get your personalised skills and roadmap." />
      ) : (
        <div className="result">
          <h2>Recommended for {g.name}</h2>
          <p className="muted">{g.blurb}</p>
          <h3 className="sub">Key skills to build</h3>
          <div className="chips">{g.skills.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          <div className="roadmap-heading">
            <h3 className="sub">Your learning roadmap</h3>
            <strong>{progressPercent}% complete</strong>
          </div>
          <div className="progress roadmap-progress"><div style={{ width: `${progressPercent}%` }} /></div>
          <p className="muted roadmap-help">Tick each step as you complete it. Your progress is saved in this browser.</p>
          <ol className="roadmap">
            {g.roadmap.map((s, i) => (
              <li className={completedSteps.includes(i) ? 'roadmap-done' : ''} key={s.t}>
                <label className="roadmap-check">
                  <input type="checkbox" checked={completedSteps.includes(i)} onChange={() => toggleStep(i)} />
                </label>
                <div><strong>{s.t}</strong><p>{s.d}</p></div>
              </li>
            ))}
          </ol>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={() => { setLearnGoal(g.id); go('learn') }}>See learning resources</button>
            <button className="btn btn-outline" onClick={() => go('quiz')}>Take the skill quiz</button>
          </div>
        </div>
      )}
    </section>
  )
}

/* ---------- Learning ---------- */
function Learn({ learnGoal, setLearnGoal }) {
  const [level, setLevel] = useState('all')
  const list = RESOURCES.filter((r) => (learnGoal === 'all' || r.goal === learnGoal) && (level === 'all' || r.level === level))
  return (
    <section className="section container">
      <SectionHead eyebrow="Learning resources" title="Free resources to build your skills"
        text="Links open the official websites of each resource in a new tab. Availability may change over time." />
      <div className="filters">
        <select value={learnGoal} onChange={(e) => setLearnGoal(e.target.value)} aria-label="Filter by career goal">
          <option value="all">All career goals</option>
          {GOALS.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)} aria-label="Filter by level">
          <option value="all">All levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
        </select>
      </div>
      {list.length === 0 ? (
        <Empty title="No resources found" text="Try a different goal or level." />
      ) : (
        <div className="grid grid-3">
          {list.map((r) => (
            <div className="card hover" key={r.id}>
              <div className="card-top">
                <span className={'tag ' + r.level.toLowerCase()}>{r.level}</span>
                <span className="tag free">Free</span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <small className="muted">{goalById(r.goal).name} · {r.by}</small>
              <a className="btn btn-primary btn-sm" href={r.url} target="_blank" rel="noopener noreferrer">Open resource ↗</a>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* ---------- Quiz ---------- */
function Quiz({ go, setLearnGoal }) {
  const [technology, setTechnology] = useState('All technologies')
  const makeQuestionSet = (selected = technology) => {
    const pool = selected === 'All technologies'
      ? QUIZ
      : QUIZ.filter((question) => question.technology === selected)
    return [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(15, pool.length))
  }
  const [questions, setQuestions] = useState(() => makeQuestionSet('All technologies'))
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [picked, setPicked] = useState(null)
  const done = answers.length === questions.length
  const changeTechnology = (value) => {
    setTechnology(value)
    setQuestions(makeQuestionSet(value))
    setIdx(0)
    setAnswers([])
    setPicked(null)
  }

  const next = () => {
    if (picked === null) return
    setAnswers([...answers, picked])
    setPicked(null)
    setIdx(idx + 1)
  }
  const restart = () => {
    setQuestions(makeQuestionSet(technology))
    setIdx(0)
    setAnswers([])
    setPicked(null)
  }

  if (!done) {
    const q = questions[idx]
    return (
      <section className="section container narrow">
        <SectionHead eyebrow="Skill assessment" title="Test your skills" text={`Question ${idx + 1} of ${questions.length} · Choose a technology to practise a specific skill`} />
        <div className="filters quiz-technology-filter">
          <label htmlFor="quiz-technology">Choose a technology</label>
          <select id="quiz-technology" value={technology} onChange={(e) => changeTechnology(e.target.value)}>
            {QUIZ_TECHNOLOGIES.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div className="progress"><div style={{ width: `${(idx / questions.length) * 100}%` }} /></div>
        <div className="card quiz-card">
          <div className="quiz-meta"><span className="tag">{q.technology || goalById(q.topic)?.name || 'General skills'}</span><span className="muted">{questions.length}-question assessment</span></div>
          <h3>{q.q}</h3>
          <div className="options">
            {q.o.map((opt, i) => (
              <button key={i} className={'option' + (picked === i ? ' picked' : '')} onClick={() => setPicked(i)}>
                <span className="opt-letter">{String.fromCharCode(65 + i)}</span> {opt}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" disabled={picked === null} onClick={next}>
            {idx === questions.length - 1 ? 'Finish assessment' : 'Next question'}
          </button>
          {picked === null && <p className="hint">Select an answer to continue.</p>}
        </div>
      </section>
    )
  }

  const score = answers.filter((a, i) => a === questions[i].a).length
  const pct = Math.round((score / questions.length) * 100)
  const level = pct >= 80 ? 'Advanced' : pct >= 50 ? 'Intermediate' : 'Beginner'
  const topicResults = GOALS.map((g) => {
    const indexes = questions.map((q, i) => q.topic === g.id ? i : -1).filter((i) => i >= 0)
    const correct = indexes.filter((i) => answers[i] === questions[i].a).length
    return { ...g, total: indexes.length, correct, pct: indexes.length ? Math.round((correct / indexes.length) * 100) : null }
  }).filter((g) => g.total > 0)
  const weak = topicResults.filter((g) => g.pct < 70)
  return (
    <section className="section container narrow">
      <SectionHead eyebrow="Your results" title="Assessment complete" text={`Technology: ${technology}. Review your score and use the topic breakdown to decide what to practise next.`} />
      <div className="filters quiz-technology-filter">
        <label htmlFor="quiz-technology-results">Try another technology</label>
        <select id="quiz-technology-results" value={technology} onChange={(e) => changeTechnology(e.target.value)}>
          {QUIZ_TECHNOLOGIES.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
      <div className="card score-card">
        <div className="score-circle"><strong>{score}/{questions.length}</strong><span>{pct}%</span></div>
        <h3>Current level: {level}</h3>
        <p>{pct >= 80 ? 'Great work! Keep practising to maintain your progress.' : 'Use the recommendations below to strengthen your skills and try again.'}</p>
        <h3 className="sub">Topic performance</h3>
        <div className="topic-results">
          {topicResults.map((g) => (
            <div className="topic-result" key={g.id}>
              <div><span>{g.icon} {g.name}</span><strong>{g.correct}/{g.total} · {g.pct}%</strong></div>
              <div className="progress"><div style={{ width: `${g.pct}%` }} /></div>
            </div>
          ))}
        </div>
        {weak.length > 0 && <>
          <h3 className="sub">Recommended next steps</h3>
          <p className="muted">Focus on these areas to improve your result.</p>
          <div className="chips center">
            {weak.map((w) => <button key={w.id} className="chip chip-btn" onClick={() => { setLearnGoal(w.id); go('learn') }}>{w.icon} Explore {w.name}</button>)}
          </div>
        </>}
        <div className="review">
          {questions.map((q, i) => (
            <div key={i} className={'review-row ' + (answers[i] === q.a ? 'ok' : 'bad')}>
              <span>{answers[i] === q.a ? '✔' : '✘'}</span>
              <div>
                <strong>{q.q}</strong>
                {answers[i] !== q.a && <small>Your answer: {q.o[answers[i]]} · Correct answer: {q.o[q.a]}</small>}
                <small>{q.explanation || `Topic: ${goalById(q.topic)?.name || 'General skills'}`}</small>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={restart}>Try a new set of questions</button>
      </div>
    </section>
  )
}

/* ---------- Opportunities ---------- */
function Jobs({ bookmarks, setBookmarks }) {
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')
  const [goal, setGoal] = useState('all')
  const [loc, setLoc] = useState('all')
  const locations = useMemo(() => [...new Set(JOBS.map((item) => item.location))], [])

  const list = JOBS.filter((item) => {
    const searchText = [
      item.role,
      item.company,
      item.location,
      item.description,
      ...item.skills,
    ].join(' ').toLowerCase()

    return searchText.includes(q.trim().toLowerCase()) &&
      (type === 'all' || item.type === type) &&
      (goal === 'all' || item.goal === goal) &&
      (loc === 'all' || item.location === loc)
  })

  const toggle = (id) => setBookmarks(
    bookmarks.includes(id)
      ? bookmarks.filter((itemId) => itemId !== id)
      : [...bookmarks, id]
  )
  const reset = () => { setQ(''); setType('all'); setGoal('all'); setLoc('all') }

  return (
    <section className="section container">
      <SectionHead
        eyebrow="Career hub"
        title="Discover Opportunities"
        text="Explore trusted platforms for internships, jobs, research programs and career opportunities. Visit the original source to check current openings and apply."
      />

      <div className="filters">
        <input
          type="search"
          placeholder="Search websites, skills or opportunities…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search opportunity sources"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Opportunity type">
          <option value="all">All opportunities</option>
          <option value="Internship">Internships</option>
          <option value="Job">Jobs & careers</option>
        </select>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} aria-label="Career field">
          <option value="all">All fields</option>
          {GOALS.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
        <select value={loc} onChange={(e) => setLoc(e.target.value)} aria-label="Location">
          <option value="all">All locations</option>
          {locations.map((location) => <option key={location} value={location}>{location}</option>)}
        </select>
      </div>

      <p className="muted count">{list.length} source{list.length === 1 ? '' : 's'} found</p>

      {list.length === 0 ? (
        <Empty
          title="No sources found"
          text="Try another keyword or change your filters."
          action={<button className="btn btn-outline" onClick={reset}>Clear filters</button>}
        />
      ) : (
        <div className="grid grid-2">
          {list.map((item) => {
            const saved = bookmarks.includes(item.id)
            return (
              <article className="card hover job source-card" key={item.id}>
                <div className="card-top">
                  <span className={'tag ' + (item.type === 'Job' ? 'job-tag' : 'intern')}>
                    {item.type === 'Job' ? 'Jobs & Careers' : 'Internships'}
                  </span>
                  <button
                    className={'bookmark' + (saved ? ' on' : '')}
                    onClick={() => toggle(item.id)}
                    aria-label={saved ? 'Remove bookmark' : 'Save source'}
                    title={saved ? 'Remove bookmark' : 'Save source'}
                  >{saved ? '★' : '☆'}</button>
                </div>
                <h3>{item.company}</h3>
                <p><strong>{item.role}</strong></p>
                <p className="muted">📍 {item.location}</p>
                <p>{item.description}</p>
                <div className="chips">
                  {item.skills.map((skill) => <span className="chip small" key={skill}>{skill}</span>)}
                </div>
                <p className="elig"><strong>Eligibility:</strong> {item.elig}</p>
                <a className="btn btn-primary source-link" href={item.url} target="_blank" rel="noopener noreferrer">
                  Visit Website <span aria-hidden="true">↗</span>
                </a>
              </article>
            )
          })}
        </div>
      )}
      <p className="source-note">SkillConnect links to external platforms. Availability, eligibility and application details are managed by each source.</p>
    </section>
  )
}

/* ---------- Profile ---------- */
const EMPTY_FORM = { name: '', college: '', degree: '', year: '1st Year', skills: '', email: '', goal: '' }

function Profile({ profile, setProfile }) {
  const [editing, setEditing] = useState(!profile)
  const [form, setForm] = useState(profile || EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!form.name.trim()) er.name = 'Please enter your name.'
    if (!form.college.trim()) er.college = 'Please enter your college.'
    if (!form.degree.trim()) er.degree = 'Please enter your degree.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Please enter a valid email address.'
    if (!form.skills.trim()) er.skills = 'Add at least one skill (comma separated).'
    if (!form.goal) er.goal = 'Please select a career goal.'
    setErrors(er)
    if (Object.keys(er).length === 0) { setProfile(form); setEditing(false) }
  }

  if (editing) {
    return (
      <section className="section container narrow">
        <SectionHead eyebrow="Student profile" title={profile ? 'Edit your profile' : 'Create your profile'}
          text="Your details are saved only in this browser (localStorage). Nothing is sent to a server." />
        <form className="card form" onSubmit={submit} noValidate>
          {[['name', 'Full name', 'text'], ['college', 'College', 'text'], ['degree', 'Degree (e.g. B.Tech CSE)', 'text'], ['email', 'Email', 'email']].map(([k, label, t]) => (
            <label key={k}>{label}
              <input type={t} value={form[k]} onChange={set(k)} className={errors[k] ? 'err' : ''} />
              {errors[k] && <span className="error">{errors[k]}</span>}
            </label>
          ))}
          <label>Year
            <select value={form.year} onChange={set('year')}>
              {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduated'].map((y) => <option key={y}>{y}</option>)}
            </select>
          </label>
          <label>Skills (comma separated)
            <input type="text" placeholder="Python, SQL, Communication" value={form.skills} onChange={set('skills')} className={errors.skills ? 'err' : ''} />
            {errors.skills && <span className="error">{errors.skills}</span>}
          </label>
          <label>Career goal
            <select value={form.goal} onChange={set('goal')} className={errors.goal ? 'err' : ''}>
              <option value="">Select a goal…</option>
              {GOALS.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            {errors.goal && <span className="error">{errors.goal}</span>}
          </label>
          <div className="btn-row">
            <button className="btn btn-primary" type="submit">Save profile</button>
            {profile && <button className="btn btn-outline" type="button" onClick={() => { setForm(profile); setErrors({}); setEditing(false) }}>Cancel</button>}
          </div>
        </form>
      </section>
    )
  }

  const skillList = profile.skills.split(',').map((s) => s.trim()).filter(Boolean)
  return (
    <section className="section container narrow">
      <SectionHead eyebrow="Student profile" title="Your profile & resume" />
      <div className="btn-row no-print">
        <button className="btn btn-outline" onClick={() => { setForm(profile); setEditing(true) }}>Edit profile</button>
        <button className="btn btn-primary" onClick={() => window.print()}>Print / Save as PDF</button>
      </div>
      {(() => {
        const checks = [
          ['Name', Boolean(profile.name?.trim())],
          ['Email', Boolean(profile.email?.trim())],
          ['Education', Boolean(profile.college?.trim() && profile.degree?.trim())],
          ['Career goal', Boolean(profile.goal)],
          ['Skills', Boolean(profile.skills?.split(',').some((skill) => skill.trim()))],
        ]
        const readiness = Math.round((checks.filter((item) => item[1]).length / checks.length) * 100)
        return (
          <div className="card readiness-card">
            <div className="readiness-top"><div><span className="eyebrow">Resume check</span><h3>Profile readiness</h3></div><strong>{readiness}%</strong></div>
            <div className="progress"><div style={{ width: `${readiness}%` }} /></div>
            <div className="readiness-checks">{checks.map(([label, complete]) => <span className={complete ? 'ready' : 'missing'} key={label}>{complete ? '✓' : '○'} {label}</span>)}</div>
            <p className="muted">Complete these basics before applying. This checks profile completeness, not the quality of your resume.</p>
          </div>
        )
      })()}
      <div id="resume" className="card resume">
        <h2>{profile.name}</h2>
        <p className="muted">{profile.email}</p>
        <hr />
        <h4>Education</h4>
        <p>{profile.degree}, {profile.year}<br />{profile.college}</p>
        <h4>Career goal</h4>
        <p>{goalById(profile.goal)?.name}</p>
        <h4>Skills</h4>
        <div className="chips">{skillList.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
      </div>
    </section>
  )
}

/* ---------- App ---------- */
export default function App() {
  const [page, setPage] = useState('home')
  const [menu, setMenu] = useState(false)
  const [goal, setGoal] = useLocalStorage('sc_goal', '')
  const [learnGoal, setLearnGoal] = useState('all')
  const [profile, setProfile] = useLocalStorage('sc_profile', null)
  const [bookmarks, setBookmarks] = useLocalStorage('sc_bookmarks', [])

  const go = (p) => { setPage(p); setMenu(false); window.scrollTo(0, 0) }
  const pickGoal = (id) => { setGoal(id); go('skills') }

  return (
    <div className="app">
      <header className="nav no-print">
        <div className="container nav-inner">
          <button className="logo" onClick={() => go('home')}><span className="logo-mark">S</span>Skill<b>Connect</b></button>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? '✕' : '☰'}</button>
          <nav className={menu ? 'open' : ''}>
            {PAGES.map(([id, label]) => (
              <button key={id} className={'nav-link' + (page === id ? ' active' : '')} onClick={() => go(id)}>{label}</button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {page === 'home' && <Home go={go} pickGoal={pickGoal} />}
        {page === 'skills' && <Skills goal={goal} setGoal={setGoal} go={go} setLearnGoal={setLearnGoal} />}
        {page === 'learn' && <Learn learnGoal={learnGoal} setLearnGoal={setLearnGoal} />}
        {page === 'quiz' && <Quiz go={go} setLearnGoal={setLearnGoal} />}
        {page === 'jobs' && <Jobs bookmarks={bookmarks} setBookmarks={setBookmarks} />}
        {page === 'profile' && <Profile profile={profile} setProfile={setProfile} />}
      </main>

      <footer className="footer no-print">
        <div className="container footer-inner">
          <div>
            <div className="logo static"><span className="logo-mark">S</span>Skill<b>Connect</b></div>
            <p>Connecting Youth to the Right Skills & Opportunities.</p>
            <small>Aligned with SDG 4 (Quality Education) and SDG 8 (Decent Work & Economic Growth).</small>
          </div>
          <div className="footer-links">
            {PAGES.map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
          </div>
        </div>
        <div className="container copy">© 2026 SkillConnect · Team C-4 · Learn, Build and Connect. <span>Opportunity information is provided by external platforms.</span></div>
      </footer>
    </div>
  )
}
