import Link from "next/link"
import { client } from "../lib/sanity"

export default async function Home() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    title,
    slug,
    mainImage{
      asset->{url}
    },
    categories[]->{title},
    publishedAt
  }`)

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

        {/* HEADER */}
        <header style={{
          textAlign: "center",
          padding: "55px 0 28px"
        }}>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "52px",
            margin: 0
          }}>
            DC Archive
          </h1>

          <p style={{
            color: "#aaa",
            marginTop: "12px",
            fontSize: "16px"
          }}>
            A Personal Archive of Thoughts, Trading, and Business
          </p>
        </header>

        {/* NAV */}
        <div style={{
          borderTop: "1px solid #333",
          borderBottom: "1px solid #333",
          padding: "16px 0",
          textAlign: "center"
        }}>
          <Link href="/" style={{ ...navStyle, color: "#d4af37" }}>
            HOME
          </Link>
          <Link href="/category/notes" style={navStyle}>NOTES</Link>
          <Link href="/category/trading" style={navStyle}>TRADING</Link>
          <Link href="/category/business" style={navStyle}>BUSINESS</Link>
          <Link href="/category/family" style={navStyle}>FAMILY</Link>
        </div>

        {/* CONTENT */}
        <section className="home-layout" style={{
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "34px",
  marginTop: "38px"
}}>

          {/* LEFT - POSTS */}
          <div>
            {posts.map((post) => (
              <Link
                key={post.slug.current}
                href={`/${post.slug.current}`}   // ✅ 핵심: 상세 페이지로 이동
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid #303030",
                  marginBottom: "28px",
                  background: "#141414",
                  transition: "transform 0.25s ease, border-color 0.25s ease"
                }}
              >
                {post.mainImage?.asset?.url && (
                  <img
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "260px",
                      objectFit: "cover"
                    }}
                  />
                )}

                <div style={{ padding: "24px" }}>
                  <p style={{
                    color: "#d4af37",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    margin: "0 0 10px"
                  }}>
                    {post.categories?.[0]?.title || "Archive"}
                  </p>

                  <h2 style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "28px",
                    margin: "0 0 12px"
                  }}>
                    {post.title}
                  </h2>

                  <p style={{
                    color: "#777",
                    fontSize: "13px",
                    margin: "0 0 18px"
                  }}>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : "Unpublished date"}
                  </p>

                  <span style={{
                    display: "inline-block",
                    background: "#d4af37",
                    color: "#111",
                    padding: "9px 14px",
                    fontSize: "12px"
                  }}>
                    Continue Reading
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* RIGHT - SIDEBAR */}
          <aside style={{
            border: "1px solid #303030",
            background: "#141414",
            padding: "24px",
            height: "fit-content"
          }}>
            <h3 style={{
              fontFamily: "Georgia, serif",
              fontSize: "22px"
            }}>
              About DC Archive
            </h3>

            <p style={{
              color: "#aaa",
              lineHeight: "1.7",
              fontSize: "14px"
            }}>
              A quiet personal archive for notes, trading reviews,
              business lessons, and family legacy.
            </p>

            <hr style={{ borderColor: "#333", margin: "24px 0" }} />

            <h3 style={{
              fontFamily: "Georgia, serif",
              fontSize: "20px"
            }}>
              Categories
            </h3>

            <p style={{
              color: "#aaa",
              lineHeight: "1.8",
              fontSize: "14px"
            }}>
              Notes<br />
              Trading<br />
              Business<br />
              Family
            </p>
          </aside>
        </section>

        {/* FOOTER */}
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
  margin: "0 14px",
  textDecoration: "none"
}