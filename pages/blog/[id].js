import React from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../../components/nav";
import fetch from "isomorphic-unfetch";

const Blog = ({ data }) => {
  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <title>{data.description}</title>
      </Head>

      <Nav />

      <div className="content">
        <div className="title">{data.title}</div>
        <div className="body" dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>

      <style jsx>{`
        .content {
          max-width: 880px;
          margin: 40px auto 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .title {
          text-align: center;
          font-weight: bold;
          color: #1a202c;
        }

        .body {
          margin-top: 60px;
          width: 100%;
        }

        .center {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

Blog.getInitialProps = async ({ query }) => {
  const { id } = query;
  const res = await fetch(`http://content.playstg.net/blogs/${id}`);
  const json = await res.json();
  console.log(json);
  return { data: json };
};

export default Blog;
