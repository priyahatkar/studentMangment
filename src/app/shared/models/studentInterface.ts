

export interface Istudent{
    id : string,
    fName : string,
    lName : string,
    gender : Igender,
    contact : number,
    email : string,
    rollNo : number
}

export type Igender = 'male' | 'female' | 'other'
