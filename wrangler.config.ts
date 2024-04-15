import { defineConfig } from 'twrangler'

export default defineConfig({
    name: "bookmackun-bot",
    compatibility_date: "2022-03-21",
    main: "src/index.ts",
    d1_databases: [{
        binding: "D1_DATABASE",
        database_name: "${D1_DATABASE_NAME}",
        database_id: "${D1_DATABASE_ID}",
    }]
})
