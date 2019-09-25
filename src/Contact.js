import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", name, email, message })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  return (
    <main>
      <h1 className="title">Contact</h1>
      <form
        className="contactForm"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <p>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </p>

        <p>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </p>

        <p>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </p>

        <button type="submit">Send</button>
      </form>
    </main>
  );
};

export default Contact;
