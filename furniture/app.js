const filmOrigin='https://inna-martinova-furniture.martinova-ai-7110.chatgpt.site';
const frames=new Map();
document.querySelectorAll('[data-film]').forEach(card=>{
 const button=card.querySelector('.play'),player=card.querySelector('.player');
 button.addEventListener('click',()=>{
  if(frames.has(card.dataset.film))return;
  const frame=document.createElement('iframe');
  frame.src=filmOrigin+'/embed.html?film='+encodeURIComponent(card.dataset.film);
  frame.title=button.getAttribute('aria-label').replace(/^Play /,'');
  frame.allow='autoplay; fullscreen';frame.allowFullscreen=true;
  frame.style.cssText='width:100%;height:100%;position:absolute;inset:0;border:0;background:#090a09';
  frames.set(card.dataset.film,frame);
  player.querySelector('img').replaceWith(frame);button.remove();frame.focus();
 });
});
window.addEventListener('message',event=>{
 if(event.origin!==filmOrigin)return;
 const current=frames.get(event.data?.film);
 if(!current||event.source!==current.contentWindow)return;
 if(event.data.type==='film-playing')frames.forEach(frame=>{if(frame!==current)frame.contentWindow.postMessage({type:'pause-film'},filmOrigin);});
});
