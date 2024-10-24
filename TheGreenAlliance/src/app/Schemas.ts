export interface Events {
    meta: Meta
    data: EventData[]
  }
  
  export interface Teams{
    meta: Meta,
    data: Team[]
  }
  
  export interface Meta {
    current_page: number
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string
    to: number
    total: number
  }
  
  export interface EventData {
    id: number
    sku: string
    name: string
    start: string
    end: string
    season: Season
    program: Program
    location: Location
    locations: Locations[]
    divisions: Division[]
    level: string
    ongoing: boolean
    awards_finalized: boolean
    event_type: string
  }
  
  export interface Team {
    id: number
    number: string
    team_name: string
    robot_name: string
    organization: string
    location: Location
    registered: boolean
    program: Program
    grade: string
  }
  
  export interface Season {
    id: number
    name: string
    code: string
  }

  export interface Seasons {
    meta: Meta
    data: SeasonData[]
  }
  
  export interface SeasonData {
    id: number
    name: string
    program: Program
    start: string
    end: string
    years_start: number
    years_end: number
  }
  
  export interface Program {
    id: number
    name: string
    code: string
  }
  
  export interface Program {
    id: number
    name: string
    code: string
  }
  
  export interface Location {
    venue: string
    address_1: string
    address_2: string
    city: string
    region: string
    postcode: string
    country: string
    coordinates: Coordinates
  }
  
  export interface Coordinates {
    lat: number
    lon: number
  }
  
  export interface Locations {
    additionalProp1: AdditionalProp
    additionalProp2: AdditionalProp
    additionalProp3: AdditionalProp
  }
  
  export interface AdditionalProp {
    venue: string
    address_1: string
    address_2: string
    city: string
    region: string
    postcode: string
    country: string
    coordinates: Coordinates
  }
  
  export interface Division {
    id: number
    name: string
    order: number
  }
  