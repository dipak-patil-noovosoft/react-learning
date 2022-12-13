import React from "react";

export interface IProduct {
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage": number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[]
}

export  type Columns<T> = {
    heading: string,
    selector: (data: T) => React.ReactNode
}

export interface IFetcherResponse<T> {
    list: T[],
    total: number,
    skip: number,
    limit: number
}