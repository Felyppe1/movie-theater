import { Configuration } from "@/@types/Configuration";
import { useAuthStore } from "@/store/auth";
import { makeRequest } from "@/utils/makeRequest";

type UpdateConfigurationProps = Configuration

export async function getConfiguration(): Promise<Configuration> {
  return makeRequest('/configurations', { method: 'GET' })
}

export async function updateConfiguration(data: UpdateConfigurationProps): Promise<Configuration> {
  const accessToken = useAuthStore.getState().accessToken

  return await makeRequest('/configurations', {
    method: 'PUT',
    headers: {'Authorization': `Bearer ${accessToken}`},
    data
  })
}