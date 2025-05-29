# Badge

Badges are used to display a status of an object or action that a component has performed. Often used inside tables and other data lists.

::badge-example

::

### Props

| Name      | Default   | Type                                                                                                       |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `variant` | `neutral` | `'neutral' \| 'danger' \| 'warning' \| 'success' \| 'info' \| 'accent'` <br> The visual style of the badge |
| `outline` | `false`   | `boolean` <br> Whether to show the badge with an outline style                                             |
| `filled`  | `false`   | `boolean` <br> Whether to show the badge with a filled background                                          |

### Slots

| Name      | Accepts | Description                         |
| --------- | ------- | ----------------------------------- |
| `default` | `any`   | Content to display inside the badge |
