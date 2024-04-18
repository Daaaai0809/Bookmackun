const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APP_ID}/commands`;

// This is an example CHAT_INPUT or Slash Command, with a type of 1
const json = {
    name: "bm",
    description: "ぶっくまっくん",
    options: [
        {
            name: "add",
            description: "ブックマークにURLを追加します",
            type: 1,
            options: [
                {
                    name: "url",
                    description: "URL",
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: "read",
            description: "ブックマークを既読にします",
            type: 1,
            options: [
                {
                    name: "id",
                    description: "ブックマークID",
                    type: 4,
                    required: true
                }
            ]
        },
        {
            name: "remove",
            description: "ブックマークを削除します",
            type: 1,
            options: [
                {
                    name: "id",
                    description: "ブックマークID",
                    type: 4,
                    required: true
                }
            ]
        },
        {
            name: "list",
            type: 1,
            description: "ブックマークの一覧を表示します"
        },
        {
            name: "help",
            type: 1,
            description: "ヘルプを表示します"
        }
    ]
}

// For authorization, you can use either your bot token
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
};

fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(json)
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
    console.log(error);
});
