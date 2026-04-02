import { defineNitroConfig } from "nitro/config"

export default defineNitroConfig({
  routeRules: {
    "/api/**": {
      proxy: "http://localhost:8080/api/**",
    },
  },
})
