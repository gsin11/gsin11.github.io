---
title: Gurpreet Singh - Blog
layout: blog
encoding: UTF-8
---

# Blog posts

<section class="blog-posts-wrapper">
{%- for post in collections.posts reversed -%}
  <div class="blog-post-card">
    <article itemscope="" itemtype="http://schema.org/Article">
      <div class="blog-post-card-cover">
        <a itemprop="url" href="{{ post.url }}">
          <img srcset="{{post.data.featuredImage}}" class="shadow" alt="{{post.data.title}}" loading="lazy">
        </a>
      </div>
      <div class="w-full">
        <h1>
          <a itemprop="url" href="{{ post.url }}">
            <span itemprop="headline">{{ post.data.title }}</span>
          </a>
        </h1>
        <a itemprop="url" href="{{ post.url }}"><time itemprop="datePublished" class="opacity-75">{{ post.date | dateFormat }}</time></a> | 
        <a itemprop="url" href="{{ post.url }}"><small class="opacity-75 strong" id="{{ post.data.permalink | getSlugId }}">loading...</small></a>
        <a itemprop="url" href="{{ post.url }}"><p itemprop="description" class="opacity-75">{{ post.data.ogDescription }}</p></a>
      </div>
    </article>
  </div>
{%- endfor -%}
</section>

{% include partials/_subscribe.html %}
