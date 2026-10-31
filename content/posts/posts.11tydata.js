module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      if (data.draft === true) return false;
      return `/blog/${data.page.fileSlug}/index.html`;
    }
  }
};
