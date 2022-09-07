import Head from 'next/head'
import Link from 'next/link';
// import Carousels from '../Components/Carousels';
import Header from '../Components/Header'
import Typed from "react-typed";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import styles from "./style.module.css"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


interface Props{
  posts: [Post];
}

const getConfigurableProps = () => ({
  showArrows: false,
  showStatus:false, 
  showIndicators: true,
  infiniteLoop:true,
  showThumbs:false,
  useKeyboardArrows: false,
  autoPlay: true,
  stopOnHover: true,
  swipeable: true

});



export default function Home({ posts }: Props) {

  return (
    <div className="mx-auto mt-0 max-w-10xl">
      <Head>
        <title>Mailer Daemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      
      <div className="flex items-center justify-center h-screen py-10 mt-0 mb-5 lg:py-0 text-white-400">
      <img className="object-cover w-screen h-screen contrast-100 blur-lg" src="/heritage_building.jpeg" />
   
      <header  className="absolute w-full px-20 py-10 mb-16 font-bold text-center bg-white rounded-md bg-opacity-30 group z-5 md:w-3/4 lg:w-1/2">
     <h1 className="max-w-xl font-serif text-3xl md:text-6xl ml-[5%] text-center ">
       
        <Typed
        className="text-right"
            strings={["Mailer Daemon"]}
            typeSpeed={80}
            backSpeed={80}
            loop
          />
          </h1>
     <div className="text-xl  p-2  md:text-1.5xl font-extrabold ">Student run media body of IIT(ISM) Dhanbad.</div>
      </header>
      </div>
    <div className='py-28'>
     <Carousel {...getConfigurableProps()}>
     {posts.filter((post,idx)=>{
       if(idx<8) return post
     }).map((post,idx) => {
       
            return (
              <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='pt-1 pb-10 m-auto my-10 mt-10 border-4 border-black w-[25rem] h-80 rounded-2xl cursor-pointer'>
              <img className='object-cover w-full h-full' src={urlFor(post.mainImage).url()!}></img>
              <h1 className='p-2 font-bold'>{post.title}</h1>
              </div>
              </Link>
              )
                })}
     </Carousel>
     </div>
      {/* posts */}
      <div className="grid grid-cols-1 gap-3 p-2 md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-6">
        {posts.map(post => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="overflow-hidden border rounded-lg cursor-pointer group">
                <img className="object-cover w-full transition-transform duration-200 ease-in-out h-60 group-hover:scale-105" src={urlFor(post.mainImage).url()!} alt="" />
                <div className="flex justify-between p-5 bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">{post.description} by {post.author.name}</p>
                  </div>
                  <img className="w-12 h-12 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
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
