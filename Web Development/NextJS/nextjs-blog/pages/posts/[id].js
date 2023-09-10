import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) { // *!  the Post component receives the postData prop, and it's passed to the component automatically through the getStaticProps function.
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

/**
In the code you provided, the `getStaticProps` function is using the `params` parameter, which is automatically passed by Next.js. The `params` object contains information about the dynamic route parameters used in your Next.js application.

Specifically, in the context of your code, `params.id` is used to fetch data for a specific blog post based on its ID.

Here's how it works:

1. You have dynamic routes set up in your Next.js application, which means that you can have URLs like `/posts/1`, `/posts/2`, etc., where the numbers are dynamic IDs representing individual blog posts.

2. When you define a page that uses dynamic routing in Next.js, you can specify a file name that includes square brackets to indicate a dynamic parameter. For example, `[id].js`.

3. Next.js automatically parses the dynamic route parameter and passes it as an object to the `getStaticProps` function. In your case, since your file is named `[id].js`, the parameter is available as `params.id`.

4. In the `getStaticProps` function, you use `params.id` to fetch the data for the specific blog post with that ID. This allows you to dynamically generate the content for each individual blog post page based on the ID in the URL.

So, `params` is provided by Next.js as a way to access the dynamic route parameters, and you can use it to fetch data or perform any other necessary operations specific to the requested dynamic route.

*! <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> What does this line mean ?
*? The line `<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />` is a JSX expression in React and Next.js. It is used to render HTML content as part of your React component. Let's break it down:

1. `<div>`: This is an HTML `<div>` element. It's a common HTML element used for grouping and structuring content.

2. `dangerouslySetInnerHTML`: This is a special React prop that allows you to set the inner HTML content of an element. It's called "dangerous" because it can potentially introduce security vulnerabilities if not used carefully. It expects an object with an `__html` property.

3. `{{ __html: postData.contentHtml }}`: This is the value assigned to the `dangerouslySetInnerHTML` prop. It's an object with a single property `__html` that contains a string. In this case, `postData.contentHtml` is the HTML content you want to render inside the `<div>`. The double curly braces `{{ ... }}` are used because you're writing JavaScript code inside JSX, and the inner curly braces `{ ... }` are for creating an object literal.

*? So, the line effectively takes the HTML content stored in `postData.contentHtml` (which is assumed to be a string containing HTML markup) and inserts it into the `<div>` element, allowing you to render the HTML content within your React component.

*? Please note that using `dangerouslySetInnerHTML` should be done with caution, especially if the HTML content is coming from untrusted sources, as it can potentially expose your application to cross-site scripting (XSS) attacks. Make sure you trust the source of the HTML content, or sanitize it to remove any potentially harmful elements or scripts before using it in this manner.
*/