(this["webpackJsonpprocessen-verbaal"]=this["webpackJsonpprocessen-verbaal"]||[]).push([[0],{34:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n.n(a),r=n(19),i=n.n(r),s=(n(34),n(6)),o=n(1),d=n(55),u=n(4),l=n(51),b=n(50),j=n(47),h=n(56),O=n(57),m=n(58),p=n(52),v=n(54),f=n(53),g=n(59),x=n(49),w=n(0),k=n(15),S=n.n(k),y=n(20),z=n(21),H=n.n(z);var L,B,C,E,F=function(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(!1),i=Object(s.a)(r,2),o=i[0],d=i[1];function u(){return(u=Object(y.a)(S.a.mark((function e(t){var n,a,r=arguments;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=r.length>1&&void 0!==r[1]?r[1]:{},a=r.length>2&&void 0!==r[2]?r[2]:"",c(!0),fetch(t,n).then((function(e){return e.blob()})).then((function(e){H()(e,a||t.split("/").pop()),c(!1)})).catch((function(){d(!0),c(!1)}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return[n,function(e){return u.apply(this,arguments)},o]},M=n(2),D=Object(w.d)(d.a)(L||(L=Object(o.a)(["\n  flex-direction: column;\n"]))),I=w.d.form(B||(B=Object(o.a)(["\n  width: 100%;\n  margin-top: ",";\n"])),Object(u.f)(8)),P=Object(w.d)(l.a)(C||(C=Object(o.a)(["\n  max-width: 320px;\n  margin-bottom: ",";\n"])),Object(u.f)(9)),T=w.d.div(E||(E=Object(o.a)(["\n  max-width: 320px;\n"])));var A=function(){var e,t,n=Object(a.useState)(),c=Object(s.a)(n,2),r=c[0],i=c[1],o=Object(a.useState)(),d=Object(s.a)(o,2),u=d[0],l=d[1],w=F(),k=Object(s.a)(w,3),S=k[0],y=k[1],z=k[2],H=Object(a.useState)(!1),L=Object(s.a)(H,2),B=L[0],C=L[1],E=Object(a.useState)(!0),A=Object(s.a)(E,2),J=A[0],K=A[1];return Object(a.useEffect)((function(){var e=!0;return fetch("https://api.data.amsterdam.nl/v1/verkiezingen/processenverbaal/?page_size=10000&verkiezingsjaar=2021").then((function(e){return e.json()})).then((function(t){e&&i(t)})),function(){e=!1}}),[]),Object(M.jsxs)(b.a,{children:[Object(M.jsx)(j.a,{}),Object(M.jsx)(h.a,{children:Object(M.jsxs)(D,{wrap:!0,span:{small:1,medium:2,big:4,large:7,xLarge:7},push:{small:0,medium:0,big:1,large:1,xLarge:1},children:[Object(M.jsx)(O.a,{gutterBottom:28,children:"Proces verbalen stembureaus Amsterdam Tweede Kamerverkiezingen 2021"}),Object(M.jsx)(m.a,{children:"Hier kunt u de proces verbalen van de Amsterdamse stembureaus downloaden."}),Object(M.jsx)(m.a,{children:Object(M.jsx)(p.a,{href:"#",variant:"inline",children:"Bekijk hier de lijst met alle stembureaus"})}),r?Object(M.jsxs)(I,{children:[Object(M.jsxs)(P,{defaultValue:"placeholder",value:u,onChange:function(e){l(e.target.value),C(!0),K(!1)},label:"Kies stembureau",children:[Object(M.jsx)("option",{value:"placeholder",disabled:!0,hidden:!0,children:"Maak een keuze"}),null===(e=r._embedded)||void 0===e||null===(t=e.processenverbaal)||void 0===t?void 0:t.map((function(e){var t,n,a=e.id,c=e.volgnummer,r=e.stemlocatie,i=e.uri;return Object(M.jsx)("option",{value:i,children:"Stembureau ".concat((t=c,n=3,String(t).padStart(n,"0"))," (").concat(r,")")},a)}))]}),!J&&Object(M.jsx)(v.a,{type:"button",iconLeft:S?Object(M.jsx)(f.a,{}):Object(M.jsx)(x.a,{}),onClick:function(){y(u),C(!1)},variant:"primary",children:"Download"}),z&&!B&&Object(M.jsx)(g.a,{message:"Deze download is niet beschikbaar"})]}):Object(M.jsx)(T,{children:Object(M.jsx)(f.a,{size:24})})]})})]})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,60)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))},K=n(27);i.a.render(Object(M.jsx)(c.a.StrictMode,{children:Object(M.jsx)(A,{})}),document.getElementById("root")),J(),window.addEventListener("load",(function(){window.top!==window.self&&(document.body.className+=" framed");var e=document.getElementById("root"),t="documentHeight:"+e.scrollHeight;window.parent.postMessage(t,"*"),Object(K.registerHeightObserver)(e,{direction:"vertical"},(function(){var t="documentHeight:"+e.scrollHeight;window.parent.postMessage(t,"*")}))}))}},[[42,1,2]]]);
//# sourceMappingURL=main.2f96255f.chunk.js.map