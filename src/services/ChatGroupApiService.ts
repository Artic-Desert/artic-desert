import { ChatGroup, ChatGroupToCreate, MemberToEdit } from '../types/Types';

const BASE_URL = 'https://arctic-desert.herokuapp.com/chatgroup';

export const createChat = async (body: ChatGroupToCreate) => {
  try {
    console.log('BODY : ', body);
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const parsedRepsonse: ChatGroup = await response.json();
    console.log('CREATE CHAT RESPONSE : ', parsedRepsonse);

    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const addMemberToChat = async (body: MemberToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    const parsedRepsonse: ChatGroup = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const removeMemberFromChat = async (body: MemberToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/remove`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    const parsedRepsonse: ChatGroup = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const deleteChatByRepoId = async (repo_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${repo_id}`, {
      method: 'DELETE',
    });
    const parsedRepsonse: { message: string } = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const getChatByRepoId = async (repo_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${repo_id}`);
    const parsedRepsonse: ChatGroup | { message: string } =
      await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};
