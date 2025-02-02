export interface Link {
  text: string;
  url: string;
}

export interface BaseItem {
  title: string;
  description: string;
  date: string;
  image: string;
  link?: Link;
}

export interface TechItem {
  tech: string[];
}
