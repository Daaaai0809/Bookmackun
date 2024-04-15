import { defineConfig } from 'twrangler'

export default defineConfig({
    name: 'bookmackun-bot',
    compatibility_date: '2022-03-21',
    main: "src/index.ts",
    d1_databases: [{
        binding: 'D1_DATABASE',
        database_name: 'bookmackun',
        database_id: '',
    }]
})
