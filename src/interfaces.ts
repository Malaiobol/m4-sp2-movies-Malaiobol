interface ImovieRequest{
    name: string,
    description: string,
    duration: number,
    price: number,
}

interface Imovie extends ImovieRequest{
    id: number
}

export { ImovieRequest, Imovie };