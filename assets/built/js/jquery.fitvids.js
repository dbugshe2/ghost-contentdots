/*!
* FitVids 1.3
*
*
* Copyright 2017, Chris Coyier + Dave Rupert + Ghost Foundation
* This is an unofficial release, ported by John O'Nolan
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the MIT license
*
*/
!function(t){"use strict";t.fn.fitVids=function(e){var i={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var r=document.head||document.getElementsByTagName("head")[0],d=document.createElement("div");d.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-container{flex-grow: 1;width:100%;}.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>',r.appendChild(d.childNodes[1])}return e&&t.extend(i,e),this.each((function(){var e=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];i.customSelector&&e.push(i.customSelector);var r=".fitvidsignore";i.ignore&&(r=r+", "+i.ignore);var d=t(this).find(e.join(","));(d=(d=d.not("object object")).not(r)).each((function(){var e=t(this);if(!(e.parents(r).length>0||"embed"===this.tagName.toLowerCase()&&e.parent("object").length||e.parent(".fluid-width-video-wrapper").length)){e.css("height")||e.css("width")||!isNaN(e.attr("height"))&&!isNaN(e.attr("width"))||(e.attr("height",9),e.attr("width",16));var i=("object"===this.tagName.toLowerCase()||e.attr("height")&&!isNaN(parseInt(e.attr("height"),10))?parseInt(e.attr("height"),10):e.height())/(isNaN(parseInt(e.attr("width"),10))?e.width():parseInt(e.attr("width"),10));if(!e.attr("name")){var d="fitvid"+t.fn.fitVids._count;e.attr("name",d),t.fn.fitVids._count++}e.wrap('<div class="fluid-width-video-container"><div class="fluid-width-video-wrapper"></div></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*i+"%"),e.removeAttr("height").removeAttr("width")}}))}))},t.fn.fitVids._count=0}(window.jQuery||window.Zepto);
//# sourceMappingURL=jquery.fitvids.js.map
