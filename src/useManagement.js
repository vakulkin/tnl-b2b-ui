import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import { useDataStore, getEntityStore } from "./store";

// Utility for making API requests
export const makeApiRequest = async (method, url, nonce, data = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(nonce && { "X-WP-Nonce": nonce }),
    };

    if (method === "get") {
      const queryParams = new URLSearchParams(data).toString();
      url = `${url}${queryParams ? `?${queryParams}` : ""}`;
    }

    const config = {
      headers,
      withCredentials: Boolean(nonce),
    };

    const response = await axios({
      method,
      url,
      data: method !== "get" ? data : undefined,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(`Error during ${method.toUpperCase()} request:`, error);
    throw new Error(`Failed to ${method} ${url}`);
  }
};

// Utility function to build the API URL
export const buildApiUrl = (
  homeUrl,
  entityName,
  subPath = "",
  queryParams = {}
) => {
  const queryString = new URLSearchParams(queryParams).toString();
  return `${homeUrl}/wp-json/tnl-b2b/v1/${entityName}${subPath ? `/${subPath}` : ""}${queryString ? `?${queryString}` : ""}`;
};

// Generic hooks for queries and mutations
export const useGenericQuery = (queryKey, queryFn, enabled = true) =>
  useQuery({
    queryKey,
    queryFn,
    enabled,
    // staleTime: 1800000,
    // cacheTime: 3600000,
    onError: (error) =>
      console.error(`Error fetching ${JSON.stringify(queryKey)}:`, error),
    placeholderData: (prev) => prev,
  });

export const useGenericMutation = (mutationFn, onSuccessFn) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(mutationFn.queryKey);
      onSuccessFn?.(data, variables);
    },
    onError: (error) => console.error("Error during mutation:", error),
  });
};

// Reusable hook to fetch specific sections or keys from the general endpoint
const useGeneralSection = (section, key = null) => {
  const { nonce, homeUrl } = useDataStore();
  const url = buildApiUrl(homeUrl, "general");

  return useQuery({
    queryKey: ["general"],
    queryFn: () => makeApiRequest("get", url, nonce),
    select: (data) =>
      key ? data?.[section]?.[key] || null : data?.[section] || {},
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

// Hook to fetch the entire "info" section
export const useFetchGeneralInfo = () => useGeneralSection("info");

// Hook to fetch the entire "options" section
export const useFetchGeneralOptions = () => useGeneralSection("options");

// Hook to fetch the entire "options" section
export const useFetchGeneralDeps = () => useGeneralSection("deps");

// Hook to fetch a specific "info" item by key
export const useFetchInfoByKey = (key) => useGeneralSection("info", key);

// Hook to fetch a specific "option" item by key
export const useFetchOptionByKey = (key) => useGeneralSection("options", key);

// Hook to fetch a specific "deps" item by key
export const useFetchDepsByKey = (key) => useGeneralSection("deps", key);
// Entity management-specific hooks

// Hook to fetch a list of entities
export const useFetchEntityList = (entityName, subPath, data) => {
  const { nonce, homeUrl } = useDataStore();
  const apiUrl = buildApiUrl(homeUrl, entityName, subPath);

  return useGenericQuery([entityName, subPath, data], () =>
    makeApiRequest("get", apiUrl, nonce, data)
  );
};

// Hook to fetch a single entity by ID
export const useFetchEntityById = (entityName, entityId, subPath) => {
  const { nonce, homeUrl } = useDataStore();
  const apiUrl = buildApiUrl(homeUrl, entityName, `${subPath}/${entityId}`);

  return useGenericQuery(
    [entityName, entityId, subPath],
    () => makeApiRequest("get", apiUrl, nonce),
    !!entityId
  );
};

// Hook to fetch multiple entities by an array of IDs
export const useFetchMultipleEntitiesByIds = (
  entityName,
  entityIdsArray,
  subPath
) => {
  const { nonce, homeUrl } = useDataStore();
  const apiUrl = buildApiUrl(homeUrl, entityName, subPath);

  return useQueries({
    queries: entityIdsArray.map((entityId) => ({
      queryKey: [entityName, subPath, entityId],
      queryFn: () => makeApiRequest("get", `${apiUrl}/${entityId}`, nonce),
      enabled: !!entityId,
      // staleTime: 1800000,
      // cacheTime: 3600000,
      onError: (error) => {
        console.error(
          `Error fetching ${entityName} with ID ${entityId}:`,
          error
        );
      },
    })),
  });
};

export const useCreateEntityMutation = (entityName, relatedQueries = []) => {
  const queryClient = useQueryClient();
  const { nonce, homeUrl } = useDataStore();
  const apiUrl = buildApiUrl(homeUrl, entityName);

  const useStore = getEntityStore(entityName);
  const { handleFormDialogOpen } = useStore();

  return useMutation({
    mutationFn: (newEntity) => makeApiRequest("post", apiUrl, nonce, newEntity),
    onSuccess: (data) => {
      if (data?.id && handleFormDialogOpen) {
        // console.log("link", data.id, entityName);
        handleFormDialogOpen("edit", data.id, entityName);
      }
      relatedQueries.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey })
      );
    },
    onError: (error) => console.error("Error creating entity:", error),
  });
};

// Hook to update an existing entity and invalidate relevant queries
export const useUpdateEntityMutation = (entityName, relatedQueries = []) => {
  const queryClient = useQueryClient();
  const { nonce, homeUrl } = useDataStore();
  const apiUrl = (entityId) => buildApiUrl(homeUrl, entityName, entityId);

  return useMutation({
    mutationFn: (updatedEntity) =>
      makeApiRequest("put", apiUrl(updatedEntity.id), nonce, updatedEntity),
    onSuccess: () => {
      // Invalidate queries related to the entity and any additional related queries
      // queryClient.invalidateQueries([entityName]);
      relatedQueries.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey })
      );
    },
    onError: (error) => console.error("Error updating entity:", error),
  });
};

// Hook to delete an entity and invalidate relevant queries
export const useDeleteEntityMutation = (entityName, relatedQueries = []) => {
  const queryClient = useQueryClient();
  const { nonce, homeUrl } = useDataStore();
  const apiUrl = (entityId) => buildApiUrl(homeUrl, entityName, entityId);

  return useMutation({
    mutationFn: (entityId) => makeApiRequest("delete", apiUrl(entityId), nonce),
    onSuccess: () => {
      // Invalidate queries related to the entity and any additional related queries
      // queryClient.invalidateQueries([entityName]);
      relatedQueries.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey })
      );
    },
    onError: (error) => console.error("Error deleting entity:", error),
  });
};
