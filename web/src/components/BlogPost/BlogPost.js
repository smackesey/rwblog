import { Link, routes } from '@redwoodjs/router'

const BlogPost = ({ post }) => {
  return (
    <article>
      <header>
        <h2>
          <Link to={routes.blogPost({ id: post.id })}>{post.title}</Link>
        </h2>
      </header>
      <p>{post.body}</p>
      <div>Posted at: {post.createdAt}</div>
    </article>
  )
}

export default BlogPost
