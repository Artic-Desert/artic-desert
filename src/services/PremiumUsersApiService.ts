import { PremiumUser, UserToAddToPremium } from '../types/Types';

const BASE_URL = 'https://arctic-desert.herokuapp.com/premium';

export const addUserToPremium = async (body: UserToAddToPremium) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: PremiumUser | { message: string } =
      await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPremiumUsers = async () => {
  try {
    const response = await fetch(BASE_URL);
    const parsedRepsonse: PremiumUser[] = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const getPremiumUserByUserId = async (user_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${user_id}`);
    const parsedRepsonse: PremiumUser = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const removePremiumUserByUserId = async (user_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${user_id}`, {
      method: 'DELETE',
    });
    const parsedRepsonse: { message: string } = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};
