(function(){
  'use strict';
  var $=function(s){return document.querySelector(s);};

  $('#yr').textContent=new Date().getFullYear();

  var burger=$('#burger'),nav=$('#nav');
  burger.addEventListener('click',function(){
    var o=nav.classList.toggle('open');
    burger.classList.toggle('on',o);
    burger.setAttribute('aria-expanded',o?'true':'false');
  });
  nav.addEventListener('click',function(e){
    if(e.target.tagName==='A'){nav.classList.remove('open');burger.classList.remove('on');burger.setAttribute('aria-expanded','false');}
  });

  /* floating product-stage gallery */
  var galleryViewport=$('#galleryViewport');
  var galleryPieces=document.querySelectorAll('.gallery-piece');
  var galleryPosition=$('#galleryPosition');
  var ALL=[];
  var galleryCurrent=0,galleryDragStart=0,galleryDragging=false,gallerySkipClick=false;
  var galleryStates=['is-active','is-prev','is-next','is-far-prev','is-far-next','is-hidden'];
  Array.prototype.forEach.call(galleryPieces,function(piece){ALL.push(parseInt(piece.getAttribute('data-portfolio'),10));});
  function galleryDistance(index){
    var distance=index-galleryCurrent;
    var half=galleryPieces.length/2;
    if(distance>half){distance-=galleryPieces.length;}
    if(distance<-half){distance+=galleryPieces.length;}
    return distance;
  }
  function paintGallery(){
    Array.prototype.forEach.call(galleryPieces,function(piece,k){
      var distance=galleryDistance(k),state='is-hidden';
      if(distance===0){state='is-active';}
      else if(distance===-1){state='is-prev';}
      else if(distance===1){state='is-next';}
      else if(distance===-2){state='is-far-prev';}
      else if(distance===2){state='is-far-next';}
      galleryStates.forEach(function(name){piece.classList.remove(name);});
      piece.classList.add(state);
      piece.tabIndex=distance===0?0:-1;
      piece.setAttribute('aria-hidden',state==='is-hidden'?'true':'false');
    });
    galleryPosition.textContent=String(galleryCurrent+1).padStart(2,'0')+' / '+String(galleryPieces.length).padStart(2,'0');
  }
  function moveGallery(direction){
    galleryCurrent=(galleryCurrent+direction+galleryPieces.length)%galleryPieces.length;
    paintGallery();
  }
  /* This file is shared by every page. The product-stage gallery only exists on
     the home page, so bail out of that block rather than throwing. */
  if(galleryViewport && galleryPosition){
    Array.prototype.forEach.call(galleryPieces,function(piece,k){
      piece.addEventListener('click',function(){
        if(gallerySkipClick){return;}
        if(k===galleryCurrent){openLb(k,ALL);}
        else{galleryCurrent=k;paintGallery();}
      });
    });
    $('#galleryPrev').addEventListener('click',function(){moveGallery(-1);});
    $('#galleryNext').addEventListener('click',function(){moveGallery(1);});
    galleryViewport.addEventListener('keydown',function(e){
      if(e.key==='ArrowLeft'){e.preventDefault();moveGallery(-1);}
      if(e.key==='ArrowRight'){e.preventDefault();moveGallery(1);}
    });
    galleryViewport.addEventListener('pointerdown',function(e){
      if(e.pointerType==='mouse'&&e.button!==0){return;}
      galleryDragStart=e.clientX;galleryDragging=true;gallerySkipClick=false;
      galleryViewport.classList.add('is-dragging');
    });
    galleryViewport.addEventListener('pointermove',function(e){
      if(!galleryDragging){return;}
      if(Math.abs(e.clientX-galleryDragStart)>8){galleryViewport.classList.add('is-dragging');}
    });
    function finishGalleryDrag(e){
      if(!galleryDragging){return;}
      var distance=e.clientX-galleryDragStart;
      galleryDragging=false;galleryViewport.classList.remove('is-dragging');
      if(Math.abs(distance)>54){
        gallerySkipClick=true;moveGallery(distance>0?-1:1);
        window.setTimeout(function(){gallerySkipClick=false;},180);
      }else{gallerySkipClick=false;}
    }
    galleryViewport.addEventListener('pointerup',finishGalleryDrag);
    galleryViewport.addEventListener('pointercancel',finishGalleryDrag);
    paintGallery();galleryViewport.classList.add('is-ready');
  }

  /* lightbox */
  var lb=$('#lb'),lbimg=$('#lbimg'),lbc=$('#lbc'),set=ALL,cur=0;
  function paint(){lbimg.src='assets/portfolio/'+set[cur]+'.png';lbc.textContent=(cur+1)+' / '+set.length;}
  function openLb(i,arr){set=arr;cur=i;paint();lb.classList.add('on');document.body.style.overflow='hidden';}
  function closeLb(){lb.classList.remove('on');document.body.style.overflow='';}
  function step(d){cur=(cur+d+set.length)%set.length;paint();}
  if(lb){
    $('#lbx').addEventListener('click',closeLb);
    $('#lbp').addEventListener('click',function(e){e.stopPropagation();step(-1);});
    $('#lbn').addEventListener('click',function(e){e.stopPropagation();step(1);});
    lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});
    document.addEventListener('keydown',function(e){
      if(lb.classList.contains('on')){
        if(e.key==='Escape')closeLb();
        if(e.key==='ArrowLeft')step(-1);
        if(e.key==='ArrowRight')step(1);
      }
    });
  }

  /* faq */
  Array.prototype.forEach.call(document.querySelectorAll('.q'),function(q){
    q.querySelector('button').addEventListener('click',function(){
      var open=q.classList.contains('open');
      Array.prototype.forEach.call(document.querySelectorAll('.q'),function(o){
        o.classList.remove('open');o.querySelector('.a').style.maxHeight=null;
      });
      if(!open){q.classList.add('open');var a=q.querySelector('.a');a.style.maxHeight=a.scrollHeight+'px';}
    });
  });

  /* form (home page and quote page) */
  var qform=$('#qform');
  if(qform) qform.addEventListener('submit',function(e){
    e.preventDefault();
    var m=$('#formmsg'),n=$('#f-name').value.trim(),em=$('#f-email').value.trim();
    m.textContent = (!n||!em) ? 'Add your name and email so we can reply.'
                              : 'Thanks '+n+' — in the live build this sends to the shop. Demo only.';
    m.style.background = (!n||!em) ? 'var(--coral)' : 'var(--gold)';
    m.classList.add('on');
  });

})();
/* ------------------------------------------------------------------
   Inner pages: portfolio grid lightbox + gallery process filter.
   Reuses the same lightbox markup the home page builds.
------------------------------------------------------------------ */
(function(){
  'use strict';
  var figures = document.querySelectorAll('.page-grid figure[data-portfolio]');
  if(!figures.length) return;

  // build a lightbox if the page does not already have one
  var lb = document.getElementById('lb');
  if(!lb){
    lb = document.createElement('div');
    lb.className = 'lb'; lb.id = 'lb';
    lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true');
    lb.innerHTML =
      '<button class="lb-x" id="lbx" aria-label="Close">&times;</button>'+
      '<button class="lb-p" id="lbp" aria-label="Previous">&#8592;</button>'+
      '<div class="fr"><img id="lbimg" src="" alt=""></div>'+
      '<button class="lb-n" id="lbn" aria-label="Next">&#8594;</button>'+
      '<div class="lb-c" id="lbc"></div>';
    document.body.appendChild(lb);
  }
  var img = document.getElementById('lbimg');
  var cnt = document.getElementById('lbc');
  var list = [], cur = 0;

  function visibleFigures(){
    return Array.prototype.filter.call(figures, function(f){
      return f.style.display !== 'none';
    });
  }
  function paint(){
    var f = list[cur];
    img.src = 'assets/portfolio/' + f.getAttribute('data-portfolio') + '.png';
    var cap = f.querySelector('figcaption b');
    img.alt = cap ? cap.textContent : '';
    cnt.textContent = (cur+1) + ' / ' + list.length;
  }
  function open(f){
    list = visibleFigures();
    cur = list.indexOf(f);
    if(cur < 0) cur = 0;
    paint();
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function close(){ lb.classList.remove('on'); document.body.style.overflow = ''; }
  function step(d){ cur = (cur + d + list.length) % list.length; paint(); }

  Array.prototype.forEach.call(figures, function(f){
    f.addEventListener('click', function(){ open(f); });
  });
  document.getElementById('lbx').addEventListener('click', close);
  document.getElementById('lbp').addEventListener('click', function(e){ e.stopPropagation(); step(-1); });
  document.getElementById('lbn').addEventListener('click', function(e){ e.stopPropagation(); step(1); });
  lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('on')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') step(-1);
    if(e.key === 'ArrowRight') step(1);
  });

  // ---- process filter (gallery page only) ----
  var buttons = document.querySelectorAll('.filter-row button[data-filter]');
  if(!buttons.length) return;
  Array.prototype.forEach.call(buttons, function(btn){
    btn.addEventListener('click', function(){
      var want = btn.getAttribute('data-filter');
      Array.prototype.forEach.call(buttons, function(b){
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      Array.prototype.forEach.call(figures, function(f){
        var show = want === 'all' || f.getAttribute('data-process') === want;
        f.style.display = show ? '' : 'none';
      });
    });
  });
})();
