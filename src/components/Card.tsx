import React from "react";
import { dayName, users } from "../constants";
import { useEffect, useState } from "react";

interface DayEvent {
  day: number;
  dayId: string;
  events: Events[];
  user: {
    name: string;
    id: string;
  };
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addEvent: (day: string, edit: boolean) => void;
  preRemoveEvent: (day: string, id: string, name: string) => void;
  editEvent: (day: string, elm: Events) => void;
}

interface Events {
  _id: string;
  link: string;
  startHour: string;
  startMinute: string;
  finishHour: string;
  finishMinute: string;
  title: string;
  assistants: string[];
  createdBy: string;
}

const Card: React.FC<DayEvent> = ({
  day,
  dayId,
  events,
  user,
  addEvent,
  editEvent,
  preRemoveEvent,
  setLoading,
}) => {
  const [eventsList, setEvents] = useState(events);
  const [openEventId, setOpenEventId] = useState<string | null>(null);

  const updateEventAssistant = async (
    eventId: string,
    updatedAssistants: string[]
  ) => {
    setLoading(true);
    const res = await fetch("/api/events", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assistants: updatedAssistants, _id: eventId }),
    });
    setLoading(false);

    if (!res.ok) {
      console.error("Error updating event assistants:", res.statusText);
      return;
    }

    const eventUpdated = await res.json();
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event._id === eventId) {
          return {
            ...event,
            assistants: eventUpdated.assistants,
          };
        }
        return event;
      })
    );
  };

  const handleUpdateAssistant = async (eventId: string) => {
    const event = events.find((event) => event._id === eventId);
    if (!event) return;

    const isAssistant = event.assistants.includes(user.id);
    const updatedAssistants = isAssistant
      ? event.assistants.filter((id) => id !== user.id)
      : [...event.assistants, user.id];

    await updateEventAssistant(eventId, updatedAssistants);
  };

  const toggleEventVisibility = (eventId: string) => {
    setOpenEventId(openEventId === eventId ? null : eventId);
  };

  const getDayName = () => {
    const date = new Date(2024, 7, day);
    const dayNumber = date.getDay();
    return dayName[dayNumber];
  };

  useEffect(() => {
    const sortedEvents = [...events].sort((a, b) => {
      const aStartHour = parseInt(a.startHour, 10);
      const bStartHour = parseInt(b.startHour, 10);
      return aStartHour - bStartHour;
    });
    setEvents(sortedEvents);
  }, [events]);

  return (
    <div className="max-w-[450px] relative h-[350px] overflow-y-auto p-4 border-gray-200 bg-gradient-to-r from-accent-dark-first to-accent-dark-second rounded">
      <h4 className="text-center underline pb-5 text-xl font-semibold">
        {getDayName()} {day}
      </h4>
      <button
        onClick={() => addEvent(dayId, false)}
        className="bg-green-600 rounded-full p-1.5 absolute top-5 left-5"
      >
        <svg
          fill="#fff"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          width="12px"
          height="12px"
          viewBox="0 0 94.49 94.49"
        >
          <g>
            <path
              d="M92.49,35.284H59.206V2c0-1.104-0.896-2-2-2H37.284c-1.104,0-2,0.896-2,2v33.284H2c-1.104,0-2,0.896-2,2v19.922
		c0,1.104,0.896,2,2,2h33.284V92.49c0,1.104,0.896,2,2,2h19.922c1.104,0,2-0.896,2-2V59.206H92.49c1.104,0,2-0.896,2-2V37.284
		C94.49,36.18,93.596,35.284,92.49,35.284z"
            />
          </g>
        </svg>
      </button>
      {eventsList.length === 0 ? (
        <p className="text-center text-base">Sin planes previstos</p>
      ) : (
        eventsList.map((elm, index) => (
          <div
            key={`event-${day}-${index}`}
            className={`${index === eventsList.length - 1 ? "" : "pb-10"}`}
          >
            <p className="text-base font-semibold underline flex items-center pb-4">
              <span>
                ·{elm.startHour}:{elm.startMinute}{" "}
                {elm.finishHour && elm.finishMinute
                  ? `- ${elm.finishHour}:
              ${elm.finishMinute}`
                  : ""}
              </span>
              {(user.name === elm.createdBy || user.name === "Vicks") && (
                <>
                  <button
                    className="ml-5 p-1.5 bg-blue-500 rounded-full"
                    onClick={() => editEvent(dayId, elm)}
                  >
                    <img className="w-4" src="./edit.svg" alt="icono editar" />
                  </button>
                  <button
                    className="ml-5 p-1.5 bg-red-500 rounded-full"
                    onClick={() => preRemoveEvent(dayId, elm._id, elm.title)}
                  >
                    <img className="w-4" src="./trash.svg" alt="icono borrar" />
                  </button>
                </>
              )}
            </p>
            <h4 className="text-lg font-semibold text-center flex justify-center">
              {elm.link && (
                <button className="mr-3">
                  <a href={elm.link} target="_blank" rel="noopener noreferrer">
                    <img className="w-5" src="/link.png" alt="link" />
                  </a>
                </button>
              )}
              {elm.title} ({elm.assistants.length}){" "}
              <button
                onClick={() => toggleEventVisibility(elm._id)}
                className="ml-2 text-green-500"
              >
                {openEventId === elm._id ? (
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
                    <path d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" />
                  </svg>
                )}
              </button>
            </h4>
            {openEventId === elm._id && (
              <div className="text-base pt-5">
                <p className="font-semibold pb-3">¿Quién se apunta?</p>
                <p>
                  {elm.assistants.length === 0
                    ? "De momento ni perri..."
                    : elm.assistants.map((id) => users[id]).join(", ")}
                </p>
                <div className="pt-3 flex justify-center mt-3">
                  <button
                    onClick={() => handleUpdateAssistant(elm._id)}
                    className={`py-1.5 px-3 rounded ${
                      elm.assistants.includes(user.id)
                        ? "bg-red-500"
                        : "bg-green-600"
                    }`}
                  >
                    {elm.assistants.includes(user.id)
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
