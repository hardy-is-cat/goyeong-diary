export type CatInfo = {
  name: string;
  birth: string;
  thumb: string;
  user: string[];
};

export type UserInfo = {
  displayName: string | null;
  pet: string;
  uid: string | null;
};

export type ToiletData = {
  uid: string;
  date: string;
  pees: number;
  poops: number;
  memo?: string;
};

export type FeedingData = {
  uid: string;
  date: string;
  valueOfFeed: string;
  volumeOfFeed: string;
  memo?: string;
};

export type PlayingData = {
  uid: string;
  date: string;
  playTime: number;
};

export type VaccinationData = {
  uid: string;
  date: string;
  valueOfVaccine: string;
  etcVaccine?: string;
};
