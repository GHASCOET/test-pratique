export type ProductType = 'phone' | 'plan' | 'accessory' | 'option';

export interface Product {
    id: string;
    name: string;
    type: ProductType;
    price: number;           // prix mensuel
    upfrontPrice: number;    // prix ponctuel (une seule fois)
    description: string;
    image?: string;
    compatible?: string[];   // IDs de produits compatibles
}
