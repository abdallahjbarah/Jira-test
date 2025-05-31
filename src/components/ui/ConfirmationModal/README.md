# ConfirmationModal Component

A reusable confirmation alert popup component built using the existing Modal component. This component provides a consistent way to ask users for confirmation before performing destructive or important actions.

## Features

- Built on top of the existing Modal component
- Promise-based API for easy async/await usage
- Customizable title, message, and button text
- Support for primary and danger button variants
- Loading state support
- Follows the project's design patterns and styling

## Components

### ConfirmationModal

The main modal component that renders the confirmation dialog.

### useConfirmationModal Hook

A custom hook that manages the modal state and provides a promise-based API.

### ConfirmationModalProvider

A provider component that combines the modal and hook for easier usage.

## Usage

### Method 1: Using the Hook Directly (Recommended)

```tsx
import React from 'react';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import useConfirmationModal from '@/hooks/useConfirmationModal';

function MyComponent() {
  const {
    isOpen,
    config,
    isLoading,
    openConfirmation,
    closeConfirmation,
    handleConfirm,
  } = useConfirmationModal();

  const handleDelete = async () => {
    const confirmed = await openConfirmation({
      title: 'Delete Item',
      message:
        'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmButtonVariant: 'danger',
    });

    if (confirmed) {
      // Perform delete action
      console.log('Item deleted');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Item</button>

      {/* Render the confirmation modal */}
      {config && (
        <ConfirmationModal
          isOpen={isOpen}
          onClose={closeConfirmation}
          onConfirm={handleConfirm}
          title={config.title}
          message={config.message}
          confirmText={config.confirmText}
          cancelText={config.cancelText}
          confirmButtonVariant={config.confirmButtonVariant}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
```

### Method 2: Using the Provider (Alternative)

```tsx
import React from 'react';
import ConfirmationModalProvider from '@/components/ui/ConfirmationModal/ConfirmationModalProvider';

function App() {
  return (
    <ConfirmationModalProvider>
      <MyComponent />
    </ConfirmationModalProvider>
  );
}
```

## API Reference

### ConfirmationModal Props

| Prop                   | Type                    | Default            | Description                                    |
| ---------------------- | ----------------------- | ------------------ | ---------------------------------------------- |
| `isOpen`               | `boolean`               | -                  | Whether the modal is open                      |
| `onClose`              | `() => void`            | -                  | Function called when modal is closed           |
| `onConfirm`            | `() => void`            | -                  | Function called when confirm button is clicked |
| `title`                | `string`                | `'Confirm Action'` | Modal title                                    |
| `message`              | `string`                | -                  | Confirmation message                           |
| `confirmText`          | `string`                | `'Confirm'`        | Confirm button text                            |
| `cancelText`           | `string`                | `'Cancel'`         | Cancel button text                             |
| `confirmButtonVariant` | `'primary' \| 'danger'` | `'primary'`        | Confirm button style variant                   |
| `isLoading`            | `boolean`               | `false`            | Whether to show loading state                  |

### useConfirmationModal Hook

#### Returns

| Property            | Type                                               | Description                           |
| ------------------- | -------------------------------------------------- | ------------------------------------- |
| `isOpen`            | `boolean`                                          | Whether the modal is open             |
| `config`            | `ConfirmationConfig \| null`                       | Current modal configuration           |
| `isLoading`         | `boolean`                                          | Loading state                         |
| `openConfirmation`  | `(config: ConfirmationConfig) => Promise<boolean>` | Opens the modal and returns a promise |
| `closeConfirmation` | `() => void`                                       | Closes the modal                      |
| `handleConfirm`     | `() => void`                                       | Handles confirm action                |
| `setLoading`        | `(loading: boolean) => void`                       | Sets loading state                    |

#### ConfirmationConfig

| Property               | Type                    | Default | Description                  |
| ---------------------- | ----------------------- | ------- | ---------------------------- |
| `title`                | `string`                | -       | Modal title                  |
| `message`              | `string`                | -       | Confirmation message         |
| `confirmText`          | `string`                | -       | Confirm button text          |
| `cancelText`           | `string`                | -       | Cancel button text           |
| `confirmButtonVariant` | `'primary' \| 'danger'` | -       | Confirm button style variant |

## Examples

### Basic Confirmation

```tsx
const confirmed = await openConfirmation({
  message: 'Are you sure you want to continue?',
});

if (confirmed) {
  // User clicked confirm
}
```

### Delete Confirmation

```tsx
const confirmed = await openConfirmation({
  title: 'Delete Item',
  message: 'This action cannot be undone. Are you sure?',
  confirmText: 'Delete',
  confirmButtonVariant: 'danger',
});
```

### Custom Button Text

```tsx
const confirmed = await openConfirmation({
  title: 'Save Changes',
  message: 'Do you want to save your changes?',
  confirmText: 'Save',
  cancelText: 'Discard',
});
```

## Styling

The component uses styled-components and follows the project's design system:

- Consistent button sizing and styling
- Proper spacing and typography
- Hover and disabled states
- Responsive design

## Integration with Translation

The component works well with the project's translation system:

```tsx
const confirmed = await openConfirmation({
  title: t('wishlist.deleteConfirmation.title'),
  message: t('wishlist.deleteConfirmation.message'),
  confirmText: t('wishlist.delete'),
  cancelText: t('common.cancel'),
});
```
