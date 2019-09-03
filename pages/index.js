import React from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import fetch from "isomorphic-unfetch";

const Home = ({ blogs }) => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <Nav />

    <div className="content">
      {blogs.map((x, i) => (
        <Link key={i} href={`blog/${x.id}`}>
          <a className="card">
            <h3>{x.title} &rarr;</h3>
            <p>Learn more about Next.js on GitHub and in their examples.</p>
          </a>
        </Link>
      ))}
    </div>

    <style jsx>{`
      .content {
        max-width: 880px;
        margin: 0px auto 40px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        margin-top: 32px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  const res = await fetch("http://content.playstg.net/blogs/?page=1");
  const json = await res.json();
  console.log(Object.keys(json.data[0]));
  console.log(json.data[0]);
  return { blogs: json.data, page: json.page_data };
};

export default Home;
