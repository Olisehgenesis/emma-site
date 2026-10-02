import { useState } from "react";
import { studio } from "../data";
import useTitle from "../useTitle";

const kinds = [
  "A home or small residence",
  "A school, clinic or church",
  "A shop, mall or mixed-use building",
  "Industrial or warehouse",
  "An interior",
  "Not sure yet",
];

const budgets = ["Under 500m", "500m – 2b", "2b – 10b", "Over 10b", "Not decided"];

export default function Contact() {
  useTitle("Contact", `Contact Allistar Technologies in Ntinda, Kampala: ${studio.email}.`);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const kind = String(data.get("kind") || "").trim();
    const budget = String(data.get("budget") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !phone || !message) {
      setError("Add your name, a phone number, and what you want designed.");
      setSent(false);
      return;
    }

    setError("");
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : null,
        `Project: ${kind}`,
        budget ? `Budget: ${budget}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n")
    );
    setSent(true);
    window.location.href = `mailto:${studio.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="page">
      <div className="contact-layout">
        <div className="contact-intro">
          <p className="kicker">Contact</p>
          <h1>Tell us the site, and what the building has to do.</h1>
          <p>
            Call the office, or send a brief. This form opens an email to {studio.email} with everything you have
            written, ready to send.
          </p>

          <div className="contact-block">
            <h2>Call</h2>
            <ul>
              {studio.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href}>{phone.display}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-block">
            <h2>Email</h2>
            <ul>
              <li>
                <a href={`mailto:${studio.email}`}>{studio.email}</a>
              </li>
              {studio.directorEmails.map((mail) => (
                <li key={mail}>
                  <a href={`mailto:${mail}`}>{mail}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-block">
            <h2>Visit</h2>
            <address>
              {studio.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <a className="text-link" href={studio.mapUrl} target="_blank" rel="noreferrer">
              Open in maps <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <form className="brief" onSubmit={onSubmit} noValidate>
          <h2>Project brief</h2>
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" autoComplete="tel" required />
          </label>
          <label>
            Email <span>optional</span>
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label>
            What do you need?
            <select name="kind" defaultValue={kinds[0]}>
              {kinds.map((kind) => (
                <option key={kind}>{kind}</option>
              ))}
            </select>
          </label>
          <label>
            Budget <span>optional, in Uganda shillings</span>
            <select name="budget" defaultValue="Not decided">
              {budgets.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            The brief
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Where is the plot, and what should the building be?"
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {sent && (
            <p className="form-note" role="status">
              Your email program should now be open with the brief filled in. If it did not open, write to{" "}
              <a href={`mailto:${studio.email}`}>{studio.email}</a>.
            </p>
          )}
          <button className="btn" type="submit">
            Send the brief
          </button>
        </form>
      </div>
    </section>
  );
}