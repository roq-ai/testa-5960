const mapping: Record<string, string> = {
  'neural-networks': 'neural_network',
  organizations: 'organization',
  'training-data': 'training_data',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
