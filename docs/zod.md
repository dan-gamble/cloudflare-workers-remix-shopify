# Zod

Zod is a powerful schema declaration and validation library. It's used in this project to ensure data integrity and provide clear error messages when data structures don't match the expected schemas.

## Basic Usage

Here's a basic example of how Zod is used in this project:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
});

// Example: Validating data with UserSchema
const userData = {
  name: 'Jane Doe',
  age: 30,
  email: 'jane.doe@example.com',
};

const validationResult = UserSchema.safeParse(userData);

if (validationResult.success) {
  console.log('Valid data:', validationResult.data);
} else {
  console.log('Validation errors:', validationResult.error.issues);
}
```
