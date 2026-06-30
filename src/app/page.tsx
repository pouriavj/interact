import Header from "@/components/header/Header";
import Posts from "@/components/posts/Posts";

export default async function Home() {
  return (
    <main>
      <section id="header">
        <Header />
      </section>

      <section id="posts">
        <Posts />
      </section>
    </main>
  );
}

// ToDO: Use Section , Main, SEO Friendly html tags.
