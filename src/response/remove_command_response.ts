import {
  InteractionResponseType,
  type APIInteractionResponseChannelMessageWithSource,
} from "discord-api-types/v10";

type RemoveCommandResponse = {
  type: number;
  data: {
    username: string;
    content: string;
  };
};

export const buildRemoveCommandResponse = (
  content: string,
  username: string,
): APIInteractionResponseChannelMessageWithSource => {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      username,
      content,
    },
  } as RemoveCommandResponse;
};
