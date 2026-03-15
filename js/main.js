// ── STORAGE ──
function LS(k, v) {
  if (v === undefined) {
    try { const r = localStorage.getItem('kc_' + k); return r ? JSON.parse(r) : null; } catch(e) { return null; }
  } else {
    try { localStorage.setItem('kc_' + k, JSON.stringify(v)); } catch(e) {}
  }
}
function gd(k) { return LS(k) || DEFAULTS[k]; }

// ── DEFAULTS ──
const DEFAULTS = {
  pw: 'karim2026',
  info: { name:'Karim Castro', cargo:'Diputada por la Región Puno', email:'contacto@karimcastro.pe', phone:'+51 999 999 999', addr:'Av. El Sol 123, Puno', slogan:'Experiencia, preparación y voluntad de servicio. Una voz firme por el desarrollo real de Puno en el Congreso Nacional.', fb:'#', ig:'#', tt:'#', yt:'#' },
  elec: '2026-04-11T08:00',
  stats: [{ n:15, l:'Años de trayectoria' }, { n:11, l:'Provincias visitadas' }],
  agenda: [
    { date:'15 Mar · 2026', title:'Cabildo abierto en Juliaca', loc:'Plaza Bolognesi, Juliaca — 10:00 a.m.', tag:'Presencial' },
    { date:'18 Mar · 2026', title:'Visita a comunidades de Capachica', loc:'Distrito de Capachica — 9:00 a.m.', tag:'Comunidad' },
    { date:'22 Mar · 2026', title:'Foro educativo regional', loc:'Auditorio UNA PUNO — 3:00 p.m.', tag:'Foro' },
    { date:'28 Mar · 2026', title:'Mitin central de campaña', loc:'Plaza de Armas, Puno — 6:00 p.m.', tag:'Mitin' }
  ],
  testis: [
    { stars:'★★★★★', text:'"Karim conoce Puno de verdad. La he visto en mi comunidad, hablando con la gente, anotando los problemas."', name:'José Quispe', from:'Azángaro' },
    { stars:'★★★★★', text:'"Como agricultora, necesitamos a alguien que entienda el campo. Karim tiene propuestas reales."', name:'María Condori', from:'Capachica' },
    { stars:'★★★★★', text:'"Tiene propuestas concretas, no promesas vacías. Le doy mi voto con convicción."', name:'Carlos Mamani', from:'Juliaca' },
    { stars:'★★★★★', text:'"La salud en las comunidades rurales es un drama. Karim lo sabe y tiene un plan real."', name:'Rosa Huanca', from:'Ilave' },
    { stars:'★★★★★', text:'"Joven, preparada y con amor por Puno. El N°2 de Ahora Nación."', name:'Pedro Flores', from:'Puno ciudad' }
  ],
  provs: [
    {name:'Puno',v:true},{name:'Juliaca (San Román)',v:true},{name:'Azángaro',v:true},{name:'Melgar',v:true},
    {name:'Carabaya',v:true},{name:'Chucuito',v:true},{name:'El Collao (Ilave)',v:true},{name:'Huancané',v:true},
    {name:'Lampa',v:true},{name:'Moho',v:true},{name:'Yunguyo',v:true},{name:'Sandia',v:false},{name:'Putina',v:false}
  ]
};

// ── CURSOR ──
const c2 = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  c2.style.left = mx + 'px'; c2.style.top = my + 'px';
});
(function animR() {
  rx += (mx - rx) * .1; ry += (my - ry) * .1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animR);
})();
const trails = [];
for (let i = 0; i < 6; i++) {
  const t = document.createElement('div'); t.className = 'trail';
  document.body.appendChild(t); trails.push({ el: t, x: 0, y: 0 });
}
(function animTrail() {
  trails.forEach((t, i) => {
    const prev = i === 0 ? { x: mx, y: my } : trails[i - 1];
    t.x += (prev.x - t.x) * .25; t.y += (prev.y - t.y) * .25;
    t.el.style.left = t.x + 'px'; t.el.style.top = t.y + 'px';
    t.el.style.opacity = 1 - (i / trails.length) * .8;
  });
  requestAnimationFrame(animTrail);
})();

// ── COUNTDOWN ──
function tick() {
  const cfg = LS('elec') || DEFAULTS.elec;
  const diff = new Date(cfg) - new Date();
  if (diff <= 0) { document.getElementById('cdd').textContent = '🗳️'; ['cdh','cdm','cds'].forEach(id => document.getElementById(id).textContent = '00'); return; }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cdd').textContent = String(d).padStart(2,'0');
  document.getElementById('cdh').textContent = String(h).padStart(2,'0');
  document.getElementById('cdm').textContent = String(m).padStart(2,'0');
  document.getElementById('cds').textContent = String(s).padStart(2,'0');
}
tick(); setInterval(tick, 1000);

// ── SCROLL ──
window.addEventListener('scroll', () => {
  const pct = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
  document.getElementById('progress').style.width = pct + '%';
  document.getElementById('nav').classList.toggle('sc', window.scrollY > 60);
  document.getElementById('floatVote').classList.toggle('show', window.scrollY > 400);
  const img = document.querySelector('.hero-photo img');
  if (img) img.style.transform = `translateY(${window.scrollY * .15}px)`;
}, { passive: true });

// ── PROPUESTAS ──
const PROPS = [
  { ico:'🏥', name:'Salud', hint:'Centros rurales y medicamentos', body:'Acceso a servicios de salud de calidad para cada puneño, especialmente en zonas rurales.', items:['Ampliación de centros de salud en comunidades alejadas','Medicamentos esenciales gratuitos en postas rurales','Programas de salud preventiva y vacunación masiva','Telemedicina para zonas sin médico permanente','Atención especializada en ginecología y pediatría'] },
  { ico:'📚', name:'Educación', hint:'Infraestructura y becas', body:'Fortalecer la educación pública para que ningún niño puneño quede sin acceso a enseñanza de calidad.', items:['Construcción y refacción de escuelas en zonas rurales','Dotación de equipos y conectividad digital','Becas para estudiantes destacados de las 13 provincias','Formación continua y salarios dignos para docentes','Revaloración del idioma aimara y quechua'] },
  { ico:'🌾', name:'Agro y ganadería', hint:'Tecnificación y seguros', body:'El campo es el sustento de miles de familias puneñas. Modernizaremos el sector con identidad.', items:['Tecnificación del riego en el altiplano','Seguro agrario para pequeños productores','Mejores precios y mercados para la producción local','Créditos blandos para el agro familiar','Ferias agropecuarias y cadenas de exportación'] },
  { ico:'🛤️', name:'Infraestructura', hint:'Carreteras y conectividad', body:'Conectar Puno es conectar oportunidades. Gestionaremos presupuesto para la red vial de las 13 provincias.', items:['Asfaltado en provincias alejadas','Mantenimiento de trochas rurales','Puentes que integren comunidades aisladas','Supervisión de obras sin corrupción','Internet y energía eléctrica en zonas rurales'] },
  { ico:'💼', name:'Empleo', hint:'Empresa local y turismo', body:'Generaremos condiciones para que el talento puneño produzca prosperidad dentro de la región.', items:['Incentivos para empresas que contraten en Puno','Fomento del turismo sostenible en el Titicaca','Apoyo a artesanos y emprendedores locales','Ferias productivas y mercados de exportación','Formalización de la economía informal'] },
  { ico:'🌿', name:'Medio ambiente', hint:'Protección del Titicaca', body:'El Lago Titicaca es patrimonio del mundo. Lo protegeremos con acciones legislativas concretas.', items:['Plan urgente de descontaminación del Titicaca','Gestión de residuos sólidos en las 13 provincias','Reforestación de zonas degradadas','Educación ambiental en escuelas','Fiscalización de minería informal'] }
];
(function buildProps() {
  const tabs = document.getElementById('propTabs');
  PROPS.forEach((p, i) => {
    const t = document.createElement('div'); t.className = 'tab' + (i === 0 ? ' active' : '');
    t.innerHTML = `<div class="tico">${p.ico}</div><div><div class="tname">${p.name}</div><div class="thint">${p.hint}</div><div class="tbar"><div class="tfill"></div></div></div>`;
    t.onclick = () => { document.querySelectorAll('.tab').forEach((x, j) => x.classList.toggle('active', j === i)); renderProp(i); };
    tabs.appendChild(t);
  }); renderProp(0);
})();
function renderProp(i) {
  const p = PROPS[i];
  document.getElementById('propDetail').innerHTML = `<span class="dico">${p.ico}</span><div class="dtitle danim">${p.name}</div><div class="dbody danim">${p.body}</div><ul class="dlist danim">${p.items.map(t => `<li>${t}</li>`).join('')}</ul>`;
}

// ── GALERÍA ──
const GALCOLORS = ['#CC0018','#A30013','#E83347','#8B0010','#FF4560','#D4001A','#B00016','#F5293E','#950012','#6D000D'];
const GALLABELS = ['Cabildo en Juliaca','Visita Capachica','Foro educativo','Comunidades Ilave','Reunión Azángaro','Mitin Puno','Visita Yunguyo','Recorrido Lampa','Evento Huancané','Movilización Juli'];
(function buildGal() {
  const g = document.getElementById('galGrid');
  GALLABELS.forEach((lbl, i) => {
    const item = document.createElement('div'); item.className = 'gitem rv' + (i < 4 ? ' d' + i % 4 : '');
    item.innerHTML = `<div class="gitem-inner" style="background:${GALCOLORS[i]}"><div style="font-size:2rem;opacity:.15">📸</div><div style="font-size:.7rem;font-weight:600;color:rgba(255,255,255,.65);text-align:center;padding:0 .75rem">${lbl}</div></div><div class="gover"><div class="gzoom"><svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/></svg></div></div>`;
    item.onclick = () => openLb(i); g.appendChild(item);
  });
})();
function openLb(idx) {
  const canvas = document.createElement('canvas'); canvas.width = 800; canvas.height = 600;
  const ctx = canvas.getContext('2d'); ctx.fillStyle = GALCOLORS[idx]; ctx.fillRect(0,0,800,600);
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.font = 'bold 120px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('📸',400,260);
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = 'bold 26px sans-serif'; ctx.fillText(GALLABELS[idx],400,420);
  document.getElementById('lbimg').src = canvas.toDataURL();
  document.getElementById('lb').dataset.idx = idx;
  document.getElementById('lb').classList.add('open');
}
document.getElementById('lbclose').onclick = () => document.getElementById('lb').classList.remove('open');
document.getElementById('lbprev').onclick = () => openLb((parseInt(document.getElementById('lb').dataset.idx) - 1 + GALLABELS.length) % GALLABELS.length);
document.getElementById('lbnext').onclick = () => openLb((parseInt(document.getElementById('lb').dataset.idx) + 1) % GALLABELS.length);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { document.getElementById('lb').classList.remove('open'); closeAdmin(); } });


// ── MOBILE MENU ──
const burger = document.getElementById('burger');
const mobmenu = document.getElementById('mobmenu');
burger.addEventListener('click', () => { burger.classList.toggle('open'); mobmenu.classList.toggle('open'); });
function closeMob() { burger.classList.remove('open'); mobmenu.classList.remove('open'); }

// ── FORM ──
function submitForm(e) {
  e.preventDefault();
  const fields = [['fn',v=>v.trim().length>0],['fl',v=>v.trim().length>0],['fe',v=>v.includes('@')],['fm',v=>v.trim().length>0]];
  let ok = true;
  fields.forEach(([id,test]) => { const el=document.getElementById(id); const valid=test(el.value); el.classList.toggle('err',!valid); el.classList.toggle('ok',valid); if(!valid) ok=false; });
  if(!ok) return;
  const btn = document.getElementById('fBtn'); btn.textContent='Enviando…'; btn.disabled=true;
  setTimeout(() => { document.getElementById('cform').style.display='none'; document.getElementById('fsuc').style.display='block'; }, 1200);
}
['fn','fl','fe','fm'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() { this.classList.remove('err'); this.classList.toggle('ok', this.value.trim().length>0); });
});

// ── COPY LINK ──
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const el = document.getElementById('copyTxt'); el.textContent='¡Copiado!';
    setTimeout(() => el.textContent='Copiar link', 2000);
  });
}

// ── APPLY SAVED INFO ON LOAD ──
(function() {
  const d = LS('info'); if(!d) return;
  const sl = document.querySelector('.hdesc'); if(sl&&d.slogan) sl.textContent=d.slogan;
  const dispE=document.getElementById('dispEmail'); if(dispE) dispE.textContent=d.email;
  const dispP=document.getElementById('dispPhone'); if(dispP) dispP.textContent=d.phone;
  const dispA=document.getElementById('dispAddr');  if(dispA) dispA.textContent=d.addr;
  ['fb','ig','tt','yt'].forEach(k => { const el=document.getElementById('soc-'+k); if(el&&d[k]) el.href=d[k]; });
})();

// ── VOTO IMAGE ──
function applyVotoImg(src) {
  const box = document.getElementById('votoImgBox'); if(!box) return;
  box.innerHTML = `<img src="${src}" alt="Cédula" style="width:100%;border-radius:8px;display:block">`;
}
(function(){ const src=LS('votoImg'); if(src) applyVotoImg(src); })();
function previewVotoImg(input) {
  if(!input.files||!input.files[0]) return;
  const reader=new FileReader();
  reader.onload=e=>{ document.getElementById('votoImgPreviewImg').src=e.target.result; document.getElementById('votoImgPreview').style.display='block'; };
  reader.readAsDataURL(input.files[0]);
}
function saveVotoImg() {
  const input=document.getElementById('ai-votoimg');
  if(!input.files||!input.files[0]) return;
  const reader=new FileReader();
  reader.onload=e=>{ LS('votoImg',e.target.result); applyVotoImg(e.target.result); flash('cfg'); };
  reader.readAsDataURL(input.files[0]);
}

// ── INTERSECTION OBSERVER (animate on scroll) ──
const done = new Set();
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    e.target.classList.add('vis');
    const n = e.target.querySelector('[data-target]');
    if(n && !done.has(n)) {
      done.add(n);
      let s=0, tg=parseInt(n.dataset.target);
      const ac=n.querySelector('.ac');
      const t=setInterval(()=>{ s=Math.min(s+tg/120,tg); if(ac) n.childNodes[0].textContent=Math.floor(s); else n.textContent=Math.floor(s); if(s>=tg)clearInterval(t); },16);
    }
    if(e.target.classList.contains('mapvis')) {
      setTimeout(()=>{
        const fill=document.getElementById('mbarFill');
        const pct=fill.dataset.pct||84;
        fill.style.width=pct+'%';
        document.getElementById('mapPct').textContent=pct+'%';
        const numEl=document.getElementById('mapNum');
        const prov=parseInt(numEl.dataset.prov||11);
        let s2=0; const t2=setInterval(()=>{s2=Math.min(s2+.25,prov);numEl.textContent=Math.floor(s2);if(s2>=prov)clearInterval(t2);},40);
      },300);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.rv, .stat, .mapvis').forEach(el => io.observe(el));

// ── FALLBACK: show everything after 800ms no matter what ──
setTimeout(() => {
  document.querySelectorAll('.rv').forEach(el => el.classList.add('vis'));
}, 800);

// ─────────────────────────
// ── ADMIN PANEL ──
// ─────────────────────────
let adminUnlocked = false;
function openAdmin() {
  document.getElementById('adminOv').classList.add('open');
  if(!adminUnlocked) {
    document.getElementById('loginWrap').style.display='flex';
    document.getElementById('adminContent').style.display='none';
    setTimeout(()=>document.getElementById('pwIn').focus(),80);
  }
}
function closeAdmin() { document.getElementById('adminOv').classList.remove('open'); }
document.getElementById('adminOv').addEventListener('click', e=>{ if(e.target===document.getElementById('adminOv')) closeAdmin(); });
function checkPw() {
  if(document.getElementById('pwIn').value===(LS('pw')||DEFAULTS.pw)){
    adminUnlocked=true;
    document.getElementById('loginWrap').style.display='none';
    document.getElementById('adminContent').style.display='block';
    loadFields();
  } else {
    document.getElementById('loginErr').style.display='block';
    document.getElementById('pwIn').value=''; document.getElementById('pwIn').focus();
  }
}
function aTab(btn,name) {
  document.querySelectorAll('.atab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.asec').forEach(s=>s.classList.remove('on'));
  btn.classList.add('on'); document.getElementById('ap-'+name).classList.add('on');
}
function flash(id) { const el=document.getElementById('done-'+id); if(el){el.style.opacity=1;setTimeout(()=>el.style.opacity=0,2500);} }
function loadFields() {
  const d=gd('info');
  ['name','cargo','email','phone','addr','slogan','fb','ig','tt','yt'].forEach(k=>{ const el=document.getElementById('ai-'+k); if(el) el.value=d[k]||''; });
  document.getElementById('ai-elec').value=LS('elec')||DEFAULTS.elec;
  const st=gd('stats');
  document.getElementById('ai-s1n').value=st[0].n; document.getElementById('ai-s1l').value=st[0].l;
  document.getElementById('ai-s2n').value=st[1].n; document.getElementById('ai-s2l').value=st[1].l;
  buildAgCards(); buildTsCards(); buildPvCards();
}
function saveInfo() {
  const d={};
  ['name','cargo','email','phone','addr','slogan','fb','ig','tt','yt'].forEach(k=>d[k]=document.getElementById('ai-'+k).value);
  LS('info',d);
  const sl=document.querySelector('.hdesc'); if(sl) sl.textContent=d.slogan;
  const dispE=document.getElementById('dispEmail'); if(dispE) dispE.textContent=d.email;
  const dispP=document.getElementById('dispPhone'); if(dispP) dispP.textContent=d.phone;
  const dispA=document.getElementById('dispAddr');  if(dispA) dispA.textContent=d.addr;
  ['fb','ig','tt','yt'].forEach(k=>{ const el=document.getElementById('soc-'+k); if(el&&d[k]) el.href=d[k]; });
  flash('info');
}
function buildAgCards() {
  const events=gd('agenda'); const cont=document.getElementById('agCards'); cont.innerHTML='';
  events.forEach((e,i)=>{
    const c=document.createElement('div'); c.className='acard';
    c.innerHTML=`<div class="acard-head"><span class="acard-n">Evento ${i+1}</span><button class="adel" onclick="this.closest('.acard').remove()">✕ Eliminar</button></div>
    <div class="arow"><div class="ag"><label class="al">Fecha</label><input class="ai" data-f="date" value="${e.date}"></div><div class="ag"><label class="al">Tipo</label><input class="ai" data-f="tag" value="${e.tag}"></div></div>
    <div class="ag"><label class="al">Título</label><input class="ai" data-f="title" value="${e.title}"></div>
    <div class="ag"><label class="al">Lugar y hora</label><input class="ai" data-f="loc" value="${e.loc}"></div>`;
    cont.appendChild(c);
  });
}
function addEvCard() {
  const cont=document.getElementById('agCards'); const i=cont.children.length+1;
  const c=document.createElement('div'); c.className='acard';
  c.innerHTML=`<div class="acard-head"><span class="acard-n">Evento ${i}</span><button class="adel" onclick="this.closest('.acard').remove()">✕ Eliminar</button></div>
  <div class="arow"><div class="ag"><label class="al">Fecha</label><input class="ai" data-f="date" placeholder="22 Mar · 2026"></div><div class="ag"><label class="al">Tipo</label><input class="ai" data-f="tag" placeholder="Presencial"></div></div>
  <div class="ag"><label class="al">Título</label><input class="ai" data-f="title" placeholder="Nombre del evento"></div>
  <div class="ag"><label class="al">Lugar y hora</label><input class="ai" data-f="loc" placeholder="Plaza X — 10:00 a.m."></div>`;
  cont.appendChild(c);
}
function saveAgenda() {
  const cards=[...document.querySelectorAll('#agCards .acard')];
  const events=cards.map(c=>({date:c.querySelector('[data-f=date]').value,title:c.querySelector('[data-f=title]').value,loc:c.querySelector('[data-f=loc]').value,tag:c.querySelector('[data-f=tag]').value}));
  LS('agenda',events); buildAgenda(events); flash('agenda');
}
function buildTsCards() {
  const testis=gd('testis'); const cont=document.getElementById('tsCards'); cont.innerHTML='';
  testis.forEach((t,i)=>{
    const c=document.createElement('div'); c.className='acard';
    c.innerHTML=`<div class="acard-head"><span class="acard-n">Testimonio ${i+1}</span><button class="adel" onclick="this.closest('.acard').remove()">✕ Eliminar</button></div>
    <div class="arow"><div class="ag"><label class="al">Nombre</label><input class="ai" data-f="name" value="${t.name}"></div><div class="ag"><label class="al">Provincia</label><input class="ai" data-f="from" value="${t.from}"></div></div>
    <div class="ag"><label class="al">Testimonio</label><textarea class="ai" data-f="text">${t.text}</textarea></div>`;
    cont.appendChild(c);
  });
}
function addTsCard() {
  const cont=document.getElementById('tsCards'); const i=cont.children.length+1;
  const c=document.createElement('div'); c.className='acard';
  c.innerHTML=`<div class="acard-head"><span class="acard-n">Testimonio ${i}</span><button class="adel" onclick="this.closest('.acard').remove()">✕ Eliminar</button></div>
  <div class="arow"><div class="ag"><label class="al">Nombre</label><input class="ai" data-f="name" placeholder="Nombre Apellido"></div><div class="ag"><label class="al">Provincia</label><input class="ai" data-f="from" placeholder="Puno"></div></div>
  <div class="ag"><label class="al">Testimonio</label><textarea class="ai" data-f="text" placeholder='"Tu testimonio aquí..."'></textarea></div>`;
  cont.appendChild(c);
}
function saveTestis() {
  const cards=[...document.querySelectorAll('#tsCards .acard')];
  const ts=cards.map(c=>({stars:'★★★★★',text:c.querySelector('[data-f=text]').value,name:c.querySelector('[data-f=name]').value,from:c.querySelector('[data-f=from]').value}));
  LS('testis',ts); buildTestis(ts); startTesti(); flash('testis');
}
function buildPvCards() {
  const provs=gd('provs'); const cont=document.getElementById('pvCards'); cont.innerHTML='';
  provs.forEach(p=>{
    const c=document.createElement('div'); c.className='acard';
    c.innerHTML=`<div style="display:flex;align-items:center;gap:1rem">
    <input class="ai" data-f="name" value="${p.name}" style="flex:1">
    <label style="display:flex;align-items:center;gap:.4rem;font-size:.82rem;font-weight:600;color:var(--mid);white-space:nowrap;cursor:none">
      <input type="checkbox" data-f="v" ${p.v?'checked':''} style="width:15px;height:15px;accent-color:#CC0018"> Visitada
    </label>
    <button class="adel" onclick="this.closest('.acard').remove()">✕</button></div>`;
    cont.appendChild(c);
  });
}
function saveProvs() {
  const items=[...document.querySelectorAll('#pvCards .acard')];
  const ps=items.map(c=>({name:c.querySelector('[data-f=name]').value,v:c.querySelector('[data-f=v]').checked}));
  LS('provs',ps); buildProvs(ps); flash('provs');
}
function saveCfg() {
  LS('elec',document.getElementById('ai-elec').value);
  const np=document.getElementById('ai-npw').value; if(np.trim()) LS('pw',np.trim());
  LS('stats',[{n:parseInt(document.getElementById('ai-s1n').value)||15,l:document.getElementById('ai-s1l').value},{n:parseInt(document.getElementById('ai-s2n').value)||11,l:document.getElementById('ai-s2l').value}]);
  flash('cfg');
}
