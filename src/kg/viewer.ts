// Self-contained machine explorer. Its front door is a readable board story;
// the complete graph remains available as an advanced view. No libraries or
// server routing are required, so the generated HTML works on GitHub Pages.

import type { KnowledgeGraph } from './types.ts';

const escapeHtml = (value: unknown): string => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export function viewerHtml(graph: KnowledgeGraph, title: string): string {
  const data = JSON.stringify({
    meta: graph.meta,
    nodes: graph.nodes.map(node => ({
      id: node.id,
      label: node.label,
      props: node.props,
    })),
    edges: graph.edges.map(edge => ({
      from: edge.from,
      to: edge.to,
      rel: edge.rel,
      props: edge.props ?? null,
    })),
  }).replace(/</g, '\\u003c');
  const safeTitle = escapeHtml(title);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${safeTitle} — machine explorer</title>
<style>
:root{--night:#070914;--panel:#11162d;--panel2:#171d3b;--line:#2b3568;--gold:#f2c200;
--ink:#eef0ff;--muted:#929bd0;--cpu:#ff8d5b;--memory:#68d391;--video:#6aa9ff;--sound:#d07cff;
--input:#ffd166;--rom:#50d3c2;--source:#ef6f9d}
*{box-sizing:border-box}html,body{min-height:100%;margin:0}body{background:radial-gradient(circle at 74% -10%,#222b61 0,var(--night) 42%);
color:var(--ink);font:14px/1.5 ui-sans-serif,system-ui,sans-serif}button,input{font:inherit}
header{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:12px 20px;
background:rgba(7,9,20,.93);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}header h1{font-size:14px;margin-right:auto}
.mode{display:flex;padding:3px;background:#0b0e20;border:1px solid var(--line);border-radius:999px}.mode button{border:0;border-radius:999px;
padding:7px 12px;background:transparent;color:var(--muted);cursor:pointer}.mode button.active{background:var(--gold);color:#17130a;font-weight:800}
#search{width:min(260px,48vw);border:1px solid var(--line);border-radius:999px;padding:8px 13px;background:#0b0e20;color:var(--ink)}
.crumb{color:var(--muted);text-decoration:none}.view{display:none}.view.active{display:block}
#story{max-width:1280px;margin:auto;padding:42px 24px 80px}.eyebrow{color:var(--gold);font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:800}
.hero h2{font-size:clamp(38px,7vw,76px);line-height:.96;margin:10px 0 17px}.hero p{font-size:18px;color:var(--muted);max-width:780px}
.flow{display:grid;grid-template-columns:repeat(12,1fr);gap:16px;margin-top:42px;position:relative}.system{position:relative;min-height:188px;
background:linear-gradient(145deg,var(--panel2),var(--panel));border:1px solid var(--line);border-top:4px solid var(--tone);
border-radius:17px;padding:20px;cursor:pointer;transition:.16s transform,.16s opacity,.16s border-color}.system:hover,.system.focus{transform:translateY(-3px);
border-color:var(--tone)}.system.dim{opacity:.28}.system h3{margin:0 0 4px;font-size:18px}.system .lede{color:var(--muted);font-size:12px}
.system ul{list-style:none;padding:0;margin:16px 0 0}.system li{padding:5px 0;border-top:1px solid #252e59}.system strong{color:var(--tone)}
.system[data-system=cpu]{grid-column:span 4;--tone:var(--cpu)}.system[data-system=memory]{grid-column:span 4;--tone:var(--memory)}
.system[data-system=video]{grid-column:span 4;--tone:var(--video)}.system[data-system=sound]{grid-column:span 3;--tone:var(--sound)}
.system[data-system=inputs]{grid-column:span 3;--tone:var(--input)}.system[data-system=rom]{grid-column:span 3;--tone:var(--rom)}
.system[data-system=source]{grid-column:span 3;--tone:var(--source)}.badge{float:right;color:var(--tone);font:800 24px ui-monospace,monospace}
.path{grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:10px;color:var(--muted);letter-spacing:.08em;
font-size:11px;text-transform:uppercase}.path i{height:1px;flex:1;background:linear-gradient(90deg,transparent,var(--line),transparent)}
#focus-copy{margin-top:18px;border:1px solid var(--line);border-radius:14px;background:rgba(17,22,45,.8);padding:18px;color:var(--muted)}
#raw{height:calc(100vh - 63px);min-height:540px}#raw-layout{height:100%;display:grid;grid-template-columns:minmax(0,1fr) 370px}
#canvas-wrap{position:relative;overflow:hidden}canvas{width:100%;height:100%;display:block;cursor:grab}canvas:active{cursor:grabbing}
#legend{position:absolute;left:14px;bottom:14px;display:flex;gap:10px;flex-wrap:wrap;padding:8px 10px;background:rgba(7,9,20,.85);
border:1px solid var(--line);border-radius:10px;color:var(--muted);font-size:11px}.dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px}
aside{overflow:auto;background:var(--panel);border-left:1px solid var(--line);padding:22px}aside h2{font-size:17px;overflow-wrap:anywhere}
aside .label{color:var(--gold);font-size:10px;letter-spacing:.14em;text-transform:uppercase}.props{width:100%;border-collapse:collapse;margin:14px 0}
.props td{padding:7px 5px;border-bottom:1px solid #252e59;vertical-align:top;overflow-wrap:anywhere}.props td:first-child{color:var(--muted)}
aside a{display:block;color:#b7c3ff;text-decoration:none;padding:4px 0}.rel{color:var(--muted);font-size:11px}
@media(max-width:900px){.system[data-system]{grid-column:span 6}#raw-layout{grid-template-columns:1fr}aside{position:absolute;right:0;top:0;bottom:0;width:min(390px,88vw);
box-shadow:-18px 0 40px #0008}.crumb{display:none}}
@media(max-width:580px){header h1{width:100%;order:-1}.system[data-system]{grid-column:1/-1}.flow{gap:12px}#story{padding-inline:16px}.path{display:none}}
</style>
</head>
<body>
<header>
  <a class="crumb" id="back" href="#">← Game</a>
  <h1>${safeTitle}</h1>
  <input id="search" type="search" placeholder="Find hardware, ROMs, source…">
  <div class="mode"><button id="story-btn" class="active">Machine story</button><button id="raw-btn">Advanced graph</button></div>
</header>
<section id="story" class="view active">
  <div class="hero"><div class="eyebrow">Inside the arcade machine</div><h2 id="machine-name">Machine story</h2>
  <p>The MAME driver becomes a working board: ROM data enters the processors, address maps connect memory and devices, and video, sound, and controls meet at the cabinet.</p></div>
  <div class="flow" id="flow"></div>
  <div id="focus-copy">Choose a subsystem to isolate its part of the signal path. The URL updates so the focused view can be shared.</div>
</section>
<section id="raw" class="view">
  <div id="raw-layout"><div id="canvas-wrap"><canvas id="canvas"></canvas><div id="legend"></div></div><aside id="panel"></aside></div>
</section>
<script type="application/json" id="graph-data">${data}</script>
<script>
'use strict';
const GRAPH=JSON.parse(document.getElementById('graph-data').textContent);
const byId=new Map(GRAPH.nodes.map(n=>[n.id,n]));
const edges=GRAPH.edges.filter(e=>byId.has(e.from)&&byId.has(e.to));
const adjacent=id=>edges.filter(e=>e.from===id||e.to===id);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const short=n=>String(n.props.name??n.props.tag??n.props.file??n.props.method??n.id.split(':').pop());
const game=GRAPH.nodes.find(n=>n.label==='Game');
document.getElementById('machine-name').textContent=game?.props.fullname||game?.props.name||'Machine story';
const gameName=game?.props.name||String(game?.id||'').split(':').pop();
document.getElementById('back').href='../../../app/g/'+encodeURIComponent(gameName||'')+'/';

const groups={
 cpu:{title:'Processors',lede:'The clocks that execute the game',icon:'◆',nodes:[]},
 memory:{title:'Memory & buses',lede:'Address maps route every read and write',icon:'↔',nodes:[]},
 video:{title:'Video path',lede:'Graphics data becomes the raster display',icon:'▦',nodes:[]},
 sound:{title:'Sound path',lede:'Audio devices mix into the cabinet speaker',icon:'◉',nodes:[]},
 inputs:{title:'Controls',lede:'Coins, sticks, and buttons enter through ports',icon:'⌁',nodes:[]},
 rom:{title:'ROM regions',lede:'Program, graphics, and audio bytes',icon:'▤',nodes:[]},
 source:{title:'People & provenance',lede:'Driver credits and implementation source',icon:'✦',nodes:[]},
};
const cpuPattern=/(Z80|I8080|I8039|M680|MC680|KONAMI|RP2A03|CPU)/i;
const soundPattern=/(AY|YM|SN|MSM|DAC|SPEAKER|AUDIO|SOUND|NAMCO|VLM|FILTER)/i;
for(const n of GRAPH.nodes){
 const type=String(n.props.type||'');
 if(n.label==='Device'&&cpuPattern.test(type))groups.cpu.nodes.push(n);
 else if(n.label==='AddressMap'||n.label==='AddressRange'||n.label==='Handler')groups.memory.nodes.push(n);
 else if(n.label==='GfxDecode'||n.label==='GfxDecodeEntry'||n.label==='GfxLayout'||(n.label==='Device'&&/SCREEN|VIDEO|PALETTE/i.test(type)))groups.video.nodes.push(n);
 else if(n.label==='Device'&&soundPattern.test(type))groups.sound.nodes.push(n);
 else if(n.label==='InputPorts'||n.label==='Port'||n.label==='PortField')groups.inputs.nodes.push(n);
 else if(n.label==='RomSet'||n.label==='RomRegion'||n.label==='Rom')groups.rom.nodes.push(n);
 else if(n.label==='SourceFile')groups.source.nodes.push(n);
}
const facts=(key,g)=>{
 if(key==='source'){
  const credit=GRAPH.meta.copyrightHolders?'<li><strong>Credit</strong> '+esc(GRAPH.meta.copyrightHolders)+'</li>':'';
  return credit+g.nodes.slice(0,4).map(n=>'<li>'+esc(short(n))+'</li>').join('');
 }
 return g.nodes.slice(0,5).map(n=>{
  const detail=n.props.clock?' @ '+(Number(n.props.clock)/1e6).toFixed(3)+' MHz':'';
  return '<li>'+esc(short(n))+esc(detail)+'</li>';
 }).join('')||'<li class="rel">No explicit nodes extracted</li>';
};
const flow=document.getElementById('flow');
['cpu','memory','video'].forEach((key,i)=>{
 const g=groups[key];flow.insertAdjacentHTML('beforeend','<article class="system" data-system="'+key+'"><span class="badge">'+g.icon+'</span><h3>'+g.title+'</h3><div class="lede">'+g.lede+'</div><ul>'+facts(key,g)+'</ul></article>');
});
flow.insertAdjacentHTML('beforeend','<div class="path"><i></i> ROM & controls → execution → picture & sound <i></i></div>');
['sound','inputs','rom','source'].forEach(key=>{
 const g=groups[key];flow.insertAdjacentHTML('beforeend','<article class="system" data-system="'+key+'"><span class="badge">'+g.icon+'</span><h3>'+g.title+'</h3><div class="lede">'+g.lede+'</div><ul>'+facts(key,g)+'</ul></article>');
});
const params=new URLSearchParams(location.search);
let subsystem=params.get('subsystem');
function focusSystem(key,push=true){
 subsystem=key;
 document.querySelectorAll('.system').forEach(card=>{
  card.classList.toggle('focus',card.dataset.system===key);
  card.classList.toggle('dim',!!key&&card.dataset.system!==key);
 });
 const g=groups[key];
 document.getElementById('focus-copy').innerHTML=g
  ? '<strong style="color:var(--'+key+')">'+esc(g.title)+'</strong> · '+esc(g.lede)+
    ' <span class="rel">'+g.nodes.length+' graph nodes in this subsystem.</span>'
  : 'Choose a subsystem to isolate its part of the signal path. The URL updates so the focused view can be shared.';
 if(push){const u=new URL(location.href);key?u.searchParams.set('subsystem',key):u.searchParams.delete('subsystem');u.searchParams.delete('mode');u.searchParams.delete('node');history.replaceState(null,'',u);}
}
document.querySelectorAll('.system').forEach(card=>card.addEventListener('click',()=>focusSystem(card.dataset.system===subsystem?null:card.dataset.system)));

const FAMILY={Game:0,MachineConfig:1,Device:1,Callback:1,AddressMap:2,AddressRange:2,Handler:2,RomSet:3,RomRegion:3,Rom:3,InputPorts:4,Port:4,PortField:4,GfxDecode:5,GfxDecodeEntry:5,GfxLayout:5,SourceFile:6};
const COLORS=['#f2c200','#68d391','#ff8d5b','#50d3c2','#ffd166','#6aa9ff','#ef6f9d'];
const LABELS=['Game','Machine','Memory','ROMs','Inputs','Video','Source'];
const rawNodes=GRAPH.nodes.map((n,i)=>({...n,fam:FAMILY[n.label]??6,x:0,y:0,r:5,deg:0}));
const rawById=new Map(rawNodes.map(n=>[n.id,n]));
const rawEdges=edges.map(e=>({...e,a:rawById.get(e.from),b:rawById.get(e.to)}));
for(const e of rawEdges){e.a.deg++;e.b.deg++}for(const n of rawNodes)n.r=4+Math.min(8,Math.sqrt(n.deg)*1.8);
const columns=[0,1,2,3,4,5,6].map(f=>rawNodes.filter(n=>n.fam===f));
columns.forEach((col,f)=>col.forEach((n,i)=>{n.x=(f-3)*220;n.y=(i-(col.length-1)/2)*44}));
const canvas=document.getElementById('canvas'),ctx=canvas.getContext('2d');let scale=.72,ox=0,oy=0,drag=null,selected=null,query='';
function resize(){const d=devicePixelRatio||1;canvas.width=canvas.clientWidth*d;canvas.height=canvas.clientHeight*d;ctx.setTransform(d,0,0,d,0,0);draw()}
new ResizeObserver(resize).observe(canvas);
function draw(){
 const w=canvas.clientWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);ctx.save();ctx.translate(w/2+ox,h/2+oy);ctx.scale(scale,scale);
 for(const e of rawEdges){ctx.strokeStyle=selected&&(e.a===selected||e.b===selected)?'#e9edff':'#29325d';ctx.globalAlpha=selected&&e.a!==selected&&e.b!==selected?.18:.7;ctx.beginPath();ctx.moveTo(e.a.x,e.a.y);ctx.lineTo(e.b.x,e.b.y);ctx.stroke()}
 for(const n of rawNodes){const match=!query||(n.id+' '+short(n)).toLowerCase().includes(query);ctx.globalAlpha=match?1:.12;ctx.fillStyle=COLORS[n.fam];ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,7);ctx.fill();
  if(n===selected){ctx.strokeStyle='#fff';ctx.lineWidth=2/scale;ctx.beginPath();ctx.arc(n.x,n.y,n.r+3,0,7);ctx.stroke()}
  if(n.deg>5||n===selected||scale>1.25){ctx.font=(11/scale)+'px system-ui';ctx.fillStyle='#cfd4f5';ctx.fillText(short(n),n.x+n.r+5/scale,n.y+3/scale)}
 }ctx.restore();ctx.globalAlpha=1;
}
function pick(x,y){const gx=(x-canvas.clientWidth/2-ox)/scale,gy=(y-canvas.clientHeight/2-oy)/scale;let best=null,dist=1e9;for(const n of rawNodes){const d=Math.hypot(n.x-gx,n.y-gy);if(d<n.r+8/scale&&d<dist){best=n;dist=d}}return best}
canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,ox,oy,moved:false};canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>3)drag.moved=true;ox=drag.ox+dx;oy=drag.oy+dy;draw()});
canvas.addEventListener('pointerup',e=>{if(!drag?.moved)selectNode(pick(e.offsetX,e.offsetY));drag=null});
canvas.addEventListener('wheel',e=>{e.preventDefault();scale=Math.max(.18,Math.min(4,scale*Math.exp(-e.deltaY*.0015)));draw()},{passive:false});
function sourceLink(file,line){return 'https://github.com/mamedev/mame/blob/master/'+encodeURI(file)+(line?'#L'+line:'')}
function selectNode(n,push=true){
 selected=n;const panel=document.getElementById('panel');
 if(!n){panel.innerHTML='<div class="label">Advanced graph</div><h2>Select a node</h2><p class="rel">The complete compiler graph lives here: properties, source provenance, and every incoming or outgoing relationship.</p>';draw();return}
 const rows=Object.entries(n.props).map(([k,v])=>'<tr><td>'+esc(k)+'</td><td>'+(k==='sourceFile'?'<a href="'+sourceLink(v,n.props.sourceLine)+'" target="_blank">'+esc(v)+'</a>':esc(Array.isArray(v)?v.join(', '):v))+'</td></tr>').join('');
 const links=adjacent(n.id).map(e=>{const id=e.from===n.id?e.to:e.from;return '<a href="#" data-node="'+esc(id)+'"><span class="rel">'+(e.from===n.id?'→':'←')+' '+esc(e.rel)+'</span> '+esc(short(byId.get(id)))+'</a>'}).join('');
 panel.innerHTML='<div class="label">'+esc(n.label)+'</div><h2>'+esc(n.id)+'</h2><table class="props">'+rows+'</table><div class="label">Connected nodes</div>'+links;
 panel.querySelectorAll('[data-node]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();selectNode(rawById.get(a.dataset.node))}));
 if(push){const u=new URL(location.href);u.searchParams.set('mode','raw');u.searchParams.set('node',n.id);u.searchParams.delete('subsystem');history.replaceState(null,'',u)}draw();
}
document.getElementById('legend').innerHTML=LABELS.map((l,i)=>'<span><i class="dot" style="background:'+COLORS[i]+'"></i>'+l+'</span>').join('');
function setMode(mode,push=true){
 const raw=mode==='raw';document.getElementById('story').classList.toggle('active',!raw);document.getElementById('raw').classList.toggle('active',raw);
 document.getElementById('story-btn').classList.toggle('active',!raw);document.getElementById('raw-btn').classList.toggle('active',raw);
 if(raw)setTimeout(()=>{resize();draw()},0);
 if(push){const u=new URL(location.href);raw?u.searchParams.set('mode','raw'):u.searchParams.delete('mode');if(!raw)u.searchParams.delete('node');history.replaceState(null,'',u)}
}
document.getElementById('story-btn').addEventListener('click',()=>setMode('story'));
document.getElementById('raw-btn').addEventListener('click',()=>setMode('raw'));
document.getElementById('search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();document.querySelectorAll('.system').forEach(card=>card.style.display=!query||card.textContent.toLowerCase().includes(query)?'':'none');draw()});
if(subsystem)focusSystem(subsystem,false);
if(params.get('mode')==='raw'||params.get('node')){setMode('raw',false);const n=rawById.get(params.get('node'));if(n)selectNode(n,false)}else selectNode(null,false);
</script>
</body>
</html>`;
}
