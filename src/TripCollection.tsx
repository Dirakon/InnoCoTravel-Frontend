import {TripBlock} from "./TripBlock.tsx";
import useFetch from "./UseFetch.ts";
import {SERVER_URL} from "./MainView.tsx";

export type singleTripDescription = {
    "admin_id": number,
    "is_driver": boolean,
    "places_max": number,
    "places_taken": number,
    "chosen_timestamp": string, // new Date()-parsable string
    "from_point": number,
    "to_point": number,
    "description": string
}
export type serverAdjacentTripsResponse =
    {
        data: singleTripDescription[]
    }
export type serverAdjacentTripsRequest = {
    "left_timestamp" : string, // new Date()-parsable string
    "right_timestamp" : string, // new Date()-parsable string
    "from_point" : number,
    "to_point" : number,
    "companion_type": 'driver'|'passenger'|'both'
}

export function TripCollection(props: { pointToName: Map<number, string>, token: string, filters: serverAdjacentTripsRequest}) {

    const {
        data,
        errorMessage,
        hasError,
        isLoading,
    } = useFetch<serverAdjacentTripsResponse>(`${SERVER_URL}/api/v1/trip/adjacent?token=${props.token}`, JSON.stringify(props.filters), "get", false)

    return <div className="results">
        { hasError? errorMessage :
            isLoading || data == null ? "loading..." :

                data.data.map((trip, index) => (
            <TripBlock
                key={index}
                departure={props.pointToName.get(trip.from_point) ?? `UNKNOWN VALUE: ${trip.from_point}`}
                arrival={props.pointToName.get(trip.to_point) ?? `UNKNOWN VALUE: ${trip.to_point}`}
                date={trip.chosen_timestamp}
                passengers={trip.places_max - trip.places_taken}
                username={trip.admin_id.toString()} // TODO: accept alias instead from the backend
                extraNote={trip.description}
            />
        ))}
    </div>
}