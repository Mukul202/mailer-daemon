import Head from 'next/head'
import Link from 'next/link';
import Header from '../Components/Header'
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import styles from "./style.module.css"
interface Props{
  posts: [Post];
}

const divStyle={
  position:'absolute',
  // top:'50%',
  // left:'50%',
  color:'#fff',
  fontWeight:'bold',
  transform:"translate('-50%,-50%')",
  // width:'auto',
  padding:'40px 3px',
  textAlign:'center' as 'center',
  borderTopLeftRadius:'70px',
  borderBottomRightRadius:'70px',
  // backgroundColor:"rgba(0,0,0,0.3)",
  border:"10px inset #fff"
};

export default function Home({ posts }: Props) {

  return (
    <div className="mx-auto max-w-10xl mt-0">
      <Head>
        <title>Mailer Daemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-center border-y border-black py-10 lg:py-0 mt-0 mb-5 text-white-400 h-screen">
      <img className="contrast-200 blur-lg h-screen object-cover w-screen" src="https://images.shiksha.com/mediadata/images/articles/1635919891phpErjqCl.jpeg" />
   
   <header style={divStyle} className="mb-16 group z-5 w-full md:w-3/4 lg:w-1/2">
     <h1 className="max-w-xl font-serif text-4xl md:text-6xl">
       <span className="inline-flex h-20 pt-0 pl-2 p-5 overflow-x-hidden animate-type group-hover:animate-type-reverse whitespace-nowrap text-brand-accent will-change font-extrabold text-white">
         Mailer Daemon
       </span>
       <span className={`${styles.cursor} box-border inline-block w-1 h-10  -mb-2 bg-white md:-mb-4 md:h-16 animate-cursor will-change`}></span>
     </h1>
     <div className="text-xl  p-2  md:text-1.5xl font-extrabold text-white">Student run media body of IIT(ISM) Dhanbad.</div>
   </header>
       
     </div>

      {/* posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map(post => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border rounded-lg group cursor-pointer overflow-hidden">
                <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()!} alt="" />
                <div className="flex justify-between p-5 bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">{post.description} by {post.author.name}</p>
                  </div>
                  <img className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  //turns a homepage into server side rendering
  const query = `*[_type == "post"]| order(_createdAt desc){
    _id,
    title,
    author -> {
      name,
      image
    },
      description,
      slug,
      mainImage
  }`

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  }

}
