export type VendorInfo = {
    organizationName: string;
    representativeName: string;
    representativeContact: string;
}

type MenuDetail = {
    menuName: string;
    quantity: string;
}

export type RequestDetail = {
    storeName: string;
    partnerPhone: string;
    menu: MenuDetail[];
}
