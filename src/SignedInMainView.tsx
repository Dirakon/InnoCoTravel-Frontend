import {tripBlockDescription} from "./TripBlock.tsx";
import {FilterBar} from "./FilterBar.tsx";
import {TripCollection} from "./TripCollection.tsx";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {useDarkMode} from "usehooks-ts";
import {getDefaultDarkMode} from "./TelegramUtils.ts";


export function SignedInMainView(props: {
    token: string
}) {

    // TODO: remove
    useEffect(()=>{
        console.log(props)
    }, [])

    const {isDarkMode } = useDarkMode(getDefaultDarkMode())


    const [selectedDeparturePoint, setSelectedDeparturePoint] =
        useState<{ value: string; label: string; } | null>(null);
    const [selectedArrivalPoint, setSelectedArrivalPoint] =
        useState<{ value: string; label: string; } | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs());


    const travelPointsOptions = [
        {value: 'innopolis', label: 'Innopolis'},
        {value: 'kazan', label: 'Kazan'},
        {value: 'verkhniy uslon', label: 'Verkhniy Uslon'}
    ];


    const tripData: tripBlockDescription[] = [
        {
            tripId: 1,
            departure: "Innopolis",
            arrival: "Kazan",
            date: dayjs("2023-06-25 10:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
            passengers: 2,
            username: "@dirakon",
            extraNote: "Need extra legroom",
        },
        {
            tripId: 2,
            departure: "Kazan",
            arrival: "Innopolis",
            date: dayjs("2023-06-25 12:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
            passengers: 3,
            username: "a1kuat",
            extraNote: "I have a dog",
        },
        {
            tripId: 3,
            departure: "Kazan",
            arrival: "Verkhniy Uslon",
            date: dayjs("2023-06-22 15:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
            passengers: 4,
            username: "ikramkxt",
            extraNote: "Price:300RUB",
        },
        {
            tripId: 4,
            departure: "Kazan",
            arrival: "Innopolis",
            date: dayjs("2023-06-24 19:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
            passengers: 1,
            username: "sasha",
            extraNote: "Business class",
        },
        {
            tripId: 5,
            departure: "Innopolis",
            arrival: "Verkhniy Uslon",
            date: dayjs("2023-06-24 12:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
            passengers: 1,
            username: "ayaz",
            extraNote: "2 Big Bags",
        }
        // Other trip data objects...
    ];

    const [filteredTripData, setFilteredTripData] = useState(tripData);

    function filterTrips() {
        if (selectedDeparturePoint && selectedArrivalPoint) {
            const filteredData = tripData.filter((trip) => {
                return (
                    trip.departure === selectedDeparturePoint.label &&
                    trip.arrival === selectedArrivalPoint.label &&
                    (selectedDateTime === null ||
                        (dayjs(selectedDateTime).isSame(dayjs(trip.date), "day") &&
                            dayjs(selectedDateTime).isSame(dayjs(trip.date), "hour")))
                );
            });
            setFilteredTripData(filteredData);
        } else {
            setFilteredTripData(tripData);
        }
    }

    return <>
        <FilterBar defaultValueStartLocation={selectedDeparturePoint}
                       onChangeStartLocation={setSelectedDeparturePoint}
                       travelPointOptions={travelPointsOptions} prefersDark={isDarkMode}
                       defaultValueEndLocation={selectedArrivalPoint}
                       onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}
                       onDateTimeChange={setSelectedDateTime} onConfirmFilters={filterTrips}/>
            <TripCollection filteredTripData={filteredTripData}/>
        </>

}