import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import { useLayoutDocsSidebar } from '@docusaurus/theme-common/internal';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type { Props } from '@theme/NavbarItem/DocSidebarNavbarItem';
import type { ReactElement } from 'react';

export default function DocSidebarNavbarItem({ sidebarId, label, docsPluginId, ...props }: Props): ReactElement {
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const sidebarLink = useLayoutDocsSidebar(sidebarId, docsPluginId).link;
  if (!sidebarLink) {
    throw new Error(`DocSidebarNavbarItem: Sidebar with ID "${sidebarId}" doesn't have anything to be linked to.`);
  }
  return (
    <DefaultNavbarItem
      exact
      {...props}
      isActive={() => activeDoc?.sidebar === sidebarId}
      label={label ?? sidebarLink.label}
      to={sidebarLink.path}
    />
  );
}
