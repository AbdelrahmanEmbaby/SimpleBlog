import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight as style } from "react-syntax-highlighter/dist/cjs/styles/prism";

export  const Markdown = ({ content }) => {
  return (
    <div className="prose prose-base max-w-none">
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold my-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-semibold my-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-medium my-2" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-medium my-2" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-lg font-medium my-2" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-base font-medium my-2" {...props} />
          ),

          // Text
          p: ({ node, ...props }) => (
            <p className="text-lg mb-4 leading-relaxed" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          strong: ({ node, ...props }) => (
            <strong className="font-bold" {...props} />
          ),
          del: ({ node, ...props }) => (
            <del className="line-through" {...props} />
          ),

          // Lists
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,

          // Links & Images
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img className="rounded max-w-full" {...props} />
          ),

          // Tables (GFM)
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto shadow-[0_0_0.5rem_0.1rem_rgba(0,0,0,0.05)]">
              <table className="min-w-full" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="border-b border-gray-300 p-2 text-left bg-gray-50"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border-b border-gray-300 p-2" {...props} />
          ),

          // Code
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={style}
                showLineNumbers
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-gray-100 px-1.5 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },

          // HTML Elements
          div: ({ node, className, ...props }) => (
            <div className={className} {...props} />
          ),
          span: ({ node, style, className, ...props }) => (
            <span style={style} className={className} {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-gray-200" {...props} />
          ),
          br: ({ node, ...props }) => <br {...props} />,

          // Blockquote
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
              {...props}
            />
          ),

          // Task lists
          input: ({ node, checked, ...props }) => (
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="w-4 aspect-square mr-2"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export const markdownTestString = `
# Heading 1 (h1)
## Heading 2 (h2)
### Heading 3 (h3)
#### Heading 4 (h4)
##### Heading 5 (h5)
###### Heading 6 (h6)

**Bold text** (strong)  
*Italic text* (em)  
~~Strikethrough text~~ (del)  
\`Inline code\` (code)

---

Paragraph (p) with a [link to Google](https://google.com) (a) and an image:  
![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg) (img)

> Blockquote (blockquote)  
> With multiple lines

---

### Lists
- Unordered list item (ul/li)
- Another item
  - Nested item

1. Ordered list item (ol/li)
2. Another item
   - Mixed list types work too

- [x] Completed task (input - GFM)
- [ ] Incomplete task

---

### Tables (GFM)
| Syntax      | Description | Test Text     |
|-------------|-------------|---------------|
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

---

### Code Blocks
\`\`\`js
// Pre/code block with syntax highlighting
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

\`Inline code\` works too (code)

---

### HTML Elements
<div style="border: 1px solid #ddd; padding: 1rem; margin: 1rem 0;">
  Custom div with <span style="color: red;">styled span</span>
</div>

Line<br>break (br) with HTML

Horizontal rule (hr):  
---

<span style="color:blue">Custom HTML span</span> (span)
`;
