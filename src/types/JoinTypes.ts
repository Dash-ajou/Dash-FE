export type PartnerInfo = {
    storeName: string;
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

export enum FindPWStep {
    PHONE_AUTH = "phone-auth",
    RESET_PW = "reset-pw"
}
