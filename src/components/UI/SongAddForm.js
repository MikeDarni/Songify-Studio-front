import classes from "./SongAddForm.module.css";
import { useContext, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { getByTitle } from "@testing-library/react";

function SongAddForm(props) {
  const songFileInputRef = useRef();
  const titleInputRef = useRef();
  const authorInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    postFileHandler();
  }

  async function postFileHandler() {
    const formData = new FormData();
    const url = "https://localhost:44306/api/Songs";
    formData.append("File", songFileInputRef.current.files[0]);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        name: titleInputRef.current.value,
        author: authorInputRef.current.value,
        genre: 2,
      },
      body: formData,
    });
    console.log(response);
  }

  return (
    <div className={classes.formBg}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nazwa piosenki</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz nazwe"
            ref={titleInputRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Autor</Form.Label>
          <Form.Control type="text" ref={authorInputRef} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Plik mp3</Form.Label>
          <Form.Control type="file" ref={songFileInputRef} />
        </Form.Group>
        <Form.Group></Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SongAddForm;
