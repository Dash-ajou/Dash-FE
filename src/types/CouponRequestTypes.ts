export type VendorInfo = {
    organizationName: string
    representativeName: string
    representativeContact: string
}

type MenuDetail = {
    menuName: string
    menuId?: number
    quantity: string
}

export type RequestDetail = {
    storeName: string
    partnerPhone: string
    menu: MenuDetail[]
}
