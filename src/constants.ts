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

export const users: Record<string, string> = {
  "66a7c9258079bee58e77037c": "Vicks",
  "66a7c9648079bee58e77037d": "Jess",
  "66a7c97c8079bee58e77037e": "Dani JR",
  "66a7ca668079bee58e77037f": "Dani SR",
  "66a7caa58079bee58e770380": "Tirso",
  "66a7cada8079bee58e770381": "Povs",
  "66a7cc388079bee58e770382": "Alicia",
  "66a7ccfc8079bee58e770384": "Emilio",
  "66a7cd168079bee58e770385": "Bea",
  "66a7cd378079bee58e770386": "Silvia",
  "66a7cd798079bee58e770387": "Lau",
};

export const assistants = [
  {
    name: "Alicia",
    id: "66a7cc388079bee58e770382"
  },
  {
    name: "Emilio",
    id: "66a7ccfc8079bee58e770384"
  },
  {
    name: "Bea",
    id: "66a7cd168079bee58e770385"
  },
  {
    name: "Povs",
    id: "66a7cada8079bee58e770381"
  },
  {
    name: "Tirso",
    id: "66a7caa58079bee58e770380"
  },
  {
    name: "Silvia",
    id: "66a7cd378079bee58e770386"
  },
  {
    name: "Dani Sr",
    id: "66a7ca668079bee58e77037f"
  },
  {
    name: "Lau",
    id: "66a7cd798079bee58e770387"
  },
  {
    name: "Dani Jr",
    id: "66a7c97c8079bee58e77037e"
  },
  {
    name: "Jess",
    id: "66a7c9648079bee58e77037d"
  },
  {
    name: "Vicks",
    id: "66a7c9258079bee58e77037c"
  },
];
