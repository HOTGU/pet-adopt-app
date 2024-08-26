export type User = {
  email: string;
  name: string;
  imageUrl: string;
};

export type Pet = {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  sex: "남자" | "여자";
  cateogry: CategoryList;
  breed: string;
  age: number;
  weight: number;
  about: string;
  user: User;
};

export type ChatType = {
  id: string;
  users: User[];
  userIds: string[];
};

export type MessageType = {
  id: string;
  text: string;
  creator: User;
  createdAt: number;
};
export type CategoryType = {
  id: string;
  name: CategoryList;
  imageUrl: string;
};

export type SliderType = {
  id: string;
  name: string;
  imageUrl: string;
};

export type CategoryList = "강아지" | "고양이" | "새" | "기타";
