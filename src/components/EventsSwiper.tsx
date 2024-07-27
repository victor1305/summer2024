import React from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "./Card";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";

interface DayEvents {
  day: number;
  events: Events[];
}

interface Events {
  startHour: string;
  startMinute: string;
  finishHour: string;
  finishMinute: string;
  id: number;
  title: string;
  assistants: string[];
}

interface EventsSwiperProps {
  daysEvents: DayEvents[];
  user: {
    name: string;
    id: number;
  };
}

const EventsSwiper: React.FC<EventsSwiperProps> = ({ daysEvents, user }) => (
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
      {daysEvents.map((elm, index: number) => (
        <SwiperSlide key={index}>
          <Card {...{ day: elm.day, events: elm.events, user }} />
        </SwiperSlide>
      ))}
    </Swiper>
    <div className="swiper-custom-pagination"></div>
  </>
);

export default EventsSwiper;
