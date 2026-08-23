export interface ICreateReview {
  rating: number;
  comment?: string;
  gearItemId: string;
}

export interface IUpdateReview {
  rating?: number;
  comment?: string;
}