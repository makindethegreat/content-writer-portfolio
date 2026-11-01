module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("hero-typewriter.js");
  eleventyConfig.addPassthroughCopy("logo.png");
  eleventyConfig.addPassthroughCopy("vevnit-mark.svg");
  eleventyConfig.addPassthroughCopy("Makinde.jpg");

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
