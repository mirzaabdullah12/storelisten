import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './Dashboard.jsx'
import { ThemeProvider } from './theme.jsx'
import {
  auth, loginEmail, signupEmail,
  loginGoogle, loginMicrosoft, logout, onAuth
} from './firebase.js'

// ── Icons ─────────────────────────────────────────────────────
const MicIco = () => (<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' width='20' height='20'><path d='M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4z'/><path d='M19 10v2a7 7 0 0 1-14 0v-2'/><line x1='12' y1='19' x2='12' y2='23'/><line x1='8' y1='23' x2='16' y2='23'/></svg>)
const MailIco = () => (<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' width='15' height='15'><rect x='2' y='4' width='20' height='16' rx='3'/><path d='m2 7 10 7 10-7'/></svg>)
const LockIco = () => (<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' width='15' height='15'><rect x='3' y='11' width='18' height='11' rx='2'/><path d='M7 11V7a5 5 0 0 1 10 0v4'/></svg>)
const UserIco = () => (<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' width='15' height='15'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>)
const EyeIco = () => (<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' width='15' height='15'><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/><circle cx='12' cy='12' r='3'/></svg>)
const EyeOffIco = () => (<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' width='15' height='15'><path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94'/><path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19'/><line x1='1' y1='1' x2='23' y2='23'/></svg>)
const AlertIco = () => (<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' width='14' height='14'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='12'/><line x1='12' y1='16' x2='12.01' y2='16'/></svg>)
const ArrowIco = () => (<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' width='15' height='15'><line x1='5' y1='12' x2='19' y2='12'/><polyline points='12 5 19 12 12 19'/></svg>)
const GoogleIco = () => (<svg width='16' height='16' viewBox='0 0 24 24'><path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' fill='#4285F4'/><path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='#34A853'/><path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' fill='#FBBC05'/><path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='#EA4335'/></svg>)
const MsIco = () => (<svg width='16' height='16' viewBox='0 0 24 24'><rect x='1' y='1' width='10.5' height='10.5' fill='#F25022'/><rect x='12.5' y='1' width='10.5' height='10.5' fill='#7FBA00'/><rect x='1' y='12.5' width='10.5' height='10.5' fill='#00A4EF'/><rect x='12.5' y='12.5' width='10.5' height='10.5' fill='#FFB900'/></svg>)

// ── Field component ───────────────────────────────────────────
function Field({ label, id, type='text', ph, val, set, ico, right }) {
  return (
    <div className='field'>
      <label htmlFor={id}>{label}</label>
      <div className='wrap'>
        <span className='ico'>{ico}</span>
        <input id={id} type={type} placeholder={ph} value={val}
          onChange={e => set(e.target.value)} autoComplete='off' />
        {right}
      </div>
    </div>
  )
}

// ── Login Form ────────────────────────────────────────────────
function LoginForm({ onSuccess }) {
  const [email,   setEmail]   = useState('')
  const [pw,      setPw]      = useState('')
  const [show,    setShow]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')

  const handleErr = (e) => {
    const msg = e?.code
    if (msg === 'auth/user-not-found' || msg === 'auth/wrong-password' || msg === 'auth/invalid-credential')
      setErr('Wrong email or password.')
    else if (msg === 'auth/invalid-email')
      setErr('Enter a valid email address.')
    else if (msg === 'auth/too-many-requests')
      setErr('Too many attempts. Try again later.')
    else if (msg === 'auth/network-request-failed')
      setErr('Network error. Check your connection.')
    else if (msg === 'auth/api-key-not-valid')
      setErr('Firebase not configured yet. See .env.local file.')
    else setErr(e?.message || 'Something went wrong.')
  }

  const submit = async (e) => {
    e.preventDefault(); setErr('')
    if (!email || !pw) { setErr('Please fill in all fields.'); return }
    setLoading(true)
    try {
      await loginEmail(email, pw)
      onSuccess()
    } catch (e) { handleErr(e) }
    finally { setLoading(false) }
  }

  const withGoogle = async () => {
    setErr(''); setLoading(true)
    try { await loginGoogle(); onSuccess() }
    catch (e) { handleErr(e) }
    finally { setLoading(false) }
  }

  const withMicrosoft = async () => {
    setErr(''); setLoading(true)
    try { await loginMicrosoft(); onSuccess() }
    catch (e) { handleErr(e) }
    finally { setLoading(false) }
  }

  return (
    <form className='form' onSubmit={submit} noValidate>
      <Field label='Email address' id='le' type='email' ph='you@example.com'
        val={email} set={v => { setEmail(v); setErr('') }} ico={<MailIco />} />
      <Field label='Password' id='lp' type={show ? 'text' : 'password'} ph='Enter your password'
        val={pw} set={v => { setPw(v); setErr('') }} ico={<LockIco />}
        right={<button type='button' className='eye' onClick={() => setShow(s => !s)}>{show ? <EyeOffIco /> : <EyeIco />}</button>} />
      <div className='meta'>
        <label className='chk'>
          <input type='checkbox' /><span className='box'>
            <svg viewBox='0 0 10 8' width='10' height='8'><polyline points='1 4 3.5 6.5 9 1' stroke='#000' strokeWidth='2' fill='none' strokeLinecap='round'/></svg>
          </span>Remember me
        </label>
        <a href='#' className='fgt'>Forgot password?</a>
      </div>
      {err && <div className='err'><AlertIco /> {err}</div>}
      <button className='btn' disabled={loading}>
        {loading ? <><span className='spin' />Signing in...</> : <>Sign In <ArrowIco /></>}
      </button>
      <div className='div'>or continue with</div>
      <div className='soc'>
        <button type='button' className='sb' onClick={withGoogle} disabled={loading}>
          <GoogleIco /> Google
        </button>
        <button type='button' className='sb' onClick={withMicrosoft} disabled={loading}>
          <MsIco /> Microsoft
        </button>
      </div>
    </form>
  )
}

// ── Signup Form ───────────────────────────────────────────────
function SignupForm({ onSuccess }) {
  const [first,   setFirst]   = useState('')
  const [last,    setLast]    = useState('')
  const [email,   setEmail]   = useState('')
  const [pw,      setPw]      = useState('')
  const [show,    setShow]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')
  const [done,    setDone]    = useState(false)

  const handleErr = (e) => {
    const msg = e?.code
    if (msg === 'auth/email-already-in-use')
      setErr('This email is already registered. Sign in instead.')
    else if (msg === 'auth/invalid-email')
      setErr('Enter a valid email address.')
    else if (msg === 'auth/weak-password')
      setErr('Password must be at least 6 characters.')
    else if (msg === 'auth/network-request-failed')
      setErr('Network error. Check your connection.')
    else if (msg === 'auth/api-key-not-valid')
      setErr('Firebase not configured yet. See .env.local file.')
    else setErr(e?.message || 'Something went wrong.')
  }

  const submit = async (e) => {
    e.preventDefault(); setErr('')
    if (!first || !email || !pw) { setErr('Please fill required fields.'); return }
    if (pw.length < 6) { setErr('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      await signupEmail(email, pw)
      // Sign out immediately — user must sign in manually
      await logout()
      setDone(true)
    } catch (e) { handleErr(e) }
    finally { setLoading(false) }
  }

  const withGoogle = async () => {
    setErr(''); setLoading(true)
    try { await loginGoogle(); onSuccess() }
    catch (e) { handleErr(e) }
    finally { setLoading(false) }
  }

  const withMicrosoft = async () => {
    setErr(''); setLoading(true)
    try { await loginMicrosoft(); onSuccess() }
    catch (e) { handleErr(e) }
    finally { setLoading(false) }
  }

  if (done) return (
    <div style={{ textAlign:'center', padding:'12px 0' }}>
      <div style={{ width:60, height:60, borderRadius:'50%', background:'linear-gradient(135deg,#10b981,#059669)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px', boxShadow:'0 0 30px rgba(16,185,129,.4)' }}>
        <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='#fff' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><polyline points='20 6 9 17 4 12'/></svg>
      </div>
      <h3 style={{ fontSize:20, fontWeight:700, color:'#0f2420', marginBottom:8, letterSpacing:'-.3px' }}>Account created!</h3>
      <p style={{ fontSize:13.5, color:'rgba(15,36,32,.55)', lineHeight:1.6, marginBottom:24 }}>
        Your account is ready.<br/>Sign in with your email and password to continue.
      </p>
      <button className='btn' onClick={onSuccess} style={{ maxWidth:200, margin:'0 auto' }}>
        Go to Sign In <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><line x1='5' y1='12' x2='19' y2='12'/><polyline points='12 5 19 12 12 19'/></svg>
      </button>
    </div>
  )

  return (
    <form className='form' onSubmit={submit} noValidate>
      <div className='frow'>
        <Field label='First name *' id='sf' ph='John' val={first} set={v => { setFirst(v); setErr('') }} ico={<UserIco />} />
        <Field label='Last name' id='sl' ph='Doe' val={last} set={setLast} ico={<UserIco />} />
      </div>
      <Field label='Email address *' id='se' type='email' ph='you@example.com'
        val={email} set={v => { setEmail(v); setErr('') }} ico={<MailIco />} />
      <Field label='Password *' id='sp' type={show ? 'text' : 'password'} ph='Min. 6 characters'
        val={pw} set={v => { setPw(v); setErr('') }} ico={<LockIco />}
        right={<button type='button' className='eye' onClick={() => setShow(s => !s)}>{show ? <EyeOffIco /> : <EyeIco />}</button>} />
      {err && <div className='err'><AlertIco /> {err}</div>}
      <button className='btn' disabled={loading}>
        {loading ? <><span className='spin' />Creating account...</> : <>Create Account <ArrowIco /></>}
      </button>
      <div className='div'>or sign up with</div>
      <div className='soc'>
        <button type='button' className='sb' onClick={withGoogle} disabled={loading}>
          <GoogleIco /> Google
        </button>
        <button type='button' className='sb' onClick={withMicrosoft} disabled={loading}>
          <MsIco /> Microsoft
        </button>
      </div>
      <p className='terms'>By signing up you agree to our <a href='#'>Terms</a> and <a href='#'>Privacy Policy</a>.</p>
    </form>
  )
}

// ── Root App ──────────────────────────────────────────────────
export default function App() {
  const [tab,       setTab]       = useState('login')
  const [user,      setUser]      = useState(null)
  const [checking,  setChecking]  = useState(true)

  // persist auth state across refreshes
  useEffect(() => {
    const unsub = onAuth(u => {
      setUser(u)
      setChecking(false)
    })
    return unsub
  }, [])

  if (checking) return (
    <div style={{ minHeight:'100vh', background:'#f0faf8', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:40, height:40, border:'3px solid rgba(16,185,129,.25)', borderTopColor:'#10b981', borderRadius:'50%', animation:'spin .7s linear infinite' }} />
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  )

  if (user) return (
    <ThemeProvider>
      <Dashboard onLogout={async () => { await logout(); setUser(null) }} user={user} />
    </ThemeProvider>
  )

  return (
    <div className='page'>
      {/* Background layers */}
      <div className='page-bg' aria-hidden='true' />
      <div className='grid-bg' aria-hidden='true' />
      <div className='blob blob-1' aria-hidden='true' />
      <div className='blob blob-2' aria-hidden='true' />
      <div className='blob blob-3' aria-hidden='true' />

      {/* Soundwave illustration behind hero */}
      <svg className='waveform' aria-hidden='true' viewBox='0 0 900 280' fill='none' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid meet'>
        {[
          [450,30],[430,60],[410,20],[390,80],[370,15],[350,100],[330,50],[310,120],[290,40],
          [270,140],[250,60],[230,160],[210,45],[190,130],[170,70],[150,110],[130,50],[110,90],
          [90,30],[70,60],[50,20],[470,50],[490,90],[510,35],[530,110],[550,55],[570,130],
          [590,40],[610,105],[630,25],[650,85],[670,45],[690,115],[710,60],[730,30],[750,90],
          [770,50],[790,70],[810,35],[830,55],[850,25],[860,65]
        ].map(([cx, halfH], i) => (
          <rect key={i}
            x={cx - 1.5} y={140 - halfH} width='3' height={halfH * 2}
            rx='2' fill='url(#wg)'
            opacity={0.4 + Math.sin(i * 0.5) * 0.35}
          />
        ))}
        <defs>
          <linearGradient id='wg' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%'  stopColor='#6C63FF' stopOpacity='1'/>
            <stop offset='100%' stopColor='#c678ff' stopOpacity='0.4'/>
          </linearGradient>
        </defs>
      </svg>

      {/* Floating particles */}
      <div className='particles' aria-hidden='true'>
        {[...Array(10)].map((_,i) => <div key={i} className='p' />)}
      </div>

      {/* LEFT — editorial copy */}
      <aside className='panel-left'>
        <div className='brand'>
          <div className='brand-ico'><MicIco /></div>
          <span className='brand-name'>Store<em>Listen</em></span>
        </div>
        <div className='pill-badge'><span className='pill-dot' />Live Pilot · La Vaquita</div>
        <h1 className='hero-title'>
          Every shift.<br />
          Every missed sale.<br />
          <span className='gr'>Measured.</span>
        </h1>
        <p className='hero-sub'>
          AI that listens at the counter, scores every conversation, and surfaces exactly what it costs when your team forgets.
        </p>
        <div className='stats'>
          <div className='stat'><div className='val'>~$600</div><div className='lbl'>avg monthly opportunity</div></div>
          <div className='stat'><div className='val'>92%</div><div className='lbl'>rubric accuracy</div></div>
          <div className='stat'><div className='val'>24h</div><div className='lbl'>to first insight</div></div>
        </div>
        <div className='features'>
          {[['🔒','Privacy-first redaction'],['🎙️','AI compliance scoring'],['💰','Revenue opportunity'],['📊','Per-shift reporting']]
            .map(([ico,lbl]) => <div key={lbl} className='feat'><span className='feat-ico'>{ico}</span>{lbl}</div>)}
        </div>
      </aside>

      {/* RIGHT — auth card */}
      <main className='panel-right'>
        <div className='card-wrap'>
          <div className='card'>
            <div className='card-head'>
              <div className='card-logo'>
                <div className='card-logo-ico'><MicIco /></div>
                <span className='card-logo-name'>Store<em>Listen</em></span>
              </div>
              <h2 className='card-title'>{tab === 'login' ? 'Welcome back' : 'Get started'}</h2>
              <p className='card-sub'>{tab === 'login' ? 'Sign in to access your dashboard.' : 'Create your account — free to start.'}</p>
            </div>
            <div className='tabs'>
              <button className={'tab' + (tab === 'login' ? ' on' : '')} onClick={() => setTab('login')}>Sign In</button>
              <button className={'tab' + (tab === 'signup' ? ' on' : '')} onClick={() => setTab('signup')}>Sign Up</button>
            </div>
            {tab === 'login'
              ? <LoginForm  onSuccess={() => {}} />
              : <SignupForm onSuccess={() => setTab('login')} />
            }
            <p className='foot'>
              {tab === 'login'
                ? <>No account? <a href='#' onClick={e => { e.preventDefault(); setTab('signup') }}>Sign up free</a></>
                : <>Already have an account? <a href='#' onClick={e => { e.preventDefault(); setTab('login') }}>Sign in</a></>
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}