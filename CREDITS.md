# Third-party credits

## Tailwind CSS

The compiled stylesheet (`lucent.layout.css`) is generated with **Tailwind CSS v4**
and includes portions of Tailwind's own CSS (theme tokens and utilities).

> Tailwind CSS
> Copyright (c) Tailwind Labs, Inc.
> Licensed under the MIT License — https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE

The MIT License is compatible with the GPL. Tailwind is used here only as a
build-time tool plus the small amount of its CSS that ends up in the compiled
output; retaining this notice satisfies the MIT attribution requirement.

---

The rest of this layout (templates, custom CSS in `src/input.css`, JavaScript,
configuration, and design) is licensed under the **GNU GPL v2** — see
`LICENSE`.

> Note: Tailwind Preflight (Tailwind's global reset) is intentionally **not**
> imported, to avoid leaking a global reset into the third-party module skins
> rendered inside the content area.
