import { ApplicationStackParamList } from "@/types/navigation";
import {
  StackActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef =
  createNavigationContainerRef<ApplicationStackParamList>();

export const navigate = (
  name: keyof ApplicationStackParamList,
  params?: any
) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const navigateReset = (name: keyof ApplicationStackParamList) => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name }],
    });
  }
};
