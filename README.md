[![npm](https://img.shields.io/npm/v/react-time-picker-roll)](https://www.npmjs.com/package/react-time-picker-roll) ![downloads](https://img.shields.io/npm/dt/react-time-picker-roll?color=blue&logo=npm&logoColor=blue) ![NPM Downloads](https://img.shields.io/npm/d18m/react-time-picker-roll)

<div align="center">
  <img src="https://raw.githubusercontent.com/abdelrahmanm98/react-time-picker-roll/main/assets/Time-Picker1.png" alt="React Time Picker Roll Logo" width="200"/>
  
  # React Time Picker Roll
  
  A beautiful, smooth, and interactive time picker component for React applications with iOS-style rolling animation.
  
  [![Demo](https://img.shields.io/badge/Live%20Demo-View%20Here-blue?style=for-the-badge&logo=vercel)](https://time-picker-demo.vercel.app)
  
  <b>Default usage (without input field):</b><br/>
  <img src="https://raw.githubusercontent.com/abdelrahmanm98/react-time-picker-roll/main/assets/Time-Picker2.gif" alt="Time Picker Demo" width="350"/>
  
  <b>With input field (asInput):</b><br/>
  <img src="https://raw.githubusercontent.com/abdelrahmanm98/react-time-picker-roll/main/assets/Time-Picker2aslink2.gif" alt="Time Picker as Input Demo" width="350"/>
</div>

## ✨ Features

- 🎨 **Beautiful UI**: Modern glassmorphism design with smooth animations
- 🎯 **Interactive**: Drag to scroll, mouse wheel support, and touch-friendly
- ⚡ **Smooth Animations**: Powered by Framer Motion for fluid interactions
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🎪 **Customizable**: Easy to style and integrate into any design
- 🔧 **TypeScript**: Full TypeScript support with proper type definitions
- 🚀 **Lightweight**: Minimal bundle size with no heavy dependencies

## 📦 Installation

```bash
npm install react-time-picker-roll
```

## 🚀 Quick Start

```jsx
import React, { useState } from 'react';
import { TimePickerComponent } from 'react-time-picker-roll';

const App = () => {
  const [time, setTime] = useState({ hours: 6, minutes: 0, period: 'AM' });

  return (
    <div>
      {/* Default usage */}
      <TimePickerComponent initialTime={time} onChange={setTime} />

      {/* Glassmorphism style */}
      <TimePickerComponent
        initialTime={time}
        onChange={setTime}
        variant='glass'
      />

      {/* Professional style */}
      <TimePickerComponent
        initialTime={time}
        onChange={setTime}
        variant='professional'
      />

      {/* Input field (modal picker) */}
      <TimePickerComponent initialTime={time} onChange={setTime} asInput />
    </div>
  );
};
```

> You can use the picker directly or as an input field (modal). See the GIFs above for both options.

## 📖 API Reference

### Props

| Prop          | Type                                                                 | Default                                  | Description                                                       |
| ------------- | -------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------- |
| `initialTime` | `{ hours: number; minutes: number; period: string }`                 | `{ hours: 6, minutes: 0, period: 'AM' }` | Initial time value                                                |
| `onChange`    | `(time: { hours: number; minutes: number; period: string }) => void` | -                                        | Callback function when time changes                               |
| `natural`     | `boolean`                                                            | `false`                                  | If true, removes background, shadow, and padding for a plain look |
| `variant`     | `'default' \| 'professional' \| 'glass'`                             | `'default'`                              | 'glass' for glassmorphism style, 'professional' for modern look   |
| `asInput`     | `boolean`                                                            | `false`                                  | If true, shows an input field and opens the picker in a modal     |

### Time Object Structure

```typescript
interface TimeValue {
  hours: number; // 1-12
  minutes: number; // 0-59
  period: string; // 'AM' | 'PM'
}
```

## 🎨 Customization

The component uses CSS modules for styling, but also provides global class names for easy targeting:

- `.rtp-time-picker` (main container)
- `.rtp-time-picker-column` (each column)
- `.rtp-time-item` (each time value)

You can customize the appearance by overriding these classes in your own CSS:

```css
.rtp-time-picker {
  /* Custom styles for the main container */
}

.rtp-time-picker-column {
  /* Custom styles for columns */
}

.rtp-time-item.selected {
  /* Custom styles for selected item */
}
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build the library
npm run build

# Run tests
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/abdelrahmanm98">Abdelrahman Elmetwally</a>
</div>
