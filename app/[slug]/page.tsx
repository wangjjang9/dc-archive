import Link from "next/link"
import { client } from "../../lib/sanity"
import { PortableText } from "@portabletext/react"

const components = {
  block: {
    normal: ({ children }) => (
      <p style={{
        fontSize: "18px",
        lineHeight: "2.0",
        color: "#d6d6d6",
        margin: "0 0 22px"
      }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 style={{
        fontFamily: "Georgia, serif",
        fontSize: "30px",
        lineHeight: "1.25",
        color: "#f0f0f0",
        margin: "42px 0 16px"
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{
        fontFamily: "Georgia, serif",
        fontSize: "23px",
        color: "#d4af37",
        margin: "32px 0 12px"
      }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{
        borderLeft: "3px solid #d4af37",
        paddingLeft: "18px",
        margin: "28px 0",
        color: "#bbb",
        fontStyle: "italic"
      }}>
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{
        paddingLeft: "24px",
        margin: "0 0 24px",
        color: "#d6d6d6",
        lineHeight: "1.8"
      }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol style={{
        paddingLeft: "24px",
        margin: "0 0 24px",
        color: "#d6d6d6",
        lineHeight: "1.8"
      }}>
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ marginBottom: "8px" }}>
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li style={{ marginBottom: "8px" }}>
        {children}
      </li>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ color: "#fff", fontWeight: 700 }}>
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em style={{ color: "#d4af37" }}>
        {children}
      </em>
    ),
    code: ({ children }) => (
      <code style={{
        background: "#222",
        color: "#d4af37",
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "0.9em"
      }}>
        {children}
      </code>
    )
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      mainImage{
        asset->{url}
      },
      publishedAt,
      categories[]->{title}
    }`,
    { slug }
  )

  if (!post) {
    return (
      <main style={{
        padding: "40px",
        background: "#111",
        color: "#eee",
        minHeight: "100vh"
      }}>
        <h1>Post not found</h1>
        <p>Slug requested: {slug}</p>
        <Link href="/" style={{ color: "#d4af37" }}>← Back to Home</Link>
      </main>
    )
  }

  return (
    <main style={{
      background: "#0f0f0f",
      color: "#eee",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "34px 24px"
      }}>
        <Link href="/" style={{
          color: "#d4af37",
          textDecoration: "none",
          fontSize: "14px"
        }}>
          ← Back to Home
        </Link>

        <header style={{
          textAlign: "center",
          padding: "45px 0 28px"
        }}>
          <p style={{
            color: "#d4af37",
            fontSize: "12px",
            letterSpacing: "1px",
            textTransform: "uppercase"
          }}>
            {post.categories?.[0]?.title || "Archive"}
          </p>

          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "46px",
            lineHeight: "1.15",
            margin: 0
          }}>
            {post.title}
          </h1>

          <p style={{
            color: "#777",
            marginTop: "16px",
            fontSize: "14px"
          }}>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : "Unpublished date"}
          </p>
        </header>

        {post.mainImage?.asset?.url && (
          <img
            src={post.mainImage.asset.url}
            alt={post.title}
            style={{
              width: "100%",
              maxHeight: "430px",
              objectFit: "cover",
              borderRadius: "6px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
              marginBottom: "34px"
            }}
          />
        )}

        <article style={{
          border: "1px solid #2b2b2b",
          background: "linear-gradient(180deg, #171717 0%, #101010 100%)",
          padding: "42px",
          color: "#ddd",
          boxShadow: "0 18px 45px rgba(0,0,0,0.35)"
        }}>
          <PortableText value={post.body || []} components={components} />
        </article>
      </div>
    </main>
  )
}