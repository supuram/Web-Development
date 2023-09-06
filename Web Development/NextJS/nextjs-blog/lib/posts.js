import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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