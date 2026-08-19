// PARCHE SOLIDO UNICO - V19 LIMPIA
// Pegar este contenido ANTES de </body> en tu index.html

// FIX 1: Login doble pantalla
document.documentElement.classList.add('loading');
setTimeout(()=>{
  try{
    const sess = JSON.parse(localStorage.getItem('ic_session_v19')||'null');
    const ao = document.getElementById('authOverlay');
    if(sess && sess.username && ao) ao.style.display='none';
  }catch{}
  document.documentElement.classList.remove('loading');
},150);

// FIX 2: Admin arriba
const styleFix = document.createElement('style');
styleFix.textContent = '#goAdmin,#admin-fab{bottom:90px !important; top:auto !important; z-index:10015 !important}';
document.head.appendChild(styleFix);

// FIX 3: Borrar usuarios real
window.borrarUsuarioReal = async function(username){
  if(!confirm('¿Borrar a '+username+' definitivamente?')) return;
  try{
    const supa = window.supabase.createClient("https://gouzcooqqwflcggxnaqe.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXpjb29xcXdmbGNnZ3huYXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MDgyNDcsImV4cCI6MjEwMjM4NDI0N30.w6tp7tv0dtGGCxVGhjSbSFMq49fk7zvnNbQuQm7GjKc");
    await supa.from('users').delete().eq('username', username);
    await supa.from('users').delete().ilike('username', username);
    await supa.from('app_users').delete().eq('username', username);
    await supa.from('app_users').delete().eq('user', username);
    alert('✅ Borrado: '+username);
    if(window.renderUsers) window.renderUsers(); else location.reload();
  }catch(e){ alert('Error: '+e.message); }
};

// Interceptar botones de borrar existentes
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const txt = (btn.textContent||'').toLowerCase();
  if(txt.includes('borrar') || txt.includes('🗑')){
    const row = btn.closest('div');
    if(row){
      const b = row.querySelector('b');
      if(b && b.textContent.trim()){
        e.preventDefault(); e.stopImmediatePropagation();
        window.borrarUsuarioReal(b.textContent.trim());
      }
    }
  }
}, true);

// FIX 4: Render estable + carpetas 01-08
let dirHandle = null;
window.selCarpeta = async()=>{
  try{
    if(!window.showDirectoryPicker){ alert('Usa Chrome/Edge para carpetas'); return; }
    dirHandle = await window.showDirectoryPicker();
    for(let i=1;i<=8;i++){
      const num = String(i).padStart(2,'0');
      await dirHandle.getDirectoryHandle(num, {create:true});
    }
    alert('✅ Carpetas 01-08 creadas. Los videos se guardarán ahí.');
  }catch(e){ console.log(e); }
};

window.guardarVideo = async(blob, idx)=>{
  const num = String((idx%8)+1).padStart(2,'0');
  if(!dirHandle){
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download=`${num}-video-${Date.now()}.mp4`; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
    return;
  }
  try{
    const sub = await dirHandle.getDirectoryHandle(num);
    const fh = await sub.getFileHandle(`video-${Date.now()}.mp4`, {create:true});
    const w = await fh.createWritable(); await w.write(blob); await w.close();
  }catch(e){
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download=`${num}-video-${Date.now()}.mp4`; a.click();
  }
};

window.limpiarMemoria = async(stream, v)=>{
  try{
    if(stream) stream.getTracks().forEach(t=>{ try{t.stop();}catch{}});
    if(v){ try{v.pause(); v.src=''; v.remove();}catch{}}
  }catch{}
  await new Promise(r=>setTimeout(r,800));
};

// FIX 5: 3 segundos negros - parchear donde hace rec.start(100)
// Buscar en tu código: rec.start(100) y agregar antes:
// v.currentTime=0; ctx.drawImage(v,0,0,720,900); await new Promise(r=>setTimeout(r,80));

console.log('✅ Parche sólido único cargado');
