# EditCollectionModal Component

A reusable modal component for editing collection names. Built using the existing Modal component, FormInput component, and integrates with the useUpdateCollectionDetails API.

## Features

- Built on top of the existing Modal component
- Uses FormInput for consistent form styling
- Integrates with the useUpdateCollectionDetails API
- Form validation with error handling
- Loading states during API calls
- Auto-focus on input field
- Prevents submission if name hasn't changed
- Follows the project's design patterns and styling

## Usage

```tsx
import React from 'react';
import EditCollectionModal from '@/components/ui/EditCollectionModal';
import useModal from '@/hooks/useModal';

function MyComponent() {
  const { isOpen, openModal, closeModal } = useModal();
  const collectionId = 'collection-123';
  const currentName = 'My Collection';

  const handleEditSuccess = () => {
    // Refresh data or show success message
    console.log('Collection updated successfully');
  };

  return (
    <div>
      <button onClick={openModal}>Edit Collection</button>

      <EditCollectionModal
        isOpen={isOpen}
        onClose={closeModal}
        collectionId={collectionId}
        currentName={currentName}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop           | Type         | Required | Description                               |
| -------------- | ------------ | -------- | ----------------------------------------- |
| `isOpen`       | `boolean`    | Yes      | Whether the modal is open                 |
| `onClose`      | `() => void` | Yes      | Function called when modal is closed      |
| `collectionId` | `string`     | Yes      | ID of the collection to edit              |
| `currentName`  | `string`     | Yes      | Current name of the collection            |
| `onSuccess`    | `() => void` | No       | Function called when update is successful |

## Features

### Form Validation

The component includes built-in validation:

- **Required field**: Collection name cannot be empty
- **Change detection**: Prevents submission if name hasn't changed
- **Trimming**: Automatically trims whitespace from input
- **Max length**: Limits input to 100 characters

### Error Handling

- Displays API errors in the form input
- Shows validation errors inline
- Handles network errors gracefully

### Loading States

- Disables form inputs during API calls
- Shows loading text on submit button
- Prevents multiple submissions

### User Experience

- Auto-focuses on input field when modal opens
- Resets form when modal is closed or opened
- Supports form submission via Enter key
- Consistent button styling and behavior

## Integration Example

Here's how it's integrated in the wishlist page:

```tsx
import EditCollectionModal from '@/components/ui/EditCollectionModal';
import useModal from '@/hooks/useModal';

function WishlistCollectionPage() {
  const { isOpen, openModal, closeModal } = useModal();
  const { data: collectionDetails, refetch } =
    useFetchCollectionDetails(collectionId);

  const handleEditSuccess = () => {
    refetch(); // Refresh the collection data
  };

  return (
    <div>
      <button onClick={openModal}>Edit Collection</button>

      <EditCollectionModal
        isOpen={isOpen}
        onClose={closeModal}
        collectionId={collectionId}
        currentName={collectionDetails?.collectionName || ''}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
```

## Translation Keys

The component uses the following translation keys:

```json
{
  "wishlist": {
    "editModal": {
      "title": "Edit Collection",
      "collectionNameLabel": "Collection Name",
      "collectionNamePlaceholder": "Enter collection name",
      "validation": {
        "nameRequired": "Collection name is required",
        "nameUnchanged": "Please enter a different name"
      }
    }
  },
  "common": {
    "cancel": "Cancel",
    "save": "Save",
    "saving": "Saving...",
    "error": {
      "generic": "An error occurred. Please try again."
    }
  }
}
```

## Styling

The component uses styled-components and follows the project's design system:

- Consistent form input styling via FormInput component
- Matching button styles with other modals
- Proper spacing and layout
- Responsive design
- Focus states and transitions

## API Integration

The component integrates with the `useUpdateCollectionDetails` hook:

```tsx
const { mutate: updateCollection, isPending } = useUpdateCollectionDetails({
  onSuccess: () => {
    onSuccess?.();
    onClose();
    setError('');
  },
  onError: (error: any) => {
    setError(error?.message || t('common.error.generic'));
  },
});
```

The API expects:

- `id`: Collection ID
- `collectionName`: New collection name

## Dependencies

- `@/components/ui/Modal` - Base modal component
- `@/components/form/FormInput` - Form input component
- `@/components/ui/buttons/FilledButton` - Button component
- `@/lib/apis/favorites/useUpdateCollectionDetails` - API hook
- `@/contexts/TranslationContext` - Translation context
