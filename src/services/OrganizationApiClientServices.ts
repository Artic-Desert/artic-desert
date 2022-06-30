const BASE_URL = 'https://arctic-desert.herokuapp.com/organization';

export type OrganizationToCreate = {
  name: string;
  god: string;
};

export type Organization = {
  id: string;
  name: string;
  god: string;
  admins: string[];
  users: string[];
  repos: string[];
};

export type AdminToEdit = {
  admin: string;
  id: string;
};

export type RepoToEdit = {
  repo: string;
  id: string;
};

export type UserToEdit = {
  user: string;
  id: string;
};

export type NameToEdit = {
  name: string;
  id: string;
};

export type GodToEdit = {
  god: string;
  id: string;
};

export const createOrganization = async (body: OrganizationToCreate) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const getOrgById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrgs = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    const parsedRepsonse: Organization[] = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const addAdminToOrg = async (body: AdminToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/add`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const removeAdminToOrg = async (body: AdminToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/remove`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const addRepoToOrg = async (body: RepoToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/repo/add`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const removeRepoToOrg = async (body: RepoToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/repo/remove`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const addUserToOrg = async (body: UserToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/uiser/add`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const removeUserToOrg = async (body: UserToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/user/remove`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const changeNameOfOrg = async (body: NameToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/name`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const changeGodOfOrg = async (body: GodToEdit) => {
  try {
    const response = await fetch(`${BASE_URL}/god`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
    const parsedRepsonse: Organization = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrganizationById = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const parsedRepsonse: { message: string } = await response.json();
    return parsedRepsonse;
  } catch (error) {
    console.log(error);
  }
};
