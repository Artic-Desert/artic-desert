export type MessageToCreate = {
  content: string;
  timestamp: number;
  edited_timestamp?: number;
  username: string;
  chatgroup_id: string;
};

export type Message = {
  id: string;
  content: string;
  edited_timestamp?: number;
  timestamp: number;
  username: string;
  chatgroup_id: string;
};

const BASE_URL = 'https://arctic-desert.herokuapp.com/messages';

export const postMessage = async (body: MessageToCreate) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const parsedRepsonse: Message = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const getMessageByChatId = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const parsedRepsonse: Message = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessageById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const parsedRepsonse: Message = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};
