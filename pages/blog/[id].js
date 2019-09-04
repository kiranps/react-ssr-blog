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
      </Head>

      <Nav />

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: data.body }}
      />

      <style jsx>{`
        .content {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}</style>
    </div>
  );
};

Blog.getInitialProps = async ({ query }) => {
  const { id } = query;
  const res = await fetch(`http://content.playstg.net/blogs/${id}`);
  const json = await res.json();
  return { data: json };
};

export default Blog;
