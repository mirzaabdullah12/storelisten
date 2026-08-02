import { useState } from 'react'
import './dashboard.css'
import { SHIFTS, RULES, RUBRIC, PILOT } from './data.js'
import { useTheme } from './theme.jsx'

// ── SVG Mini Icons ────────────────────────────────────────────
const I = {
  mic:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
  home:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  bar:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  check:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  dollar:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  bell:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  sun:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  moon:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  trend:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  users:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  logout:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  plus:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  map:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
}

// ── Custom SVG Bar Chart ──────────────────────────────────────
function BarChart({ data, dataKey, color = '#a855f7', height = 160 }) {
  const max = Math.max(...data.map(d => d[dataKey]))
  return (
    <svg width="100%" height={height} style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const barH = (d[dataKey] / max) * (height - 30)
        const x = (i / data.length) * 100
        const w = (1 / data.length) * 100 - 1.5
        return (
          <g key={i}>
            <rect x={`${x}%`} y={height - 30 - barH} width={`${w}%`} height={barH}
              rx="4" fill={`url(#bg${i})`} opacity="0.9" />
            <defs>
              <linearGradient id={`bg${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                <stop offset="100%" stopColor={color} stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <text x={`${x + w / 2}%`} y={height - 8} textAnchor="middle"
              fontSize="9" fill="rgba(255,255,255,0.4)">{d.date}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Custom SVG Line Chart ─────────────────────────────────────
function LineChart({ data, keys = [], colors = [], height = 160 }) {
  const allVals = data.flatMap(d => keys.map(k => d[k]))
  const max = Math.max(...allVals)
  const min = Math.min(...allVals)
  const range = max - min || 1
  const W = 400, H = height - 30

  const points = (key) => data.map((d, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((d[key] - min) / range) * H
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} style={{ overflow: 'visible' }}>
      <defs>
        {keys.map((k, ki) => (
          <linearGradient key={ki} id={`lg${ki}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors[ki]} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors[ki]} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {keys.map((k, ki) => {
        const pts = data.map((d, i) => {
          const x = (i / (data.length - 1)) * W
          const y = H - ((d[k] - min) / range) * H
          return [x, y]
        })
        const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
        const areaD = pathD + ` L${W},${H} L0,${H} Z`
        return (
          <g key={ki}>
            <path d={areaD} fill={`url(#lg${ki})`} />
            <polyline points={pts.map(p => p.join(',')).join(' ')} fill="none"
              stroke={colors[ki]} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {pts.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={colors[ki]}
                stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
            ))}
          </g>
        )
      })}
      {data.map((d, i) => (
        <text key={i} x={(i / (data.length - 1)) * W} y={height - 4}
          textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">{d.date}</text>
      ))}
    </svg>
  )
}

// ── Donut Chart ───────────────────────────────────────────────
function DonutChart({ value, max = 100, color = '#a855f7', size = 120 }) {
  const r = 46, cx = 60, cy = 60
  const circ = 2 * Math.PI * r
  const pct = value / max
  const dash = pct * circ
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="10" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ / 4}
        strokeLinecap="round" style={{ transition: 'stroke-dasharray .8s ease' }} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="18" fontWeight="800"
        fill="white">{value}</text>
      <text x={cx} y={cy + 20} textAnchor="middle" fontSize="10"
        fill="rgba(255,255,255,0.5)">/100</text>
    </svg>
  )
}

// ── Overview Page ─────────────────────────────────────────────
function Overview() {
  const totalCustomers = SHIFTS.reduce((s, x) => s + x.customers, 0)
  const avgScore = Math.round(SHIFTS.reduce((s, x) => s + x.score, 0) / SHIFTS.length)
  const avgCompliance = Math.round(SHIFTS.reduce((s, x) => s + (x.compliant / x.triggered) * 100, 0) / SHIFTS.length)
  const monthlyOpp = RULES.filter(r => r.active).reduce((s, r) => {
    const missRate = 1 - (avgCompliance / 100)
    return s + (missRate * 30 * r.value)
  }, 0)

  return (
    <div>
      <h1 className="page-title">Overview</h1>
      <p className="page-sub">La Vaquita · Week of Aug 1–7, 2026</p>

      {/* ── STAT CARDS — top ── */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="sc-label">Avg Shift Score</div>
          <div className="sc-value accent">{avgScore}</div>
          <div className="sc-change up">↑ 6pts vs last week</div>
          <div className="sc-ico">{I.bar}</div>
        </div>
        <div className="stat-card">
          <div className="sc-label">Total Customers</div>
          <div className="sc-value">{totalCustomers}</div>
          <div className="sc-change up">↑ 12% vs last week</div>
          <div className="sc-ico">{I.users}</div>
        </div>
        <div className="stat-card">
          <div className="sc-label">Avg Compliance Rate</div>
          <div className="sc-value green">{avgCompliance}%</div>
          <div className="sc-change up">↑ 8pts since coaching</div>
          <div className="sc-ico">{I.check}</div>
        </div>
        <div className="stat-card">
          <div className="sc-label">Monthly Opportunity</div>
          <div className="sc-value red">~${Math.round(monthlyOpp)}</div>
          <div className="sc-change">left on the table</div>
          <div className="sc-ico">{I.dollar}</div>
        </div>
      </div>

      {/* ── CHARTS ── */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-title">Shift Score &amp; Sentiment Trend</div>
          <div className="chart-sub">Daily performance scores over the last 7 shifts</div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            {[['#a855f7','Score'],['#c084fc','Sentiment']].map(([col,lbl]) => (
              <div key={lbl} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--text3)' }}>
                <span style={{ width:10, height:10, borderRadius:'50%', background:col, display:'inline-block' }} />{lbl}
              </div>
            ))}
          </div>
          <LineChart data={SHIFTS} keys={['score','sentiment']} colors={['#a855f7','#c084fc']} height={180} />
        </div>

        <div className="chart-card">
          <div className="chart-title">Quality Score</div>
          <div className="chart-sub">Current avg rubric score</div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'8px 0' }}>
            <DonutChart value={avgScore} color="#a855f7" size={130} />
            <div style={{ width:'100%' }}>
              {RUBRIC.map(r => (
                <div key={r.name} style={{ marginBottom: 10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--text2)', marginBottom:4 }}>
                    <span>{r.name}</span><span style={{ color:'var(--accent)', fontWeight:600 }}>{r.avg}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill-bar" style={{ width:`${r.avg}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CUSTOMER VOLUME BAR CHART ── */}
      <div className="chart-card" style={{ marginBottom: 24 }}>
        <div className="chart-title">Daily Customer Volume</div>
        <div className="chart-sub">Conversations detected per shift</div>
        <BarChart data={SHIFTS} dataKey="customers" color="#a855f7" height={160} />
      </div>

      {/* ── PILOT PROGRESS — bottom ── */}
      <div className="pilot-card">
        <div className="pilot-top">
          <div>
            <div className="pilot-title">📍 {PILOT.location} — {PILOT.phase}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{PILOT.startDate} → {PILOT.endDate}</div>
          </div>
          <span className="badge active">● Active</span>
        </div>
        <div className="pilot-steps">
          {[
            { label:'Hardware confirmed',    icon:'🖥️',  state:'done'   },
            { label:'Legal basis confirmed', icon:'⚖️',  state:'done'   },
            { label:'Rules configured',      icon:'⚙️',  state:'done'   },
            { label:'Baseline running',      icon:'🎙️',  state:'done'   },
            { label:'Report delivered',      icon:'📊',  state:'active' },
            { label:'Staff coached',         icon:'👥',  state:''       },
            { label:'Follow-up period',      icon:'🔄',  state:''       },
            { label:'Proof point',           icon:'🏆',  state:''       },
          ].map((s, i) => (
            <div key={i} className={`ps ${s.state}`}>
              <div className="ps-icon">{s.icon}</div>
              <div className="ps-num">
                {s.state==='done' ? '✓ Done' : s.state==='active' ? '● Active' : `Step ${i+1}`}
              </div>
              <div className="ps-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function Shifts() {
  const scoreBadge = s => s >= 85 ? 'good' : s >= 70 ? 'mid' : 'bad'
  return (
    <div>
      <h1 className="page-title">Shift Reports</h1>
      <p className="page-sub">Per-shift performance — quality score, sentiment, compliance</p>
      <div className="table-card">
        <div className="table-head">
          <span className="table-head-title">All Shifts</span>
          <button className="btn-ghost">{I.download} Export</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th><th>Quality Score</th><th>Sentiment</th>
              <th>Customers</th><th>Conversations</th><th>Compliance</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {SHIFTS.map(s => {
              const comp = Math.round((s.compliant / s.triggered) * 100)
              return (
                <tr key={s.id}>
                  <td style={{ fontWeight:600, color:'var(--text)' }}>{s.date}</td>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontWeight:700, color:'var(--accent)' }}>{s.score}</span>
                      <div style={{ flex:1, maxWidth:80, height:4, background:'rgba(168,85,247,.12)', borderRadius:2 }}>
                        <div style={{ width:`${s.score}%`, height:'100%', background:'linear-gradient(90deg,#a855f7,#c084fc)', borderRadius:2 }} />
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge ${scoreBadge(s.sentiment)}`}>{s.sentiment}%</span></td>
                  <td>{s.customers}</td>
                  <td>{s.conversations}</td>
                  <td><span className={`badge ${scoreBadge(comp)}`}>{comp}%</span></td>
                  <td><span className="badge active">Processed</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Compliance Page ───────────────────────────────────────────
function Compliance() {
  const [rules, setRules] = useState(RULES)
  const toggle = id => setRules(rs => rs.map(r => r.id === id ? { ...r, active: !r.active } : r))
  const avgCompliance = Math.round(SHIFTS.reduce((s, x) => s + (x.compliant / x.triggered) * 100, 0) / SHIFTS.length)

  return (
    <div>
      <h1 className="page-title">Compliance Rules</h1>
      <p className="page-sub">Owner-defined rules — trigger → expected action → revenue impact</p>

      <div className="stats-grid" style={{ gridTemplateColumns:'repeat(3,1fr)', marginBottom:24 }}>
        <div className="stat-card">
          <div className="sc-label">Active Rules</div>
          <div className="sc-value accent">{rules.filter(r=>r.active).length}</div>
          <div className="sc-ico">{I.check}</div>
        </div>
        <div className="stat-card">
          <div className="sc-label">Avg Compliance</div>
          <div className="sc-value green">{avgCompliance}%</div>
          <div className="sc-ico">{I.trend}</div>
        </div>
        <div className="stat-card">
          <div className="sc-label">Miss Rate</div>
          <div className="sc-value red">{100 - avgCompliance}%</div>
          <div className="sc-ico">{I.bar}</div>
        </div>
      </div>

      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:16 }}>
        <button className="btn-sm">{I.plus} Add Rule</button>
      </div>

      <div className="rules-grid">
        {rules.map(r => {
          const missRate = 1 - (avgCompliance / 100)
          const monthlyLoss = Math.round(missRate * 30 * r.value)
          const compPct = avgCompliance
          return (
            <div className="rule-card" key={r.id}>
              <div>
                <div className="rule-name">{r.name}</div>
                <div className="rule-detail">🎯 Trigger: {r.trigger}</div>
                <div className="rule-detail">✅ Expected: {r.action}</div>
                <div className="rule-stats">
                  <div className="rs-item">
                    <div className="rs-val">{compPct}%</div>
                    <div className="rs-lbl">Compliance rate</div>
                  </div>
                  {r.value > 0 && (
                    <div className="rs-item">
                      <div className="rs-val" style={{ color:'var(--red)' }}>~${monthlyLoss}</div>
                      <div className="rs-lbl">Monthly loss est.</div>
                    </div>
                  )}
                  <div className="rs-item">
                    <div className="rs-val" style={{ fontSize:14, color:'var(--text2)' }}>{r.window}</div>
                    <div className="rs-lbl">Reporting window</div>
                  </div>
                </div>
                <div className="progress-wrap" style={{ marginTop:12 }}>
                  <div className="progress-track">
                    <div className="progress-fill-bar" style={{ width:`${compPct}%` }} />
                  </div>
                </div>
              </div>
              <div>
                <label className="toggle">
                  <input type="checkbox" checked={r.active} onChange={() => toggle(r.id)} />
                  <div className="toggle-track" />
                  <div className="toggle-thumb" />
                </label>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Revenue Page ──────────────────────────────────────────────
function Revenue() {
  const avgCompliance = Math.round(SHIFTS.reduce((s, x) => s + (x.compliant / x.triggered) * 100, 0) / SHIFTS.length)
  const missRate = 1 - avgCompliance / 100
  const activeRules = RULES.filter(r => r.active && r.value > 0)
  const monthlyOpp  = Math.round(activeRules.reduce((s, r) => s + missRate * 30 * r.value, 0))
  const annualOpp   = monthlyOpp * 12

  return (
    <div>
      <h1 className="page-title">Revenue Opportunity</h1>
      <p className="page-sub">Estimated revenue left on the table from compliance misses</p>

      <div className="rev-hero">
        <div style={{ fontSize:13, color:'var(--text3)', marginBottom:8, textTransform:'uppercase', letterSpacing:'.5px' }}>Monthly opportunity</div>
        <div className="rev-amount">~${monthlyOpp.toLocaleString()}</div>
        <div className="rev-label">left on the table each month</div>
        <div className="rev-sub">Based on {Math.round(missRate * 100)}% miss rate × owner-supplied values — estimate, not guaranteed</div>
      </div>

      <div className="stats-grid" style={{ marginBottom:24 }}>
        <div className="stat-card">
          <div className="sc-label">Daily Loss Est.</div>
          <div className="sc-value red">~${Math.round(monthlyOpp / 30)}</div>
          <div className="sc-ico">{I.dollar}</div>
        </div>
        <div className="stat-card">
          <div className="sc-label">Monthly Loss Est.</div>
          <div className="sc-value red">~${monthlyOpp.toLocaleString()}</div>
          <div className="sc-ico">{I.dollar}</div>
        </div>
        <div className="stat-card">
          <div className="sc-label">Annual Loss Est.</div>
          <div className="sc-value red">~${annualOpp.toLocaleString()}</div>
          <div className="sc-ico">{I.dollar}</div>
        </div>
        <div className="stat-card">
          <div className="sc-label">Miss Rate</div>
          <div className="sc-value yellow">{Math.round(missRate * 100)}%</div>
          <div className="sc-ico">{I.trend}</div>
        </div>
      </div>

      <div className="chart-card" style={{ marginBottom:24 }}>
        <div className="chart-title">Compliance Rate Trend</div>
        <div className="chart-sub">Daily compliance % — higher means less revenue lost</div>
        <LineChart
          data={SHIFTS.map(s => ({ ...s, compliance: Math.round((s.compliant / s.triggered) * 100) }))}
          keys={['compliance']} colors={['#a855f7']} height={180}
        />
      </div>

      <div className="table-card">
        <div className="table-head"><span className="table-head-title">Rule Breakdown</span></div>
        <table>
          <thead>
            <tr><th>Rule</th><th>Value / Miss</th><th>Miss Rate</th><th>Monthly Loss Est.</th><th>Annual Loss Est.</th></tr>
          </thead>
          <tbody>
            {activeRules.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight:600, color:'var(--text)' }}>{r.name}</td>
                <td>${r.value}</td>
                <td><span className="badge bad">{Math.round(missRate * 100)}%</span></td>
                <td style={{ color:'var(--red)', fontWeight:700 }}>~${Math.round(missRate * 30 * r.value)}</td>
                <td style={{ color:'var(--red)' }}>~${Math.round(missRate * 365 * r.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Settings Page ─────────────────────────────────────────────
function Settings() {
  const { dark, toggle } = useTheme()
  const [hours, setHours] = useState({ open: '09:00', close: '18:00' })
  const [retention, setRetention] = useState('7')
  const [lang, setLang] = useState('en-es')
  const [notify, setNotify] = useState(true)
  const [redact, setRedact] = useState(true)

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-sub">Configure your Store Listen account and location</p>

      <div className="settings-grid">
        <div className="settings-section">
          <div className="ss-title">🏪 Location — La Vaquita</div>
          <div className="setting-row">
            <div><div className="sr-label">Store Opens</div><div className="sr-sub">Recording start time</div></div>
            <input className="sr-input" type="time" value={hours.open} onChange={e => setHours(h => ({ ...h, open: e.target.value }))} />
          </div>
          <div className="setting-row">
            <div><div className="sr-label">Store Closes</div><div className="sr-sub">Recording end time</div></div>
            <input className="sr-input" type="time" value={hours.close} onChange={e => setHours(h => ({ ...h, close: e.target.value }))} />
          </div>
          <div className="setting-row">
            <div><div className="sr-label">Language</div><div className="sr-sub">Transcription language</div></div>
            <select className="sr-input" value={lang} onChange={e => setLang(e.target.value)}>
              <option value="en-es">English + Spanish</option>
              <option value="en">English only</option>
              <option value="es">Spanish only</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <div className="ss-title">🔒 Privacy & Retention</div>
          <div className="setting-row">
            <div><div className="sr-label">Redaction Pipeline</div><div className="sr-sub">Strip names, phones, cards, emails</div></div>
            <label className="toggle">
              <input type="checkbox" checked={redact} onChange={e => setRedact(e.target.checked)} />
              <div className="toggle-track" />
              <div className="toggle-thumb" />
            </label>
          </div>
          <div className="setting-row">
            <div><div className="sr-label">Report Retention</div><div className="sr-sub">Days to keep reports</div></div>
            <select className="sr-input" value={retention} onChange={e => setRetention(e.target.value)}>
              <option value="7">7 days (Starter)</option>
              <option value="30">30 days</option>
              <option value="90">90 days (Growth)</option>
              <option value="365">1 year (Enterprise)</option>
            </select>
          </div>
          <div className="setting-row">
            <div><div className="sr-label">Raw Audio</div><div className="sr-sub">Purged after transcription</div></div>
            <span className="badge good">Auto-purge ON</span>
          </div>
        </div>

        <div className="settings-section">
          <div className="ss-title">🎨 Appearance</div>
          <div className="setting-row">
            <div><div className="sr-label">{dark ? 'Dark Mode' : 'Light Mode'}</div><div className="sr-sub">Toggle dashboard theme</div></div>
            <button className="btn-sm" onClick={toggle}>
              {dark ? I.sun : I.moon} {dark ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="ss-title">🔔 Notifications</div>
          <div className="setting-row">
            <div><div className="sr-label">Daily Report Email</div><div className="sr-sub">Sent after each shift closes</div></div>
            <label className="toggle">
              <input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} />
              <div className="toggle-track" />
              <div className="toggle-thumb" />
            </label>
          </div>
        </div>

        <div className="settings-section full">
          <div className="ss-title">💳 Plan — Starter</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {[
              { name:'Starter', price:'$49', desc:'Per-shift scoring, sentiment, standard rubric, EN+ES, 7-day history', active:true },
              { name:'Growth',  price:'$89', desc:'Everything in Starter + cross-location rollups, custom rubric, 90-day history', active:false },
              { name:'Enterprise', price:'Custom', desc:'Everything in Growth + SSO, custom retention, dedicated onboarding', active:false },
            ].map(p => (
              <div key={p.name} style={{
                padding:16, borderRadius:12,
                background: p.active ? 'rgba(168,85,247,.12)' : 'var(--surface)',
                border: `1px solid ${p.active ? 'var(--border2)' : 'var(--border)'}`,
              }}>
                <div style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginBottom:4 }}>{p.name}</div>
                <div style={{ fontSize:22, fontWeight:800, color:'var(--accent)', marginBottom:8 }}>{p.price}<span style={{ fontSize:13, color:'var(--text3)', fontWeight:400 }}>/mo</span></div>
                <div style={{ fontSize:12, color:'var(--text3)', lineHeight:1.6 }}>{p.desc}</div>
                {p.active && <div style={{ marginTop:10 }}><span className="badge active">Current plan</span></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sidebar + Topbar + Shell ───────────────────────────────────
const NAV = [
  { id:'overview',    label:'Overview',    icon:'home'     },
  { id:'shifts',      label:'Shift Reports', icon:'bar'    },
  { id:'compliance',  label:'Compliance',  icon:'check'    },
  { id:'revenue',     label:'Revenue',     icon:'dollar'   },
]

export default function Dashboard({ onLogout }) {
  const [page, setPage] = useState('overview')
  const { dark, toggle } = useTheme()

  const renderPage = () => {
    if (page === 'overview')   return <Overview />
    if (page === 'shifts')     return <Shifts />
    if (page === 'compliance') return <Compliance />
    if (page === 'revenue')    return <Revenue />
    if (page === 'settings')   return <Settings />
    return <Overview />
  }
  const current = NAV.find(n => n.id === page) || { label: 'Settings' }

  return (
    <div className="dash">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-ico">{I.mic}</div>
          <span className="sidebar-logo-text">Store<em>Listen</em></span>
        </div>

        <div className="sidebar-nav">
          <div className="nav-section">Main</div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-item${page === n.id ? ' active' : ''}`} onClick={() => setPage(n.id)}>
              {I[n.icon]}{n.label}
            </button>
          ))}
          <div className="nav-section" style={{ marginTop: 8 }}>Account</div>
          <button className={`nav-item${page === 'settings' ? ' active' : ''}`} onClick={() => setPage('settings')}>
            {I.settings} Settings
          </button>
        </div>

        <div className="sidebar-bottom">
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 4px' }}>
            <div className="avatar">O</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>Owner</div>
              <div style={{ fontSize:11, color:'var(--text3)' }}>La Vaquita</div>
            </div>
          </div>
          <button className="nav-item" onClick={onLogout}>{I.logout} Sign Out</button>
        </div>
      </nav>

      {/* Topbar */}
      <header className="topbar">
        <div>
          <div className="topbar-title">{current.label}</div>
          <div className="topbar-sub">Store Listen Dashboard · {new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</div>
        </div>
        <div className="topbar-actions">
          <button className="tb-btn" onClick={toggle} title="Toggle theme">{dark ? I.sun : I.moon}</button>
          <button className="tb-btn" title="Notifications">{I.bell}</button>
          <button className="tb-btn" title="Export">{I.download}</button>
          <div className="avatar" onClick={() => setPage('settings')}>O</div>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {renderPage()}
      </main>
    </div>
  )
}
