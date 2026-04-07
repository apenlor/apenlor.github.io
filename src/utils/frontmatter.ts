import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";
import type { RehypePlugin, RemarkPlugin } from "@astrojs/markdown-remark";

export const readingTimeRemarkPlugin: RemarkPlugin = () => {
  return function (tree, file) {
    const textOnPage = toString(tree);
    const readingTime = Math.ceil(getReadingTime(textOnPage).minutes);

    if (typeof file?.data?.astro?.frontmatter !== "undefined") {
      file.data.astro.frontmatter.readingTime = readingTime;
    }
  };
};

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tree.children = tree.children.flatMap((child: any) => {
      if (child.type === "element" && child.tagName === "table") {
        return [
          {
            type: "element",
            tagName: "div",
            properties: {
              style: "overflow:auto",
            },
            children: [child],
          },
        ];
      }
      return [child];
    });
  };
};

export const lazyImagesRehypePlugin: RehypePlugin = () => {
  return function (tree) {
    if (!tree.children) return;

    visit(tree, "element", function (node) {
      if (node.tagName === "img") {
        node.properties.loading = "lazy";
      }
    });
  };
};
