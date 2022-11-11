import React, { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useSetting } from "../context/setting";

export default function Gamereq() {
  const form = useRef();

  const { player, setPlayer } = useSetting();

  useEffect(() => {}, [setPlayer]);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ze3b52u",
        "template_3efap7d",
        form.current,
        "2Ly9KXV4YkL4Nx7Sk"
      )
      .then(
        (result) => {
          Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = "")
          );
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <form ref={form} id="type" onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <br />
        <input type="text" name="to_name" value={player.username} />
        <br />
        <input type="email" name="send_to" value={player.email} />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
