import  React from "react";
import {
  assistants,
  hours,
  minutes,
  type EventModalDefaultProps,
} from "../constants";

interface EventModalProps {
  isOpen: boolean;
  createForm: (isEdit: boolean, form: EventModalDefaultProps) => void;
  isEdit: boolean;
  eventForm: EventModalDefaultProps;
  setEventForm: (ev: EventModalDefaultProps) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  createForm,
  isEdit,
  eventForm,
  setEventForm,
  handleCheckboxChange,
  closeModal,
}) => (
  <div
    className={`${
      isOpen ? "flex justify-center items-center" : "hidden"
    } bg-black bg-opacity-70 backdrop-blur-sm fixed w-screen h-screen top-0 left-0 z-40`}
  >
    <div className="bg-white overflow-y-auto text-sky-600 p-5 max-w-[80%] max-h-[80%] sm:w-[450px] relative">
      <button
        onClick={closeModal}
        className="text-black font-bold absolute right-3 top-2"
      >
        X
      </button>
      <div>
        <h4 className="text-center font-semibold pb-6 pt-2">
          {isEdit ? "Editar" : "Crear"} evento
        </h4>
        <div className="text-base text-gray-600 pb-8 flex flex-col">
          <label className="mb-1">Plan: *</label>
          <input
            className="border border-gray-500 rounded py-1 max-w-[90%] px-2"
            type="text"
            name="eventName"
            value={eventForm.title || ""}
            onChange={(e) =>
              setEventForm({ ...eventForm, title: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between pb-8 sm:justify-start">
          <div className="text-base text-gray-600 flex flex-col sm:mr-8">
            <label className="mb-1">Hora inicio: *</label>
            <select
              className="p-2 border rounded"
              name="initHour"
              value={eventForm.startHour || ""}
              onChange={(e) =>
                setEventForm({ ...eventForm, startHour: e.target.value })
              }
            >
              <option value={""}>--- Hora ---</option>
              {hours.map((elm, index) => (
                <option key={`hour-init-${index}`}>{elm}</option>
              ))}
            </select>
          </div>
          <div className="text-base text-gray-600 flex flex-col">
            <label className="mb-1">Minuto inicio: *</label>
            <select
              className="p-2 border rounded"
              name="initMinute"
              value={eventForm.startMinute || ""}
              onChange={(e) =>
                setEventForm({ ...eventForm, startMinute: e.target.value })
              }
            >
              <option value={""}>--- Minuto ---</option>
              {minutes.map((elm, index) => (
                <option key={`minute-init-${index}`}>{elm}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between pb-8 sm:justify-start">
          <div className="text-base text-gray-600 flex flex-col sm:mr-8">
            <label className="mb-1">Hora final:</label>
            <select
              name="finishHour"
              className="p-2 border rounded"
              value={eventForm.finishHour || ""}
              onChange={(e) =>
                setEventForm({ ...eventForm, finishHour: e.target.value })
              }
            >
              <option value={""}>--- Hora ---</option>
              {hours.map((elm, index) => (
                <option key={`hour-finish-${index}`}>{elm}</option>
              ))}
            </select>
          </div>
          <div className="text-base text-gray-600 flex flex-col">
            <label className="mb-1">Minuto final:</label>
            <select
              name="finishMinute"
              className="p-2 border rounded"
              value={eventForm.finishMinute || ""}
              onChange={(e) =>
                setEventForm({ ...eventForm, finishMinute: e.target.value })
              }
            >
              <option value={""}>--- Minuto ---</option>
              {minutes.map((elm, index) => (
                <option key={`minute-finish-${index}`}>{elm}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-base text-gray-600">
          <div>
            <label className="mb-1">Asistentes:</label>
            <div className="mt-2 mb-8 grid grid-cols-3 md:grid-cols-4 gap-1">
              {assistants.map((elm, index) => (
                <div
                  key={`assistant-${index}`}
                  className="flex w-[65px] justify-between"
                >
                  <label>{elm.name}</label>
                  <input
                    type="checkbox"
                    value={elm.id}
                    checked={eventForm.assistants.includes(elm.id)}
                    onChange={handleCheckboxChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            className="bg-sky-600 text-white py-1 px-4 text-lg rounded"
            onClick={() => createForm(isEdit, eventForm)}
          >
            {isEdit ? "Editar" : "Crear"} evento
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default EventModal;
