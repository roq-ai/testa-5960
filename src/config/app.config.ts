interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Administrator', 'Engineer', 'Data Scientist'],
  tenantName: 'Organization',
  applicationName: 'testA',
  addOns: ['file', 'chat', 'notifications'],
};
