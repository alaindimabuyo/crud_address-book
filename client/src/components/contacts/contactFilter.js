import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filter } = contactContext;
  const text = useRef("");

  //if filter is null value should be empty
  useEffect(() => {
    if (filter === null) {
      text.current.value = "";
    }
  });
  const onChange = e => {
    if (text.current.value !== "") {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input ref={text} type='text' placeholder='Filter Contacts' onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
