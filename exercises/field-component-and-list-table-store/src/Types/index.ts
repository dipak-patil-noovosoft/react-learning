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

export interface IPost {
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: string[],
    reactions: number
    userName?: string
}

export  type Columns<T> = {
    heading: string,
    selector: (data: T) => React.ReactNode
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: Date;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    domain: string;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
}

export interface Address {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

export interface Company {
    address: Address;
    department: string;
    name: string;
    title: string;
}

export interface Hair {
    color: string;
    type: string;
}


