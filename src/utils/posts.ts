export interface PostSummary {
  title: string;
  description: string;
  pubDate: Date;
  url: string;
}

interface MarkdownPost {
  frontmatter: {
    title: string;
    description: string;
    pubDate: string | Date;
    draft?: boolean;
  };
  url: string;
}

const postModules = import.meta.glob("../pages/posts/*.md", {
  eager: true,
}) as Record<string, MarkdownPost>;

export function getPosts(): PostSummary[] {
  return Object.values(postModules)
    .filter((post) => !post.frontmatter.draft)
    .map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: new Date(post.frontmatter.pubDate),
      url: post.url,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
