"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3949],{3905:(e,t,i)=>{i.d(t,{Zo:()=>c,kt:()=>g});var r=i(67294);function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(Object(i),!0).forEach((function(t){n(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function p(e,t){if(null==e)return{};var i,r,n=function(e,t){if(null==e)return{};var i,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)i=o[r],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)i=o[r],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}var s=r.createContext({}),l=function(e){var t=r.useContext(s),i=t;return e&&(i="function"==typeof e?e(t):a(a({},t),e)),i},c=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var i=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(i),g=n,h=u["".concat(s,".").concat(g)]||u[g]||m[g]||o;return i?r.createElement(h,a(a({ref:t},c),{},{components:i})):r.createElement(h,a({ref:t},c))}));function g(e,t){var i=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=i.length,a=new Array(o);a[0]=u;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:n,a[1]=p;for(var l=2;l<o;l++)a[l]=i[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,i)}u.displayName="MDXCreateElement"},40199:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>m,frontMatter:()=>o,metadata:()=>p,toc:()=>l});var r=i(87462),n=(i(67294),i(3905));i(2776),i(36514);const o={title:"A Guide for Next.js with TypeScript",description:"We will explain the entire process of how to use Next.js in TypeScript",slug:"next-js-with-typescript",authors:"michael",tags:["nextjs","typescript"],image:"https://refine.dev/img/blog/2022-09-12-next-typescript/social.png",hide_table_of_contents:!1},a=void 0,p={permalink:"/blog/next-js-with-typescript",source:"@site/blog/2022-09-12-next-typescript.md",title:"A Guide for Next.js with TypeScript",description:"We will explain the entire process of how to use Next.js in TypeScript",date:"2022-09-12T00:00:00.000Z",formattedDate:"September 12, 2022",tags:[{label:"nextjs",permalink:"/blog/tags/nextjs"},{label:"typescript",permalink:"/blog/tags/typescript"}],readingTime:8.005,hasTruncateMarker:!0,authors:[{name:"Michael Hungbo",title:"Software Developer",url:"https://github.com/Mich45",imageURL:"https://pbs.twimg.com/profile_images/1476736258340794392/p7d1de3k_400x400.jpg",key:"michael"}],frontMatter:{title:"A Guide for Next.js with TypeScript",description:"We will explain the entire process of how to use Next.js in TypeScript",slug:"next-js-with-typescript",authors:"michael",tags:["nextjs","typescript"],image:"https://refine.dev/img/blog/2022-09-12-next-typescript/social.png",hide_table_of_contents:!1},prevItem:{title:"React memo guide with examples",permalink:"/blog/react-memo-guide"},nextItem:{title:"Build a Progressive Web App (PWA) with Next.js",permalink:"/blog/next-js-pwa"},relatedPosts:[{title:"Nextjs image optimization with examples",permalink:"/blog/using-next-image",formattedDate:"August 17, 2022",authors:[{name:"Michael Hungbo",title:"Software Developer",url:"https://github.com/Mich45",imageURL:"https://pbs.twimg.com/profile_images/1476736258340794392/p7d1de3k_400x400.jpg",key:"michael"}],readingTime:13.225,date:"2022-08-17T00:00:00.000Z"},{title:"NextAuth - Google And GitHub Authentications for Nextjs",permalink:"/blog/nextauth-google-github-authentication-nextjs",formattedDate:"August 18, 2022",authors:[{name:"Ekekenta Clinton",title:"Software Engineer",url:"https://github.com/icode247",imageURL:"https://github.com/icode247.png",key:"ekekenta_clinton"}],readingTime:14.62,date:"2022-08-18T00:00:00.000Z"},{title:"Introduction to Next.js Link component with examples",permalink:"/blog/next-js-link-component",formattedDate:"September 4, 2022",authors:[{name:"Michael Hungbo",title:"Software Developer",url:"https://github.com/Mich45",imageURL:"https://pbs.twimg.com/profile_images/1476736258340794392/p7d1de3k_400x400.jpg",key:"michael"}],readingTime:9.48,date:"2022-09-04T00:00:00.000Z"}],authorPosts:[{title:"Introduction to Next.js Link component with examples",permalink:"/blog/next-js-link-component",formattedDate:"September 4, 2022",authors:[{name:"Michael Hungbo",title:"Software Developer",url:"https://github.com/Mich45",imageURL:"https://pbs.twimg.com/profile_images/1476736258340794392/p7d1de3k_400x400.jpg",key:"michael"}],readingTime:9.48,date:"2022-09-04T00:00:00.000Z"},{title:"Using Material UI DataGrid component with refine app",permalink:"/blog/mui-datagrid-refine",formattedDate:"August 23, 2022",authors:[{name:"Michael Hungbo",title:"Software Developer",url:"https://github.com/Mich45",imageURL:"https://pbs.twimg.com/profile_images/1476736258340794392/p7d1de3k_400x400.jpg",key:"michael"}],readingTime:16.695,date:"2022-08-23T00:00:00.000Z"},{title:"Next.js environment variables",permalink:"/blog/next-js-environment-variables",formattedDate:"September 7, 2022",authors:[{name:"Michael Hungbo",title:"Software Developer",url:"https://github.com/Mich45",imageURL:"https://pbs.twimg.com/profile_images/1476736258340794392/p7d1de3k_400x400.jpg",key:"michael"}],readingTime:6.48,date:"2022-09-07T00:00:00.000Z"}]},s={authorsImageUrls:[void 0]},l=[{value:"Introduction",id:"introduction",level:2}],c={toc:l};function m(e){let{components:t,...i}=e;return(0,n.kt)("wrapper",(0,r.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"introduction"},"Introduction"),(0,n.kt)("p",null,"Next.js is an open source React framework for building single-page web applications. It comes with numerous out-of-the-box functionalities that make developing web applications faster and more interesting, thereby providing refined and elegant developer and user experiences."),(0,n.kt)("p",null,"Combining ",(0,n.kt)("strong",{parentName:"p"},"Next.js and TypeScript")," gives us superpowers to rapidly create applications with a good developer and user experiences. Every developer hates bugs. Especially pesky ones such as typos or trying to use or access undeclared variables. ",(0,n.kt)("strong",{parentName:"p"},"TypeScript")," helps catch these types of bugs early during development, and this is one of the many features that make integrating it with a tool like Next.js fantastic."),(0,n.kt)("p",null,"In this article, we'll look at how you can integrate TypeScript in your Next.js apps. We'll also explore reasons why you should consider using this tool in your Next.js projects and also talk about its benefits."))}m.isMDXComponent=!0},2776:(e,t,i)=>{i.p},36514:(e,t,i)=>{i.d(t,{Z:()=>r});const r=i.p+"assets/images/tsconfig-7ede6ee349e822143833e30b2daab1ea.png"}}]);