import { useMemo, useState } from "react";
import {
  Bell, Bookmark, ChevronDown, Compass, Film, Heart, Home, ImagePlus,
  Menu, MessageCircle, Moon, MoreHorizontal, Plus, Search, Send, Settings,
  Sparkles, Sun, User, Users, X
} from "lucide-react";
import { useTheme } from "./ThemeContext";

const people = [
  { username:"sophia", name:"Sophia Williams", img:"https://i.pravatar.cc/150?img=44" },
  { username:"daniel", name:"Daniel Park", img:"https://i.pravatar.cc/150?img=53" },
  { username:"lina", name:"Lina Garcia", img:"https://i.pravatar.cc/150?img=47" },
  { username:"sam", name:"Sam Wilson", img:"https://i.pravatar.cc/150?img=59" },
  { username:"emma", name:"Emma Brown", img:"https://i.pravatar.cc/150?img=32" }
];

const stories = [
  { username:"sophia", img:"https://i.pravatar.cc/150?img=44" },
  { username:"alex", img:"https://i.pravatar.cc/150?img=5" },
  { username:"mia", img:"https://i.pravatar.cc/150?img=9" },
  { username:"rohan", img:"https://i.pravatar.cc/150?img=11" },
  { username:"sara", img:"https://i.pravatar.cc/150?img=32" },
  { username:"daniel", img:"https://i.pravatar.cc/150?img=53" },
  { username:"lina", img:"https://i.pravatar.cc/150?img=47" },
  { username:"sam", img:"https://i.pravatar.cc/150?img=59" }
];

const seedPosts = [
  {
    id:1, username:"alex.j", name:"Alex Johnson", avatar:"https://i.pravatar.cc/150?img=5",
    image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    caption:"Chasing sunsets and new adventures. 🌄 #travel #nature #explore",
    likes:1245, comments:[["sara.m","Amazing shot! 😍"],["rohan.p","Where is this? Looks beautiful!"]], time:"2 hours ago"
  },
  {
    id:2, username:"mia.codes", name:"Mia Chen", avatar:"https://i.pravatar.cc/150?img=9",
    image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
    caption:"Building something beautiful today. 💻✨ #coding #design",
    likes:927, comments:[["sam.w","Love the setup!"]], time:"5 hours ago"
  }
];

function Avatar({src, size="md"}) {
  return <img className={`avatar ${size}`} src={src} alt="" />;
}

function ThemePicker() {
  const {theme,setTheme} = useTheme();
  return (
    <div className="theme-picker">
      <button className={theme==="light"?"active":""} onClick={()=>setTheme("light")}><Sun size={17}/><span>Light</span></button>
      <button className={theme==="dark"?"active":""} onClick={()=>setTheme("dark")}><Moon size={17}/><span>Dark</span></button>
      <button className={theme==="system"?"active":""} onClick={()=>setTheme("system")}><Settings size={17}/><span>System</span></button>
    </div>
  );
}

function Sidebar({active,onNavigate,showThemes,setShowThemes}) {
  const nav = [
    ["home","Home",Home],["search","Search",Search],["explore","Explore",Compass],
    ["reels","Reels",Film],["messages","Messages",Send],["notifications","Notifications",Bell],
    ["create","Create",Plus],["profile","Profile",User]
  ];
  return <aside className="sidebar">
    <div className="logo"><Sparkles size={22}/><span>Insta<span>Sphere</span></span></div>
    <nav>
      {nav.map(([id,label,Icon])=>
        <button key={id} className={`nav-link ${active===id?"active":""}`} onClick={()=>onNavigate(id)}>
          <Icon size={23}/><span>{label}</span>
          {id==="messages" && <b className="badge">3</b>}
          {id==="notifications" && <b className="badge">5</b>}
        </button>
      )}
    </nav>
    <div className="sidebar-bottom">
      <button className="nav-link" onClick={()=>setShowThemes(v=>!v)}><Menu size={23}/><span>More</span></button>
      {showThemes && <ThemePicker/>}
    </div>
  </aside>;
}

function MobileBar({active,onNavigate}) {
  return <div className="mobile-bar">
    {[["home",Home],["search",Search],["create",Plus],["reels",Film],["profile",User]].map(([id,I])=>
      <button key={id} className={active===id?"active":""} onClick={()=>onNavigate(id)}><I size={23}/></button>
    )}
  </div>;
}

function Topbar({onNavigate,query,setQuery}) {
  return <header className="topbar">
    <div className="mobile-logo"><Sparkles size={19}/><b>Insta<span>Sphere</span></b></div>
    <button className="search-box" onClick={()=>onNavigate("search")}>
      <Search size={20}/>
      <input value={query} onChange={e=>setQuery(e.target.value)} onClick={e=>e.stopPropagation()} placeholder="Search users, posts, hashtags..." />
      {query && <X size={17} onClick={(e)=>{e.stopPropagation();setQuery("")}}/>}
    </button>
    <div className="top-actions">
      <button onClick={()=>onNavigate("notifications")}><Bell size={22}/><i>5</i></button>
      <button className="account" onClick={()=>onNavigate("profile")}><Avatar src="https://i.pravatar.cc/150?img=12" size="sm"/><b>yashkose</b><ChevronDown size={16}/></button>
    </div>
  </header>;
}

function Stories({onOpen}) {
  return <div className="stories">
    <button className="story" onClick={()=>onOpen("Your story")}>
      <div className="story-ring own"><div className="plus-story"><Plus size={28}/></div></div><span>Your story</span>
    </button>
    {stories.map(s=><button className="story" key={s.username} onClick={()=>onOpen(s.username)}>
      <div className="story-ring"><Avatar src={s.img} size="story"/></div><span>{s.username}</span>
    </button>)}
  </div>;
}

function Post({post}) {
  const [liked,setLiked]=useState(false), [saved,setSaved]=useState(false), [text,setText]=useState("");
  return <article className="post">
    <div className="post-head">
      <div className="post-user"><Avatar src={post.avatar}/><div><b>{post.username}</b><span>{post.name}</span></div></div>
      <button className="round-btn"><MoreHorizontal size={21}/></button>
    </div>
    <img className="post-photo" src={post.image} alt={post.caption}/>
    <div className="post-content">
      <div className="actions">
        <div>
          <button className={liked?"liked":""} onClick={()=>setLiked(v=>!v)}><Heart fill={liked?"currentColor":"none"}/></button>
          <button><MessageCircle/></button>
          <button><Send/></button>
        </div>
        <button className={saved?"saved":""} onClick={()=>setSaved(v=>!v)}><Bookmark fill={saved?"currentColor":"none"}/></button>
      </div>
      <b className="likes">{(post.likes+(liked?1:0)).toLocaleString()} likes</b>
      <p><b>{post.username}</b> {post.caption}</p>
      <button className="view-comments">View all {post.comments.length+40} comments</button>
      {post.comments.map(([u,c])=><p className="comment" key={u}><b>{u}</b> {c}</p>)}
      <small>{post.time}</small>
      <form className="comment-form" onSubmit={e=>{e.preventDefault(); if(text.trim()) setText("")}}>
        <Avatar src="https://i.pravatar.cc/150?img=12" size="xs"/>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add a comment..."/>
        {text && <button>Post</button>}
      </form>
    </div>
  </article>;
}

function RightRail({onNavigate}) {
  const [following,setFollowing]=useState({});
  return <aside className="right-rail">
    <div className="me-card"><Avatar src="https://i.pravatar.cc/150?img=12" size="lg"/><div><b>yashkose</b><span>Welcome back 👋</span></div><button>Switch</button></div>
    <div className="rail-title"><b>Suggested for you</b><button onClick={()=>onNavigate("search")}>See all</button></div>
    {people.map(p=><div className="suggestion" key={p.username}><Avatar src={p.img}/><div><b>{p.username}</b><span>{p.name}</span></div><button onClick={()=>setFollowing(f=>({...f,[p.username]:!f[p.username]}))}>{following[p.username]?"Following":"Follow"}</button></div>)}
    <div className="trends">
      <div className="rail-title"><b>Trends for you</b><button onClick={()=>onNavigate("explore")}>See all</button></div>
      {["#photography","#travel","#coding","#nature","#fitness"].map((x,i)=><div className="trend" key={x}><b>{x}</b><span>{[ "1.2M","980K","750K","640K","520K"][i]} posts</span></div>)}
    </div>
    <footer>About · Help · Press · API · Jobs · Privacy · Terms<br/>Locations · Language · Meta Verified<br/><br/>© 2026 INSTASPHERE</footer>
  </aside>;
}

function SearchView({query,setQuery}) {
  const q=query.trim().toLowerCase();
  const results=people.filter(p=>`${p.username} ${p.name}`.toLowerCase().includes(q));
  return <section className="page-view"><div className="page-title"><h1>Search</h1><p>Find people, posts and hashtags.</p></div>
    <div className="big-search"><Search/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search users, posts, hashtags..."/></div>
    {q ? <div className="result-list">{results.length ? results.map(p=><div className="result" key={p.username}><Avatar src={p.img}/><div><b>{p.username}</b><span>{p.name}</span></div><button>View profile</button></div>) : <div className="empty">No matching users found. Try another search.</div>}</div> : <div className="search-hints"><span>#photography</span><span>#travel</span><span>#coding</span><span>#nature</span></div>}
  </section>;
}

function GenericView({title,icon:Icon,children}) {
  return <section className="page-view generic"><div className="empty-icon"><Icon size={34}/></div><h1>{title}</h1><p>{children}</p><button className="primary-btn">Explore {title}</button></section>;
}

function App() {
  const [active,setActive]=useState("home"), [query,setQuery]=useState(""), [showThemes,setShowThemes]=useState(false);
  const [posts] = useState(seedPosts);
  const navigate=(id)=>{setActive(id); setShowThemes(false);};
  const content=useMemo(()=>{
    if(active==="home") return <><Stories onOpen={()=>{}}/><div className="home-grid"><section className="feed">{posts.map(p=><Post post={p} key={p.id}/>)}</section><RightRail onNavigate={navigate}/></div></>;
    if(active==="search") return <SearchView query={query} setQuery={setQuery}/>;
    if(active==="explore") return <GenericView title="Explore" icon={Compass}>Discover trending photos, creators and communities tailored to you.</GenericView>;
    if(active==="reels") return <GenericView title="Reels" icon={Film}>Short videos and creative moments will appear here.</GenericView>;
    if(active==="messages") return <GenericView title="Messages" icon={Send}>Your conversations are ready here. Select a chat to start messaging.</GenericView>;
    if(active==="notifications") return <GenericView title="Notifications" icon={Bell}>Likes, follows, comments and other activity will appear here.</GenericView>;
    if(active==="create") return <GenericView title="Create a post" icon={ImagePlus}>Choose a photo or video to create your next post.</GenericView>;
    if(active==="profile") return <GenericView title="Your profile" icon={User}>Your profile grid, followers and account details will appear here.</GenericView>;
    return null;
  },[active,query,posts]);
  return <div className="app">
    <Sidebar active={active} onNavigate={navigate} showThemes={showThemes} setShowThemes={setShowThemes}/>
    <main>
      <Topbar onNavigate={navigate} query={query} setQuery={setQuery}/>
      <div className="content">{content}</div>
    </main>
    <MobileBar active={active} onNavigate={navigate}/>
  </div>;
}

export default App;