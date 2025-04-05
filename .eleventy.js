import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginPostCss from "@jgarber/eleventy-plugin-postcss";
import pluginSitemap from "@quasibit/eleventy-plugin-sitemap";
import pluginPhosphorIcons from "eleventy-plugin-phosphoricons";

import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import { parse } from "yaml";

export default async function (c) {
    c.addPlugin(pluginSyntaxHighlight);

    c.addPlugin(pluginRss);

    c.addPlugin(pluginPostCss, {
        templateFormats: ["scss"],
    });

    c.addPlugin(pluginSitemap, {
        sitemap: {
            hostname: "http://bandithedoge.com",
        },
    });

    c.addPlugin(pluginPhosphorIcons, {
        size: 24,
    });

    c.addFilter("readableDate", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL);
    });

    c.addDataExtension("yaml", parse);

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
            .use(require("markdown-it-anchor"), {
                permalink: require("markdown-it-anchor").permalink.ariaHidden({
                    placement: "after",
                    symbol: "#",
                }),
            })
            .use(require("markdown-it-footnote"))
            .use(require("markdown-it-deflist"))
            .use(require("markdown-it-mark"))
            .use(require("markdown-it-table-of-contents"), {
                listType: "ul",
                includeLevel: [1, 2, 3, 4, 5, 6],
            })
            .use(require("markdown-it-attrs"))
            .use(require("markdown-it-image-figures"), {
                dataType: true,
                figcaption: "alt",
            })
    );

    return {
        dir: {
            input: "src",
            output: "dist",
            data: "data",
            layouts: "layouts",
        },
        templateFormats: ["html", "md", "xml", "njk"],
        htmlTemplateEngine: "njk",
    };
}
