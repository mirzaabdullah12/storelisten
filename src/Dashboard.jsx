import { useState } from 'react'
import './dashboard.css'
import { SHIFTS, RULES, RUBRIC, PILOT } from './data.js'
import { useTheme } from './theme.jsx'

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
  zap:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  award:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  target:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
}

// ── Smooth catmull-rom → cubic bezier ─────────────────────────
function smoothPath(pts) {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i]
    const p2 = pts[i + 1], p3 = pts[i + 2] || p2
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6, cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6, cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
  }
  return d
}

// ── Bar Chart ──────────────────────────────────────────────────
function BarChart({ data, dataKey, height = 160 }) {
  const [hov, setHov] = useState(null)
  const max = Math.max(...data.map(d => d[dataKey]))
  return (
    <div style={{ position:'relative' }}>
      <svg width="100%" height={height} style={{ overflow:'visible' }}>
        <defs>
          {data.map((_, i) => (
            <linearGradient key={i} id={`bg${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="var(--chart1)" stopOpacity={hov===i?1:.8} />
              <stop offset="100%" stopColor="var(--chart3)" stopOpacity={hov===i?.5:.15} />
            </linearGradient>
          ))}
        </defs>
        {data.map((d, i) => {
          const barH = (d[dataKey]/max)*(height-36)
          const xPct = (i/data.length)*100, wPct = (1/data.length)*100-1.5
          return (
            <g key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}}>
              <rect x={`${xPct}%`} y={height-36-barH} width={`${wPct}%`} height={barH}
                rx="5" fill={`url(#bg${i})`}
                style={{transition:'all .15s', filter:hov===i?'brightness(1.15) drop-shadow(0 2px 6px var(--accentGlow))':'none'}}
              />
              <text x={`${xPct+wPct/2}%`} y={height-10} textAnchor="middle"
                fontSize="10" fill={hov===i?'var(--text)':'var(--text3)'}
                style={{transition:'fill .15s'}}>{d.date}</text>
              {hov===i && <text x={`${xPct+wPct/2}%`} y={height-36-barH-8} textAnchor="middle"
                fontSize="11" fontWeight="700" fill="var(--accent)">{d[dataKey]}</text>}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── Line Chart ─────────────────────────────────────────────────
function LineChart({ data, keys=[], colors=[], labels=[], height=160 }) {
  const [tip, setTip] = useState(null)
  const allVals = data.flatMap(d=>keys.map(k=>d[k]))
  const max = Math.max(...allVals), min = Math.min(...allVals)
  const range = max-min||1, W=400, H=height-36
  const gpt = (d,i,k) => [(i/(data.length-1))*W, H-((d[k]-min)/range)*H]
  const hover = i => setTip({ i, x:(i/(data.length-1))*W, date:data[i].date,
    items:keys.map((k,ki)=>({label:labels[ki]||k,value:data[i][k],color:colors[ki]})) })
  return (
    <div style={{position:'relative'}}>
      <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height} style={{overflow:'visible'}}>
        <defs>
          {keys.map((_k,ki)=>(
            <linearGradient key={ki} id={`lg${ki}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={colors[ki]} stopOpacity=".22"/>
              <stop offset="100%" stopColor={colors[ki]} stopOpacity="0"/>
            </linearGradient>
          ))}
        </defs>
        {keys.map((k,ki)=>{
          const pts=data.map((d,i)=>gpt(d,i,k))
          const lp=smoothPath(pts), ap=lp+` L${W},${H} L0,${H} Z`
          return (
            <g key={ki}>
              <path d={ap} fill={`url(#lg${ki})`}/>
              <path d={lp} fill="none" stroke={colors[ki]} strokeWidth="2.5" strokeLinecap="round"/>
              {pts.map((p,i)=>(
                <g key={i}>
                  {tip?.i===i && <circle cx={p[0]} cy={p[1]} r="6" fill="none" stroke={colors[ki]} strokeWidth="1.5" opacity=".3">
                    <animate attributeName="r" from="6" to="14" dur="1.2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from=".35" to="0" dur="1.2s" repeatCount="indefinite"/>
                  </circle>}
                  <circle cx={p[0]} cy={p[1]} r={tip?.i===i?5.5:3.5} fill={colors[ki]}
                    stroke={tip?.i===i?'#fff':'rgba(0,0,0,.2)'} strokeWidth={tip?.i===i?2:1.5}
                    style={{transition:'r .12s'}}/>
                </g>
              ))}
            </g>
          )
        })}
        {data.map((_d,i)=>{
          const x=(i/(data.length-1))*W
          return <rect key={i} x={i===0?0:x-W/(data.length-1)/2} y={0}
            width={W/(data.length-1)} height={H+20} fill="transparent"
            style={{cursor:'crosshair'}}
            onMouseEnter={()=>hover(i)} onMouseLeave={()=>setTip(null)}/>
        })}
        {tip && <line x1={tip.x} y1={0} x2={tip.x} y2={H} stroke="var(--border2)" strokeWidth="1.5" strokeDasharray="4 3"/>}
        {data.map((d,i)=>(
          <text key={i} x={(i/(data.length-1))*W} y={height-4} textAnchor="middle"
            fontSize="10" fill={tip?.i===i?'var(--text)':'var(--text3)'}
            style={{transition:'fill .1s'}}>{d.date}</text>
        ))}
      </svg>
      {tip && (
        <div className="chart-tooltip" style={{left:`${(tip.x/W)*100}%`}}>
          <div className="ct-date">{tip.date}</div>
          {tip.items.map((it,i)=>(
            <div key={i} className="ct-row">
              <span className="ct-dot" style={{background:it.color}}/>
              <span className="ct-label">{it.label}</span>
              <span className="ct-val">{it.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Donut Chart ────────────────────────────────────────────────
function DonutChart({ value, max=100, color='var(--chart1)', size=120 }) {
  const r=44, cx=60, cy=60, circ=2*Math.PI*r, dash=(value/max)*circ
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <filter id="dg" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg3)" strokeWidth="12"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="12"
        strokeLinecap="round" filter="url(#dg)" strokeDashoffset={circ/4}
        strokeDasharray={`0 ${circ}`}>
        <animate attributeName="stroke-dasharray" from={`0 ${circ}`} to={`${dash} ${circ}`}
          dur="1.2s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
      </circle>
      <text x={cx} y={cy+7}  textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--text)">{value}</text>
      <text x={cx} y={cy+22} textAnchor="middle" fontSize="10" fill="var(--text3)">/100</text>
    </svg>
  )
}

// ── Overview ───────────────────────────────────────────────────
function Overview() {
  const totalCustomers = SHIFTS.reduce((s,x)=>s+x.customers,0)
  const avgScore       = Math.round(SHIFTS.reduce((s,x)=>s+x.score,0)/SHIFTS.length)
  const avgSentiment   = Math.round(SHIFTS.reduce((s,x)=>s+x.sentiment,0)/SHIFTS.length)
  const avgCompliance  = Math.round(SHIFTS.reduce((s,x)=>s+(x.compliant/x.triggered)*100,0)/SHIFTS.length)
  const monthlyOpp     = RULES.filter(r=>r.active).reduce((s,r)=>s+(1-avgCompliance/100)*30*r.value,0)
  const totalConvos    = SHIFTS.reduce((s,x)=>s+x.conversations,0)
  const barColor       = v=>v>=85?'#059669':v>=70?'#d97706':'#e11d48'
  const bestDay        = SHIFTS.reduce((a,b)=>a.score>b.score?a:b)
  const worstDay       = SHIFTS.reduce((a,b)=>a.score<b.score?a:b)

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Overview</h1>
          <p className="page-sub">La Vaquita · Week of Aug 1–7, 2026 · 7 shifts processed</p>
        </div>
        <button className="btn-sm">{I.download} Export Week</button>
      </div>

      {/* Quick insights strip */}
      <div className="insight-strip">
        <div className="insight-item">
          <div className="insight-ico g">🏆</div>
          <span>Best day: <span className="insight-val">{bestDay.date}</span> ({bestDay.score} pts)</span>
        </div>
        <div className="insight-sep"/>
        <div className="insight-item">
          <div className="insight-ico a">⚠️</div>
          <span>Needs attention: <span className="insight-val">{worstDay.date}</span> ({worstDay.score} pts)</span>
        </div>
        <div className="insight-sep"/>
        <div className="insight-item">
          <div className="insight-ico b">💬</div>
          <span>Total conversations: <span className="insight-val">{totalConvos}</span></span>
        </div>
        <div className="insight-sep"/>
        <div className="insight-item">
          <div className="insight-ico r">📉</div>
          <span>Revenue at risk: <span className="insight-val">~${Math.round(monthlyOpp)}/mo</span></span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        <div className="stat-card c-green">
          <div className="sc-label">Avg Shift Score</div>
          <div className="sc-value accent">{avgScore}</div>
          <div className="sc-change up">↑ 6pts vs last week</div>
          <div className="sc-ico">{I.award}</div>
        </div>
        <div className="stat-card c-blue">
          <div className="sc-label">Total Customers</div>
          <div className="sc-value c-blue">{totalCustomers}</div>
          <div className="sc-change up">↑ 12% vs last week</div>
          <div className="sc-ico">{I.users}</div>
        </div>
        <div className="stat-card c-cyan">
          <div className="sc-label">Avg Sentiment</div>
          <div className="sc-value c-cyan">{avgSentiment}%</div>
          <div className="sc-change up">↑ 5pts since coaching</div>
          <div className="sc-ico">{I.activity}</div>
        </div>
        <div className="stat-card c-emerald">
          <div className="sc-label">Avg Compliance</div>
          <div className="sc-value c-emerald">{avgCompliance}%</div>
          <div className="sc-change up">↑ 8pts since coaching</div>
          <div className="sc-ico">{I.check}</div>
        </div>
      </div>

      {/* Weekly summary */}
      <div className="summary-card">
        <div className="summary-section">
          <div className="sum-label">Total Revenue at Risk</div>
          <div className="sum-val" style={{color:'#e11d48'}}>~${Math.round(monthlyOpp)}</div>
          <div className="sum-sub">This month estimate</div>
        </div>
        <div className="summary-section">
          <div className="sum-label">Compliance Miss Rate</div>
          <div className="sum-val" style={{color:'#d97706'}}>{100-avgCompliance}%</div>
          <div className="sum-trend down">↓ 8pts improvement target</div>
        </div>
        <div className="summary-section">
          <div className="sum-label">Active Rules</div>
          <div className="sum-val" style={{color:'#059669'}}>{RULES.filter(r=>r.active).length}</div>
          <div className="sum-sub">of {RULES.length} configured</div>
        </div>
        <div className="summary-section">
          <div className="sum-label">Conversations Tracked</div>
          <div className="sum-val">{totalConvos}</div>
          <div className="sum-trend up">↑ 14% this week</div>
        </div>
        <div className="summary-section">
          <div className="sum-label">Pilot Status</div>
          <div className="sum-val" style={{color:'#059669',fontSize:14,fontWeight:700,marginTop:4}}>● Phase 5 Active</div>
          <div className="sum-sub">{PILOT.startDate} → {PILOT.endDate}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Score &amp; Sentiment Trend</div>
              <div className="chart-sub">Daily performance over last 7 shifts — hover to inspect</div>
            </div>
            <span className="chart-badge">↑ Trending up</span>
          </div>
          <div style={{display:'flex',gap:16,marginBottom:12}}>
            {[['var(--chart1)','Quality Score'],['var(--chart2)','Sentiment']].map(([col,lbl])=>(
              <div key={lbl} style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--text3)'}}>
                <span style={{width:10,height:10,borderRadius:'50%',background:col,display:'inline-block'}}/>{lbl}
              </div>
            ))}
          </div>
          <LineChart data={SHIFTS} keys={['score','sentiment']} colors={['var(--chart1)','var(--chart2)']} labels={['Score','Sentiment']} height={180}/>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Quality Score</div>
              <div className="chart-sub">Rubric breakdown</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,padding:'4px 0'}}>
            <DonutChart value={avgScore} color="var(--chart1)" size={120}/>
            <div style={{width:'100%'}}>
              {RUBRIC.map(r=>(
                <div key={r.name} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--text2)',marginBottom:4}}>
                    <span>{r.name}</span>
                    <span style={{color:barColor(r.avg),fontWeight:700}}>{r.avg}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill-bar" style={{width:`${r.avg}%`,background:barColor(r.avg)}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="chart-card" style={{marginBottom:24}}>
        <div className="chart-header">
          <div>
            <div className="chart-title">Daily Customer Volume</div>
            <div className="chart-sub">Conversations detected per shift — hover a bar</div>
          </div>
          <span className="chart-badge">Avg {Math.round(totalCustomers/SHIFTS.length)}/day</span>
        </div>
        <BarChart data={SHIFTS} dataKey="customers" height={160}/>
      </div>

      {/* Pilot */}
      <div className="pilot-card">
        <div className="pilot-top">
          <div>
            <div className="pilot-title">📍 {PILOT.location} — {PILOT.phase}</div>
            <div style={{fontSize:12,color:'var(--text3)',marginTop:4}}>{PILOT.startDate} → {PILOT.endDate}</div>
          </div>
          <span className="badge active">● Active</span>
        </div>
        <div className="pilot-steps">
          {[
            {label:'Hardware confirmed',    icon:'🖥️',state:'done'},
            {label:'Legal basis confirmed', icon:'⚖️',state:'done'},
            {label:'Rules configured',      icon:'⚙️',state:'done'},
            {label:'Baseline running',      icon:'🎙️',state:'done'},
            {label:'Report delivered',      icon:'📊',state:'active'},
            {label:'Staff coached',         icon:'👥',state:''},
            {label:'Follow-up period',      icon:'🔄',state:''},
            {label:'Proof point',           icon:'🏆',state:''},
          ].map((s,i)=>(
            <div key={i} className={`ps ${s.state}`}>
              <div className="ps-icon">{s.icon}</div>
              <div className="ps-num">{s.state==='done'?'✓ Done':s.state==='active'?'● Active':`Step ${i+1}`}</div>
              <div className="ps-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Shifts ──────────────────────────────────────────────────────
function Shifts() {
  const scoreBadge = s=>s>=85?'good':s>=70?'mid':'bad'
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Shift Reports</h1>
          <p className="page-sub">Per-shift performance — quality score, sentiment, compliance</p>
        </div>
        <button className="btn-ghost">{I.download} Export CSV</button>
      </div>
      <div className="table-card">
        <div className="table-head">
          <span className="table-head-title">All Shifts — Aug 1–7, 2026</span>
        </div>
        <table>
          <thead>
            <tr><th>Date</th><th>Quality Score</th><th>Sentiment</th><th>Customers</th><th>Conversations</th><th>Compliance</th><th>Status</th></tr>
          </thead>
          <tbody>
            {SHIFTS.map(s=>{
              const comp=Math.round((s.compliant/s.triggered)*100)
              return (
                <tr key={s.id}>
                  <td style={{fontWeight:600,color:'var(--text)'}}>{s.date}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontWeight:700,color:'var(--accent)',minWidth:28}}>{s.score}</span>
                      <div style={{flex:1,maxWidth:80,height:4,background:'var(--bg3)',borderRadius:2}}>
                        <div style={{width:`${s.score}%`,height:'100%',background:'linear-gradient(90deg,var(--chart1),var(--chart2))',borderRadius:2}}/>
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

// ── Compliance ──────────────────────────────────────────────────
function Compliance() {
  const [rules,setRules] = useState(RULES)
  const toggle = id=>setRules(rs=>rs.map(r=>r.id===id?{...r,active:!r.active}:r))
  const avgC = Math.round(SHIFTS.reduce((s,x)=>s+(x.compliant/x.triggered)*100,0)/SHIFTS.length)
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Compliance Rules</h1>
          <p className="page-sub">Owner-defined rules — trigger → expected action → revenue impact</p>
        </div>
        <button className="btn-sm">{I.plus} Add Rule</button>
      </div>
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3,1fr)',marginBottom:24}}>
        <div className="stat-card c-green">
          <div className="sc-label">Active Rules</div>
          <div className="sc-value accent">{rules.filter(r=>r.active).length}</div>
          <div className="sc-ico">{I.check}</div>
        </div>
        <div className="stat-card c-cyan">
          <div className="sc-label">Avg Compliance</div>
          <div className="sc-value c-cyan">{avgC}%</div>
          <div className="sc-ico">{I.target}</div>
        </div>
        <div className="stat-card c-rose">
          <div className="sc-label">Miss Rate</div>
          <div className="sc-value c-rose">{100-avgC}%</div>
          <div className="sc-ico">{I.zap}</div>
        </div>
      </div>
      <div className="rules-grid">
        {rules.map(r=>{
          const missRate=1-avgC/100, loss=Math.round(missRate*30*r.value)
          return (
            <div className="rule-card" key={r.id}>
              <div>
                <div className="rule-name">{r.name}</div>
                <div className="rule-detail">🎯 Trigger: {r.trigger}</div>
                <div className="rule-detail">✅ Expected: {r.action}</div>
                <div className="rule-stats">
                  <div className="rs-item"><div className="rs-val">{avgC}%</div><div className="rs-lbl">Compliance</div></div>
                  {r.value>0&&<div className="rs-item"><div className="rs-val" style={{color:'#e11d48'}}>~${loss}</div><div className="rs-lbl">Monthly loss</div></div>}
                  <div className="rs-item"><div className="rs-val" style={{fontSize:14,color:'var(--text2)'}}>{r.window}</div><div className="rs-lbl">Window</div></div>
                </div>
                <div className="progress-wrap" style={{marginTop:12}}>
                  <div className="progress-track"><div className="progress-fill-bar" style={{width:`${avgC}%`}}/></div>
                </div>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={r.active} onChange={()=>toggle(r.id)}/>
                <div className="toggle-track"/><div className="toggle-thumb"/>
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Revenue ─────────────────────────────────────────────────────
function Revenue() {
  const avgC=Math.round(SHIFTS.reduce((s,x)=>s+(x.compliant/x.triggered)*100,0)/SHIFTS.length)
  const miss=1-avgC/100
  const activeRules=RULES.filter(r=>r.active&&r.value>0)
  const monthly=Math.round(activeRules.reduce((s,r)=>s+miss*30*r.value,0))
  const annual=monthly*12
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Revenue Opportunity</h1>
          <p className="page-sub">Estimated revenue left on the table from compliance misses</p>
        </div>
      </div>
      <div className="rev-hero">
        <div style={{fontSize:12,color:'var(--text3)',marginBottom:8,textTransform:'uppercase',letterSpacing:'.5px'}}>Monthly opportunity</div>
        <div className="rev-amount">~${monthly.toLocaleString()}</div>
        <div className="rev-label">left on the table each month</div>
        <div className="rev-sub">Based on {Math.round(miss*100)}% miss rate × owner-supplied values</div>
      </div>
      <div className="stats-grid" style={{marginBottom:24}}>
        <div className="stat-card c-rose"><div className="sc-label">Daily Loss</div><div className="sc-value c-rose">~${Math.round(monthly/30)}</div><div className="sc-ico">{I.dollar}</div></div>
        <div className="stat-card c-rose"><div className="sc-label">Monthly Loss</div><div className="sc-value c-rose">~${monthly.toLocaleString()}</div><div className="sc-ico">{I.dollar}</div></div>
        <div className="stat-card c-rose"><div className="sc-label">Annual Loss</div><div className="sc-value c-rose">~${annual.toLocaleString()}</div><div className="sc-ico">{I.dollar}</div></div>
        <div className="stat-card c-amber"><div className="sc-label">Miss Rate</div><div className="sc-value c-amber">{Math.round(miss*100)}%</div><div className="sc-ico">{I.trend}</div></div>
      </div>
      <div className="chart-card" style={{marginBottom:24}}>
        <div className="chart-header"><div><div className="chart-title">Compliance Rate Trend</div><div className="chart-sub">Higher = less revenue lost</div></div></div>
        <LineChart data={SHIFTS.map(s=>({...s,compliance:Math.round((s.compliant/s.triggered)*100)}))} keys={['compliance']} colors={['var(--chart1)']} labels={['Compliance %']} height={180}/>
      </div>
      <div className="table-card">
        <div className="table-head"><span className="table-head-title">Rule Breakdown</span></div>
        <table>
          <thead><tr><th>Rule</th><th>Value / Miss</th><th>Miss Rate</th><th>Monthly Loss</th><th>Annual Loss</th></tr></thead>
          <tbody>
            {activeRules.map(r=>(
              <tr key={r.id}>
                <td style={{fontWeight:600,color:'var(--text)'}}>{r.name}</td>
                <td>${r.value}</td>
                <td><span className="badge bad">{Math.round(miss*100)}%</span></td>
                <td style={{color:'#e11d48',fontWeight:700}}>~${Math.round(miss*30*r.value)}</td>
                <td style={{color:'#e11d48'}}>~${Math.round(miss*365*r.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Settings ─────────────────────────────────────────────────────
function Settings() {
  const {dark,toggle}=useTheme()
  const [hours,setHours]=useState({open:'09:00',close:'18:00'})
  const [retention,setRetention]=useState('7')
  const [lang,setLang]=useState('en-es')
  const [notify,setNotify]=useState(true)
  const [redact,setRedact]=useState(true)
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Settings</h1>
          <p className="page-sub">Configure your Store Listen account and location</p>
        </div>
      </div>
      <div className="settings-grid">
        <div className="settings-section">
          <div className="ss-title">🏪 Location — La Vaquita</div>
          <div className="setting-row"><div><div className="sr-label">Store Opens</div><div className="sr-sub">Recording start time</div></div><input className="sr-input" type="time" value={hours.open} onChange={e=>setHours(h=>({...h,open:e.target.value}))}/></div>
          <div className="setting-row"><div><div className="sr-label">Store Closes</div><div className="sr-sub">Recording end time</div></div><input className="sr-input" type="time" value={hours.close} onChange={e=>setHours(h=>({...h,close:e.target.value}))}/></div>
          <div className="setting-row"><div><div className="sr-label">Language</div><div className="sr-sub">Transcription language</div></div><select className="sr-input" value={lang} onChange={e=>setLang(e.target.value)}><option value="en-es">English + Spanish</option><option value="en">English only</option><option value="es">Spanish only</option></select></div>
        </div>
        <div className="settings-section">
          <div className="ss-title">🔒 Privacy &amp; Retention</div>
          <div className="setting-row"><div><div className="sr-label">Redaction Pipeline</div><div className="sr-sub">Strip names, phones, cards, emails</div></div><label className="toggle"><input type="checkbox" checked={redact} onChange={e=>setRedact(e.target.checked)}/><div className="toggle-track"/><div className="toggle-thumb"/></label></div>
          <div className="setting-row"><div><div className="sr-label">Report Retention</div><div className="sr-sub">Days to keep reports</div></div><select className="sr-input" value={retention} onChange={e=>setRetention(e.target.value)}><option value="7">7 days (Starter)</option><option value="30">30 days</option><option value="90">90 days (Growth)</option><option value="365">1 year (Enterprise)</option></select></div>
          <div className="setting-row"><div><div className="sr-label">Raw Audio</div><div className="sr-sub">Purged after transcription</div></div><span className="badge active">Auto-purge ON</span></div>
        </div>
        <div className="settings-section">
          <div className="ss-title">🎨 Appearance</div>
          <div className="setting-row"><div><div className="sr-label">{dark?'Dark':'Light'} Mode</div><div className="sr-sub">Toggle dashboard theme</div></div><button className="btn-sm" onClick={toggle}>{dark?I.sun:I.moon} {dark?'Light':'Dark'}</button></div>
        </div>
        <div className="settings-section">
          <div className="ss-title">🔔 Notifications</div>
          <div className="setting-row"><div><div className="sr-label">Daily Report Email</div><div className="sr-sub">Sent after each shift closes</div></div><label className="toggle"><input type="checkbox" checked={notify} onChange={e=>setNotify(e.target.checked)}/><div className="toggle-track"/><div className="toggle-thumb"/></label></div>
        </div>
        <div className="settings-section full">
          <div className="ss-title">💳 Plan — Starter</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {[{name:'Starter',price:'$49',desc:'Per-shift scoring, sentiment, standard rubric, EN+ES, 7-day history',active:true},{name:'Growth',price:'$89',desc:'Everything in Starter + cross-location rollups, custom rubric, 90-day history',active:false},{name:'Enterprise',price:'Custom',desc:'Everything in Growth + SSO, custom retention, dedicated onboarding',active:false}].map(p=>(
              <div key={p.name} style={{padding:16,borderRadius:12,background:p.active?'rgba(5,150,105,.07)':'var(--bg2)',border:`1.5px solid ${p.active?'var(--accent)':'var(--border)'}`}}>
                <div style={{fontSize:14,fontWeight:700,color:'var(--text)',marginBottom:4}}>{p.name}</div>
                <div style={{fontSize:22,fontWeight:800,color:'var(--accent)',marginBottom:8}}>{p.price}<span style={{fontSize:12,color:'var(--text3)',fontWeight:400}}>/mo</span></div>
                <div style={{fontSize:12,color:'var(--text3)',lineHeight:1.6}}>{p.desc}</div>
                {p.active&&<div style={{marginTop:10}}><span className="badge active">Current plan</span></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Shell ───────────────────────────────────────────────────────
const NAV = [
  {id:'overview',   label:'Overview',      icon:'home'},
  {id:'shifts',     label:'Shift Reports', icon:'bar'},
  {id:'compliance', label:'Compliance',    icon:'check'},
  {id:'revenue',    label:'Revenue',       icon:'dollar'},
]

export default function Dashboard({onLogout}) {
  const [page,setPage]=useState('overview')
  const {dark,toggle}=useTheme()
  const render=()=>{
    if(page==='overview')   return <Overview/>
    if(page==='shifts')     return <Shifts/>
    if(page==='compliance') return <Compliance/>
    if(page==='revenue')    return <Revenue/>
    if(page==='settings')   return <Settings/>
    return <Overview/>
  }
  const current=NAV.find(n=>n.id===page)||{label:'Settings'}
  return (
    <div className="dash">
      <nav className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-ico">{I.mic}</div>
          <span className="sidebar-logo-text">Store<em>Listen</em></span>
        </div>
        <div className="sidebar-status">
          <span className="sidebar-status-dot"/>
          Live · La Vaquita
        </div>
        <div className="sidebar-nav">
          <div className="nav-section">Main</div>
          {NAV.map(n=>(
            <button key={n.id} className={`nav-item${page===n.id?' active':''}`} onClick={()=>setPage(n.id)}>
              {I[n.icon]}{n.label}
            </button>
          ))}
          <div className="nav-section" style={{marginTop:8}}>Account</div>
          <button className={`nav-item${page==='settings'?' active':''}`} onClick={()=>setPage('settings')}>
            {I.settings} Settings
          </button>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="avatar" style={{width:32,height:32,fontSize:11}}>O</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Owner</div>
              <div className="sidebar-user-loc">La Vaquita</div>
            </div>
          </div>
          <button className="nav-item" onClick={onLogout}>{I.logout} Sign Out</button>
        </div>
      </nav>

      <header className="topbar">
        <div className="topbar-left">
          <div className="topbar-title">{current.label}</div>
          <div className="topbar-sub">Store Listen · {new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</div>
        </div>
        <div className="topbar-actions">
          <button className="tb-btn" onClick={toggle} title="Toggle theme">{dark?I.sun:I.moon}</button>
          <button className="tb-btn" title="Notifications">{I.bell}</button>
          <button className="tb-btn" title="Export">{I.download}</button>
          <div className="avatar" onClick={()=>setPage('settings')}>O</div>
        </div>
      </header>

      <main className="main">{render()}</main>
    </div>
  )
}
