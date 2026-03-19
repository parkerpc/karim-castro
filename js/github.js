// ── GITHUB API LAYER ──
const GH = {
  get token() { return localStorage.getItem('gh_token') || ''; },
  owner: 'parkerpc',
  repo:  'karim-castro',
  base:  'https://api.github.com',

  headers() {
    return {
      'Authorization': `token ${this.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };
  },

  async read(path) {
    try {
      const res = await fetch(`${this.base}/repos/${this.owner}/${this.repo}/contents/${path}`, {
        headers: this.headers()
      });
      if (!res.ok) return null;
      const data = await res.json();
      return {
        content: JSON.parse(atob(data.content.replace(/\n/g,''))),
        sha: data.sha
      };
    } catch(e) { return null; }
  },

  async write(path, content, message, sha) {
    const json = JSON.stringify(content, null, 2);
    const encoder = new TextEncoder();
    const bytes = encoder.encode(json);
    let binary = '';
    for(let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const body = {
      message,
      content: btoa(binary)
    };
    if (sha) body.sha = sha;
    try {
      const res = await fetch(`${this.base}/repos/${this.owner}/${this.repo}/contents/${path}`, {
        method: 'PUT',
        headers: this.headers(),
        body: JSON.stringify(body)
      });
      const data = await res.json();
      return data.content ? data.content.sha : null;
    } catch(e) { return null; }
  }
};

// ── CONFIG (site content) ──
let _configSha = null;
let _config = null;

async function loadConfig() {
  try {
    // Try direct raw fetch first - no base64, proper UTF-8
    const rawUrl = `https://raw.githubusercontent.com/${GH.owner}/${GH.repo}/main/data/config.json?t=${Date.now()}`;
    const rawRes = await fetch(rawUrl);
    if (rawRes.ok) {
      const text = await rawRes.text();
      _config = JSON.parse(text);
      // Get SHA separately for writes
      const meta = await GH.read('data/config.json');
      if (meta) _configSha = meta.sha;
      return _config;
    }
  } catch(e) {}
  // Fallback to API
  const result = await GH.read('data/config.json');
  if (result && Object.keys(result.content).length > 0) {
    _config = result.content;
    _configSha = result.sha;
  } else {
    _config = getDefaultConfig();
    _configSha = await GH.write('data/config.json', _config, 'Init config', result ? result.sha : null);
  }
  return _config;
}

async function saveConfig(newConfig) {
  _config = { ..._config, ...newConfig };
  _configSha = await GH.write('data/config.json', _config, 'Update site config', _configSha);
  return _configSha !== null;
}

function getDefaultConfig() {
  return {
    info: { name:'Karim Castro', cargo:'Diputada por la Región Puno', email:'contacto@karimcastro.pe', phone:'+51 999 999 999', addr:'Av. El Sol 123, Puno', slogan:'Experiencia, preparación y voluntad de servicio. Una voz firme por el desarrollo real de Puno en el Congreso Nacional.', fb:'#', ig:'#', tt:'#', yt:'#' },
    elec: '2026-04-11T08:00',
    stats: [{n:15,l:'Años de trayectoria'},{n:11,l:'Provincias visitadas'}],
    agenda: [
      {date:'15 Mar · 2026',title:'Cabildo abierto en Juliaca',loc:'Plaza Bolognesi, Juliaca — 10:00 a.m.',tag:'Presencial'},
      {date:'18 Mar · 2026',title:'Visita a comunidades de Capachica',loc:'Distrito de Capachica — 9:00 a.m.',tag:'Comunidad'},
      {date:'22 Mar · 2026',title:'Foro educativo regional',loc:'Auditorio UNA PUNO — 3:00 p.m.',tag:'Foro'},
      {date:'28 Mar · 2026',title:'Mitin central de campaña',loc:'Plaza de Armas, Puno — 6:00 p.m.',tag:'Mitin'}
    ],
    testis: [
      {stars:'★★★★★',text:'"Karim conoce Puno de verdad. La he visto en mi comunidad."',name:'José Quispe',from:'Azángaro'},
      {stars:'★★★★★',text:'"Como agricultora, necesitamos a alguien que entienda el campo."',name:'María Condori',from:'Capachica'},
      {stars:'★★★★★',text:'"Tiene propuestas concretas, no promesas vacías."',name:'Carlos Mamani',from:'Juliaca'},
      {stars:'★★★★★',text:'"La salud en comunidades rurales es un drama. Karim lo sabe."',name:'Rosa Huanca',from:'Ilave'},
      {stars:'★★★★★',text:'"Joven, preparada y con amor por Puno. El N°2 de Ahora Nación."',name:'Pedro Flores',from:'Puno ciudad'}
    ],
    provs: [
      {name:'Puno',v:true},{name:'Juliaca (San Román)',v:true},{name:'Azángaro',v:true},
      {name:'Melgar',v:true},{name:'Carabaya',v:true},{name:'Chucuito',v:true},
      {name:'El Collao (Ilave)',v:true},{name:'Huancané',v:true},{name:'Lampa',v:true},
      {name:'Moho',v:true},{name:'Yunguyo',v:true},{name:'Sandia',v:false},{name:'Putina',v:false}
    ],
    bio: {
      educacion: [{titulo:'Maestría en Gestión Pública',inst:'Universidad Nacional del Altiplano',anio:'2015'},{titulo:'Licenciada en [Especialidad]',inst:'Universidad [Nombre]',anio:'2008'}],
      experiencia: [{cargo:'[Cargo anterior]',inst:'[Institución]',periodo:'2018 - 2022'},{cargo:'Docente universitaria',inst:'Universidad Nacional del Altiplano',periodo:'2016 - presente'}]
    },
    pw: 'karim2026'
  };
}


// ── FORCE UTF-8 REFRESH before admin opens ──
async function refreshConfigForAdmin() {
  try {
    const rawUrl = `https://raw.githubusercontent.com/${GH.owner}/${GH.repo}/main/data/config.json?t=${Date.now()}`;
    const res = await fetch(rawUrl);
    if (res.ok) {
      const text = await res.text();
      _config = JSON.parse(text);
    }
  } catch(e) {}
}

// ── VOLUNTEERS ──
let _volSha = null;

async function loadVolunteers() {
  const result = await GH.read('data/volunteers.json');
  if (result) {
    _volSha = result.sha;
    return Array.isArray(result.content) ? result.content : [];
  }
  return [];
}

async function saveVolunteer(vol) {
  const vols = await loadVolunteers();
  vols.push({ ...vol, fecha: new Date().toLocaleDateString('es-PE'), id: Date.now() });
  _volSha = await GH.write('data/volunteers.json', vols, `Nuevo voluntario: ${vol.nombre}`, _volSha);
  return _volSha !== null;
}
