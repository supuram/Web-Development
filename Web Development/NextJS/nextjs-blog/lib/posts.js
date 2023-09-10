import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
console.log(process.cwd()) // C:\Users\supra\HTML\Web Development\NextJS\nextjs-blog
console.log(postsDirectory) // C:\Users\supra\HTML\Web Development\NextJS\nextjs-blog\posts

// *! postsDirectory is a variable that holds the absolute path to the "posts" directory. It is constructed by joining the current working directory (process.cwd()) with the "posts" directory using path.join.

export function getSortedPostsData() { // *! This is a function that retrieves and processes the metadata from Markdown files in the "posts" directory.
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory); // *! an array that contains the names of all files (Markdown files) within the "posts" directory.
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');  // *! Reads the contents of the Markdown file as a string  

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    {console.log(matterResult.data)}

    // Combine the data with the id
    return { // *! return value is stored in allPostsData array 
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(id) { // We added the async keyword to getPostData because we need to use await for remark
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      contentHtml
    };
}

// So, matterResult.content contains the actual content of the Markdown file, excluding the metadata, and matterResult.data contains the metadata as a JavaScript object with key-value pairs.

/**
*! Explain await remark().use(html).process(matterResult.content);
Certainly! Let's break down the line `const processedContent = await remark().use(html).process(matterResult.content);` word by word:

1. `remark()`: `remark` is a JavaScript library commonly used for processing and transforming Markdown content. In this line, `remark()` initializes a new instance of the `remark` processor. This is the starting point for processing Markdown content.

2. `.use(html)`: `.use()` is a method provided by `remark` that allows you to add plugins to the processing pipeline. In this case, it's adding the `html` plugin to the processor. The `html` plugin is responsible for converting Markdown to HTML.

3. `.process(matterResult.content)`: `.process()` is another method provided by `remark`. It takes the Markdown content you want to process as its argument, in this case, `matterResult.content`. Here, `matterResult.content` is the Markdown content of your blog post, excluding the metadata. 

Now, let's put it all together:

- `remark()`: Initializes a `remark` processor.
- `.use(html)`: Adds the `html` plugin to the processor, indicating that the processor should convert Markdown to HTML.
- `.process(matterResult.content)`: Processes the Markdown content (`matterResult.content`) using the configured processor with the `html` plugin.

So, the line as a whole is initializing a `remark` processor, configuring it to use the `html` plugin for converting Markdown to HTML, and then processing the actual Markdown content of your blog post (`matterResult.content`) to generate HTML content. The result is stored in the `processedContent` variable, which will contain the HTML representation of your blog post's content.

*! But how come processedContent i sbuffer object and has to be converted to a string
*? The processedContent variable is a Buffer object because the remark library processes the Markdown content and returns the result as a Buffer. This is a design choice made by the library. Buffers are a common data structure in Node.js for handling binary data, and in this case, it's used to represent the processed HTML content.This .toString() method call on the Buffer object converts it from a binary representation into a string representation. In this context, it's converting the HTML content (which was processed as binary data) into a human-readable string that can be easily used in web applications or other contexts where you typically work with text.
*/