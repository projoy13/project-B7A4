export interface ICreateReview {
  rating: number;
  comment?: string;
  userId: string;
  gearItemId: string;
}