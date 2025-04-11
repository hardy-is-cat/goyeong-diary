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
  date: string;
  pees: number;
  poops: number;
  memo?: string;
};

export type FeedingData = {
  date: string;
  valueOfFeed: string;
  volumeOfFeed: string;
  memo?: string;
};

export type PlayingData = {
  date: string;
  playTime: number;
};

export type VaccinationData = {
  date: string;
  valueOfVaccine: string;
  etcVaccine?: string;
};
