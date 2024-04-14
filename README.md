# My Dictionary

This web app serves as our repository for storing vocabularies, idioms, and sentences that we aim to memorize.

It has a default Collins API that uses "English", "English - French" and "French-English".

## Demo

|                                         Signin & Signup page                                          |
| :---------------------------------------------------------------------------------------------------: |
| <img src="https://i.ibb.co/3YzWG2V/signin-signup-page-11.gif" alt="signin-signup-page-11" border="0" width="400"> |
|[https://i.ibb.co/3YzWG2V/signin-signup-page-11.gif](https://i.ibb.co/3YzWG2V/signin-signup-page-11.gif)|

|                                 Search word on dictionary and add to a list                                 |
| :---------------------------------------------------------------------------------------------------------: |
| <img src="https://i.ibb.co/xYfrbCw/search-word-and-add-list.gif" alt="search-word-and-add-list" border="0" width="400"> |
|[https://i.ibb.co/3YzWG2V/signin-signup-page-11.gif](https://i.ibb.co/xYfrbCw/search-word-and-add-list.gif)|

|                                  Wordbook                                   |
| :-------------------------------------------------------------------------: |
| <img src="https://i.ibb.co/rM1QDdT/wordbook.gif" alt="wordbook" border="0" width="400"> |
|[https://i.ibb.co/3YzWG2V/signin-signup-page-11.gif](https://i.ibb.co/rM1QDdT/wordbook.gif)|

## Service Architecture

<img src="https://i.ibb.co/cwCnKgy/service-architecture.png" alt="service-architecture" border="0">

<details>
<summary>ERD</summary>
<div markdown="1">
<img src="https://i.ibb.co/ngQhYw6/image.png" alt="image" border="0">

</div>
</details>

<details>
<summary>File tree</summary>
<pre markdown="2">

src
┣ NextUI
┃ ┣ NextUIProvider.tsx
┃ ┗ Provider.tsx
┣ app
┃ ┣ (route-handlers)
┃ ┃ ┣ api
┃ ┃ ┃ ┣ dictionary
┃ ┃ ┃ ┃ ┣ data
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┗ search
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┗ wordbook
┃ ┃ ┃ ┃ ┣ add-list
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┣ add-or-remove-word
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┣ add-word
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┣ delete-word
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┃ ┗ update-word
┃ ┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┗ auth
┃ ┃ ┃ ┣ callback
┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┣ signin
┃ ┃ ┃ ┃ ┗ route.ts
┃ ┃ ┃ ┗ signup
┃ ┃ ┃ ┃ ┗ route.ts
┃ ┣ error
┃ ┃ ┗ page.tsx
┃ ┣ home
┃ ┃ ┣ components
┃ ┃ ┃ ┣ AddToWordbookButton.tsx
┃ ┃ ┃ ┣ SearchInput.tsx
┃ ┃ ┃ ┣ SearchResult.tsx
┃ ┃ ┃ ┗ SelectLanguage.tsx
┃ ┃ ┗ page.tsx
┃ ┣ settings
┃ ┃ ┣ components
┃ ┃ ┃ ┣ About.tsx
┃ ┃ ┃ ┗ SettingButtons.tsx
┃ ┃ ┣ layout.tsx
┃ ┃ ┗ page.tsx
┃ ┣ signin
┃ ┃ ┗ page.tsx
┃ ┣ signup
┃ ┃ ┣ components
┃ ┃ ┃ ┗ ConfirmationSent.tsx
┃ ┃ ┗ page.tsx
┃ ┣ user
┃ ┃ ┣ layout.tsx
┃ ┃ ┗ page.tsx
┃ ┣ wordbook
┃ ┃ ┣ [name]
┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┣ components
┃ ┃ ┃ ┣ AddListButton.tsx
┃ ┃ ┃ ┣ AddWordButton.tsx
┃ ┃ ┃ ┣ Background.tsx
┃ ┃ ┃ ┣ ListCard.tsx
┃ ┃ ┃ ┗ WordCard.tsx
┃ ┃ ┣ layout.tsx
┃ ┃ ┗ page.tsx
┃ ┣ apple-icon.png
┃ ┣ favicon.ico
┃ ┣ global-error.jsx
┃ ┣ globals.css
┃ ┣ icon.ico
┃ ┣ layout.tsx
┃ ┗ page.tsx
┣ components
┃ ┣ auth
┃ ┃ ┣ Inputs
┃ ┃ ┃ ┣ EmailInput.tsx
┃ ┃ ┃ ┗ PasswordInput.tsx
┃ ┃ ┣ background
┃ ┃ ┃ ┗ Circles.tsx
┃ ┃ ┣ AuthPage.tsx
┃ ┃ ┗ SignOutButton.tsx
┃ ┣ footer
┃ ┃ ┣ Footer.tsx
┃ ┃ ┣ Icon.tsx
┃ ┃ ┗ Icons.tsx
┃ ┣ header
┃ ┃ ┗ Header.tsx
┃ ┣ icons
┃ ┃ ┗ Book.tsx
┃ ┣ links
┃ ┃ ┗ Link.tsx
┃ ┣ theme
┃ ┃ ┗ ThemeChanger.tsx
┃ ┗ Logo.tsx
┣ sources
┃ ┗ stacks.ts
┣ store
┃ ┗ searchInputLanguage.ts
┣ types
┃ ┣ auth
┃ ┃ ┗ AuthBody.ts
┃ ┣ .DS_Store
┃ ┣ icons.ts
┃ ┣ languages.ts
┃ ┣ routeReturnTypes.ts
┃ ┣ supabaseAuth.ts
┃ ┗ supabaseTypes.ts
┣ utils
┃ ┣ dictionary
┃ ┃ ┣ capitalizeFirstLetter.ts
┃ ┃ ┣ deleteText.ts
┃ ┃ ┣ extractPronunciation.ts
┃ ┃ ┣ extractTextBetweenTags.ts
┃ ┃ ┣ insertBeforeDefinition.ts
┃ ┃ ┣ makeWordSearchList.ts
┃ ┃ ┣ removeTitle.ts
┃ ┃ ┗ replaceText.ts
┃ ┣ middleware
┃ ┃ ┗ urlToOrigin.ts
┃ ┣ nodeMailer
┃ ┃ ┣ SendNonce.ts
┃ ┃ ┣ SendingOTPForm.tsx
┃ ┃ ┗ nodeMailer.ts
┃ ┣ regex
┃ ┃ ┣ email.ts
┃ ┃ ┗ removeAccents.ts
┃ ┣ store
┃ ┣ supabase
┃ ┃ ┣ auth
┃ ┃ ┃ ┣ isUserEmailDuplicated.ts
┃ ┃ ┃ ┣ signinHandler.ts
┃ ┃ ┃ ┗ signupHandler.ts
┃ ┃ ┣ client.ts
┃ ┃ ┣ login.ts
┃ ┃ ┣ server.ts
┃ ┃ ┗ sessionChecker.ts
┃ ┣ wordbook
┃ ┃ ┗ deleteWord.ts
┃ ┗ block.ts
┣ .DS_Store
┗ middleware.ts

</div>
</details>

## Stacks

- Next.js

  Next.js is a React framework that offers advantages for SEO application and makes it easy to utilize Server-Side Rendering (SSR). It provides a robust set of features and tools to build fast and scalable web applications.

- Typescript

  TypeScript is a strongly-typed superset of JavaScript that allows for clear type declarations. It enhances code readability, maintainability, and provides better IDE support with features like autocompletion and type checking.

- Supabase

  Supabase is an open-source Firebase alternative that offers a set of useful PostgreSQL extension features and plugins. It provides a flexible and scalable backend solution for building modern web applications.

- Zustand

  zustand is a state management library for React applications that eliminates the need for a provider. By avoiding unnecessary app wrapping, it minimizes re-renders and improves performance, resulting in a smoother user experience.

- Vercel

  Vercel is a cloud platform that allows for easy deployment of Next.js applications. With features like automatic scaling, continuous deployment, and serverless functions, Vercel simplifies the deployment process and ensures high availability and performance of your applications.

- Lodash

  Lodash is a popular utility library for JavaScript that provides a wide range of methods for manipulating arrays, objects, and strings. It includes functions for tasks like throttling, debouncing, and deep object manipulation, enhancing productivity and ensuring consistent performance across different browsers.

- Tailwind CSS

  Tailwind CSS is a highly customizable CSS framework that allows for rapid development of user interfaces. It offers a utility-first approach, enabling developers to quickly style their applications without writing custom CSS. With Tailwind, you can create responsive and visually appealing designs for your Next.js applications.

- Next UI

  TailwindNext UI is a component library built specifically for Next.js applications. It provides a collection of pre-designed UI components, such as buttons, forms, and navigation elements, that can be easily integrated into your projects. With Next UI, you can streamline the development process and create consistent and visually appealing user interfaces for your Next.js applications.

## APIs

- [Collins Dictionary API](https://www.collinsdictionary.com/collins-api)

## API Reference

### Dictionary

#### Search word using Collins Dictionary API

```http
  POST /api/dictionary/search
```

| What is used | Type                     | Description                                        |
| :----------- | :----------------------- | :------------------------------------------------- |
| `API_URL`    | `string`                 | **Required**. Your API URL                         |
| `API_KEY`    | `string`                 | **Required**. Your API Key                         |
| `word`       | `string`                 | **Required**.                                      |
| `language`   | `"en", "en-fr", "fr-en"` | **Required**. default value: "en"                  |
| `API_URL2`   | `string`                 | `/${language}/search/first/?q=${word}&format=html` |

#### Get, Set cookies

It sets word and language on cookies so users can have the same page when they re-visit `/home` (dictionary) page from other page such as `/wordbook`, `/user`, and `/settings`.

```http
  GET, POST /api/dictionary/data
```

| What is used | Type                     | Description                  |
| :----------- | :----------------------- | :--------------------------- |
| `word`       | `string`                 | **Required**. word value     |
| `language`   | `"en", "en-fr", "fr-en"` | **Required**. language value |

---

### Wordbook

#### Add a list

Users can add a new wordbook list so they can save their words or sentences. It has duplicate check so users cannot make the wordbook with the same name.

```http
  POST /api/wordbook/add-list
```

#### Add, update, delete word

Users can add, update and delete word from their wordbook.

```http
  POST /api/wordbook/add-word
  POST /api/wordbook/delete-word
  POST /api/wordbook/edit-word
```

| What is used          | Type     | Description                                                                           |
| :-------------------- | :------- | :------------------------------------------------------------------------------------ |
| `uid`                 | `string` | **Required(all)**. users' uuid.                                                       |
| `word`                | `string` | **Required(all)**. word value                                                         |
| `wordbookId`          | `string` | **Required(all)**. wordbook uuid                                                      |
| `definition`          | `string` | **Required**`/add-word` language value, users' customized definition value            |
| `original_definition` | `string` | **Required**`/add-word` original definition is the definition got from dictionary API |
| `language`            | `string` | _(Optional)_ `/add-word` language value                                               |

### Auth

#### Callback

This is used for user's mail confirmation. When user sends signup request, supabase will send the user a confirmation mail that contains site url along with the `token_hash`. By receiving a confirmation mail, user can click authenticate button to have themselves confirmed. When `token_hash` is valid, user is now confirmed and automatically redirected to `/home` page.

```http
  GET /auth/callback
```

#### Sign in & Sign up

Users can sign in or sign up with email and password.

```http
  POST /auth/signin
  POST /auth/signup
```

| What is used | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. user email value.   |
| `password`   | `string` | **Required**. user password value |

## Authors

- [@kimhwanhoon](https://www.github.com/kimhwanhoon)

## Color Reference

| Color                        | Hex                                                              |
| ---------------------------- | ---------------------------------------------------------------- |
| Primary Color                | ![#4438ca](https://via.placeholder.com/10/4438ca?text=+) #4438ca |
| Background Color             | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Primary Color (Dark mode)    | ![#3730a3](https://via.placeholder.com/10/3730a3?text=+) #3730a3 |
| Background Color (Dark mode) | ![#27272a](https://via.placeholder.com/10/27272a?text=+) #27272a |

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/kimhwanhoon/my-dictionary/blob/dev/LICENSE)
