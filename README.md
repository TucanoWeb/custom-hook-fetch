# Centralize GET requisitions using Hooks

Centralize get requisitions using custom hooks. This repository is just a model to implement the logic. You must customize conform your necessities.

### Requisites

It's recommended that you have previous experience using concepts of the api, hooks, and typescript.

## Simplify Data Fetching and Caching in React with Custom Hooks and Axios

### Introduction

Efficiently fetching and caching data is crucial for any React application to improve performance and user experience. In this article, I'll show you a simplified way to create a custom hook in React that uses Axios for data fetching, with support for caching and authentication.

### Why Use Custom Hooks?

Custom hooks in React allow you to encapsulate and reuse stateful logic, making your components cleaner and easier to maintain. In this guide, we’ll create a useFetch hook that handles data fetching, caching, and loading state management.

### Step-by-Step Guide

**1.** Create the `useData` Hook
The useData hook uses the useFetch hook to fetch data from an API endpoint.

```bash
├── src
│ ├── hooks
│ │ ├── useData
└── .gitignore
```

**2.** Define the `useFetch` Hook
The useFetch hook handles making API requests, managing the loading state, and caching.

```bash
├── src
│ ├── hooks
│ │ ├── useFetch
└── .gitignore
```

**3.** Configure Axios for Caching and Authentication
The `api` module configures Axios to handle caching and authentication tokens

```bash
├── src
│ ├── api
└── .gitignore
```

**4.** Implement Cache Management
The `cache.ts` module handles storing and retrieving cached responses.

```bash
├── src
│ ├── api
│   ├── cache.ts
└── .gitignore
```

### Conclusion

By using custom hooks and Axios, you can create efficient and reusable data fetching logic in your React applications. This approach not only simplifies your components but also enhances performance by reducing redundant API calls through caching. Start implementing these techniques in your projects to see the benefits firsthand.
