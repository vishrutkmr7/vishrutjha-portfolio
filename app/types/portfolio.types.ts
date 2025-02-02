import { BaseItem, Link, TechItem } from './common.types';

export interface ProjectItem extends BaseItem, TechItem {}

export interface TimelineItem extends TechItem {
  title: {
    company: string;
    role: string;
  };
  logo: string;
  time: string;
  body: string;
  type: 'education' | 'work';
  link?: Link;
  description: string[];
}

export interface Achievement extends BaseItem {}
