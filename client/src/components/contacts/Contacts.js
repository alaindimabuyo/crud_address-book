import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import Spinner from '../layout/Spinner'

const Contacts = () => {
  //INITIALIZE CONTEXT to have access to any state or actions inside the contactContext
  const contactContext = useContext(ContactContext);
  //DESTRUCTURING
  const { contacts, filter, getContact, loading } = contactContext;

  //when this component loads
  useEffect(() => {
    getContact();
    //eslint-disable-next-line
  }, [])

  //if there is no contacts
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add Contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (<TransitionGroup>
        {filter !== null
          ? //if there is something in the filter input we gonna map and show it to UI
          filter.map(contact => (
            <CSSTransition key={contact._id} timeout={1000} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))
          : //if there is nothing in the filter input we gonna show the default contacts
          contacts.map(contact => (
            <CSSTransition key={contact._id} timeout={1000} classNames='item'>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
      </TransitionGroup>) : <Spinner />}

    </Fragment>
  );
};

export default Contacts;
