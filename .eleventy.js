module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("logo.png");
  eleventyConfig.addPassthroughCopy("vevnit-mark.svg");
  eleventyConfig.addPassthroughCopy("Makinde.jpg");

  eleventyConfig.addCollection("publishedPosts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/posts/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  return {
    pathPrefix: "/content-writer-portfolio/",
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
