import React from "react";
import "../../styles/blog-card.scss";
import { Link } from "gatsby";

interface Props {
  title: string | null | undefined;
  link: string | null | undefined;
  date: string;
  description: string | null | undefined;
}

const BlogCard = ({ title, link, date, description }: Props) => {
  return (
    <div className="blog-card-container">
      <time className="blog-date">{date}</time>
      <h2 className="blog-title">{title || ""}</h2>
      <p className="blog-description">{description || ""}</p>
      <Link className="blog-read-now" to={link || "/"}>
        Read Now
      </Link>
    </div>
  );
};

export default BlogCard;
