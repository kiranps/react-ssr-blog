import React from "react";
import Link from "next/link";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Nav from "../../components/nav";
import Pagination from "../../components/pagination";

const Home = ({ blogs, page }) => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <Nav />

    <div className="content">
      {blogs.map((x, i) => (
        <Link key={i} href={`/blog/${x.id}`}>
          <a className="card">
            <img className="feature_image" src={x.feature_image} />
            <h3>{x.title}</h3>
            <div>{new Date(x.published_on).toLocaleDateString()}</div>
            <p>{x.description}</p>
            <div className="author">
              <img src={x.author_details.profile_picture} />
              <div>
                <div>{`${x.author_details.screen_name}`}</div>
              </div>
            </div>
          </a>
        </Link>
      ))}

      <Pagination {...page} />
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
        font-size: 14px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
      .card .feature_image {
        width: 100%;
      }
      .card .author {
        display: flex;
      }
      .card .author img {
        width: 30px;
        height: 30px;
      }
    `}</style>
  </div>
);

Home.getInitialProps = async ({ query }) => {
  const { page } = query;
  const res = await fetch(`http://content.playstg.net/blogs/?page=${page}`);
  const json = await res.json();
  const page_data = {
    ...json.page_data,
    current_page: page
  };
  return { blogs: json.data, page: page_data };
};

export default Home;
