window.onload=function(){function e(e,i){var u=e.innerHTML;e.innerHTML="<span style=\"font-family: 'Flat-UI-Icons'\">"+i+"</span>"+u}var i,u,f,x,a={"fui-triangle-up":"&#xe000;","fui-triangle-up-small":"&#xe001;","fui-triangle-right-large":"&#xe002;","fui-triangle-left-large":"&#xe003;","fui-triangle-down":"&#xe004;","fui-triangle-down-small":"&#xe005;","fui-info":"&#xe016;","fui-alert":"&#xe017;","fui-question":"&#xe018;","fui-window":"&#xe019;","fui-windows":"&#xe01a;","fui-upload":"&#xe01b;","fui-arrow-right":"&#xe02c;","fui-arrow-left":"&#xe02d;","fui-loop":"&#xe02e;","fui-cmd":"&#xe02f;","fui-mic":"&#xe030;","fui-export":"&#xe031;","fui-check-inverted":"&#xe006;","fui-heart":"&#xe007;","fui-location":"&#xe008;","fui-plus":"&#xe009;","fui-check":"&#xe00a;","fui-cross":"&#xe00b;","fui-list":"&#xe00c;","fui-new":"&#xe00d;","fui-video":"&#xe00e;","fui-photo":"&#xe00f;","fui-volume":"&#xe010;","fui-time":"&#xe011;","fui-eye":"&#xe012;","fui-chat":"&#xe013;","fui-home":"&#xe015;","fui-search":"&#xe01c;","fui-user":"&#xe01d;","fui-mail":"&#xe01e;","fui-lock":"&#xe01f;","fui-power":"&#xe020;","fui-star":"&#xe021;","fui-calendar":"&#xe022;","fui-gear":"&#xe023;","fui-book":"&#xe024;","fui-exit":"&#xe025;","fui-trash":"&#xe026;","fui-folder":"&#xe027;","fui-bubble":"&#xe028;","fui-cross-inverted":"&#xe029;","fui-plus-inverted":"&#xe02a;"},t=document.getElementsByTagName("*");for(i=0;x=t[i],x;i+=1)u=x.getAttribute("data-icon"),u&&e(x,u),f=x.className,f=f.match(/fui-[^\s'"]+/),f&&a[f[0]]&&e(x,a[f[0]])};