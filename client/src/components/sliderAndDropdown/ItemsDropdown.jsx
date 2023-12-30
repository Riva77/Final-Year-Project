import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Select = ({
  label,
  options,
  value: selectedOption,
  onChange: handelChange,
}) => {
  return (
    <Listbox
      as="div"
      //className={className}
      value={selectedOption}
      onChange={(event) => {
        console.log("enfant", event);
        handelChange(event);
      }}
    >
      {({ open }) => (
        <>
          {/*label && (
            <Listbox.Label className="mb-1 text-sm font-medium text-blue-gray-500">
              {label}
            </Listbox.Label>
          )*/}
          <div className="relative mt-1">
            <span className="inline-block w-full rounded-md shadow-sm ">
              <Listbox.Button className="cursor-default relative rounded-md border border-gray-300 bg-[#FDFBF7] pl-3 pr-10 py-2 text-left  transition ease-in-out duration-150 h-[67px] w-[260px]">
                <span className="block truncate">{selectedOption.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <MdKeyboardArrowDown />
                </span>
              </Listbox.Button>
            </span>
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg mb-11">
              {/* bottom-0 will open the select menu up & mb-11 will put the dropup above the select option */}
              <Transition
                show={open}
                leave="transition duration-100 ease-in"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
              >
                <Listbox.Options
                  static
                  className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {options.map((option) => {
                    return (
                      <Listbox.Option
                        as={React.Fragment}
                        key={option.id}
                        value={option}
                      >
                        {({ active, selected }) => {
                          return (
                            <li
                              className={`${
                                active
                                  ? "text-white bg-[#4C2B21]"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 pl-3 pr-9`}
                            >
                              <div className="flex items-center">
                                <span
                                  className={`${
                                    selected ? "font-semibold" : "font-normal"
                                  } flex items-center  truncate`}
                                >
                                  {option.label}
                                </span>
                              </div>
                            </li>
                          );
                        }}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
