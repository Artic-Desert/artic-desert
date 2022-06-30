export type ChatGroupToCreate = {
  name: string;
  admin: string;
  repo_id: string;
};

export type ChatGroup = {
  id: string;
  name: string;
  members: string[];
  admin: string;
  messages: string[];
  repo_id: string;
};

export type MemberToEdit = {
  repo_id: string;
  member: string;
};

const BASE_URL = 'https://arctic-desert.herokuapp.com/chatgroup';

export const createChat = async (body: ChatGroupToCreate) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const parsedRepsonse: ChatGroup = await response.json();
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
