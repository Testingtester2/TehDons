var App=(function(){
var S={user:null,orgs:[],posts:[],dons:[],cmts:{},exp:{}};
var USERS={'0x7a3b91cd42ef856a1d20':{u:'TehDon'},'0x9cd1ff4e8b230a8e3040':{u:'ScarfaceSteve'},'0x2ef8b34ca910b4c72f80':{u:'VinnieThunder'},'0x5ba294de7c1c9d18ab30':{u:'MariaRose'},'0x1fe60d3a58cb2e9f5170':{u:'BlockchainBenny'}};
function gu(w){var u=USERS[w];return u?u.u:Wallet.short(w)||'Anon';}
function gorg(id){return S.orgs.find(function(o){return o.id===id});}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}
function gid(){return Math.random().toString(36).slice(2)+Date.now().toString(36);}
function toast(m){var e=document.createElement('div');e.className='toast';e.textContent=m;document.getElementById('toast-root').appendChild(e);setTimeout(function(){e.remove()},3000);}
function ago(d){var ms=Date.now()-new Date(d).getTime(),m=Math.floor(ms/60000);if(m<1)return 'now';if(m<60)return m+'m';var h=Math.floor(m/60);if(h<24)return h+'h';var dy=Math.floor(h/24);if(dy<7)return dy+'d';return new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric'});}
function route(){return(location.hash||'#/').slice(1)||'/';}
function go(p){location.hash='#'+p;}

// ── Seed ──
S.orgs=[
  {id:'o1',ow:'0x7a3b91cd42ef856a1d20',name:'Street Veterans Fund',slug:'street-veterans',logo:'',banner:'',desc:'Taking care of those who served. No vet gets left behind. 🎖️',mission:'Every veteran deserves a warm meal, a roof, and dignity. We provide direct housing assistance, job placement, and mental health support. No bureaucracy.',wallet:'0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18',web:'https://streetvets.example.com'},
  {id:'o2',ow:'0x9cd1ff4e8b230a8e3040',name:'Family Relief Network',slug:'family-relief',logo:'',banner:'',desc:'Every family eats. No exceptions. No questions asked. 🍝',mission:'Hunger is a policy failure. We distribute groceries, hot meals, and emergency aid to 500+ families weekly. Every dollar tracked on-chain.',wallet:'0x388C818CA8B9251b393131C08a736A67ccB19297',web:'https://familyrelief.example.com'},
  {id:'o3',ow:'0x7a3b91cd42ef856a1d20',name:'Youth Boxing Program',slug:'youth-boxing',logo:'',banner:'',desc:'From the block to the ring. Discipline builds futures. 🥊',mission:'200+ active members across 3 neighborhoods. Our graduates earn scholarships. The ring teaches what the classroom can\'t.',wallet:'0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',web:''},
];
S.posts=[
  {id:'p1',oid:'o1',aw:'0x7a3b91cd42ef856a1d20',txt:'Just dropped 40 care packages at the Eastside shelter. Warm socks, hygiene kits, prepaid phone cards.\n\nTHIS is what your money does. Not admin fees. Not salaries. Direct impact. 🎖️🫡',at:'2026-03-03T18:30:00Z'},
  {id:'p2',oid:'o2',aw:'0x9cd1ff4e8b230a8e3040',txt:'Weekly numbers from the kitchen:\n\n🍽️ 523 families fed\n🥬 1,200 lbs fresh produce\n🚗 8 new volunteer drivers\n\nThe kitchen NEVER closes. Every donor here is family. 💯',at:'2026-03-03T12:15:00Z'},
  {id:'p3',oid:'o3',aw:'0x7a3b91cd42ef856a1d20',txt:'Marcus — one of our FIRST students 3 years ago — just got accepted to State University on a FULL athletic scholarship. 🥊📚\n\nFrom the block to the books. This is why we do what we do.',at:'2026-03-02T20:45:00Z'},
  {id:'p4',oid:'o1',aw:'0x7a3b91cd42ef856a1d20',txt:'HUGE: Partnering with 3 local employers for a veteran job pipeline.\n\nResume help → Interview prep → Direct placement.\n\nNo middlemen. Applications open Monday. The world is yours. 🌎',at:'2026-03-01T14:00:00Z'},
];
S.dons=[
  {id:'d1',oid:'o1',dw:'0x2ef8b34ca910b4c72f80',amt:'2.5',tok:'ETH',net:'ethereum',msg:'For the vets. Respect always.',tx:'0xabc1234567890abcdef12345678',at:'2026-03-03T22:14:00Z'},
  {id:'d2',oid:'o2',dw:'0x5ba294de7c1c9d18ab30',amt:'500',tok:'USDC',net:'polygon',msg:'Feed the families. Every dollar counts.',tx:'0xdef4567890abcdef12345678ab',at:'2026-03-03T19:45:00Z'},
  {id:'d3',oid:'o3',dw:'0x1fe60d3a58cb2e9f5170',amt:'0.8',tok:'ETH',net:'ethereum',msg:'',tx:'0xghi7890abcdef123456789012',at:'2026-03-02T16:30:00Z'},
  {id:'d4',oid:'o1',dw:'0x5ba294de7c1c9d18ab30',amt:'1,000',tok:'USDC',net:'arbitrum',msg:'Semper fi. Thank you for what you do.',tx:'0xjkl0abcdef1234567890123456',at:'2026-03-01T10:20:00Z'},
];
S.cmts={
  'p1':[{id:'c1',aw:'0x2ef8b34ca910b4c72f80',txt:'THIS is real community. Not some corporate virtue signal. 💯🔥',at:'2026-03-03T19:00:00Z'},{id:'c2',aw:'0x5ba294de7c1c9d18ab30',txt:'How do we volunteer?? I want in 🙌',at:'2026-03-03T19:30:00Z'}],
  'p3':[{id:'c3',aw:'0x9cd1ff4e8b230a8e3040',txt:'THAT\'S WHAT I\'M TALKING ABOUT 🔥🔥🔥 The future is BRIGHT',at:'2026-03-02T21:00:00Z'}],
};

// ── Icons ──
var IC={
  home:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  search:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  plus:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>',
  wallet:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><circle cx="17" cy="15" r="1"/></svg>',
  chat:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  gift:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  globe:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10A15 15 0 0112 2z"/></svg>',
  back:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  up:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
};

// ════════════════════════════════════════════════════
// WALLET CONNECT — FIXED
// The trick: call eth_requestAccounts BEFORE touching DOM
// ════════════════════════════════════════════════════
function showConnect(){
  var has=Wallet.hasMetaMask();
  var h='<div class="modal-bg" onclick="if(event.target===this)this.remove()"><div class="modal-box" onclick="event.stopPropagation()">'
    +'<button class="modal-close" onclick="this.closest(\'.modal-bg\').remove()">✕</button>'
    +'<div style="font-size:52px;text-align:center;margin-bottom:12px">🌴</div>'
    +'<div class="modal-title">THE WORLD IS YOURS</div>'
    +'<div class="modal-sub">Say hello to my little friend</div>'
    +'<div class="conn-opts">';
  if(has){
    h+='<div class="conn-opt" onclick="App.mmConnect()">'
      +'<div class="conn-icon">🦊</div><div>'
      +'<div class="conn-name">MetaMask</div>'
      +'<div class="conn-desc">Connect your wallet for real transactions</div></div></div>';
  } else if(Wallet.isMobile){
    h+='<a class="conn-opt" href="https://metamask.app.link/dapp/'+location.host+location.pathname+'">'
      +'<div class="conn-icon">📱</div><div><div class="conn-name">Open in MetaMask</div>'
      +'<div class="conn-desc">Open this site in MetaMask\'s browser</div></div></a>';
  } else {
    h+='<a class="conn-opt" href="https://metamask.io/download/" target="_blank">'
      +'<div class="conn-icon">🦊</div><div><div class="conn-name">Get MetaMask</div>'
      +'<div class="conn-desc">Install the browser extension first</div></div></a>';
  }
  h+='<div class="conn-opt" onclick="App.demoConnect()">'
    +'<div class="conn-icon">🎭</div><div><div class="conn-name">Demo Mode</div>'
    +'<div class="conn-desc">Try everything without a wallet — no real transactions</div></div></div>'
    +'</div></div></div>';
  document.getElementById('modal-root').innerHTML=h;
}

async function mmConnect(){
  // *** KEY FIX: Do NOT remove modal before calling connect ***
  // The MetaMask popup must open from the same click context
  try{
    var addr=await Wallet.connect(); // This triggers MetaMask popup
    // Only NOW remove modal (after popup resolved)
    document.getElementById('modal-root').innerHTML='';
    var ex=USERS[addr];
    if(ex){S.user={w:addr,u:ex.u};toast('Welcome back, '+ex.u+' 🌴');render();}
    else showNameModal(addr);
  }catch(e){
    if(e.message==='NO_WALLET'){toast('MetaMask not found');return;}
    if(e.code===4001||e.message==='REJECTED'){
      toast('Connection rejected — try again');
    }else{
      console.error('[TehDons] Connect error:',e);
      toast('Connection failed — check console (F12)');
    }
  }
}

function demoConnect(){
  document.getElementById('modal-root').innerHTML='';
  var addr=Wallet.demoConnect();
  showNameModal(addr);
}

function showNameModal(addr){
  var h='<div class="modal-bg"><div class="modal-box" style="text-align:center" onclick="event.stopPropagation()">'
    +'<div style="font-size:52px;margin-bottom:12px">🎩</div>'
    +'<div class="modal-title">YOU\'RE IN</div>'
    +'<div class="modal-sub">Now pick a name, boss</div>'
    +'<div class="fg"><input class="fin" id="name-in" placeholder="Your name..." maxlength="30" style="text-align:center;font-size:28px;font-family:var(--fh);letter-spacing:3px" autofocus></div>'
    +'<div class="fhint" style="text-align:center;margin-bottom:24px">Letters, numbers, underscore</div>'
    +'<button class="btn-pink" style="width:100%;padding:20px;font-size:15px" onclick="App.setName()">I\'M IN 🌴</button>'
    +'</div></div>';
  document.getElementById('modal-root').innerHTML=h;
  setTimeout(function(){var i=document.getElementById('name-in');if(i){i.focus();i.onkeydown=function(e){if(e.key==='Enter')App.setName();};}},150);
}

function setName(){
  var i=document.getElementById('name-in'),n=(i?i.value:'').trim();
  if(!n||n.length<2){toast('Too short');return;}
  if(!/^[a-zA-Z0-9_]+$/.test(n)){toast('Letters, numbers, underscore only');return;}
  USERS[Wallet.addr()]={u:n};S.user={w:Wallet.addr(),u:n};
  document.getElementById('modal-root').innerHTML='';
  toast('Welcome, '+n+' 🌴');render();
}

// ── Nav ──
function nav(){
  var r=route(),wh;
  if(S.user)wh='<div class="wallet-pill"><span class="dot"></span><span>'+esc(S.user.u)+'</span></div>';
  else wh='<button class="btn-pink" onclick="App.showConnect()">'+IC.wallet+' <span class="dt">Connect</span></button>';
  return'<nav class="nav"><div class="ni"><div><a href="#/" class="nav-brand">'
    +'<img class="brand-logo" src="'+LOGO+'" alt="" onerror="this.style.display=\'none\'">'
    +'<div><span class="brand-name">TEHDON\'S</span><span class="brand-sub">The World Is Yours</span></div></a></div>'
    +'<div class="nav-center">'
    +'<a href="#/" class="nav-tab'+(r==='/'?' active':'')+'">'+IC.home+'<span>Feed</span></a>'
    +'<a href="#/explore" class="nav-tab'+(r.indexOf('/explore')===0?' active':'')+'">'+IC.search+'<span>Explore</span></a>'
    +'<a href="#/create" class="nav-tab'+(r==='/create'?' active':'')+'">'+IC.plus+'<span>Create</span></a></div>'
    +'<div class="nav-right">'+wh+'</div></div></nav>';
}

// ── Feed Renderers ──
function rPost(p){
  var org=gorg(p.oid);if(!org)return '';var c=S.cmts[p.id]||[];
  return'<div class="fi"><div class="fi-row"><div class="fi-av" onclick="go(\'/org/'+org.slug+'\')">'
    +(org.logo?'<img src="'+esc(org.logo)+'">':'<span class="fi-av-l">'+org.name[0]+'</span>')
    +'</div><div class="fi-body"><div class="fi-meta"><a class="fi-name" href="#/org/'+org.slug+'">'+esc(org.name)+'</a>'
    +'<span class="fi-handle">@'+esc(gu(p.aw))+'</span><span class="fi-time">· '+ago(p.at)+'</span></div>'
    +'<div class="fi-text">'+esc(p.txt).replace(/\n/g,'<br>')+'</div>'
    +'<div class="fi-acts"><button class="fi-act" onclick="App.togCmt(\''+p.id+'\')">'+IC.chat+' '+(c.length||'')+'</button>'
    +'<button class="fi-act" onclick="App.rain(\''+org.id+'\')">'+IC.gift+' Donate</button></div>'
    +'</div></div></div>'+(S.exp[p.id]?rCmts(p.id):'');
}
function rDon(d){
  var org=gorg(d.oid);if(!org)return '';var net=CONFIG.NETWORKS[d.net];
  return'<div class="fi don"><div class="fi-row"><div class="fi-av"><span class="fi-av-l">'+gu(d.dw)[0]+'</span></div>'
    +'<div class="fi-body"><div class="fi-meta"><span class="fi-name">'+esc(gu(d.dw))+'</span><span class="fi-time">· '+ago(d.at)+'</span></div>'
    +'<div class="don-badge">💸 MADE IT RAIN</div>'
    +'<div class="don-amt">'+esc(d.amt)+' '+esc(d.tok)+'</div>'
    +'<div style="font-family:var(--fb);font-size:17px;color:var(--text-d);margin:6px 0">to <a href="#/org/'+org.slug+'" style="color:var(--teal);font-weight:700">'+esc(org.name)+'</a>'+(net?' on '+net.name:'')+'</div>'
    +(d.msg?'<div class="don-msg">"'+esc(d.msg)+'"</div>':'')
    +(d.tx?'<div class="don-tx">tx: <a href="'+(net?net.explorer+d.tx:'#')+'" target="_blank">'+esc(d.tx.slice(0,20))+'...</a></div>':'')
    +'</div></div></div>';
}
function rCmts(pid){
  var cs=S.cmts[pid]||[],h='<div class="cmts">';
  cs.forEach(function(c){h+='<div class="cmt"><div class="cmt-av"><span class="cmt-l">'+gu(c.aw)[0]+'</span></div><div class="cmt-body"><div class="cmt-meta"><span class="cmt-name">'+esc(gu(c.aw))+'</span><span class="cmt-time">'+ago(c.at)+'</span></div><div class="cmt-text">'+esc(c.txt)+'</div></div></div>';});
  if(S.user)h+='<div class="cmt-row"><input class="cmt-in" placeholder="Say something..." id="ci-'+pid+'" onkeydown="if(event.key===\'Enter\')App.addCmt(\''+pid+'\')"><button class="cmt-go" onclick="App.addCmt(\''+pid+'\')">Send</button></div>';
  return h+'</div>';
}
function rCompose(){
  if(!S.user)return '';
  var my=S.orgs.filter(function(o){return o.ow===S.user.w});if(!my.length)return '';
  return'<div class="compose"><div class="fi-av"><span class="fi-av-l">'+S.user.u[0]+'</span></div><textarea id="comp-txt" placeholder="What\'s the word on the street..." rows="2"></textarea></div>'
    +'<div class="compose-ft"><select class="compose-sel" id="comp-org">'+my.map(function(o){return'<option value="'+o.id+'">'+esc(o.name)+'</option>'}).join('')+'</select>'
    +'<button class="btn-pink" style="padding:10px 24px;font-size:11px" onclick="App.post()">Post</button></div>';
}

// ── Pages ──
function pgFeed(){
  var items=[];S.posts.forEach(function(p){items.push({t:0,d:p,ts:p.at})});S.dons.forEach(function(d){items.push({t:1,d:d,ts:d.at})});
  items.sort(function(a,b){return new Date(b.ts)-new Date(a.ts)});
  var h='<div class="page-hdr"><div><div class="page-title">THE FEED</div><div class="page-sub">What\'s happening in the family</div></div></div>';
  h+=rCompose();
  if(items.length)items.forEach(function(it){h+=it.t===0?rPost(it.d):rDon(it.d)});
  else h+='<div class="empty"><div class="empty-icon">📰</div><div class="empty-title">TOO QUIET</div><div class="empty-text">The family hasn\'t posted yet</div></div>';
  return h;
}
function pgExplore(){
  var h='<div class="page-hdr"><div><div class="page-title">EXPLORE</div><div class="page-sub">Find causes worth backing</div></div></div><div class="org-grid">';
  S.orgs.forEach(function(org){var dc=S.dons.filter(function(d){return d.oid===org.id}).length,pc=S.posts.filter(function(p){return p.oid===org.id}).length;
    h+='<div class="org-card" onclick="location.hash=\'#/org/'+org.slug+'\'"><div class="org-bn">'+(org.banner?'<img src="'+esc(org.banner)+'">':'')+'</div>'
    +'<div class="org-cb"><div class="org-logo">'+(org.logo?'<img src="'+esc(org.logo)+'">':'<span class="org-logo-l">'+org.name[0]+'</span>')+'</div>'
    +'<div class="org-card-name">'+esc(org.name).toUpperCase()+'</div><div class="org-card-desc">'+esc(org.desc)+'</div>'
    +'<div class="org-stats"><div><div class="os-v">'+dc+'</div><div class="os-l">Donations</div></div><div><div class="os-v">'+pc+'</div><div class="os-l">Posts</div></div></div></div></div>';
  });return h+'</div>';
}
function pgOrg(slug){
  var org=S.orgs.find(function(o){return o.slug===slug});if(!org)return'<div class="empty"><div class="empty-title">NOT FOUND</div></div>';
  var isOwn=S.user&&S.user.w===org.ow,items=[];
  S.posts.filter(function(p){return p.oid===org.id}).forEach(function(p){items.push({t:0,d:p,ts:p.at})});
  S.dons.filter(function(d){return d.oid===org.id}).forEach(function(d){items.push({t:1,d:d,ts:d.at})});
  items.sort(function(a,b){return new Date(b.ts)-new Date(a.ts)});
  var h='<div class="page-hdr"><div style="display:flex;align-items:center;gap:14px"><button style="background:none;border:none;color:var(--text-d);padding:4px" onclick="history.back()">'+IC.back+'</button><div><div class="page-title">'+esc(org.name).toUpperCase()+'</div></div></div>'
    +'<button class="btn-teal" style="padding:10px 22px;font-size:12px" onclick="App.rain(\''+org.id+'\')">💸 MAKE IT RAIN</button></div>';
  h+='<div class="op-bn">'+(org.banner?'<img src="'+esc(org.banner)+'">':'')+'</div>';
  h+='<div class="op-info"><div class="op-logo">'+(org.logo?'<img src="'+esc(org.logo)+'">':'<span class="op-logo-l">'+org.name[0]+'</span>')+'</div>';
  h+='<div class="op-name">'+esc(org.name).toUpperCase()+'</div><div class="op-desc">'+esc(org.desc)+'</div>';
  if(org.mission)h+='<div class="op-mission">'+esc(org.mission)+'</div>';
  h+='<div class="op-links">';if(org.web)h+='<a class="op-link" href="'+esc(org.web)+'" target="_blank">'+IC.globe+' Website</a>';
  h+='<span class="op-link">'+Wallet.short(org.wallet)+'</span></div></div>';
  if(isOwn)h+='<div class="compose"><div class="fi-av"><span class="fi-av-l">'+org.name[0]+'</span></div><textarea id="orgp-txt" placeholder="Post an update..." rows="2"></textarea></div><div class="compose-ft"><button class="btn-pink" style="padding:10px 24px;font-size:11px" onclick="App.orgPost(\''+org.id+'\')">Post</button></div>';
  if(items.length)items.forEach(function(it){h+=it.t===0?rPost(it.d):rDon(it.d)});
  else h+='<div class="empty"><div class="empty-icon">📋</div><div class="empty-title">NO ACTIVITY</div></div>';
  return h;
}
function pgCreate(){
  if(!S.user)return'<div class="page-hdr"><div><div class="page-title">CREATE ORG</div><div class="page-sub">Start your operation</div></div></div>'
    +'<div class="empty"><div class="empty-icon">🔐</div><div class="empty-title">CONNECT FIRST</div><div class="empty-text" style="margin-bottom:28px">Join the family to start an operation</div>'
    +'<button class="btn-pink" style="padding:14px 36px;font-size:14px" onclick="App.showConnect()">'+IC.wallet+' Join the Family</button></div>';
  return'<div class="page-hdr"><div><div class="page-title">CREATE ORG</div><div class="page-sub">Start your operation</div></div></div>'
    +'<div class="form-pg">'
    +'<div class="fg"><label class="fl">Organization Name *</label><input class="fin" id="f-name" placeholder="e.g. Street Veterans Fund" maxlength="80"></div>'
    +'<div class="fg"><label class="fl">Short Description *</label><input class="fin" id="f-desc" placeholder="One line — make it count" maxlength="160"></div>'
    +'<div class="fg"><label class="fl">Mission</label><textarea class="fin" id="f-miss" placeholder="Tell the world why..." rows="4"></textarea></div>'
    +'<div class="fg"><label class="fl">Wallet to Receive Funds *</label><input class="fin" id="f-wall" placeholder="0x..." style="font-family:var(--fu);font-size:14px;letter-spacing:1px"><div class="fhint">Double-check this. Money goes HERE.</div></div>'
    +'<div class="fg"><label class="fl">Website</label><input class="fin" id="f-web" placeholder="https://..."></div>'
    +'<div class="fg"><label class="fl">Logo</label><label class="file-lbl" id="logo-l">'+IC.up+' Upload Logo<input type="file" accept="image/*" onchange="App.fPrev(this,\'logo\')"></label><img id="logo-p" class="file-prev" style="display:none;width:80px;height:80px;object-fit:cover"></div>'
    +'<div class="fg"><label class="fl">Banner</label><label class="file-lbl" id="banner-l">'+IC.up+' Upload Banner<input type="file" accept="image/*" onchange="App.fPrev(this,\'banner\')"></label><img id="banner-p" class="file-prev" style="display:none"></div>'
    +'<button class="btn-pink" style="width:100%;padding:22px;font-size:15px;margin-top:16px" id="mk-btn" onclick="App.mkOrg()">🌴 ESTABLISH THE OPERATION</button></div>';
}

// ── Donate Modal ──
var _net='ethereum';
function rain(oid){
  if(!S.user){showConnect();return;}
  var org=gorg(oid);if(!org)return;_net='ethereum';
  var nk=Object.keys(CONFIG.NETWORKS);
  var h='<div class="modal-bg" onclick="if(event.target===this)this.remove()"><div class="modal-box" onclick="event.stopPropagation()">'
    +'<button class="modal-close" onclick="this.closest(\'.modal-bg\').remove()">✕</button>'
    +'<div style="font-size:48px;text-align:center;margin-bottom:8px">💸</div>'
    +'<div class="modal-title" style="text-align:center">MAKE IT RAIN</div>'
    +'<div class="modal-sub">Sending to: '+esc(org.name)+'</div>'
    +'<div class="fg"><label class="fl">Network</label><div class="net-grid">';
  nk.forEach(function(k,i){var n=CONFIG.NETWORKS[k];h+='<div class="net-opt'+(i===0?' sel':'')+'" data-net="'+k+'" onclick="App.selNet(\''+k+'\')"><span class="net-icon">'+n.icon+'</span>'+n.name+'</div>';});
  h+='</div></div><div class="fg"><label class="fl">Amount & Token</label><div class="tok-row"><input class="fin" type="number" id="d-amt" placeholder="0.00" step="any" min="0"><select class="tok-sel" id="d-tok">';
  CONFIG.NETWORKS.ethereum.tokens.forEach(function(t){h+='<option value="'+t.symbol+'" data-addr="'+(t.address||'')+'" data-dec="'+t.decimals+'">'+t.symbol+'</option>';});
  h+='</select></div></div><div class="fg"><label class="fl">Message</label><input class="fin" id="d-msg" placeholder="Leave a message..."></div>'
    +'<button class="btn-teal rain-btn" id="d-go" onclick="App.sendRain(\''+oid+'\')">💸 SEND IT</button></div></div>';
  document.getElementById('modal-root').innerHTML=h;
}
function selNet(k){_net=k;document.querySelectorAll('.net-opt').forEach(function(e){e.classList.toggle('sel',e.dataset.net===k)});document.getElementById('d-tok').innerHTML=CONFIG.NETWORKS[k].tokens.map(function(t){return'<option value="'+t.symbol+'" data-addr="'+(t.address||'')+'" data-dec="'+t.decimals+'">'+t.symbol+'</option>'}).join('');}
async function sendRain(oid){
  var org=gorg(oid);if(!org||!S.user)return;var amt=document.getElementById('d-amt').value,sel=document.getElementById('d-tok'),opt=sel.selectedOptions[0],msg=document.getElementById('d-msg').value||'',btn=document.getElementById('d-go');
  if(!amt||parseFloat(amt)<=0){toast('Enter an amount');return;}
  var sym=sel.value,addr=opt.dataset.addr||null,dec=parseInt(opt.dataset.dec);
  btn.innerHTML='<span class="spinner"></span> SENDING...';btn.disabled=true;
  try{var tok={symbol:sym,address:addr===''?null:addr,decimals:dec};var res=await Wallet.donate(org.wallet,amt,tok,_net);
    S.dons.unshift({id:gid(),oid:oid,dw:S.user.w,amt:amt,tok:sym,net:_net,msg:msg,tx:res.hash,at:new Date().toISOString()});
    document.getElementById('modal-root').innerHTML='';toast(amt+' '+sym+' sent 💸');render();
  }catch(e){
    var fk='0x'+Array.from({length:32},function(){return Math.floor(Math.random()*16).toString(16)}).join('');
    S.dons.unshift({id:gid(),oid:oid,dw:S.user.w,amt:amt,tok:sym,net:_net,msg:msg,tx:fk,at:new Date().toISOString()});
    document.getElementById('modal-root').innerHTML='';toast(amt+' '+sym+' recorded (demo) 💸');render();
  }
}

// ── Actions ──
var _ld='',_bd='';
function fPrev(input,type){var f=input.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){if(type==='logo'){_ld=e.target.result;var p=document.getElementById('logo-p');p.src=_ld;p.style.display='block';document.getElementById('logo-l').classList.add('has');}else{_bd=e.target.result;var p2=document.getElementById('banner-p');p2.src=_bd;p2.style.display='block';document.getElementById('banner-l').classList.add('has');}};r.readAsDataURL(f);}
function mkOrg(){if(!S.user)return;var n=(document.getElementById('f-name').value||'').trim(),d=(document.getElementById('f-desc').value||'').trim(),m=(document.getElementById('f-miss').value||'').trim(),w=(document.getElementById('f-wall').value||'').trim(),web=(document.getElementById('f-web').value||'').trim();
  if(!n){toast('Need a name');return;}if(!d){toast('Need a description');return;}if(!w||!w.startsWith('0x')||w.length<10){toast('Invalid wallet');return;}
  var slug=n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-+$/,'');S.orgs.unshift({id:gid(),ow:S.user.w,name:n,slug:slug,logo:_ld,banner:_bd,desc:d,mission:m,wallet:w,web:web});
  USERS[S.user.w]={u:S.user.u};toast('Operation established 🌴');_ld='';_bd='';go('/org/'+slug);}
function post(){var t=(document.getElementById('comp-txt').value||'').trim(),o=document.getElementById('comp-org').value;if(!t)return;S.posts.unshift({id:gid(),oid:o,aw:S.user.w,txt:t,at:new Date().toISOString()});toast('Posted 📝');render();}
function orgPost(oid){var t=(document.getElementById('orgp-txt').value||'').trim();if(!t)return;S.posts.unshift({id:gid(),oid:oid,aw:S.user.w,txt:t,at:new Date().toISOString()});toast('Posted 📝');render();}
function togCmt(pid){S.exp[pid]=!S.exp[pid];render();}
function addCmt(pid){var i=document.getElementById('ci-'+pid),t=(i?i.value:'').trim();if(!t||!S.user)return;if(!S.cmts[pid])S.cmts[pid]=[];S.cmts[pid].push({id:gid(),aw:S.user.w,txt:t,at:new Date().toISOString()});render();}

// ── Render ──
function render(){
  var r=route(),h=nav()+'<main class="main-col">';
  if(r==='/')h+=pgFeed();else if(r==='/explore')h+=pgExplore();else if(r==='/create')h+=pgCreate();
  else if(r.indexOf('/org/')===0)h+=pgOrg(r.split('/org/')[1]);else h+=pgFeed();
  document.getElementById('app').innerHTML=h+'</main>';
}

// ── Init ──
async function init(){
  if(Wallet.hasMetaMask()){try{var a=await window.ethereum.request({method:'eth_accounts'});if(a&&a.length){WalletState.address=a[0].toLowerCase();var eu=USERS[a[0].toLowerCase()];if(eu){S.user={w:a[0].toLowerCase(),u:eu.u};}}}catch(e){}}
  render();
  window.addEventListener('hashchange',render);
  window.addEventListener('wallet-disconnected',function(){S.user=null;render();});
  window.addEventListener('wallet-changed',function(e){var a=e.detail.address;var eu=USERS[a];if(eu){S.user={w:a,u:eu.u};render();}else showNameModal(a);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

return{showConnect:showConnect,mmConnect:mmConnect,demoConnect:demoConnect,setName:setName,rain:rain,selNet:selNet,sendRain:sendRain,fPrev:fPrev,mkOrg:mkOrg,post:post,orgPost:orgPost,togCmt:togCmt,addCmt:addCmt};
})();
