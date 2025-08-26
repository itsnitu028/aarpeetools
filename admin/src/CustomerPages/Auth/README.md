# Authentication Modals

This directory contains reusable authentication modal components for the customer-facing part of the application.

## Components

### 1. AuthModal.jsx
The main component that manages both login and register modals. It provides:
- A login button that opens the login modal
- State management for both modals
- Functions to switch between login and register views

### 2. LoginModal.jsx
A modal component for user login that includes:
- Email and password fields with validation
- Form submission handling
- Google OAuth integration
- Error handling and user feedback
- Link to switch to registration

### 3. RegisterModal.jsx
A modal component for user registration that includes:
- Full name, email, mobile, address, password, and confirm password fields
- Comprehensive form validation
- Form submission handling
- Google OAuth integration
- Error handling and user feedback
- Link to switch to login

## Usage

### Basic Implementation
```jsx
import AuthModal from './Auth/AuthModal';

function MyComponent() {
  return (
    <div>
      <h1>Welcome</h1>
      <AuthModal />
    </div>
  );
}
```

### Custom Implementation
If you want to use the modals separately:

```jsx
import LoginModal from './Auth/LoginModal/LoginModal';
import RegisterModal from './Auth/RegisterModal/RegisterModal';

function MyComponent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsLoginOpen(true)}>Login</button>
      <button onClick={() => setIsRegisterOpen(true)}>Register</button>
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
}
```

## Features

- **Responsive Design**: Works on all screen sizes
- **Form Validation**: Client-side validation with error messages
- **Smooth Animations**: CSS animations for modal open/close
- **Google OAuth**: Integration with Google authentication
- **Error Handling**: Toast notifications for success/error messages
- **Accessibility**: Proper focus management and keyboard navigation
- **State Management**: Form state management with React hooks

## API Endpoints

The modals expect these backend endpoints:

- **Login**: `POST /api/auth/login`
- **Register**: `POST /api/auth/register`
- **Google OAuth**: `GET /auth/google`

## Dependencies

- React
- react-hot-toast (for notifications)
- Tailwind CSS (for styling)

## Styling

The modals use Tailwind CSS classes and include custom CSS animations. The styling is consistent with the existing design system using red as the primary color.

## Customization

You can customize the appearance by:
1. Modifying the CSS files
2. Changing the Tailwind classes in the JSX
3. Adjusting the color scheme in the CSS variables
4. Modifying the animation durations and effects 