export const ADD_BOOK_MARK_COMMAND = "add";
export const LIST_BOOK_MARK_COMMAND = "list";
export const READ_BOOK_MARK_COMMAND = "read";
export const REMOVE_BOOK_MARK_COMMAND = "remove";
export const HELP_COMMAND = "help";

export const COMMANDS = {
	ADD_BOOK_MARK_COMMAND: {
		name: ADD_BOOK_MARK_COMMAND,
		description: "ブックマークにURLを追加します",
		options: [
			{
				name: "url",
				description: "URL",
				type: 3,
				required: true,
			},
		],
	},
	LIST_BOOK_MARK_COMMAND: {
		name: LIST_BOOK_MARK_COMMAND,
		description: "ブックマークの一覧を表示します",
	},
	READ_BOOK_MARK_COMMAND: {
		name: READ_BOOK_MARK_COMMAND,
		description: "ブックマークを既読にします",
		options: [
			{
				name: "id",
				description: "ブックマークID",
				type: 4,
				required: true,
			},
		],
	},
	REMOVE_BOOK_MARK_COMMAND: {
		name: REMOVE_BOOK_MARK_COMMAND,
		description: "ブックマークを削除します",
		options: [
			{
				name: "id",
				description: "ブックマークID",
				type: 4,
				required: true,
			},
		],
	},
	HELP_COMMAND: {
		name: HELP_COMMAND,
		description: "ヘルプを表示します",
	},
};
