import React, { useState } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import EventModal from "./EventModal";
import { eventModalDefault, type EventModalDefaultProps } from "../constants";
import ConfirmModal from "./ConfirmModal";

interface DayEvents {
  day: number;
  events: Events[];
}

interface Events {
  startHour: string;
  startMinute: string;
  finishHour: string;
  finishMinute: string;
  id: string;
  title: string;
  assistants: string[];
  createdBy: string;
}

interface EventsSwiperProps {
  daysEvents: DayEvents[];
  user: {
    name: string;
    id: string;
  };
}

const EventsSwiper: React.FC<EventsSwiperProps> = ({ daysEvents, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [eventName, setEventName] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [idToEditOrRemove, setIdToEditOrRemove] = useState<string | null>(null);
  const [dayEvents, setDayEvents] = useState(daysEvents);
  const [eventForm, setEventForm] = useState(eventModalDefault);
  const [day, setDay] = useState(0);
  const addEvent = (day: number, edit: boolean) => {
    setDay(day);
    setIsEdit(edit);
    setIsModalOpen(true);
  };

  const editEvent = (day: number, event: Events) => {
    setIdToEditOrRemove(event.id);
    setEventForm(event);
    addEvent(day, true);
  };

  const preRemoveEvent = (day: number, id: string, name: string) => {
    setEventName(name);
    setIdToEditOrRemove(id);
    setDay(day);
    setIsConfirmModalOpen(true);
  };

  const removeEvent = () => {
    setDayEvents((prevDayEvents) =>
      prevDayEvents.map((dayEvent) => {
        if (dayEvent.day === day) {
          return {
            ...dayEvent,
            events: dayEvent.events.filter(
              (event) => event.id !== idToEditOrRemove
            ),
          };
        }
        return dayEvent;
      })
    );
    setIsConfirmModalOpen(false);
  };

  const createForm = (isEdit: boolean, form: EventModalDefaultProps) => {
    setDayEvents((prevDayEvents) => {
      const updatedDayEvents = prevDayEvents.map((dayEvent) => {
        if (dayEvent.day === day) {
          if (isEdit) {
            const updatedEvents = dayEvent.events
              .map((event) =>
                event.id === idToEditOrRemove ? { ...event, ...form } : event
              )
              .sort((a, b) => {
                const timeA =
                  parseInt(a.startHour) * 60 + parseInt(a.startMinute);
                const timeB =
                  parseInt(b.startHour) * 60 + parseInt(b.startMinute);
                return timeA - timeB;
              });
            return { ...dayEvent, events: updatedEvents };
          } else {
            const newEvent = {
              ...form,
              createdBy: user.name,
              id: Math.random().toString(36).substr(2, 9), // Generar un id único
            };
            const updatedEvents = [...dayEvent.events, newEvent].sort(
              (a, b) => {
                const timeA =
                  parseInt(a.startHour) * 60 + parseInt(a.startMinute);
                const timeB =
                  parseInt(b.startHour) * 60 + parseInt(b.startMinute);
                return timeA - timeB;
              }
            );
            return { ...dayEvent, events: updatedEvents };
          }
        }
        return dayEvent;
      });
      return updatedDayEvents;
    });
    closeModal();
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setEventForm((prevForm) => ({
      ...prevForm,
      assistants: checked
        ? [...prevForm.assistants, value]
        : prevForm.assistants.filter((assistant) => assistant !== value),
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIdToEditOrRemove(null);
    setEventForm(eventModalDefault);
  };

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
        }}
        pagination={{
          el: ".swiper-custom-pagination",
        }}
        modules={[EffectCoverflow, Pagination]}
      >
        {dayEvents.map((elm) => (
          <SwiperSlide key={elm.day}>
            <Card
              {...{
                day: elm.day,
                events: elm.events,
                user,
                addEvent,
                editEvent,
                preRemoveEvent,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-custom-pagination"></div>
      <EventModal
        {...{
          isOpen: isModalOpen,
          createForm,
          isEdit,
          handleCheckboxChange,
          eventForm,
          setEventForm,
          closeModal,
        }}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        text={`¿Seguro que quieres eliminar el evento "${eventName}"?`}
        primaryText="¡Sí!"
        secondaryText="Cancelar..."
        primaryAction={removeEvent}
        secondaryAction={() => setIsConfirmModalOpen(false)}
        closeModal={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
};

export default EventsSwiper;
