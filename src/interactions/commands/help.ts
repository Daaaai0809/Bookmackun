import { HELP_COMMAND } from "@/constants";
import { buildHelpCommandResponse } from "@/response/help_command_response";

const content = () => `
    使い方 \n
\`/bm add $URL\`: ブックマークにURLを追加します \n
\`/bm list\`: ブックマークの一覧を表示します \n
\`/bm read $ID\`: ブックマークを既読にします \n
\`/bm remove $ID\`: ブックマークを削除します \n
\`/bm help\`: ヘルプを表示します \n
`;

const handler = async () => {
  return buildHelpCommandResponse(content());
};

export const helpCommand = {
  commandName: HELP_COMMAND,
  handler,
};
