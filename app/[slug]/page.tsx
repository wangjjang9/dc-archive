import Link from "next/link"
import { client } from "../../lib/sanity"
import { PortableText } from "@portabletext/react"

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
      <main style={{ padding: "40px", background: "#111", color: "#eee", minHeight: "100vh" }}>
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
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "34px 24px" }}>
        <Link href="/" style={{ color: "#d4af37", textDecoration: "none", fontSize: "14px" }}>
          ← Back to Home
        </Link>

        <header style={{ textAlign: "center", padding: "45px 0 28px" }}>
          <p style={{ color: "#d4af37", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
            {post.categories?.[0]?.title || "Archive"}
          </p>

          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "46px", lineHeight: "1.15", margin: 0 }}>
            {post.title}
          </h1>

          <p style={{ color: "#777", marginTop: "16px", fontSize: "14px" }}>
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Unpublished date"}
          </p>
        </header>

        {post.mainImage?.asset?.url && (
          <img
            src={post.mainImage.asset.url}
            alt={post.title}
            style={{ width: "100%", maxHeight: "430px", objectFit: "cover", border: "1px solid #333", marginBottom: "34px" }}
          />
        )}

        <article style={{ border: "1px solid #303030", background: "#141414", padding: "34px", color: "#ddd" }}>
          <PortableText value={post.body || []} />
        </article>
      </div>
    </main>
  )
}