/**
 * Utility functions for working with Lexical editor content from PayloadCMS
 */

interface LexicalNode {
  type: string;
  text?: string;
  children?: LexicalNode[];
  [key: string]: any;
}

interface LexicalContent {
  root?: {
    children?: LexicalNode[];
    [key: string]: any;
  };
}

/**
 * Extract plain text from a Lexical node recursively
 */
function extractTextFromNode(node: LexicalNode): string {
  if (node.type === "text" && node.text) {
    return node.text;
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromNode).join("");
  }

  return "";
}

/**
 * Extract plain text from Lexical content
 * Returns empty string if content is not a valid Lexical object
 */
export function extractTextFromLexical(content: any): string {
  if (!content) {
    return "";
  }

  // If it's already a string, return it
  if (typeof content === "string") {
    return content;
  }

  // If it's not an object, return empty string
  if (typeof content !== "object") {
    return "";
  }

  const lexicalContent = content as LexicalContent;

  // Check if it has the root structure
  if (lexicalContent.root && lexicalContent.root.children) {
    return lexicalContent.root.children.map(extractTextFromNode).join(" ").trim();
  }

  // If it's an object but not Lexical format, return empty string
  return "";
}

