# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Shortly URL shortening API Challenge solution](#frontend-mentor---shortly-url-shortening-api-challenge-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

![image](https://github.com/franclobo/url_shortening_api/assets/58642949/243dff1f-0052-4167-b281-6c1b3ac0372c)

### Links

- Solution URL: [url-shortening](https://github.com/franclobo/url_shortening_api)
- Live Site URL: [url-shortening](https://url-shortening-api-three-ochre.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Redux Toolkit](https://redux-toolkit.js.org/usage/usage-with-typescript) - For state management
- [TailwindCSS](hhttps://tailwindui.com/) - For styles

### What I learned

It was necessary to create a server side route handler to make the POST request to the API, because the API does not support CORS. The handler is as follows:

```js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { url } = req.body;
      const response = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ url }).toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
```

### Continued development

I will continue to improve the project by adding more features and improving the user experience.

### Useful resources

- [Adding TypeScript types](https://nextjs.org/docs/pages/building-your-application/routing/api-routes#adding-typescript-types) - You can make your API Routes more type-safe by importing the NextApiRequest and NextApiResponse types from next, in addition to those, you can also type your response data.

## Author

- Website - [WebMinds Studio](https://www.webmindsstudio.com/)
- Frontend Mentor - [@franclobo](https://www.frontendmentor.io/profile/franclobo)
- Twitter - [@Pancho2788](https://twitter.com/Pancho2788)

## Acknowledgments

I want to thank Frontend Mentor for the opportunity to improve my skills, specially to the community for the support and feedback.
