$((function(e){var n=1,i=window.location.pathname,t=e(document),o=e(".gh-postfeed"),r=!1,a=!1,s=window.scrollY,c=window.innerHeight,l=t.height();function w(){s=window.scrollY,v()}function d(){c=window.innerHeight,l=t.height(),v()}function v(){r||requestAnimationFrame(u),r=!0}function u(){var v,u;if(u=/(?:page\/)(\d)(?:\/)$/i,(v=(v=i).replace(/#(.*)$/g,"").replace("////g","/")).match(u)&&(n=parseInt(v.match(u)[1]),v=v.replace(u,"")),i=v,!a)if(s+c<=l-300)r=!1;else{if(n>=maxPages)return window.removeEventListener("scroll",w,{passive:!0}),void window.removeEventListener("resize",d);a=!0;var f=i+"page/"+(n+=1)+"/";e.get(f,(function(e){var n=document.createRange().createContextualFragment(e).querySelectorAll(".post");n.length&&[].forEach.call(n,(function(e){o[0].appendChild(e)}))})).fail((function(e){404===e.status&&(window.removeEventListener("scroll",w,{passive:!0}),window.removeEventListener("resize",d))})).always((function(){l=t.height(),a=!1,r=!1}))}}window.addEventListener("scroll",w,{passive:!0}),window.addEventListener("resize",d),u()}));
//# sourceMappingURL=infinitescroll.js.map
