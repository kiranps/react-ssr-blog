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
            <img className="feature_image" alt="cover" src={x.feature_image} />
            <div className="content">
              <div className="header">
                <div className="title">{x.title}</div>
                <div className="date">
                  {new Date(x.published_on).toLocaleDateString()}
                </div>
              </div>
              <p>{x.description}</p>
              <div className="footer">
                <img src={x.author_details.profile_picture} />
                <div className="author_name">
                  {x.author_details.screen_name || ""}
                </div>
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
        margin-top: 32px;
        width: 280px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        overflow: hidden;
        border-radius: 5px 5px 2px 2px;
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
        padding-top: 12px;
        font-size: 13px;
        text-align: left;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 46px;
        color: #4a5568;
      }

      .card .content {
        padding: 14px;
        border: 1px solid #cbd5e0;
        border-top: none;
        border-radius: 0 0 2px 2px;
        height: 140px;
      }

      .card .feature_image {
        width: 100%;
        height: 140px;
        display: block;
      }

      .card img.feature_image {
        position: relative;
        border: 1px solid #cbd5e0;
        box-sizing: border-box;
      }

      .card img.feature_image:after {
        content: "\f1c5"" " attr(alt);
        font-family: FontAwesome;

        box-sizing: border-box;
        text-align: center;
        padding-top: 60px;

        font-size: 16px;
        color: #636363;

        display: block;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #dedede;
      }

      .card .header {
        width: 100%;
      }

      .card .header .title {
        font-weight: bold;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #1a202c;
      }

      .card .header .date {
        font-size: 14px;
        padding-top: 5px;
      }

      .card .footer {
        display: flex;
        width: 100%;
        padding-top: 10px;
      }

      .card .footer img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }

      .card .footer .author_name {
        padding: 7px 0 0 10px;
        font-size: 13px;
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
