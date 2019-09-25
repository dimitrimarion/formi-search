import React, { Fragment, useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async () => {
    setIsSubmitted(false);
    setIsError(false);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", name, email, message })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      setIsSubmitted(true);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Fragment>
      {isError && <h1 className="title">Something went wrong ...</h1>}

      {isSubmitted ? (
        <h1 className="title">
          Thank you! Your message has been successfully sent.
        </h1>
      ) : (
        <main>
          <h1 className="title">Contact</h1>
          <form
            className="contactForm"
            onSubmit={e => {
              handleSubmit();
              e.preventDefault();
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
      )}
    </Fragment>
  );
};

export default Contact;
