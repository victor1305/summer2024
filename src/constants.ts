export const ctcNames: Record<number, string> = {
  1000: "SIN AFORO",
  2000: "BAJO",
  3000: "MEDIO",
  4000: "ALTO",
  5000: "COMPLETO",
};

export const seaNames: Record<number, string> = {
  0: "SIN ESTADO",
  1: "LLANA",
  2: "RIZADA",
  3: "MAREJADILLA",
  4: "MAREJADA",
  5: "FUERTE MAREJADA",
  6: "GRUESA",
  7: "MUY GRUESA",
  8: "ARBOLADA",
  9: "MONTAÑOSA",
};

export const flaNames: Record<number, string> = {
  100: "blue",
  200: "green",
  300: "yellow",
  400: "red",
  500: "black",
};

export const dayName: { [key: number]: string } = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

export interface EventModalDefaultProps {
  title: string;
  startHour: string;
  startMinute: string;
  finishHour: string;
  finishMinute: string;
  assistants: string[];
}

export const eventModalDefault: EventModalDefaultProps = {
  title: "",
  startHour: "",
  startMinute: "",
  finishHour: "",
  finishMinute: "",
  assistants: [],
};

export const hours: string[] = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);
export const minutes: string[] = Array.from({ length: 12 }, (_, i) =>
  (i * 5).toString().padStart(2, "0")
);

export const assistants = [
  {
    name: "Alicia",
  },
  {
    name: "Emilio",
  },
  {
    name: "Bea",
  },
  {
    name: "Povs",
  },
  {
    name: "Tirso",
  },
  {
    name: "Silvia",
  },
  {
    name: "Dani Sr",
  },
  {
    name: "Lau",
  },
  {
    name: "Dani Jr",
  },
  {
    name: "Jess",
  },
  {
    name: "Vicks",
  },
];
