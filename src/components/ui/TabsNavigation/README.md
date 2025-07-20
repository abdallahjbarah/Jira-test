# TabsNavigation Component

A reusable component for creating tab-based navigation in your application. The component is styled to match the design system with appropriate colors and styling from your tailwind configuration.

## Usage

```tsx
import TabsNavigation, { TabItem } from '@/components/ui/TabsNavigation';

// Define your tabs
const tabs: TabItem[] = [
  {
    id: 'upcoming',
    label: 'Upcoming',
    content: <div>Content for upcoming tab</div>,
  },
  {
    id: 'completed',
    label: 'Completed',
    content: <div>Content for completed tab</div>,
  },
  {
    id: 'cancelled',
    label: 'Cancelled',
    content: <div>Content for cancelled tab</div>,
  },
];

// Use the component
<TabsNavigation
  tabs={tabs}
  defaultActiveTab='upcoming'
  onChange={tabId => console.log('Tab changed to:', tabId)}
/>;
```

## Props

| Name                     | Type                      | Default      | Description                                             |
| ------------------------ | ------------------------- | ------------ | ------------------------------------------------------- |
| `tabs`                   | `TabItem[]`               | Required     | Array of tab items with id, label, and optional content |
| `defaultActiveTab`       | `string`                  | First tab ID | ID of the initially active tab                          |
| `onChange`               | `(tabId: string) => void` | -            | Callback when tab changes                               |
| `containerClassName`     | `string`                  | -            | Additional classes for the outer container              |
| `tabsContainerClassName` | `string`                  | -            | Additional classes for the tabs navigation container    |
| `contentClassName`       | `string`                  | -            | Additional classes for the content container            |
| `showContent`            | `boolean`                 | `true`       | Whether to show the content section                     |

## Tab Item Structure

```ts
type TabItem = {
  id: string; // Unique identifier for the tab
  label: string; // Display text for the tab
  content?: React.ReactNode; // Optional content to display when tab is active
};
```

## Styling

The component uses the following tailwind classes from your configuration:

- Primary colors: `primary_2` (orange for inactive tabs), `primary_4` (white for active tab)
- Text colors: `text_1` (for active tab), `primary_4` (for inactive tab text)
- Font sizing: `text-custom-16` with `font-custom-600` weight
- Shadow: `shadow-customShadow_1` for the tabs container
- Rounded corners for the tabs container: `rounded-[2rem]`
