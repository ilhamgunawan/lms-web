import Link from 'next/link';

interface Item {
  name: string;
  href: string | null;
}

export type BreadcrumbList = Array<Item>;

interface Props {
  items?: BreadcrumbList;
}

export default function BreadCrumbComponent(props: Props) {
  return null;
}
