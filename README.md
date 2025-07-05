[![npm](https://img.shields.io/npm/v/react-time-picker-roll)](https://www.npmjs.com/package/react-time-picker-roll) ![downloads](https://img.shields.io/npm/dt/react-time-picker-roll?color=blue&logo=npm&logoColor=blue) ![NPM Downloads](https://img.shields.io/npm/d18m/react-time-picker-roll)

<div align="center">
  <img src="https://raw.githubusercontent.com/abdelrahmanm98/react-time-picker-roll/main/assets/Time-Picker1.png" alt="React Time Picker Roll Logo" width="200"/>
  
  # React Time Picker Roll
  
  A beautiful, smooth, and interactive time picker component for React applications with iOS-style rolling animation.
  
  [![Demo](https://img.shields.io/badge/Live%20Demo-View%20Here-blue?style=for-the-badge&logo=vercel)](https://time-picker-demo.vercel.app)
  
  ![Time Picker Demo](https://raw.githubusercontent.com/abdelrahmanm98/react-time-picker-roll/main/assets/Time-Picker2.gif)
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

  const handleTimeChange = (newTime) => {
    console.log('Selected time:', newTime);
    setTime(newTime);
  };

  return (
    <div>
      <TimePickerComponent initialTime={time} onChange={handleTimeChange} />
      <p>
        Selected Time: {time.hours}:{time.minutes.toString().padStart(2, '0')}{' '}
        {time.period}
      </p>
    </div>
  );
};
```

## 📖 API Reference

### Props

| Prop          | Type                                                                 | Default                                  | Description                         |
| ------------- | -------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------- |
| `initialTime` | `{ hours: number; minutes: number; period: string }`                 | `{ hours: 6, minutes: 0, period: 'AM' }` | Initial time value                  |
| `onChange`    | `(time: { hours: number; minutes: number; period: string }) => void` | -                                        | Callback function when time changes |

### Time Object Structure

```typescript
interface TimeValue {
  hours: number; // 1-12
  minutes: number; // 0-59
  period: string; // 'AM' | 'PM'
}
```

## 🎨 Customization

The component uses CSS modules for styling. You can customize the appearance by overriding the CSS classes:

```css
.timePicker {
  /* Custom styles for the main container */
}

.timeItem {
  /* Custom styles for time items */
}

.selected {
  /* Custom styles for selected item */
}
```

## 🌟 Examples

### Basic Usage

```jsx
<TimePickerComponent
  initialTime={{ hours: 9, minutes: 30, period: 'AM' }}
  onChange={(time) => console.log(time)}
/>
```

### With State Management

```jsx
const [selectedTime, setSelectedTime] = useState({
  hours: 12,
  minutes: 0,
  period: 'PM',
});

<TimePickerComponent initialTime={selectedTime} onChange={setSelectedTime} />;
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
