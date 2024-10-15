import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import { useDataStore, getEntityStore } from "./store";

const apiRequest = async (method, url, nonce, data = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(nonce && { "X-WP-Nonce": nonce }),
    };

    // If GET request, add query parameters to the URL
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

// Create API URL based on subPath provided
const createApiUrl = (homeUrl, entityName, subPath = "", queryParams = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  return `${homeUrl}/wp-json/tnl-b2b/v1/${entityName}${subPath ? `/${subPath}` : ""}${queryString ? `?${queryString}` : ""}`;
};

// Helper function to serialize queryKey elements if they are objects
const serializeQueryKey = (queryKey) => {
  return queryKey.map((key) => (typeof key === "object" ? JSON.stringify(key) : key));
};

// Generic query hook
const useGenericQuery = (queryKey, queryFn, enabled = true) =>
  useQuery({
    queryKey: serializeQueryKey(queryKey),  // Serialize objects in queryKey
    queryFn,
    enabled,
    onError: (error) => {
      console.error(`Error fetching ${JSON.stringify(queryKey)}:`, error);
    },
  });

// Generic mutation hook
const useGenericMutation = (mutationFn, onSuccessFn) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(serializeQueryKey([mutationFn.queryKey]));
      onSuccessFn?.(data, variables);
    },
    onError: (error) => {
      console.error(`Error during mutation:`, error);
    },
  });
};

// Main useManagement hook
export const useManagement = (entityName) => {
  const { nonce, homeUrl } = useDataStore();

  const useStore = getEntityStore(entityName);
  const { handleFormDialogOpen } = useStore();

  const apiUrl = (subPath, queryParams = {}) =>
    createApiUrl(homeUrl, entityName, subPath, queryParams);

  const useEntitiesQuery = (subPath, data = { page: 1 }) =>
    useGenericQuery([entityName, subPath, data], () =>
      apiRequest("get", apiUrl(subPath), nonce, data)
    );

  const useEntityQuery = (entityId, subPath) =>
    useGenericQuery(
      [entityName, entityId, subPath],
      () => apiRequest("get", apiUrl(`${subPath}/${entityId}`), nonce),
      !!entityId
    );

  const useEntitiesQueries = (entityIdsArray, subPath) => {
    return useQueries({
      queries: entityIdsArray.map((entityId) => ({
        queryKey: serializeQueryKey([entityName, subPath, entityId]),  // Serialize objects in queryKey
        queryFn: () =>
          apiRequest("get", apiUrl(`${subPath}/${entityId}`), nonce),
        enabled: !!entityId,
        staleTime: 1800000,
        cacheTime: 3600000,
        onError: (error) => {
          console.error(
            `Error fetching ${entityName} with ID ${entityId}:`,
            error
          );
        },
      })),
    });
  };

  const createMutation = useGenericMutation(
    (newEntity) => apiRequest("post", apiUrl(), nonce, newEntity),
    (data, variables) => {
      if (data?.id && variables.attachmentKey) {
        handleFormDialogOpen("link", data.id, variables.attachmentKey);
      }
    }
  );

  const updateMutation = useGenericMutation((updatedEntity) =>
    apiRequest("put", apiUrl(updatedEntity.id), nonce, updatedEntity)
  );

  const deleteMutation = useGenericMutation((entityId) =>
    apiRequest("delete", apiUrl(entityId), nonce)
  );

  return {
    useEntitiesQuery,
    useEntityQuery,
    useEntitiesQueries,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
