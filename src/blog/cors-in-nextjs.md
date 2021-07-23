---
title: CORS in NextJS
date: "2021-07-19"
permalink: /blog/cors-in-nextjs.html
ogDescription: CORS setting in NextJS application was painful for me, but after reading this article it will be easier for you.
ogImage: /assets/img/cors-in-nextjs-800w.jpeg
featuredImage: /assets/img/cors-in-nextjs-640w.webp
---

<picture>
  <source srcset="/assets/img/cors-in-nextjs-800w.webp" media="(min-width: 1000px)">
  <source srcset="/assets/img/cors-in-nextjs-640w.webp" media="(min-width: 800px)">
  <img srcset="/assets/img/cors-in-nextjs-320w.webp" alt="Do we need class components anymore?" loading="lazy">
</picture>

Setting up CORS is always a challenge for people who are not really from server-side application backgrounds. Luckily it wasn't the case for me, but <a href="https://vercel.com/">Vercel</a>.

I have a couple of projects on Vercel where I can host client-side applications built on ReactJS, NextJS, Gatsby, etc. Recently I found you can host <a href="https://vercel.com/docs/serverless-functions/introduction">serverless</a> functions on Vercel as well.

These serverless functions are nothing but open up NodeJS server-side script access. You can create a server and run it on Vercel as well as send emails and whatnot.

## How to setup NextJS API

```bash
npx create-next-app --example with-mongodb with-mongodb-app
# or
yarn create next-app --example with-mongodb with-mongodb-app
```

> Example from <a href="https://github.com/vercel/next.js/tree/canary/examples/with-mongodb">https://github.com/vercel/next.js/tree/canary/examples/with-mongodb</a>

In the above command, you will get the NextJS project setup inside `with-mongodb-app` directory.

Now we have our application ready, it's time to set up the MongoDB instance.

You can use <a href="https://mongodb.com/atlas">mongodb.com</a> to set up a free account with limited space.

## MongoDB setup

Once you have your MongoDB instance ready, feel free to rename and edit `env.local.example` to `.env.local`

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using <a href="https://mongodb.com/atlas">MongoDB Atlas</a> you can find this by clicking the "Connect" button for your cluster.
- `MONGODB_DB` - The name of the MongoDB database you want to use.

## Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev

```

The application should be up and running on <a href="http://localhost:3000">http://localhost:3000</a>

## CORS setup

After setting up database and server, now it's time to set CORS settings.

Create `vercel.json` under the root folder.

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" }, // Change this to specific domain for better security
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        }
      ]
    }
  ]
}
```

The above change will work for `GET` requests but you will face problems while making `PUT` and `POST` requests. For this, we need to make one more change.

Go to `/api/index.js` file.

```js
export default async (req, res) => {
  const { method } = req;

  // This will allow OPTIONS request
  if (method === "OPTIONS") {
    return res.status(200).send("ok");
  }
};
```

## Conclusion

{% include partials/_suggestion.html %}
