import Link from "next/link"
import { client } from "../../../lib/sanity"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function CategoryPage({ params }) {
  const { slug } = await params

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

  const posts = await client.fetch(
    `*[_type == "post" && $category in categories[]->title] | order(publishedAt desc){
      title,
      slug,
      mainImage{
        asset->{url}
      },
      categories[]->{title},
      publishedAt
    }`,
    { category: categoryName }
  )

  return (
    <main style={{
      background: "#0f0f0f",
      color: "#eee",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "28px"
      }}>
        <header style={{
          textAlign: "center",
          padding: "48px 0 26px"
        }}>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "46px",
            margin: 0
          }}>
            {categoryName}
          </h1>

          <p style={{
            color: "#aaa",
            marginTop: "12px",
            fontSize: "15px"
          }}>
            Archive entries filed under {categoryName}
          </p>
        </header>

        <div style={{
          borderTop: "1px solid #333",
          borderBottom: "1px solid #333",
          padding: "16px 0",
          textAlign: "center"
        }}>
          <Link href="/" className="nav-link" style={navStyle}>HOME</Link>

          <Link href="/category/notes" className="nav-link" style={{
            ...navStyle,
            color: slug === "notes" ? "#d4af37" : "#ccc"
          }}>
            NOTES
          </Link>

          <Link href="/category/trading" className="nav-link" style={{
            ...navStyle,
            color: slug === "trading" ? "#d4af37" : "#ccc"
          }}>
            TRADING
          </Link>

          <Link href="/category/business" className="nav-link" style={{
            ...navStyle,
            color: slug === "business" ? "#d4af37" : "#ccc"
          }}>
            BUSINESS
          </Link>

          <Link href="/category/family" className="nav-link" style={{
            ...navStyle,
            color: slug === "family" ? "#d4af37" : "#ccc"
          }}>
            FAMILY
          </Link>
        </div>

        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
          marginTop: "38px"
        }}>
          {posts.length === 0 && (
            <p style={{ color: "#aaa" }}>
              No posts found in this category yet.
            </p>
          )}

          {posts.map((post) => (
            <Link
              key={post.slug.current}
              href={`/${post.slug.current}`}
              className="post-card fade-in"
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #303030",
                background: "#141414",
                overflow: "hidden"
              }}
            >
              {post.mainImage?.asset?.url && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "210px",
                    objectFit: "cover"
                  }}
                />
              )}

              <div style={{ padding: "22px" }}>
                <p style={{
                  color: "#d4af37",
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  margin: "0 0 10px"
                }}>
                  {post.categories?.[0]?.title || "Archive"}
                </p>

                <h2 style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "24px",
                  margin: "0 0 12px"
                }}>
                  {post.title}
                </h2>

                <p style={{
                  color: "#777",
                  fontSize: "13px",
                  margin: 0
                }}>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : "Unpublished date"}
                </p>
              </div>
            </Link>
          ))}
        </section>

        <footer style={{
          textAlign: "center",
          color: "#666",
          fontSize: "12px",
          padding: "50px 0 20px"
        }}>
          © 2026 DC Archive
        </footer>
      </div>
    </main>
  )
}

const navStyle = {
  color: "#ccc",
  fontSize: "13px",
  letterSpacing: "1px",
  margin: "0 14px",
  textDecoration: "none"
}