const fs = require("fs");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const CleanCSS = require("clean-css");
const readingTime = require("eleventy-plugin-reading-time");
const { minify } = require("terser");
const Image = require("@11ty/eleventy-img");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const MONTHS = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const compileImages = () => {
  // directory path
  const imgDir = "./src/assets/img/";

  // list all files in the directory
  fs.readdir(imgDir, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      if (file !== ".DS_Store") {
        (async () => {
          let url = imgDir + file;
          await Image(url, {
            widths: [320, 640, 800],
            outputDir: "./public/assets/img/",
            filenameFormat: function (id, src, width, format, options) {
              const filename = file.substr(0, file.lastIndexOf("."));
              return `${filename}-${width}w.${format}`;
            },
          });
        })();
      }
    });
  });
};

(async () => {
  await Image("./src/assets/icons/favicon.png", {
    widths: [32, 48, 72, 96, 144, 192, 256, 384, 512],
    formats: ["png"],
    outputDir: "./public/assets/icons/",
    filenameFormat: function (id, src, width, format, options) {
      return `favicon-${width}x${width}.${format}`;
    },
  });
  await Image("./src/assets/author/gurpreet-singh.jpg", {
    widths: [64, 128, 500],
    formats: ["png"],
    outputDir: "./public/assets/img/",
    filenameFormat: function (id, src, width, format, options) {
      return `author-${width}x${width}.${format}`;
    },
  });
})();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/css/");
  eleventyConfig.addPassthroughCopy("./src/assets/videos/");

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("blog", "layouts/blog.njk");

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(readingTime);

  compileImages();

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("dateFormat", function (value) {
    const dd = new Date(value);
    return `${MONTHS[dd.getMonth()]} ${dd.getDate()}, ${dd.getFullYear()}`;
  });

  eleventyConfig.addFilter("getSlug", function (value) {
    return value.replace(".html", ".md");
  });

  eleventyConfig.addFilter("getSlugId", function (value) {
    return value.replace(".html", "").replace("/blog/", "");
  });

  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async function (code, callback) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
      }
    }
  );

  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
