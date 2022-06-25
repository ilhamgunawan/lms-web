import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Text,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Item {
  name: string;
  href: string | null;
}

interface Props {
  items?: Array<Item>;
}

export default function BreadCrumbComponent(props: Props) {
  return (
    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      {props.items?.map(item => {
        return (
          <BreadcrumbItem key={item.name}>
            {item.href ?
              <Link href={item.href} passHref>
                <BreadcrumbLink>{item.name}</BreadcrumbLink>
              </Link>
              :
              <Text fontWeight='bold'>{item.name}</Text>
            }
          </BreadcrumbItem>
        );
      })}
      {/* <BreadcrumbItem>
        <BreadcrumbLink href='/'>About</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href='/'>Contact</BreadcrumbLink>
      </BreadcrumbItem> */}
    </Breadcrumb>
  );
}
