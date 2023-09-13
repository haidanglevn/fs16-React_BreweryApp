// DATA sample
// {
//     "id": "5128df48-79fc-4f0f-8b52-d06be54d0cec",
//     "name": "(405) Brewing Co",
//     "brewery_type": "micro",
//     "address_1": "1716 Topeka St",
//     "address_2": null,
//     "address_3": null,
//     "city": "Norman",
//     "state_province": "Oklahoma",
//     "postal_code": "73069-8224",
//     "country": "United States",
//     "longitude": "-97.46818222",
//     "latitude": "35.25738891",
//     "phone": "4058160490",
//     "website_url": "http://www.405brewing.com",
//     "state": "Oklahoma",
//     "street": "1716 Topeka St"
// }

type BreweryType =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed";

export interface Brewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  address1: string | null;
  address2: string | null;
  address3: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  state: string | null;
  street: string;
}
