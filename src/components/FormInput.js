import React from "react";
import { useField, ErrorMessage } from "formik";
import Select from "react-select";


export const styles = {
  control: (styles, {isFocused}) => ({
    ...styles, backgroundColor:"white",
    height:"50px",
    outline: isFocused ? "3px solid rgba(102, 198, 236, 0.897)" : "none",
    border: isFocused ? "none" : undefined}),
  option: ( styles, {isSelected} ) => ({
    ...styles,
    fontWeight: isSelected ? "bold" : "normal",
    color: "black",
    backgroundColor: isSelected ? "rgba(102, 198, 236, 0.897)" : "white",
    fontSize: "14px"
  }),
};

export const TextField = ({ label, inputType, placeholder, required=true, ...props }) => {
  const [field] = useField(props);
  return (
    <div className="auth-input-contain">
      <label htmlFor={field.name} className="auth-input-label">
        {required && <span style={{ color: "red", fontSize:14 }}>*</span>} {label}: {" "}
      </label>
      <div style={{width:"100%"}} >
        <input
          className={`auth-input`}
          placeholder={`   ${placeholder}`}
          type={inputType}
          {...field}
          {...props}
        />
        <div style={{ color: "red" }} className="auth-error-msg" >
          <ErrorMessage name={field.name} />
        </div>
      </div>
    </div>
  );
};

export const CustomSelect = ({ onChange, error, required, label, options, value }) => {

  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : ""
  }

  return(
    <div className="">
      <label>
        {" "}
        {required && <span style={{ color: "red" }}>*</span>} {label}
      </label>
      <Select 
        value={defaultValue(options, value)}
        onChange={value => onChange(value)}
        options={options} 
        styles={styles}
      />
      <div style={{ color: "red" }} className="auth-error-msg">
        {error}
      </div>
    </div>
  )

}

export const TextArea = ({ label, placeholder, ...props}) => {
  const [field] = useField(props);
  return (
    <div className="">
        <label
          htmlFor={field.name}
          className="text-umcolor-tertiary md:text-sm"
        >
          {label}
        </label>
        <textarea
          className="block w-full rounded-md px-4 pt-4 mb-3 leading-relaxed tracking-wide border border-gray-400 appearance-none resize-none autoexpand h-1/4 " 
          id="message"
          style={{height:"82px"}}
          {...field}
          {...props}
          type="text"
          placeholder={placeholder}
        ></textarea>
    </div>
  );
};
