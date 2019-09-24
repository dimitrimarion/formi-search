import React from "react";

const Contact = () => {
  return (
    <main>
      <h1 className="title">Contact</h1>
      <form name="contact" method="post" className="contactForm">
        <p>
          <label htmlFor="name">Your Name</label>
          <input type="text" name="name" />
        </p>

        <p>
          <label htmlFor="email">Your Email</label>
          <input type="email" name="email" />
        </p>

        <p>
          <label htmlFor="message">Message</label>
          <textarea name="message"></textarea>
        </p>

        <button type="submit">Send</button>
      </form>
    </main>
  );
};

export default Contact;
