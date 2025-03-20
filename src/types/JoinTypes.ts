export type PartnerInfo = {
    storeName: string;
    ownerName: string;
    address: string;
};

export enum JoinStep {
    ROLE_SELECT = "roleSelect",
    PARTNER_INFO = "partner-info",
    PARTNER_FORM = "partner-form",
    PHONE_AUTH = "phone-auth",
    NAME = "name",
    OAUTH_CONNECT = "oauth-connect",
    PASSWORD_INPUT = "password-input",
    COMPLETE = "complete",
}
