/// <reference types="vite/client" />

declare module "*.css?url" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: string;
  export default content;
} 