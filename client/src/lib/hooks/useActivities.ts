import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = (id?: string) => {
  //react query客户端实例，通过它可以在后续操作中让某个缓存失效，从而触发重新请求数据。
  const queryClient = useQueryClient();

  // 获取活动列表，data: activities 将查询结果重命名为 activities。
  // 查询键为 ["activities"]，isPending 表示查询是否仍在进行中（加载状态）
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
  });

  //查询单个活动, id 作为查询键的一部分。
  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: [activities, id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  //更新活动，useMutation 创建了一个变更操作，负责发送更新请求。
  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put("/activities", activity);
    },
    onSuccess: async () => {
      //将活动列表缓存标记为过期。
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  // 创建活动
  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      //将活动列表缓存标记为过期。
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      //将活动列表缓存标记为过期。
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  // 返回活动信息
  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
