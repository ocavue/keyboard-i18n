# keyboard-i18n

Internationalization and localization utils for keyboard shortcuts on web browsers.

## Why

Dealing with various keyboard layouts can be tricky when setting up shortcuts because not all keyboards are the same. This leads to two main challenges:

**Firstly**, shortcuts might need to be based on either the character a key represents or its physical location on the keyboard.

For instance, `Ctrl A` is often used to select all text because "A" stands for "all". However, in gaming, keys like `W` `A` `S` `D` are used for movement, and here, the actual characters on the keys aren't as important as their positions.

To address this, `keyboard-i18n` lets you define shortcuts using either the [`KeyboardEvent.key`] for characters or [`KeyboardEvent.code`] for key positions. For example, `ctrl+a` would be set using [`KeyboardEvent.key`], and `ctrl+KeyA` would use [`KeyboardEvent.code`].

<img width="512" src="https://github.com/ocavue/keyboard-i18n/assets/24715727/d653380d-5251-4115-ba1b-4ee8bc375bc7" alt="The key A is placed at different positions on different keyboard layouts">

**Secondly**, the same shortcuts can behave differently on various keyboard layouts.

For example, shortcuts for navigating back and forward like `Ctrl [` and `Ctrl ]` change drastically between US, German and Latin American layouts.

`keyboard-i18n` solves this by providing a localizer that maps shortcuts from the US layout to other layouts, specifically adjusting code including `BracketLeft`, `BracketRight` and `Slash`.

<img width="512" src="https://github.com/ocavue/keyboard-i18n/assets/24715727/64b84cd0-a3db-468e-9bff-8010e73ac4a1" alt="Shortcuts for navigating back and forward for US, German and Latin American layouts">

## Features

- Auto detect keyboard layout on [supported browsers](https://caniuse.com/mdn-api_keyboard).
- Manually specify keyboard layout.
- Keyboard event handler and shortcut formatter.
- Full TypeScript support.

## Install

```
npm install keyboard-i18n keyboard-layout-map
```

[`keyboard-layout-map`](https://github.com/ocavue/keyboard-layout-map) is a peer dependency of this package.

## Usage

### Define a Shortcut

A shortcut is a string that combines zero or more modifiers with a [`KeyboardEvent.key`] or [`KeyboardEvent.code`], separated by `+`.

#### Modifiers

- `"mod"`: `Command` on macOS, `Ctrl` on Windows
- `"ctrl"`: `Control` on macOS, `Ctrl` on Windows
- `"alt"`: `Option` on macOS, `Alt` on Windows
- `"meta"`: `Command` on macOS, `Win` on Windows
- `"shift"`: `Shift` on all platforms

#### Using [`KeyboardEvent.key`]

Examples include single characters or symbols like `"a"`, `"9"`, or `"/"`.

#### Using [`KeyboardEvent.code`]

Examples include `"KeyA"`, `"Digit9"`, or `"Slash"`.

#### Examples

- `"Escape"` triggers the `Escape` key.
- `"mod+KeyA"` results in `Command A` on macOS and `Ctrl A` on Windows.
- `"ctrl+shift+a"` results in `Ctrl Shift A` on all platforms.
- `"mod+BracketLeft"` results in `Command [` on macOS with a US layout, and `Ctrl Ö` on Windows with a German layout.

### TypeScript support

`keyboard-i18n` uses TypeScript to provide type safety, so that you can catch potential errors at compile time.

```ts
import type { KeyboardShortcut } from 'keyboard-i18n'

const shortcut: KeyboardShortcut = 'Mod+Shift+arrow_right'
//     ^ Type '"Mod+Shift+arrow_right"' is not assignable to type 'KeyboardShortcut'.
//       Did you mean '"mod+shift+ArrowRight"'? ts(2820)
```

### Create an Event Handler

You can create an event handler for a shortcut using the `createHandler` function.

```ts
import { createHandler } from 'keyboard-i18n'

const handler = createHandler('mod+a', (event: KeyboardEvent) => {
  console.log('mod+a is pressed')
})

document.addEventListener('keydown', handler)
```

You can also handle multiple shortcuts with a single event handler.

```ts
import { createHandler } from 'keyboard-i18n'

const handler = createHandler(
  ['ctrl+a', 'ctrl+shift+a'],
  (event: KeyboardEvent) => {
    console.log('ctrl+a or ctrl+shift+a is pressed')
  },
)

document.addEventListener('keydown', handler)
```

### Create an Event Checker

If you want more control over the event handling, you can use `createChecker` to check if a keyboard event matches a specific shortcut.

```ts
import { createChecker } from 'keyboard-i18n'

const checker = createChecker('Escape')

const isEscapePressed: boolean = checker(event)
```

### Create a Shortcut Formater

You can format a shortcut based on the current platform and keyboard layout using the `createFormatter` function.

```ts
import { createFormatter } from 'keyboard-i18n'

const formatter = createFormatter('mod+shift+BracketLeft')

const formatted: string[] = formatter()
// On macOS with US layout, the shortcut is formatted as ["Shift", "Command", "["]
// On macOS with German layout, the shortcut is formatted as ["Ctrl", "Shift", "Ö"]
```

### Customize the Keyboard Layout

By default, `keyboard-i18n` will use the experimental [Keyboard API](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API) to get the current keyboard layout.

For those browsers that don't support the Keyboard API, you can pass a layout manually to `createHandler`, `createChecker` and `createFormatter`.

```ts
import { createFormatter, type } from 'keyboard-i18n'
import * as layouts from 'keyboard-layout-map/layouts'

createHandler('mod+shift+BracketLeft', { layout: layouts.German })
```

## API references

Please check the [API references](https://tsdocs.dev/docs/keyboard-i18n) for full list of APIs.

## License

MIT

[`KeyboardEvent.code`]: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
[`KeyboardEvent.key`]: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
