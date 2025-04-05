export default async function (c) {
    const { default: pluginSyntaxHighlight } = await import("@11ty/eleventy-plugin-syntaxhighlight");
    c.addPlugin(pluginSyntaxHighlight);

    const { default: pluginRss } = await import("@11ty/eleventy-plugin-rss");
    c.addPlugin(pluginRss);

    const { default: pluginPostCss } = await import("@jgarber/eleventy-plugin-postcss");
    c.addPlugin(pluginPostCss, {
        templateFormats: ["scss"],
    });

    const { default: pluginSitemap } = await import("@quasibit/eleventy-plugin-sitemap");
    c.addPlugin(pluginSitemap, {
        sitemap: {
            hostname: "http://bandithedoge.com",
        },
    });

    const { default: pluginPhosphorIcons } = await import("eleventy-plugin-phosphoricons");
    c.addPlugin(pluginPhosphorIcons, {
        size: 24,
    });

    const { DateTime } = await import("luxon");
    c.addFilter("readableDate", (date) => {
        return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL);
    });

    const { parse } = await import("yaml");
    c.addDataExtension("yaml", parse);

    c.addPassthroughCopy({ "./src/static/": "/" });
    c.addPassthroughCopy("src/posts/**/*.gif");
    c.addPassthroughCopy("src/posts/**/*.jpg");
    c.addPassthroughCopy("src/posts/**/*.png");

    c.setServerPassthroughCopyBehavior("copy");

    const { default: mit } = await import("markdown-it");
    const { default: mitAnchor } = await import("markdown-it-anchor");
    const { default: mitFootnote } = await import("markdown-it-footnote");
    const { default: mitDeflist } = await import("markdown-it-deflist");
    const { default: mitMark } = await import("markdown-it-mark");
    const { default: mitToc } = await import("markdown-it-table-of-contents");
    const { default: mitAttrs } = await import("markdown-it-attrs");
    const { default: mitImageFigures } = await import("markdown-it-image-figures");

    c.setLibrary(
        "md",
        mit({
            html: true,
            breaks: true,
            linkify: true,
        })
            .use(mitAnchor, {
                permalink: mitAnchor.permalink.ariaHidden({
                    placement: "after",
                    symbol: "#",
                }),
            })
            .use(mitFootnote)
            .use(mitDeflist)
            .use(mitMark)
            .use(mitToc, {
                listType: "ul",
                includeLevel: [1, 2, 3, 4, 5, 6],
            })
            .use(mitAttrs)
            .use(mitImageFigures, {
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
