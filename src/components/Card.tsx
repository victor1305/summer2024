import type React from "react";
import { dayName } from "../constants";
import { useState } from "react";

interface DayEvent {
  day: number;
  events: Events[];
  user: {
    name: string;
    id: number;
  };
}

interface Events {
  id: number;
  startHour: string;
  startMinute: string;
  finishHour: string;
  finishMinute: string;
  title: string;
  assistants: string[];
}

const Card: React.FC<DayEvent> = ({ day, events, user }) => {
  const [eventsList, setEvents] = useState(events);
  const [openEventId, setOpenEventId] = useState<number | null>(null);

  const updateEventAssistant = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === eventId) {
          const isAssistant = event.assistants.includes(user.name);
          return {
            ...event,
            assistants: isAssistant
              ? event.assistants.filter((name) => name !== user.name)
              : [...event.assistants, user.name],
          };
        }
        return event;
      })
    );
  };

  const toggleEventVisibility = (eventId: number) => {
    setOpenEventId(openEventId === eventId ? null : eventId);
  };

  const getDayName = () => {
    const date = new Date(2024, 7, day);
    const dayNumber = date.getDay();
    return dayName[dayNumber];
  };

  return (
    <div className="max-w-[450px] h-[350px] overflow-y-auto p-4 border-gray-200 bg-gradient-to-r from-accent-dark-first to-accent-dark-second rounded">
      <h4 className="text-center underline pb-5 text-xl font-semibold">
        {getDayName()} {day}
      </h4>
      {eventsList.length === 0 ? (
        <p className="text-center text-base">Sin planes previstos</p>
      ) : (
        eventsList.map((elm, index) => (
          <div
            key={`event-${day}-${index}`}
            className={`${index === eventsList.length - 1 ? "" : "pb-10"}`}
          >
            <p className="text-base font-semibold underline">
              ·{elm.startHour}:{elm.startMinute} - {elm.finishHour}:
              {elm.finishMinute}
            </p>
            <h4 className="text-lg font-semibold text-center flex justify-center">
              {elm.title} ({elm.assistants.length}){" "}
              <button
                onClick={() => toggleEventVisibility(elm.id)}
                className="ml-2 text-green-500"
              >
                {openEventId === elm.id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path

                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"

                    />
                  </svg>
                )}
              </button>
            </h4>
            {openEventId === elm.id && (
              <div className="text-base">
                <p className="font-semibold">Asistentes:</p>
                <p>
                  {elm.assistants.length === 0
                    ? "Sin asistentes"
                    : elm.assistants.join(", ")}
                </p>
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => updateEventAssistant(elm.id)}
                    className={`py-1.5 px-3 rounded ${
                      elm.assistants.includes(user.name)
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {elm.assistants.includes(user.name)
                      ? `Me borro de ${elm.title}...`
                      : `¡Me apunto a ${elm.title}!`}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
