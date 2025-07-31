import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

// Navigation helper functions
export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

export const reset = (routes, index = 0) => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index,
      routes,
    });
  }
}; 