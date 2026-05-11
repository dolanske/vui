# searchString

A utility function for filtering items by a search query. It splits the query on whitespace and checks that **every** word is present somewhere in the target string (case-insensitive).

### Signature

```ts
import { searchString } from '@dolanske/vui'

function searchString(
  match: MaybeArray<string | number | null | undefined>,
  input?: string
): boolean
```

| Parameter | Type                                                | Description                                                                                                           |
| --------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `match`   | `MaybeArray<string \| number \| null \| undefined>` | The value(s) to search within. When an array is provided the items are joined with a space before matching.           |
| `input`   | `string \| undefined`                               | The search query typed by the user. When empty or `undefined`, the function returns `true` (i.e. everything matches). |

Returns `true` when every word in `input` can be found inside `match`.

## Usage

The idea behind this is to simplify UI searches where the code might be iterating over array of objects and we want to make sure the relevant items are filtered.

### Single string

```ts
searchString('Hello World', 'world') // true
searchString('Hello World', 'foo') // false
```

### Multiple-word query

Each word in the query must match independently.

```ts
searchString('Hello World', 'hello world') // true
searchString('Hello World', 'hello foo') // false
```

### Array of values

Pass an array to search across multiple fields at once. The values are joined before matching.

```ts
searchString(
  ['Save file', 'Saves the current file', 'save file ctrl s'],
  'save ctrl'
)
// true — both "save" and "ctrl" appear somewhere in the joined string
```
