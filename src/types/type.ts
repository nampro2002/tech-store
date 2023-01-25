export interface IProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}
export interface IProductCart {
  id: string;
  prodId: string;
  userId: string;
  price: number;
  name: string;
  quantity: number;
}
export interface IUser {
  id: string;
  name: string;
  phone: string;
  username: string;
  password: string;
  imgUrl?: string;
}
// 