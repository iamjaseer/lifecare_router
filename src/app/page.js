import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {

  const data = await getData()

  console.log(data.data.posts.nodes)

  return (
    <>
       {data.data.posts.nodes.map((blog, key) => {
                          return <div className="col-xl-6 mb-4" data-aos="fade-up" key={key}>
                              <div className="box p-sm-4 p-3">
                                 <h3 className='heading-box text-tertiary mb-2'>{blog.title}</h3>
                                </div>
                          </div>
                      })}
    </>
  );
}




async function getData() {

const res = await fetch(`https://api.lifecarevengad.com/graphql`,  {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
      query: `
  query Posts {
      posts(first: 5) {
          nodes {
              databaseId
            title
             date
             slug
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
}
`,
  }),
  next: { revalidate: 10 },
},
{
  cache: 'force-cache' ,
  cache: 'no-store'
}
)



if (!res.ok) {
  // This will activate the closest `error.js` Error Boundary
  throw new Error('Failed to fetch data')
}


return res.json()



}
 
