/**
 * Simple Lexical Content Renderer
 * Renders Lexical editor JSON content from PayloadCMS
 */

import React from "react";

interface LexicalNode {
  type: string;
  version: number;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  tag?: string;
  value?: number;
  listType?: string;
  start?: number;
  [key: string]: any;
}

interface LexicalContent {
  root: {
    children: LexicalNode[];
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  // Text node
  if (node.type === "text") {
    let text: React.ReactNode = node.text || "";

    // Apply formatting
    if (node.format) {
      if (node.format & 1) text = <strong key={index}>{text}</strong>;
      if (node.format & 2) text = <em key={index}>{text}</em>;
      if (node.format & 4) text = <u key={index}>{text}</u>;
      if (node.format & 8) text = <s key={index}>{text}</s>;
      if (node.format & 16) text = <code key={index}>{text}</code>;
    }

    return text;
  }

  // Paragraph
  if (node.type === "paragraph") {
    return (
      <p key={index}>
        {node.children?.map((child, i) => renderNode(child, i))}
      </p>
    );
  }

  // Headings
  if (node.type === "heading") {
    const Tag = (node.tag || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    return (
      <Tag key={index}>
        {node.children?.map((child, i) => renderNode(child, i))}
      </Tag>
    );
  }

  // List
  if (node.type === "list") {
    const ListTag = node.listType === "number" ? "ol" : "ul";
    return (
      <ListTag key={index} start={node.start}>
        {node.children?.map((child, i) => renderNode(child, i))}
      </ListTag>
    );
  }

  // List item
  if (node.type === "listitem") {
    return (
      <li key={index}>
        {node.children?.map((child, i) => renderNode(child, i))}
      </li>
    );
  }

  // Quote
  if (node.type === "quote") {
    return (
      <blockquote key={index} className="mxd-article__quote">
        {node.children?.map((child, i) => renderNode(child, i))}
      </blockquote>
    );
  }

  // Code block
  if (node.type === "code") {
    return (
      <pre key={index} className="mxd-article__code">
        <code>{node.children?.map((child, i) => renderNode(child, i))}</code>
      </pre>
    );
  }

  // Link
  if (node.type === "link") {
    return (
      <a
        key={index}
        href={node.url}
        target={node.newTab ? "_blank" : undefined}
        rel={node.newTab ? "noopener noreferrer" : undefined}
      >
        {node.children?.map((child, i) => renderNode(child, i))}
      </a>
    );
  }

  // Line break
  if (node.type === "linebreak") {
    return <br key={index} />;
  }

  // Default: render children
  if (node.children) {
    return (
      <div key={index}>
        {node.children.map((child, i) => renderNode(child, i))}
      </div>
    );
  }

  return null;
}

export default function LexicalRenderer({ content }: { content: any }) {
  if (!content || typeof content !== "object") {
    return null;
  }

  const lexicalContent = content as LexicalContent;

  if (!lexicalContent.root || !lexicalContent.root.children) {
    return null;
  }

  return (
    <div className="mxd-article__content">
      {lexicalContent.root.children.map((node, index) =>
        renderNode(node, index)
      )}
    </div>
  );
}
