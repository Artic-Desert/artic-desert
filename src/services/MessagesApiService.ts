import { Message, MessageToCreate } from '../types/Types';

const BASE_URL = 'https://arctic-desert.herokuapp.com/messages';

export const postMessage = async (body: MessageToCreate) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
