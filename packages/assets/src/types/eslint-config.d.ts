declare module "@repo/eslint-config/base" {
  import type { Linter } from "eslint"
  export const config: Linter.Config[]
}

declare module "@repo/eslint-config/react-internal" {
  import type { Linter } from "eslint"
  export const config: Linter.Config[]
}

declare module "@repo/eslint-config/tanstackstart" {
  import type { Linter } from "eslint"
  export const config: Linter.Config[]
}
