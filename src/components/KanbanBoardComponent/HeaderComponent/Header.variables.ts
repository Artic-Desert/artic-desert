export const customStyles = {
  option: (
    //eslint-disable-next-line
    provided: any,
    { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean },
  ) => ({
    ...provided,
    color: isSelected ? '#c8d1d9' : isFocused ? '#00111c' : '#c8d1d9',
    backgroundColor: isSelected ? '#00111c' : isFocused ? '#c8d1d9' : '#161b22',
  }),
  //eslint-disable-next-line
  menu: (provided: any) => ({
    ...provided,
    postion: 'fixed',
    zindex: '10',
    color: '#c8d1d9',
  }),
  //eslint-disable-next-line
  valueContainer: (provided: any) => ({
    ...provided,
    backgroundColor: '#161b22',
  }),
  //eslint-disable-next-line
  dropdownIndicator: (provided: any) => ({
    ...provided,
    backgroundColor: '#161b22',
  }),
  //eslint-disable-next-line
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#161b22',
  }),
  //eslint-disable-next-line
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: '#161b22',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  singleValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#161b22',
    color: '#c8d1d9',
  }),
};
