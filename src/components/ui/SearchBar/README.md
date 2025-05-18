# SearchBar Component

A reusable search bar component that wraps the SearchInput component and provides state management with onChange and onSearch callbacks.

## Usage

```tsx
import SearchBar from '@/components/ui/SearchBar';

// Basic usage
<SearchBar
  placeholder="Search"
  onSearch={(query) => console.log('Search submitted:', query)}
  className="max-w-md"
/>

// With onChange handler
<SearchBar
  placeholder="Search items..."
  onChange={(query) => filterResults(query)}
  onSearch={(query) => performFullSearch(query)}
/>
```

## Props

| Name          | Type                      | Default    | Description                          |
| ------------- | ------------------------- | ---------- | ------------------------------------ |
| `onSearch`    | `(query: string) => void` | -          | Called when Enter key is pressed     |
| `onChange`    | `(query: string) => void` | -          | Called when the search input changes |
| `className`   | `string`                  | -          | Additional classes for the container |
| `placeholder` | `string`                  | `"Search"` | Placeholder text for the input       |

## Features

- Manages search input state internally
- Provides callbacks for both real-time changes and search submission
- Wraps the underlying SearchInput component with additional functionality

## When to Use

Use this component when you need a search bar with:

- State management
- Both onChange and onSearch callbacks

For simpler use cases, you can use the SearchInput component directly.

## Translation Support

If you need translation support, handle it in the parent component:

```tsx
import { useTranslation } from '@/contexts/TranslationContext';
import SearchBar from '@/components/ui/SearchBar';

const SearchWithTranslation = () => {
  const { t } = useTranslation();

  return <SearchBar placeholder={t('common.search')} onSearch={handleSearch} />;
};
```
