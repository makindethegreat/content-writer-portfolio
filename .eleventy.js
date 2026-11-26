const {fetchSanityData} = require('./lib/sanity')
const {renderPortableText} = require('./lib/portable-text')
const MarkdownIt = require('markdown-it')
const markdown = new MarkdownIt({html: false, linkify: true, typographer: true})

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("blog/leadbay-vs-leadloft/assets");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("hero-typewriter.js");
  eleventyConfig.addPassthroughCopy("logo.png");
  eleventyConfig.addPassthroughCopy("vevnit-mark.svg");
  eleventyConfig.addPassthroughCopy("Makinde.jpg");
  eleventyConfig.addPassthroughCopy("404.html");

  eleventyConfig.addFilter("renderMarkdown", value => markdown.render(String(value || '')));
  eleventyConfig.addFilter("portableText", renderPortableText);

  eleventyConfig.addFilter("date", (value, format) => {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return value || "";
    const options = format === "%Y-%m-%d"
      ? { year: "numeric", month: "2-digit", day: "2-digit" }
      : format === "%B %d, %Y"
        ? { year: "numeric", month: "long", day: "2-digit" }
        : { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en", options).format(date);
  });

  eleventyConfig.addCollection("publishedPosts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/posts/*.md")
      .filter((post) => post.data.draft !== true)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  eleventyConfig.addCollection("sanityArticles", async function (collectionApi) {
    const localSlugs = new Set(collectionApi.getFilteredByGlob("content/posts/*.md")
      .filter(post => post.data.draft !== true)
      .map(post => post.data.slug || post.fileSlug));
    const data = await fetchSanityData();
    return (data.articles || []).filter(article => article.slug && !localSlugs.has(article.slug));
  });

  eleventyConfig.addCollection("allBlogPosts", async function (collectionApi) {
    const local = collectionApi.getFilteredByGlob("content/posts/*.md")
      .filter(post => post.data.draft !== true)
      .map(post => ({
        title: post.data.title,
        url: post.url,
        date: post.data.date,
        category: post.data.category || "Article",
        readTime: post.data.readTime || "",
        featuredImage: post.data.featuredImage || "",
        excerpt: post.data.excerpt || ""
      }));
    const localSlugs = new Set(local.map(post => {
      const match = post.url.match(/^\/blog\/([^/]+)/);
      return match ? match[1] : "";
    }));
    const data = await fetchSanityData();
    const cms = (data.articles || []).filter(article => article.slug && !localSlugs.has(article.slug)).map(article => ({
      title: article.title,
      url: `/blog/${article.slug}/`,
      date: article.publishedAt || "",
      category: article.category || "Article",
      readTime: "",
      featuredImage: article.coverImageUrl || article.featuredImageUrl || "",
      excerpt: article.excerpt || ""
    }));
    return [...local, ...cms].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  });

  return {
    pathPrefix: "/",
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
