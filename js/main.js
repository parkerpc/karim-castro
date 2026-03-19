// ── COMPAT: fallback to config loaded from GitHub ──
function gd(k){ return _config ? _config[k] : DEFAULTS[k]; }
function LS(k,v){ /* legacy - unused */ }

const DEFAULTS={
  pw:'karim2026',
  info:{name:'Karim Castro',cargo:'Diputada por la Región Puno',email:'contacto@karimcastro.pe',phone:'+51 999 999 999',addr:'Av. El Sol 123, Puno',slogan:'Experiencia, preparación y voluntad de servicio. Una voz firme por el desarrollo real de Puno en el Congreso Nacional.',fb:'#',ig:'#',tt:'#',yt:'#'},
  elec:'2026-04-11T08:00',
  stats:[{n:15,l:'Años de trayectoria'},{n:11,l:'Provincias visitadas'}],
  bio:{
    educacion:[{titulo:'Maestría en Gestión Pública',inst:'Universidad Nacional del Altiplano',anio:'2015'},{titulo:'Licenciada en [Especialidad]',inst:'Universidad [Nombre]',anio:'2008'}],
    experiencia:[{cargo:'[Cargo anterior]',inst:'[Institución]',periodo:'2018 - 2022'},{cargo:'Docente universitaria',inst:'Universidad Nacional del Altiplano',periodo:'2016 - presente'}]
  },
  agenda:[
    {date:'15 Mar · 2026',title:'Cabildo abierto en Juliaca',loc:'Plaza Bolognesi, Juliaca — 10:00 a.m.',tag:'Presencial'},
    {date:'18 Mar · 2026',title:'Visita a comunidades de Capachica',loc:'Distrito de Capachica — 9:00 a.m.',tag:'Comunidad'},
    {date:'22 Mar · 2026',title:'Foro educativo regional',loc:'Auditorio UNA PUNO — 3:00 p.m.',tag:'Foro'},
    {date:'28 Mar · 2026',title:'Mitin central de campaña',loc:'Plaza de Armas, Puno — 6:00 p.m.',tag:'Mitin'}
  ],
  testis:[
    {stars:'★★★★★',text:'"Karim conoce Puno de verdad. La he visto en mi comunidad, hablando con la gente."',name:'José Quispe',from:'Azángaro'},
    {stars:'★★★★★',text:'"Como agricultora, necesitamos a alguien que entienda el campo. Karim tiene propuestas reales."',name:'María Condori',from:'Capachica'},
    {stars:'★★★★★',text:'"Tiene propuestas concretas, no promesas vacías. Le doy mi voto con convicción."',name:'Carlos Mamani',from:'Juliaca'},
    {stars:'★★★★★',text:'"La salud en las comunidades rurales es un drama. Karim lo sabe y tiene un plan real."',name:'Rosa Huanca',from:'Ilave'},
    {stars:'★★★★★',text:'"Joven, preparada y con amor por Puno. El N°2 de Ahora Nación."',name:'Pedro Flores',from:'Puno ciudad'}
  ],
  provs:[
    {name:'Puno',v:true},{name:'Juliaca (San Román)',v:true},{name:'Azángaro',v:true},{name:'Melgar',v:true},
    {name:'Carabaya',v:true},{name:'Chucuito',v:true},{name:'El Collao (Ilave)',v:true},{name:'Huancané',v:true},
    {name:'Lampa',v:true},{name:'Moho',v:true},{name:'Yunguyo',v:true},{name:'Sandia',v:false},{name:'Putina',v:false}
  ]
};

// ── CURSOR ──
const curEl=document.getElementById('cursor'),ringEl=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;curEl.style.left=mx+'px';curEl.style.top=my+'px'});
(function animR(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ringEl.style.left=rx+'px';ringEl.style.top=ry+'px';requestAnimationFrame(animR)})();
const trails=[];
for(let i=0;i<6;i++){const t=document.createElement('div');t.className='trail';document.body.appendChild(t);trails.push({el:t,x:0,y:0})}
(function animTrail(){trails.forEach((t,i)=>{const prev=i===0?{x:mx,y:my}:trails[i-1];t.x+=(prev.x-t.x)*.25;t.y+=(prev.y-t.y)*.25;t.el.style.left=t.x+'px';t.el.style.top=t.y+'px';t.el.style.opacity=1-(i/trails.length)*.8});requestAnimationFrame(animTrail)})();

// ── COUNTDOWN ──
function tick(){
  const diff=new Date(LS('elec')||DEFAULTS.elec)-new Date();
  if(diff<=0){document.getElementById('cdd').textContent='🗳️';['cdh','cdm','cds'].forEach(id=>document.getElementById(id).textContent='00');return}
  const d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
  document.getElementById('cdd').textContent=String(d).padStart(2,'0');
  document.getElementById('cdh').textContent=String(h).padStart(2,'0');
  document.getElementById('cdm').textContent=String(m).padStart(2,'0');
  document.getElementById('cds').textContent=String(s).padStart(2,'0');
}
tick();setInterval(tick,1000);

// ── SCROLL ──
window.addEventListener('scroll',()=>{
  const pct=(document.documentElement.scrollTop/(document.documentElement.scrollHeight-document.documentElement.clientHeight))*100;
  document.getElementById('progress').style.width=pct+'%';
  document.getElementById('nav').classList.toggle('sc',window.scrollY>60);
  document.getElementById('floatVote').classList.toggle('show',window.scrollY>400);
  const img=document.querySelector('.hero-photo img');
  if(img)img.style.transform=`translateY(${window.scrollY*.15}px)`;
},{passive:true});

// ── PROPUESTAS ──
const PROPS=[
  {ico:'🏥',name:'Salud',hint:'Centros rurales y medicamentos',body:'Acceso a servicios de salud de calidad para cada puneño, especialmente en zonas rurales.',items:['Ampliación de centros de salud en comunidades alejadas','Medicamentos esenciales gratuitos en postas rurales','Programas de salud preventiva y vacunación masiva','Telemedicina para zonas sin médico permanente','Atención especializada en ginecología y pediatría']},
  {ico:'📚',name:'Educación',hint:'Infraestructura y becas',body:'Fortalecer la educación pública para que ningún niño puneño quede sin acceso a enseñanza de calidad.',items:['Construcción y refacción de escuelas en zonas rurales','Dotación de equipos y conectividad digital','Becas para estudiantes destacados de las 13 provincias','Formación continua y salarios dignos para docentes','Revaloración del idioma aimara y quechua']},
  {ico:'🌾',name:'Agro y ganadería',hint:'Tecnificación y seguros',body:'El campo es el sustento de miles de familias puneñas. Modernizaremos el sector con identidad.',items:['Tecnificación del riego en el altiplano','Seguro agrario para pequeños productores','Mejores precios y mercados para la producción local','Créditos blandos para el agro familiar','Ferias agropecuarias y cadenas de exportación']},
  {ico:'🛤️',name:'Infraestructura',hint:'Carreteras y conectividad',body:'Conectar Puno es conectar oportunidades. Gestionaremos presupuesto para la red vial de las 13 provincias.',items:['Asfaltado en provincias alejadas','Mantenimiento de trochas rurales','Puentes que integren comunidades aisladas','Supervisión de obras sin corrupción','Internet y energía eléctrica en zonas rurales']},
  {ico:'💼',name:'Empleo',hint:'Empresa local y turismo',body:'Generaremos condiciones para que el talento puneño produzca prosperidad dentro de la región.',items:['Incentivos para empresas que contraten en Puno','Fomento del turismo sostenible en el Titicaca','Apoyo a artesanos y emprendedores locales','Ferias productivas y mercados de exportación','Formalización de la economía informal']},
  {ico:'🌿',name:'Medio ambiente',hint:'Protección del Titicaca',body:'El Lago Titicaca es patrimonio del mundo. Lo protegeremos con acciones legislativas concretas.',items:['Plan urgente de descontaminación del Titicaca','Gestión de residuos sólidos en las 13 provincias','Reforestación de zonas degradadas','Educación ambiental en escuelas','Fiscalización de minería informal']}
];
(function(){
  const tabs=document.getElementById('propTabs');
  PROPS.forEach((p,i)=>{
    const t=document.createElement('div');t.className='tab'+(i===0?' active':'');
    t.innerHTML=`<div class="tico">${p.ico}</div><div><div class="tname">${p.name}</div><div class="thint">${p.hint}</div><div class="tbar"><div class="tfill"></div></div></div>`;
    t.onclick=()=>{document.querySelectorAll('.tab').forEach((x,j)=>x.classList.toggle('active',j===i));renderProp(i)};
    tabs.appendChild(t);
  });renderProp(0);
})();
function renderProp(i){const p=PROPS[i];document.getElementById('propDetail').innerHTML=`<span class="dico">${p.ico}</span><div class="dtitle danim">${p.name}</div><div class="dbody danim">${p.body}</div><ul class="dlist danim">${p.items.map(t=>`<li>${t}</li>`).join('')}</ul>`}

// ── GALERÍA ──
// ── GALERÍA ──
const GALCOLORS=['#CC0018','#A30013','#E83347','#8B0010','#FF4560','#D4001A','#B00016','#F5293E','#950012','#6D000D'];
const GALDEF=[
  {label:'Cabildo en Juliaca',src:null},{label:'Visita Capachica',src:null},{label:'Foro educativo',src:null},
  {label:'Comunidades Ilave',src:null},{label:'Reunión Azángaro',src:null},{label:'Mitin Puno',src:null},
  {label:'Visita Yunguyo',src:null},{label:'Recorrido Lampa',src:null},{label:'Evento Huancané',src:null},{label:'Movilización Juli',src:null}
];
function getGaleria(){return LS('galeria')||GALDEF}
function buildGal(){
  const g=document.getElementById('galGrid');g.innerHTML='';
  const items=getGaleria();
  items.forEach((item,i)=>{
    const el=document.createElement('div');el.className='gitem';
    if(item.src){
      el.innerHTML=`<div class="gitem-inner" style="background:#111"><img src="${item.src}" alt="${item.label}" style="width:100%;height:100%;object-fit:cover"></div><div class="gover"><div class="gzoom"><svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/></svg></div></div>`;
    }else{
      el.innerHTML=`<div class="gitem-inner" style="background:${GALCOLORS[i%GALCOLORS.length]}"><div style="font-size:2rem;opacity:.15">📸</div><div style="font-size:.7rem;font-weight:600;color:rgba(255,255,255,.65);text-align:center;padding:0 .75rem">${item.label}</div></div><div class="gover"><div class="gzoom"><svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/></svg></div></div>`;
    }
    el.onclick=()=>openLb(i);g.appendChild(el);
  });
}
buildGal();
function openLb(idx){
  const items=getGaleria();const item=items[idx];
  document.getElementById('lbimg').src=item.src||'';
  if(!item.src){
    const canvas=document.createElement('canvas');canvas.width=800;canvas.height=600;
    const ctx=canvas.getContext('2d');ctx.fillStyle=GALCOLORS[idx%GALCOLORS.length];ctx.fillRect(0,0,800,600);
    ctx.fillStyle='rgba(255,255,255,.08)';ctx.font='bold 120px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('📸',400,260);
    ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='bold 26px sans-serif';ctx.fillText(item.label,400,420);
    document.getElementById('lbimg').src=canvas.toDataURL();
  }
  document.getElementById('lb').dataset.idx=idx;
  document.getElementById('lb').classList.add('open');
}
document.getElementById('lbclose').onclick=()=>document.getElementById('lb').classList.remove('open');
document.getElementById('lbprev').onclick=()=>{const lb=document.getElementById('lb');openLb((parseInt(lb.dataset.idx)-1+getGaleria().length)%getGaleria().length)};
document.getElementById('lbnext').onclick=()=>{const lb=document.getElementById('lb');openLb((parseInt(lb.dataset.idx)+1)%getGaleria().length)};
// Click outside photo to close
document.getElementById('lb').addEventListener('click',e=>{if(e.target===document.getElementById('lb'))document.getElementById('lb').classList.remove('open')});
// Keyboard nav
document.addEventListener('keydown',e=>{
  const lb=document.getElementById('lb');
  if(!lb.classList.contains('open'))return;
  if(e.key==='Escape'){lb.classList.remove('open');closeAdmin()}
  else if(e.key==='ArrowRight')openLb((parseInt(lb.dataset.idx)+1)%getGaleria().length);
  else if(e.key==='ArrowLeft')openLb((parseInt(lb.dataset.idx)-1+getGaleria().length)%getGaleria().length);
});

// ── TESTIMONIOS ──
let testiIdx=0,testiTimer;
function buildTestis(testis){
  const track=document.getElementById('ttrack'),dots=document.getElementById('tdots');
  if(!track||!dots)return;
  track.innerHTML='';dots.innerHTML='';
  testis.forEach((t,i)=>{
    const ini=t.name.split(' ').map(w=>w[0]).join('').slice(0,2);
    const card=document.createElement('div');card.className='tcard';
    card.innerHTML=`<div class="tstars">${t.stars||'★★★★★'}</div><div class="ttxt">${t.text}</div><div class="tauth"><div class="tavi">${ini}</div><div><div class="taname">${t.name}</div><div class="tafrom">${t.from} · Puno</div></div></div>`;
    track.appendChild(card);
    const dot=document.createElement('div');dot.className='tdot'+(i===0?' active':'');
    dot.onclick=()=>goTesti(i);dots.appendChild(dot);
  });testiIdx=0;
}
function goTesti(i){
  testiIdx=i;
  const w=(document.querySelector('.tcard')||{offsetWidth:320}).offsetWidth+24;
  document.getElementById('ttrack').style.transform=`translateX(-${i*w}px)`;
  document.querySelectorAll('.tdot').forEach((d,j)=>d.classList.toggle('active',j===i));
}
function startTesti(){clearInterval(testiTimer);testiTimer=setInterval(()=>goTesti((testiIdx+1)%gd('testis').length),5000)}
document.getElementById('tprev').onclick=()=>goTesti((testiIdx-1+gd('testis').length)%gd('testis').length);
document.getElementById('tnext').onclick=()=>goTesti((testiIdx+1)%gd('testis').length);

// ── PROVINCIAS ──
function buildProvs(provs){
  const list=document.getElementById('provList');if(!list)return;
  list.innerHTML='';let visited=0;
  provs.forEach(p=>{
    if(p.v)visited++;
    const item=document.createElement('div');item.className='pitem '+(p.v?'v':'p');
    item.innerHTML=`<span class="pitem-dot"></span><span class="pname">${p.name}</span>`;
    list.appendChild(item);
  });
  const pct=Math.round((visited/provs.length)*100);
  const numEl=document.getElementById('mapNum');if(numEl)numEl.textContent=visited;
  const pctEl=document.getElementById('mapPct');if(pctEl)pctEl.textContent=pct+'%';
  const pctEl2=document.getElementById('mapPct2');if(pctEl2)pctEl2.textContent=pct+'%';
  const fill=document.getElementById('mbarFill');if(fill)fill.style.width=pct+'%';
}

// ── AGENDA ──
function buildAgenda(events){
  const grid=document.getElementById('agendaGrid');if(!grid)return;
  grid.innerHTML='';
  events.forEach(e=>{
    const d=document.createElement('div');d.className='ev';
    d.innerHTML=`<div class="evdate">${e.date}</div><div class="evtitle">${e.title}</div><div class="evloc">${e.loc}</div><div class="evtag">${e.tag}</div>`;
    grid.appendChild(d);
  });
}

// ── BIO ──
function applyBio(bio){
  const tl=document.getElementById('bioTimeline');if(!tl)return;
  tl.innerHTML='';
  (bio.educacion||[]).forEach((e,i)=>{
    const div=document.createElement('div');div.className='tli';
    div.innerHTML=`<div class="tldot">0${i+1}</div><div><div class="tlyr">Educación · ${e.anio}</div><div class="tltxt">${e.titulo} — ${e.inst}</div></div>`;
    tl.appendChild(div);
  });
  (bio.experiencia||[]).forEach((e,i)=>{
    const div=document.createElement('div');div.className='tli';
    div.innerHTML=`<div class="tldot">E${i+1}</div><div><div class="tlyr">Experiencia · ${e.periodo}</div><div class="tltxt">${e.cargo} — ${e.inst}</div></div>`;
    tl.appendChild(div);
  });
}

// ── INIT ──
buildTestis(gd('testis'));
buildProvs(gd('provs'));
buildAgenda(gd('agenda'));
startTesti();
(function(){const bio=LS('bio');if(bio)applyBio(bio)})();

// Apply saved info
(function(){
  const d=LS('info');if(!d)return;
  const sl=document.querySelector('.hdesc');if(sl&&d.slogan)sl.textContent=d.slogan;
  const dispE=document.getElementById('dispEmail');if(dispE)dispE.textContent=d.email;
  const dispP=document.getElementById('dispPhone');if(dispP)dispP.textContent=d.phone;
  const dispA=document.getElementById('dispAddr');if(dispA)dispA.textContent=d.addr;
  ['fb','ig','tt','yt'].forEach(k=>{const el=document.getElementById('soc-'+k);if(el&&d[k])el.href=d[k]});
})();

// ── INTERSECTION OBSERVER ──
const done=new Set();
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.add('vis');
    const n=e.target.querySelector('[data-target]');
    if(n&&!done.has(n)){
      done.add(n);let s=0,tg=parseInt(n.dataset.target);
      const ac=n.querySelector('.ac');
      const t=setInterval(()=>{s=Math.min(s+tg/120,tg);if(ac)n.childNodes[0].textContent=Math.floor(s);else n.textContent=Math.floor(s);if(s>=tg)clearInterval(t)},16);
    }
  });
},{threshold:.1});
document.querySelectorAll('.rv,.stat').forEach(el=>io.observe(el));
setTimeout(()=>document.querySelectorAll('.rv').forEach(el=>el.classList.add('vis')),800);

// ── MOBILE MENU ──
const burger=document.getElementById('burger'),mobmenu=document.getElementById('mobmenu');
burger.addEventListener('click',()=>{burger.classList.toggle('open');mobmenu.classList.toggle('open')});
function closeMob(){burger.classList.remove('open');mobmenu.classList.remove('open')}

// ── FORM ──
function submitForm(e){
  e.preventDefault();
  const fields=[['fn',v=>v.trim().length>0],['fl',v=>v.trim().length>0],['fe',v=>v.includes('@')],['fm',v=>v.trim().length>0]];
  let ok=true;
  fields.forEach(([id,test])=>{const el=document.getElementById(id);const valid=test(el.value);el.classList.toggle('err',!valid);el.classList.toggle('ok',valid);if(!valid)ok=false});
  if(!ok)return;
  const btn=document.getElementById('fBtn');btn.textContent='Enviando…';btn.disabled=true;
  setTimeout(()=>{document.getElementById('cform').style.display='none';document.getElementById('fsuc').style.display='block'},1200);
}
['fn','fl','fe','fm'].forEach(id=>{document.getElementById(id).addEventListener('input',function(){this.classList.remove('err');this.classList.toggle('ok',this.value.trim().length>0)})});

function copyLink(){navigator.clipboard.writeText(window.location.href).then(()=>{const el=document.getElementById('copyTxt');el.textContent='¡Copiado!';setTimeout(()=>el.textContent='Copiar link',2000)})}

// ── VOTO IMAGE ──
function applyVotoImg(src){const box=document.getElementById('votoImgBox');if(!box)return;box.innerHTML=`<img src="${src}" alt="Cédula" style="width:100%;border-radius:8px;display:block">`}
(function(){const src=LS('votoImg');if(src)applyVotoImg(src)})();
function previewVotoImg(input){if(!input.files||!input.files[0])return;const reader=new FileReader();reader.onload=e=>{document.getElementById('votoImgPreviewImg').src=e.target.result;document.getElementById('votoImgPreview').style.display='block'};reader.readAsDataURL(input.files[0])}
function saveVotoImg(){const input=document.getElementById('ai-votoimg');if(!input.files||!input.files[0])return;const reader=new FileReader();reader.onload=e=>{LS('votoImg',e.target.result);applyVotoImg(e.target.result);flash('cfg')};reader.readAsDataURL(input.files[0])}

// ── ADMIN ──
let adminUnlocked=false;

function closeAdmin(){document.getElementById('adminOv').classList.remove('open')}
document.getElementById('adminOv').addEventListener('click',e=>{if(e.target===document.getElementById('adminOv'))closeAdmin()});
function checkPw(){
  if(document.getElementById('pwIn').value===(LS('pw')||DEFAULTS.pw)){
    adminUnlocked=true;document.getElementById('loginWrap').style.display='none';document.getElementById('adminContent').style.display='block';loadFields();
  }else{document.getElementById('loginErr').style.display='block';document.getElementById('pwIn').value='';document.getElementById('pwIn').focus()}
}
function aTab(btn,name){document.querySelectorAll('.atab').forEach(t=>t.classList.remove('on'));document.querySelectorAll('.asec').forEach(s=>s.classList.remove('on'));btn.classList.add('on');document.getElementById('ap-'+name).classList.add('on')}
function flash(id){const el=document.getElementById('done-'+id);if(el){el.style.opacity=1;setTimeout(()=>el.style.opacity=0,2500)}}
function loadFields(){
  const d=gd('info');
  ['name','cargo','email','phone','addr','slogan','fb','ig','tt','yt'].forEach(k=>{const el=document.getElementById('ai-'+k);if(el)el.value=d[k]||''});
  document.getElementById('ai-elec').value=LS('elec')||DEFAULTS.elec;
  const st=gd('stats');
  document.getElementById('ai-s1n').value=st[0].n;document.getElementById('ai-s1l').value=st[0].l;
  document.getElementById('ai-s2n').value=st[1].n;document.getElementById('ai-s2l').value=st[1].l;
  buildAgCards();buildTsCards();buildPvCards();buildEduCards();buildExpCards();buildGalCards();
}
function saveInfo(){
  const d={};['name','cargo','email','phone','addr','slogan','fb','ig','tt','yt'].forEach(k=>d[k]=document.getElementById('ai-'+k).value);
  LS('info',d);
  const sl=document.querySelector('.hdesc');if(sl)sl.textContent=d.slogan;
  const dispE=document.getElementById('dispEmail');if(dispE)dispE.textContent=d.email;
  const dispP=document.getElementById('dispPhone');if(dispP)dispP.textContent=d.phone;
  const dispA=document.getElementById('dispAddr');if(dispA)dispA.textContent=d.addr;
  ['fb','ig','tt','yt'].forEach(k=>{const el=document.getElementById('soc-'+k);if(el&&d[k])el.href=d[k]});
  flash('info');
}
function buildAgCards(){
  const events=gd('agenda'),cont=document.getElementById('agCards');cont.innerHTML='';
  events.forEach((e,i)=>{
    const c=document.createElement('div');c.className='acard';
    c.innerHTML=`<div class="acard-head"><span class="acard-n">Evento ${i+1}</span><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div>
    <div class="arow"><div class="ag"><label class="al">Fecha</label><input class="ai" data-f="date" value="${e.date}"></div><div class="ag"><label class="al">Tipo</label><input class="ai" data-f="tag" value="${e.tag}"></div></div>
    <div class="ag"><label class="al">Título</label><input class="ai" data-f="title" value="${e.title}"></div>
    <div class="ag"><label class="al">Lugar y hora</label><input class="ai" data-f="loc" value="${e.loc}"></div>`;
    cont.appendChild(c);
  });
}
function addEvCard(){const cont=document.getElementById('agCards');const i=cont.children.length+1;const c=document.createElement('div');c.className='acard';c.innerHTML=`<div class="acard-head"><span class="acard-n">Evento ${i}</span><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div><div class="arow"><div class="ag"><label class="al">Fecha</label><input class="ai" data-f="date" placeholder="22 Mar · 2026"></div><div class="ag"><label class="al">Tipo</label><input class="ai" data-f="tag" placeholder="Presencial"></div></div><div class="ag"><label class="al">Título</label><input class="ai" data-f="title" placeholder="Nombre del evento"></div><div class="ag"><label class="al">Lugar y hora</label><input class="ai" data-f="loc" placeholder="Plaza X — 10:00 a.m."></div>`;cont.appendChild(c)}
function saveAgenda(){const cards=[...document.querySelectorAll('#agCards .acard')];const events=cards.map(c=>({date:c.querySelector('[data-f=date]').value,title:c.querySelector('[data-f=title]').value,loc:c.querySelector('[data-f=loc]').value,tag:c.querySelector('[data-f=tag]').value}));LS('agenda',events);buildAgenda(events);flash('agenda')}
function buildTsCards(){
  const testis=gd('testis'),cont=document.getElementById('tsCards');cont.innerHTML='';
  testis.forEach((t,i)=>{const c=document.createElement('div');c.className='acard';c.innerHTML=`<div class="acard-head"><span class="acard-n">Testimonio ${i+1}</span><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div><div class="arow"><div class="ag"><label class="al">Nombre</label><input class="ai" data-f="name" value="${t.name}"></div><div class="ag"><label class="al">Provincia</label><input class="ai" data-f="from" value="${t.from}"></div></div><div class="ag"><label class="al">Testimonio</label><textarea class="ai" data-f="text">${t.text}</textarea></div>`;cont.appendChild(c)});
}
function addTsCard(){const cont=document.getElementById('tsCards');const i=cont.children.length+1;const c=document.createElement('div');c.className='acard';c.innerHTML=`<div class="acard-head"><span class="acard-n">Testimonio ${i}</span><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div><div class="arow"><div class="ag"><label class="al">Nombre</label><input class="ai" data-f="name" placeholder="Nombre Apellido"></div><div class="ag"><label class="al">Provincia</label><input class="ai" data-f="from" placeholder="Puno"></div></div><div class="ag"><label class="al">Testimonio</label><textarea class="ai" data-f="text" placeholder='"Tu testimonio aquí..."'></textarea></div>`;cont.appendChild(c)}
function saveTestis(){const cards=[...document.querySelectorAll('#tsCards .acard')];const ts=cards.map(c=>({stars:'★★★★★',text:c.querySelector('[data-f=text]').value,name:c.querySelector('[data-f=name]').value,from:c.querySelector('[data-f=from]').value}));LS('testis',ts);buildTestis(ts);startTesti();flash('testis')}
function buildPvCards(){
  const provs=gd('provs'),cont=document.getElementById('pvCards');cont.innerHTML='';
  provs.forEach(p=>{const c=document.createElement('div');c.className='acard';c.innerHTML=`<div style="display:flex;align-items:center;gap:1rem"><input class="ai" data-f="name" value="${p.name}" style="flex:1"><label style="display:flex;align-items:center;gap:.4rem;font-size:.82rem;font-weight:600;color:var(--mid);white-space:nowrap;cursor:none"><input type="checkbox" data-f="v" ${p.v?'checked':''} style="width:15px;height:15px;accent-color:#CC0018"> Visitada</label><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div>`;cont.appendChild(c)});
}
function saveProvs(){const items=[...document.querySelectorAll('#pvCards .acard')];const ps=items.map(c=>({name:c.querySelector('[data-f=name]').value,v:c.querySelector('[data-f=v]').checked}));LS('provs',ps);buildProvs(ps);flash('provs')}
function buildEduCards(){
  const bio=gd('bio'),cont=document.getElementById('eduCards');cont.innerHTML='';
  (bio.educacion||[]).forEach((e,i)=>{const c=document.createElement('div');c.className='acard';c.innerHTML=`<div class="acard-head"><span class="acard-n">Educación ${i+1}</span><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div><div class="ag"><label class="al">Título / Grado</label><input class="ai" data-f="titulo" value="${e.titulo}"></div><div class="arow"><div class="ag"><label class="al">Institución</label><input class="ai" data-f="inst" value="${e.inst}"></div><div class="ag"><label class="al">Año</label><input class="ai" data-f="anio" value="${e.anio}"></div></div>`;cont.appendChild(c)});
}
function addEduCard(){const cont=document.getElementById('eduCards');const i=cont.children.length+1;const c=document.createElement('div');c.className='acard';c.innerHTML=`<div class="acard-head"><span class="acard-n">Educación ${i}</span><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div><div class="ag"><label class="al">Título / Grado</label><input class="ai" data-f="titulo" placeholder="Maestría en Gestión Pública"></div><div class="arow"><div class="ag"><label class="al">Institución</label><input class="ai" data-f="inst" placeholder="Universidad Nacional del Altiplano"></div><div class="ag"><label class="al">Año</label><input class="ai" data-f="anio" placeholder="2015"></div></div>`;cont.appendChild(c)}
function buildExpCards(){
  const bio=gd('bio'),cont=document.getElementById('expCards');cont.innerHTML='';
  (bio.experiencia||[]).forEach((e,i)=>{const c=document.createElement('div');c.className='acard';c.innerHTML=`<div class="acard-head"><span class="acard-n">Experiencia ${i+1}</span><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div><div class="ag"><label class="al">Cargo</label><input class="ai" data-f="cargo" value="${e.cargo}"></div><div class="arow"><div class="ag"><label class="al">Institución</label><input class="ai" data-f="inst" value="${e.inst}"></div><div class="ag"><label class="al">Período</label><input class="ai" data-f="periodo" value="${e.periodo}"></div></div>`;cont.appendChild(c)});
}
function addExpCard(){const cont=document.getElementById('expCards');const i=cont.children.length+1;const c=document.createElement('div');c.className='acard';c.innerHTML=`<div class="acard-head"><span class="acard-n">Experiencia ${i}</span><button class="adel" onclick="this.closest('.acard').remove()">✕</button></div><div class="ag"><label class="al">Cargo</label><input class="ai" data-f="cargo" placeholder="Directora Regional de Salud"></div><div class="arow"><div class="ag"><label class="al">Institución</label><input class="ai" data-f="inst" placeholder="Gobierno Regional Puno"></div><div class="ag"><label class="al">Período</label><input class="ai" data-f="periodo" placeholder="2018 - 2022"></div></div>`;cont.appendChild(c)}
function saveBio(){
  const bio={educacion:[...document.querySelectorAll('#eduCards .acard')].map(c=>({titulo:c.querySelector('[data-f=titulo]').value,inst:c.querySelector('[data-f=inst]').value,anio:c.querySelector('[data-f=anio]').value})),experiencia:[...document.querySelectorAll('#expCards .acard')].map(c=>({cargo:c.querySelector('[data-f=cargo]').value,inst:c.querySelector('[data-f=inst]').value,periodo:c.querySelector('[data-f=periodo]').value}))};
  LS('bio',bio);applyBio(bio);flash('bio');
}

// ── ADMIN GALERÍA ──
function buildGalCards(){
  const items=getGaleria();const cont=document.getElementById('galCards');cont.innerHTML='';
  items.forEach((item,i)=>{
    const c=document.createElement('div');c.className='acard';
    const thumb=item.src?`<img src="${item.src}" style="width:100%;height:80px;object-fit:cover;border-radius:5px;margin-bottom:.5rem">`:
      `<div style="width:100%;height:80px;background:${GALCOLORS[i%GALCOLORS.length]};border-radius:5px;margin-bottom:.5rem;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);font-size:.75rem">Sin foto</div>`;
    c.innerHTML=`<div class="acard-head"><span class="acard-n">Foto ${i+1}</span><button class="adel" onclick="removeGalPhoto(${i})">✕ Quitar foto</button></div>
    ${thumb}
    <div class="ag"><label class="al">Descripción</label><input class="ai" data-f="label" value="${item.label}"></div>
    <div class="ag"><label class="al">Subir foto</label><input type="file" accept="image/*" style="font-size:.78rem;padding:4px;width:100%" onchange="uploadGalPhoto(${i},this)"></div>`;
    cont.appendChild(c);
  });
}
function uploadGalPhoto(idx,input){
  if(!input.files||!input.files[0])return;
  const reader=new FileReader();
  reader.onload=e=>{
    const items=getGaleria();items[idx].src=e.target.result;
    LS('galeria',items);buildGalCards();buildGal();
  };
  reader.readAsDataURL(input.files[0]);
}
function removeGalPhoto(idx){
  const items=getGaleria();items[idx].src=null;
  LS('galeria',items);buildGalCards();buildGal();
}
function saveGalLabels(){
  const items=getGaleria();
  [...document.querySelectorAll('#galCards .acard')].forEach((c,i)=>{
    if(items[i])items[i].label=c.querySelector('[data-f=label]').value;
  });
  LS('galeria',items);buildGal();flash('gal');
}
function addGalSlot(){
  const items=getGaleria();
  items.push({label:'Nuevo evento',src:null});
  LS('galeria',items);buildGalCards();
}

function saveCfg(){LS('elec',document.getElementById('ai-elec').value);const np=document.getElementById('ai-npw').value;if(np.trim())LS('pw',np.trim());LS('stats',[{n:parseInt(document.getElementById('ai-s1n').value)||15,l:document.getElementById('ai-s1l').value},{n:parseInt(document.getElementById('ai-s2n').value)||11,l:document.getElementById('ai-s2l').value}]);flash('cfg')}

// ── VOLUNTARIOS ──
function openVol(){
  document.getElementById('volOverlay').classList.add('open');
  document.getElementById('volFormWrap').style.display='block';
  document.getElementById('volSuccess').style.display='none';
}
function closeVol(){document.getElementById('volOverlay').classList.remove('open')}
document.getElementById('volOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('volOverlay'))closeVol()});

// Style checkboxes on change
document.querySelectorAll('.vol-check input').forEach(cb=>{
  cb.addEventListener('change',function(){
    this.closest('.vol-check').classList.toggle('checked',this.checked);
  });
});

function submitVol(){
  const fn=document.getElementById('vfn');
  const fl=document.getElementById('vfl');
  const fw=document.getElementById('vfw');
  const fp=document.getElementById('vfp');
  let ok=true;
  [fn,fl,fw,fp].forEach(el=>{
    const valid=el.value.trim().length>0;
    el.classList.toggle('err',!valid);
    el.classList.toggle('ok',valid);
    if(!valid)ok=false;
  });
  if(!ok)return;

  const checks=[...document.querySelectorAll('.vol-check input:checked')].map(c=>c.value);
  const nombre=fn.value.trim()+' '+fl.value.trim();
  const phone=fw.value.trim();
  const prov=fp.value;

  // Save to localStorage list
  const vols=LS('voluntarios')||[];
  vols.push({nombre,phone,prov,roles:checks,fecha:new Date().toLocaleDateString('es-PE')});
  LS('voluntarios',vols);

  // Build WhatsApp message to campaign number
  const info=LS('info')||DEFAULTS.info;
  const campPhone=(info.phone||'').replace(/\D/g,'');
  const msg=encodeURIComponent(`¡Hola! Me llamo ${nombre}, soy de ${prov} y quiero ser voluntario/a de campaña de Karim Castro N°2.\nMi WhatsApp: ${phone}\nPuedo ayudar en: ${checks.join(', ')||'(sin especificar)'}`);
  document.getElementById('volWaBtn').href=`https://wa.me/${campPhone}?text=${msg}`;

  // Show success
  document.getElementById('volFormWrap').style.display='none';
  document.getElementById('volSuccess').style.display='block';
}

// ── INIT: load from GitHub on page start ──
async function initSite() {
  const cfg = await loadConfig();

  // Apply info
  const d = cfg.info || {};
  const sl = document.querySelector('.hdesc'); if(sl&&d.slogan) sl.textContent = d.slogan;
  const dispE = document.getElementById('dispEmail'); if(dispE) dispE.textContent = d.email||'';
  const dispP = document.getElementById('dispPhone'); if(dispP) dispP.textContent = d.phone||'';
  const dispA = document.getElementById('dispAddr');  if(dispA) dispA.textContent = d.addr||'';
  ['fb','ig','tt','yt'].forEach(k=>{ const el=document.getElementById('soc-'+k); if(el&&d[k]) el.href=d[k]; });

  // Apply sections
  if(cfg.testis) buildTestis(cfg.testis);
  if(cfg.provs)  buildProvs(cfg.provs);
  if(cfg.agenda) buildAgenda(cfg.agenda);
  if(cfg.bio)    applyBio(cfg.bio);
  startTesti();

  // Countdown with saved date
  if(cfg.elec) { clearInterval(window._tickTimer); window._tickTimer = setInterval(tick,1000); tick(); }

  // Hide loader
  const loader = document.getElementById('siteLoader');
  if(loader){ loader.style.opacity='0'; setTimeout(()=>loader.style.display='none',500); }
}
initSite();

// ── OVERRIDE ADMIN SAVES to use GitHub ──
async function saveInfo() {
  const d = {};
  ['name','cargo','email','phone','addr','slogan','fb','ig','tt','yt'].forEach(k=>d[k]=document.getElementById('ai-'+k).value);
  showSaving('info');
  const ok = await saveConfig({ info: d });
  if(ok) {
    const sl=document.querySelector('.hdesc'); if(sl) sl.textContent=d.slogan;
    const dispE=document.getElementById('dispEmail'); if(dispE) dispE.textContent=d.email;
    const dispP=document.getElementById('dispPhone'); if(dispP) dispP.textContent=d.phone;
    const dispA=document.getElementById('dispAddr');  if(dispA) dispA.textContent=d.addr;
    ['fb','ig','tt','yt'].forEach(k=>{const el=document.getElementById('soc-'+k);if(el&&d[k])el.href=d[k]});
    flash('info');
  } else { alert('Error al guardar. Revisa tu conexión.'); }
  hideSaving('info');
}
async function saveAgenda() {
  const cards=[...document.querySelectorAll('#agCards .acard')];
  const events=cards.map(c=>({date:c.querySelector('[data-f=date]').value,title:c.querySelector('[data-f=title]').value,loc:c.querySelector('[data-f=loc]').value,tag:c.querySelector('[data-f=tag]').value}));
  showSaving('agenda');
  const ok = await saveConfig({ agenda: events });
  if(ok){ buildAgenda(events); flash('agenda'); } else { alert('Error al guardar.'); }
  hideSaving('agenda');
}
async function saveTestis() {
  const cards=[...document.querySelectorAll('#tsCards .acard')];
  const ts=cards.map(c=>({stars:'★★★★★',text:c.querySelector('[data-f=text]').value,name:c.querySelector('[data-f=name]').value,from:c.querySelector('[data-f=from]').value}));
  showSaving('testis');
  const ok = await saveConfig({ testis: ts });
  if(ok){ buildTestis(ts); startTesti(); flash('testis'); } else { alert('Error al guardar.'); }
  hideSaving('testis');
}
async function saveProvs() {
  const items=[...document.querySelectorAll('#pvCards .acard')];
  const ps=items.map(c=>({name:c.querySelector('[data-f=name]').value,v:c.querySelector('[data-f=v]').checked}));
  showSaving('provs');
  const ok = await saveConfig({ provs: ps });
  if(ok){ buildProvs(ps); flash('provs'); } else { alert('Error al guardar.'); }
  hideSaving('provs');
}
async function saveBio() {
  const bio={
    educacion:[...document.querySelectorAll('#eduCards .acard')].map(c=>({titulo:c.querySelector('[data-f=titulo]').value,inst:c.querySelector('[data-f=inst]').value,anio:c.querySelector('[data-f=anio]').value})),
    experiencia:[...document.querySelectorAll('#expCards .acard')].map(c=>({cargo:c.querySelector('[data-f=cargo]').value,inst:c.querySelector('[data-f=inst]').value,periodo:c.querySelector('[data-f=periodo]').value}))
  };
  showSaving('bio');
  const ok = await saveConfig({ bio });
  if(ok){ applyBio(bio); flash('bio'); } else { alert('Error al guardar.'); }
  hideSaving('bio');
}
async function saveCfg() {
  const np = document.getElementById('ai-npw').value;
  const update = {
    elec: document.getElementById('ai-elec').value,
    stats: [{n:parseInt(document.getElementById('ai-s1n').value)||15,l:document.getElementById('ai-s1l').value},{n:parseInt(document.getElementById('ai-s2n').value)||11,l:document.getElementById('ai-s2l').value}]
  };
  if(np.trim()) update.pw = np.trim();
  showSaving('cfg');
  const ok = await saveConfig(update);
  if(ok){ flash('cfg'); } else { alert('Error al guardar.'); }
  hideSaving('cfg');
}

function showSaving(id){ const el=document.getElementById('done-'+id); if(el){el.textContent='Guardando…';el.style.opacity=1;el.style.color='var(--muted)';} }
function hideSaving(id){ const el=document.getElementById('done-'+id); if(el){el.style.color='#27AE60';el.textContent='✓ Guardado';} }

// ── OVERRIDE checkPw to use config pw ──
async function checkPw() {
  const pw = (_config && _config.pw) ? _config.pw : 'karim2026';
  if(document.getElementById('pwIn').value === pw){
    adminUnlocked=true;
    document.getElementById('loginWrap').style.display='none';
    document.getElementById('adminContent').style.display='block';
    // Refresh from raw URL to get proper UTF-8
    await refreshConfigForAdmin();
    loadFields();
    loadVolunteersPanel();
  } else {
    document.getElementById('loginErr').style.display='block';
    document.getElementById('pwIn').value=''; document.getElementById('pwIn').focus();
  }
}

// ── VOLUNTEERS PANEL ──
async function loadVolunteersPanel() {
  const cont = document.getElementById('volList');
  if(!cont) return;
  cont.innerHTML = '<div style="font-size:.8rem;color:var(--muted);padding:.5rem 0">Cargando voluntarios…</div>';
  const vols = await loadVolunteers();
  if(vols.length === 0){
    cont.innerHTML = '<div style="font-size:.83rem;color:var(--muted);padding:1rem;text-align:center;background:var(--bg);border-radius:8px;border:1px solid var(--line)">Aún no hay voluntarios registrados.</div>';
    return;
  }
  // Stats
  const byProv = {};
  vols.forEach(v => { byProv[v.prov] = (byProv[v.prov]||0)+1; });
  const topProv = Object.entries(byProv).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([p,n])=>`${p} (${n})`).join(', ');

  cont.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1.25rem">
      <div style="background:var(--red-soft);border:1px solid rgba(204,0,24,.15);border-radius:8px;padding:.9rem;text-align:center">
        <div style="font-size:1.8rem;font-weight:900;color:var(--red);line-height:1">${vols.length}</div>
        <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-top:.2rem">Voluntarios</div>
      </div>
      <div style="background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:.9rem;text-align:center">
        <div style="font-size:1.8rem;font-weight:900;color:var(--dark);line-height:1">${Object.keys(byProv).length}</div>
        <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-top:.2rem">Provincias</div>
      </div>
      <div style="background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:.9rem;text-align:center">
        <div style="font-size:.75rem;font-weight:700;color:var(--dark);line-height:1.3;margin-top:.25rem">${topProv||'-'}</div>
        <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-top:.2rem">Top provincias</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:.5rem" id="volRows"></div>
    <button style="margin-top:.75rem;background:none;border:1px solid var(--line);color:var(--muted);font-family:Inter,sans-serif;font-size:.75rem;padding:7px 14px;border-radius:6px;cursor:none;transition:all .2s" onclick="exportVols()">⬇ Exportar CSV</button>
  `;
  const rows = document.getElementById('volRows');
  vols.slice().reverse().forEach((v,i)=>{
    const roles = Array.isArray(v.roles) ? v.roles.join(', ') : '-';
    const row = document.createElement('div');
    row.style.cssText='background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:.85rem 1rem;font-size:.82rem';
    row.innerHTML=`
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem">
        <div>
          <div style="font-weight:700;color:var(--dark);margin-bottom:.2rem">${v.nombre||'-'}</div>
          <div style="color:var(--muted);font-size:.75rem">${v.prov||'-'} · ${v.fecha||''}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <a href="https://wa.me/${(v.phone||'').replace(/\D/g,'')}" target="_blank" style="font-size:.72rem;background:#25D366;color:#fff;padding:3px 10px;border-radius:100px;text-decoration:none;font-weight:600">WhatsApp</a>
        </div>
      </div>
      ${roles !== '-' ? `<div style="margin-top:.5rem;font-size:.72rem;color:var(--muted)">Ayuda en: ${roles}</div>` : ''}
    `;
    rows.appendChild(row);
  });
}

function exportVols() {
  loadVolunteers().then(vols => {
    const header = 'Nombre,Provincia,WhatsApp,Roles,Fecha';
    const rows = vols.map(v=>`"${v.nombre||''}","${v.prov||''}","${v.phone||''}","${(v.roles||[]).join('; ')}","${v.fecha||''}"`);
    const csv = [header,...rows].join('\n');
    const blob = new Blob([csv],{type:'text/csv'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'voluntarios-karim-castro.csv';
    a.click();
  });
}

// ── OVERRIDE submitVol to save to GitHub ──
async function submitVol() {
  const fn=document.getElementById('vfn');
  const fl=document.getElementById('vfl');
  const fw=document.getElementById('vfw');
  const fp=document.getElementById('vfp');
  let ok=true;
  [fn,fl,fw,fp].forEach(el=>{const valid=el.value.trim().length>0;el.classList.toggle('err',!valid);el.classList.toggle('ok',valid);if(!valid)ok=false});
  if(!ok) return;

  const checks=[...document.querySelectorAll('.vol-check input:checked')].map(c=>c.value);
  const vol = {
    nombre: fn.value.trim()+' '+fl.value.trim(),
    phone: fw.value.trim(),
    prov: fp.value,
    roles: checks
  };

  // Show loading state
  const btn = document.querySelector('.vol-btn');
  btn.textContent = 'Registrando…'; btn.disabled = true;

  const saved = await saveVolunteer(vol);

  if(saved) {
    // WhatsApp link
    const info = (_config&&_config.info)||{};
    const campPhone = (info.phone||'').replace(/\D/g,'');
    const msg = encodeURIComponent(`¡Hola! Me llamo ${vol.nombre}, soy de ${vol.prov} y quiero ser voluntario/a de Karim Castro N°2.\nWhatsApp: ${vol.phone}\nPuedo ayudar en: ${checks.join(', ')||'(sin especificar)'}`);
    document.getElementById('volWaBtn').href = `https://wa.me/${campPhone}?text=${msg}`;
    document.getElementById('volFormWrap').style.display='none';
    document.getElementById('volSuccess').style.display='block';
  } else {
    btn.textContent = 'Quiero ser voluntario →'; btn.disabled = false;
    alert('Error al registrar. Por favor intenta de nuevo.');
  }
}

// ── TOKEN SETUP ──
function openAdmin() {
  document.getElementById('adminOv').classList.add('open');
  const hasToken = !!localStorage.getItem('gh_token');
  if (!hasToken) {
    // Show token setup first
    document.getElementById('tokenWrap').style.display = 'flex';
    document.getElementById('loginWrap').style.display = 'none';
    document.getElementById('adminContent').style.display = 'none';
    setTimeout(() => document.getElementById('ghTokenInput').focus(), 80);
  } else if (!adminUnlocked) {
    document.getElementById('tokenWrap').style.display = 'none';
    document.getElementById('loginWrap').style.display = 'flex';
    document.getElementById('adminContent').style.display = 'none';
    setTimeout(() => document.getElementById('pwIn').focus(), 80);
  }
}
function saveGhToken() {
  const t = document.getElementById('ghTokenInput').value.trim();
  if (!t.startsWith('ghp_') && !t.startsWith('github_pat_')) {
    alert('Token inválido. Debe empezar con ghp_ o github_pat_');
    return;
  }
  localStorage.setItem('gh_token', t);
  document.getElementById('tokenWrap').style.display = 'none';
  document.getElementById('loginWrap').style.display = 'flex';
  setTimeout(() => document.getElementById('pwIn').focus(), 80);
}
