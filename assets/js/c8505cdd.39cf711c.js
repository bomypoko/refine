"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[88815],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>u});var n=a(67294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(a),u=r,h=d["".concat(l,".").concat(u)]||d[u]||m[u]||o;return a?n.createElement(h,i(i({ref:t},p),{},{components:a})):n.createElement(h,i({ref:t},p))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},31214:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var n=a(87462),r=(a(67294),a(3905));const o={title:"Let's Build an App to Manage Your Hackathons with Refine",description:"We'll be building a demo app to manage hackathons with refine.",slug:"manage-hackathons-with-refine",authors:"muharrem",tags:["refine","supabase","react","tutorial"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png",hide_table_of_contents:!1},i=void 0,s={permalink:"/blog/manage-hackathons-with-refine",source:"@site/blog/2021-10-4-manage-hackatons.md",title:"Let's Build an App to Manage Your Hackathons with Refine",description:"We'll be building a demo app to manage hackathons with refine.",date:"2021-10-04T00:00:00.000Z",formattedDate:"October 4, 2021",tags:[{label:"refine",permalink:"/blog/tags/refine"},{label:"supabase",permalink:"/blog/tags/supabase"},{label:"react",permalink:"/blog/tags/react"},{label:"tutorial",permalink:"/blog/tags/tutorial"}],readingTime:3.205,hasTruncateMarker:!0,authors:[{name:"Muharrem Kocadere",title:"Frontend Developer",url:"https://github.com/mhrrmk",imageURL:"https://github.com/mhrrmk.png",key:"muharrem"}],frontMatter:{title:"Let's Build an App to Manage Your Hackathons with Refine",description:"We'll be building a demo app to manage hackathons with refine.",slug:"manage-hackathons-with-refine",authors:"muharrem",tags:["refine","supabase","react","tutorial"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png",hide_table_of_contents:!1},prevItem:{title:"Create a Feedback Admin panel in 15 Minutes with Refine and Strapi",permalink:"/blog/create-a-feedback-admin-panel-with-refine-and-strapi"},nextItem:{title:"Simple Web Application Example with Refine",permalink:"/blog/simple-web-application-with-refine"},relatedPosts:[{title:"How to use React Fragments?",permalink:"/blog/how-react-fragments-is-works",formattedDate:"October 2, 2022",authors:[{name:"Clara Ekekenta",title:"Software Engineer",imageURL:"/img/generic-profile.png",key:"clara_ekekenta"}],readingTime:5.455,date:"2022-10-02T00:00:00.000Z"},{title:"How to Multipart File Upload Using FormData with React Hook Form",permalink:"/blog/how-to-multipart-file-upload-with-react-hook-form",formattedDate:"March 29, 2022",authors:[{name:"Melih Ekinci",title:"Frontend Developer",url:"https://github.com/mlhekinci",imageURL:"https://github.com/mlhekinci.png",key:"melih"}],readingTime:7.385,date:"2022-03-29T00:00:00.000Z"},{title:"5 Most Common useState Mistakes React Developers Often Make",permalink:"/blog/common-usestate-mistakes-and-how-to-avoid",formattedDate:"August 29, 2022",authors:[{name:"David Herbert",title:"Frontend Engineer",url:"https://github.com/DaveyHert",github:"https://github.com/DaveyHert",linkedin:"https://www.linkedin.com/in/daveyhert",imageURL:"https://github.com/DaveyHert.png",key:"david_herbert"}],readingTime:16.03,date:"2022-08-29T00:00:00.000Z"}],authorPosts:[]},l={authorsImageUrls:[void 0]},c=[{value:"Creating tables",id:"creating-tables",level:2},{value:"Craeting CRUD pages",id:"craeting-crud-pages",level:2},{value:"Create page:",id:"create-page",level:2},{value:"Creating voting page",id:"creating-voting-page",level:2},{value:"Live Codesandbox Example",id:"live-codesandbox-example",level:2},{value:"Conclusion",id:"conclusion",level:2}],p={toc:c};function m(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"We'll be building a demo app to manage hackathons with ",(0,r.kt)("a",{parentName:"p",href:"https://refine.dev/"},"refine"),". We'll be able to create new hackathons, new project entries for a hackathon and criterias for a hackathon."),(0,r.kt)("div",{class:"img-container"},(0,r.kt)("div",{class:"window"},(0,r.kt)("div",{class:"control red"}),(0,r.kt)("div",{class:"control orange"}),(0,r.kt)("div",{class:"control green"})),(0,r.kt)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-manage-hackathons/hackathons.png",alt:"hackathons"})),(0,r.kt)("br",null),(0,r.kt)("p",null,"We'll use ",(0,r.kt)("a",{parentName:"p",href:"https://supabase.io/"},"supabase")," as the backend service. ",(0,r.kt)("strong",{parentName:"p"},"refine")," comes with a builtin data provider for supabase thus it's very easy to create crud pages."),(0,r.kt)("h2",{id:"creating-tables"},"Creating tables"),(0,r.kt)("p",null,"Our app will have these tables in supabase"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"criterias"),(0,r.kt)("li",{parentName:"ul"},"hackathons"),(0,r.kt)("li",{parentName:"ul"},"hackathoners"),(0,r.kt)("li",{parentName:"ul"},"projects"),(0,r.kt)("li",{parentName:"ul"},"projectscores  ")),(0,r.kt)("p",null,"These are reflected in our app as "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export type HackathonerType = {\n  id: string;\n  name: string;\n};\n\nexport type HackathonType = {\n  id: string;\n  start: string;\n  end: string;\n  name: string;\n};\n\nexport type ProjectType = {\n  id: string;\n  name: string;\n  description: string;\n  url: string;\n  hackathon_id: string;\n  hackathoner_id: string;\n};\n\nexport type CriteriaType = {\n  id: string;\n  name: string;\n  hackathon_id: string;\n};\n\nexport type ProjectScoreType = {\n  project_id: string;\n  criteria_id: string;\n  score: string;\n};\n\n")),(0,r.kt)("h2",{id:"craeting-crud-pages"},"Craeting CRUD pages"),(0,r.kt)("p",null,"Creating crud pages is as easy like this:"),(0,r.kt)("p",null,"List page:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'import {\n  List,\n  Table,\n  useTable,\n  Space,\n  ShowButton,\n  EditButton,\n  TextField,\n} from "@pankod/refine";\n\nimport dayjs from "dayjs";\n\nimport { HackathonType } from "interfaces";\n\nexport const HackathonsList: React.FC = () => {\n  const { tableProps } = useTable<HackathonType>();\n\n  return (\n    <List>\n      <Table {...tableProps} rowKey="id">\n        <Table.Column dataIndex="id" title="ID" />\n        <Table.Column dataIndex="name" title="Name" />\n        <Table.Column\n          dataIndex="start"\n          title="Starts"\n          render={(value) => (\n            <TextField value={dayjs(value).format("DD/MMMM dddd")} />\n          )}\n        />\n        <Table.Column\n          dataIndex="end"\n          title="Ends"\n          render={(value) => (\n            <TextField value={dayjs(value).format("DD/MMMM dddd")} />\n          )}\n        />\n        <Table.Column\n          title="Actions"\n          dataIndex="actions"\n          render={(_text, record: HackathonType): React.ReactNode => {\n            return (\n              <Space>\n                <ShowButton size="small" recordItemId={record.id} hideText />\n                <EditButton size="small" recordItemId={record.id} hideText />\n              </Space>\n            );\n          }}\n        />\n      </Table>\n    </List>\n  );\n};\n\n')),(0,r.kt)("h2",{id:"create-page"},"Create page:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'import { Create, Form, Input, useForm, DatePicker } from "@pankod/refine";\n\nimport { HackathonType } from "interfaces";\n\nexport const HackathonsCreate: React.FC = () => {\n  const { formProps, saveButtonProps } = useForm<HackathonType>();\n\n  return (\n    <Create saveButtonProps={saveButtonProps}>\n      <Form {...formProps} layout="vertical">\n        <Form.Item label="Name" name="name">\n          <Input />\n        </Form.Item>\n        <Form.Item label="Name" name="start">\n          <DatePicker />\n        </Form.Item>\n        <Form.Item label="Name" name="end">\n          <DatePicker />\n        </Form.Item>\n      </Form>\n    </Create>\n  );\n};\n')),(0,r.kt)("p",null,"Then use these pages as the corresponding crud component for the ",(0,r.kt)("inlineCode",{parentName:"p"},"hackathon")," resource:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@pankod/refine";\n\nimport "@pankod/refine/dist/styles.min.css";\nimport { dataProvider } from "@pankod/refine-supabase";\nimport { supabaseClient } from "utility";\nimport {\n  HackathonsList,\n  HackathonsCreate,\n  HackathonsEdit,\n  HackathonsShow,\n} from "./pages/hackathons";\n\nfunction App() {\n  return (\n    <Refine\n      dataProvider={dataProvider(supabaseClient)}\n      resources={[{\n        name: "hackathons",\n        list: HackathonsList,\n        create: HackathonsCreate,\n        edit: HackathonsEdit,\n        show: HackathonsShow\n      }]}\n    />\n  );\n}\n\nexport default App;\n\n')),(0,r.kt)("div",{class:"img-container"},(0,r.kt)("div",{class:"window"},(0,r.kt)("div",{class:"control red"}),(0,r.kt)("div",{class:"control orange"}),(0,r.kt)("div",{class:"control green"})),(0,r.kt)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2021-10-4-manage-hackathons/create.png",alt:"create"})),(0,r.kt)("br",null),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"refine")," comes with builtin hooks for Ant design components. You can find detailed usage for the hooks and supabase in the ",(0,r.kt)("a",{parentName:"p",href:"https://refine.dev/docs/"},"documentation")),(0,r.kt)("h2",{id:"creating-voting-page"},"Creating voting page"),(0,r.kt)("p",null,"We'll use the dashboard option to place voting page. We'll need data from different resources. ",(0,r.kt)("strong",{parentName:"p"},"refine")," comes with powerful hooks that are based on react-query to get data from those resources."),(0,r.kt)("p",null,"For example to get the hackathons that are active now we can use the ",(0,r.kt)("inlineCode",{parentName:"p"},"useList")," hook:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'export const DashboardPage: React.FC = () => {\n  const currentHackathons = useList<HackathonType>({\n    resource: "hackathons",\n    config: {\n      filters: [\n        {\n          field: "start",\n          operator: "lte",\n          value: now,\n        },\n        {\n          field: "end",\n          operator: "gte",\n          value: now,\n        },\n      ],\n    },\n  });\n}\n')),(0,r.kt)("h2",{id:"live-codesandbox-example"},"Live Codesandbox Example"),(0,r.kt)("iframe",{src:"https://codesandbox.io/embed/hackathonize-xcpcp?autoresize=1fontsize=14&=1&theme=dark&view=preview",style:{width:"100%",height:"80vh",border:"0px",borderRadius:"8px",overflow:"hidden"},title:"hackathonize",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),(0,r.kt)("p",null,"We can get data from other resources in a similar fashion. You can find the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/refinedev/refine/tree/master/examples/blog-hackathonize"},"repo here")),(0,r.kt)("h2",{id:"conclusion"},"Conclusion"),(0,r.kt)("p",null,"This project itself is a product of a hackathon. It lacks lots of feature like authorization though it shows how ",(0,r.kt)("strong",{parentName:"p"},"refine")," makes it easy to quickly build a working app."))}m.isMDXComponent=!0}}]);