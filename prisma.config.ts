import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    db: {
      provider: "sqlite",
      adapter: "file:./dev.db",
    },
  },
});
