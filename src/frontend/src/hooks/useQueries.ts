import { useMutation, useQuery } from "@tanstack/react-query";
import { Group } from "../backend";
import { useActor } from "./useActor";

export { Group };

export function useGetAllResponses() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["allResponses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllResponses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAveragesByGroup(group: Group) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["averages", group],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAveragesByGroup(group);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitResponse() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (params: { group: Group; scores: Array<bigint> }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitResponse(params.group, params.scores);
    },
  });
}
