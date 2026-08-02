export const SHIFTS = [
  { id:1, date:'Aug 1',  score:88, sentiment:82, customers:34, conversations:31, compliant:26, triggered:31 },
  { id:2, date:'Aug 2',  score:74, sentiment:70, customers:28, conversations:25, compliant:18, triggered:25 },
  { id:3, date:'Aug 3',  score:91, sentiment:88, customers:42, conversations:39, compliant:36, triggered:39 },
  { id:4, date:'Aug 4',  score:67, sentiment:64, customers:22, conversations:20, compliant:12, triggered:20 },
  { id:5, date:'Aug 5',  score:95, sentiment:92, customers:48, conversations:45, compliant:43, triggered:45 },
  { id:6, date:'Aug 6',  score:83, sentiment:79, customers:38, conversations:35, compliant:30, triggered:35 },
  { id:7, date:'Aug 7',  score:79, sentiment:75, customers:31, conversations:28, compliant:22, triggered:28 },
]

export const RULES = [
  { id:1, name:'Repair → Case Ask',       trigger:'Customer dropping off repair', action:'Employee asked about protective case', value:20, window:'monthly', active:true  },
  { id:2, name:'Screen Repair → Protector', trigger:'Customer picked up repaired screen', action:'Employee offered screen protector', value:15, window:'monthly', active:true  },
  { id:3, name:'Greeting & Closing',      trigger:'Customer at checkout', action:'Greeting given and closing thank-you', value:0,  window:'shift',   active:false },
]

export const RUBRIC = [
  { name:'Greeting',    weight:25, avg:82 },
  { name:'Helpfulness', weight:30, avg:79 },
  { name:'Courtesy',    weight:20, avg:91 },
  { name:'Closing',     weight:15, avg:74 },
  { name:'Sentiment',   weight:10, avg:85 },
]

export const PILOT = {
  location: 'La Vaquita',
  phase: 'Phase 5 — Baseline Measurement',
  startDate: 'Sep 28, 2026',
  endDate: 'Oct 10, 2026',
  status: 'active',
}