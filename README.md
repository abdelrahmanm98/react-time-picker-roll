[![npm](https://img.shields.io/npm/v/react-time-picker-roll)](https://www.npmjs.com/package/react-time-picker-roll) ![downloads](https://img.shields.io/npm/dt/react-time-picker-roll?color=blue&logo=npm&logoColor=blue)

# React time picker roll

A Simple time picker roll for React or Next app.

## install

```

npm install react-time-picker-roll

```

## Usage

```js

import React, { useState } from 'react';

import { TimePickerComponent } from 'my-time-picker';


export default const  MyApp = () => {
  // initialTime
   const [value, setValue] = useState({ hours: 6, minutes: 0, period: 'AM' });

  // onChange
    const handleTimeChange = (time: {
      hours: number;
      minutes: number;
      period: string;
    }) => {
      console.log(time);
      setValue(time)
    };


   return (

      <div>

        <TimePickerComponent
          initialTime={value}
          onChange={handleTimeChange} />

       <p>Selected Time: {value} </p>
      </div>

   );

}

```

## API

| Name | Type | Default | Description |

| ------------------ | --------------------------------------------- | -------------- | --------------------------------------------------------------- |

| value | String | n/a | Current value. |

| onChange | `(value) => alert ('New time is: ', value)` | n/a | Called when select a different value |

## License

The MIT License.
