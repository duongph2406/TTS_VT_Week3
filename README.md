# VSS Chat Platform

A multi-platform chat management system built with TypeScript.

## Features

- User authentication with validation
- Dashboard interface
- Real-time form validation
- Session management
- TypeScript for better code quality and type safety

## Development Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Compile TypeScript files:
```bash
npm run build
```

3. For development with auto-compilation:
```bash
npm run watch
```

### File Structure

```
├── script/           # TypeScript source files
│   ├── login.ts     # Login functionality
│   └── dashboard.ts # Dashboard functionality
├── dist/            # Compiled JavaScript files (auto-generated)
├── style/           # CSS files
├── img/             # Images
├── icon/            # Icons
├── index.html       # Login page
├── dashboard.html   # Dashboard page
├── tsconfig.json    # TypeScript configuration
└── package.json     # Dependencies and scripts
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and auto-compile
- `npm run dev` - Alias for watch mode
- `npm run clean` - Clean compiled files

### TypeScript Features

The project now includes:

- **Type Safety**: Strong typing for all variables and functions
- **Interfaces**: Well-defined data structures
- **Classes**: Object-oriented approach for dashboard management
- **Modern ES2020**: Latest JavaScript features with TypeScript benefits
- **DOM Type Safety**: Proper typing for DOM elements and events

### Login Credentials

- Email: `duongph2406@gmail.com`
- Password: `123@123Aa`

## Usage

1. Open `index.html` in a web browser
2. Use the provided credentials to log in
3. You will be redirected to the dashboard upon successful authentication

## TypeScript Conversion

This project has been converted from JavaScript to TypeScript with the following improvements:

- Added type definitions for all data structures
- Implemented proper error handling with typed validation results
- Created class-based architecture for better code organization
- Added comprehensive type safety for DOM manipulation
- Improved code maintainability and developer experience
