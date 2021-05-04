import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect } from "react";

type SiderbarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SiderbarDrawerContextData);

export const SiderbarDrawerProvider: React.FC = ({ children }) => {
  const disclosure = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

export const useSiderbarDrawer = () => useContext(SidebarDrawerContext);
