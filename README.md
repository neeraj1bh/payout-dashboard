# Payouts Dashboard

### Live Demo

[Click here to see it live](https://payouts-dashboard.vercel.app/)

<img alt="Payouts Dashboard example" src="https://github.com/neeraj1bh/payout-dashboard/assets/55753068/511f320b-1692-41e9-8756-ae47ac21c151">

## Installation and usage

```bash
git clone https://github.com/neeraj1bh/payout-dashboard.git
cd payout-dashboard
yarn
yarn dev
```


## Features

- Search functionality allowing users to search payouts based on username.
- Pagination functionality for navigating through the payouts list.
- Utilization of Styled Components for styling in accordance with provided designs.
- Integration with existing API endpoints to retrieve payouts and facilitate searching.

## Choices and Reasons

- Pagination and page select added for better user experience and navigation through large datasets.
- Implemented sorting functionality to enhance data organization and facilitate smoother navigation.



## Folder Structure

```
.
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
├── assets
│   ├── CaretDownIcon.tsx
│   ├── CaretUpIcon.tsx
│   ├── SearchIcon.tsx
│   └── index.ts
├── components
│   ├── Container
│   │   └── Container.styled.tsx
│   ├── Header
│   │   └── Header.styled.tsx
│   ├── Pagination
│   │   ├── Pagination.styled.tsx
│   │   ├── Pagination.tsx
│   │   └── index.ts
│   ├── PayoutTable
│   │   ├── PayoutTable.styled.tsx
│   │   ├── PayoutTable.tsx
│   │   └── index.ts
│   ├── PayoutWrapper
│   │   ├── PayoutWrapper.styled.tsx
│   │   ├── PayoutWrapper.tsx
│   │   └── index.ts
│   └── SearchBar
│       ├── SearchBar.styled.tsx
│       ├── SearchBar.tsx
│       └── index.ts
├── lib
│   └── registry.tsx
└── utils
    ├── api.ts
    ├── debounce.ts
    ├── formatDate.ts
    └── pageSizes.ts

11 directories, 28 files
```
