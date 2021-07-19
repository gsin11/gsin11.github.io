---
title: GitHub Copilot - Future of Programming?
date: "2021-07-10"
permalink: /blog/github-copilot-future-of-programming.html
ogDescription: There is no second thought that Copilot is very powerful and has support for industry leading frameworks and libraries.
ogImage: /assets/img/will-artificial-intelligence-replace-developers-800w.jpeg
featuredImage: /assets/img/will-artificial-intelligence-replace-developers-640w.webp
---

<picture>
  <source srcset="/assets/img/will-artificial-intelligence-replace-developers-800w.webp" media="(min-width: 1000px)">
  <source srcset="/assets/img/will-artificial-intelligence-replace-developers-640w.webp" media="(min-width: 800px)">
  <img srcset="/assets/img/will-artificial-intelligence-replace-developers-320w.webp" alt="Strapi experience" loading="lazy">
</picture>

There were a couple of questions that came to my mind when I saw this first. In this article, I'll go through an example of the **[Copilot](https://copilot.github.com/)** peer programming plugin for VSCode.

## What is GitHub Copilot? <a name="what-is-github-copilot" class="anchor" aria-hidden="true" href="#what-is-github-copilot">#</a>

If you have noticed a recent post by Github, Copilot is an AI engine that helps you to write programs. It is a smart autocomplete peer programming bot that can smarty understand simple English and writes code.

```js
// find images without an alt attribute
// and give them a red border
```

The above code will create a program that directly can find missing `alt` attribute images and perform the following action.

```js
// find images without an alt attribute
// and give them a red border
function nonAltImages() {
  const images = document.querySelectorAll("img");
  for (let i = 0; i < images.length; i++) {
    if (!images[i].hasAttribute("alt")) {
      images[i].style.border = "1px solid red";
    }
  }
}
```

<div class="text-center">
  <video controls src="../assets/videos/ai_coding.mov" poster="../assets/videos/cover_ai_coding.png" width="100%"></video>
</div>

Not only this but you can use this AI engine to write test cases for yourself.

```jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((currCount) => currCount + 1)}>
        Increment
      </button>
      <p>Count: {count}</p>
    </div>
  );
}

// a unit test that asserts that count increases when the button is clicked
it("increments count", () => {
  const { getByText } = render(<Counter />);
  const button = getByText("Increment");
  fireEvent.click(button);
  expect(getByText("Count: 1")).toBeInTheDocument();
});
```

## Will AI replace developers? <a name="will-ai-replace-developer" class="anchor" aria-hidden="true" href="#will-ai-replace-developer">#</a>

Alone AIs aren't capable of anything unless you start teaching them. There is no second thought that Copilot is very powerful and has support for industry-leading frameworks and libraries, but it still can't replace humans.

## Will you loose your job? <a name="will-you-loose-your-job" class="anchor" aria-hidden="true" href="#will-you-loose-your-job">#</a>

Copilot is very new into the industry and seems very fascinating to see a bot writing code for you, but it has very limited features. It can write simple code snippets for you but for large scale programs, companies still need talent like you :)

## Conclusion <a name="conclusion" class="anchor" aria-hidden="true" href="#conclusion">#</a>

I like new things in the programming or tech world to try, whether it's a framework, library, or tool like Copilot. This tool can help people in their future project developments, but can't replace humans. I can see people will defiantly start using this tool in their regular day-2-day work (like we adapt to autocompletion of code syntax tools).

{% include partials/_suggestion.html %}
