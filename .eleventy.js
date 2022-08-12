const postcss = require("postcss");
const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const anchor = require("markdown-it-anchor");
const { FontAwesomeIcon } = require("@campj/eleventy-fa-icons");
const yaml = require("yaml");


module.exports = function(c) {
    c.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

    c.addPlugin(require("@11ty/eleventy-plugin-rss"));

    c.addPlugin(require("eleventy-sass"), {
        postcss: postcss([require("tailwindcss")])
    });

    c.addPlugin(require("@quasibit/eleventy-plugin-sitemap"), {
        sitemap: {
            hostname: "http://bandithedoge.com"
        }
    });

    c.addNunjucksShortcode("fa", FontAwesomeIcon);

    c.addFilter("readableDate", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL);
    });

    c.addDataExtension("yaml", yaml.parse);

    c.addPassthroughCopy({ "./src/static/": "/" });
    c.addPassthroughCopy("src/posts/**/*.gif");
    c.addPassthroughCopy("src/posts/**/*.jpg");
    c.addPassthroughCopy("src/posts/**/*.png");

    c.setServerPassthroughCopyBehavior("copy");

    c.setLibrary(
        "md",
        markdownIt({
            html: true,
            breaks: true,
            linkify: true,
        })
            .use(anchor, {
                permalink: anchor.permalink.ariaHidden({
                    placement: "after",
                    symbol: "#",
                })
            })
            .use(require("markdown-it-footnote"))
            .use(require("markdown-it-deflist"))
            .use(require("markdown-it-mark"))
            .use(require("markdown-it-table-of-contents"), {
                listType: "ul",
                includeLevel: [1, 2, 3, 4, 5, 6]
            })
            .use(require("markdown-it-attrs"))
            .use(require("markdown-it-image-figures"), {
                dataType: true,
                figcaption: "alt"
            })
    );

    return {
        dir: {
            input: "src",
            output: "dist",
            data: "data",
            layouts: "layouts",
        },
        templateFormats: ["html", "md", "xml"],
        htmlTemplateEngine: "njk",
    };
};
